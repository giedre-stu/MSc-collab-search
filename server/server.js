const Query = require("../models/queryModel");
const Result = require("../models/resultModel");
const Session = require ("../models/sessionModel");
const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
const fs = require("fs");
const historyApiFallback = require("connect-history-api-fallback");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const api = require("./routes/");
const Pusher = require('pusher');
const config = require("../config/config");
const webpackConfig = require("../webpack.config");

const isDev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 8080;

var pusher = new Pusher({
  appId: '584548',
  key: '646362f68c27c766a87c',
  secret: '9cc644e967b5808b689b',
  cluster: 'eu',
  encrypted: true
});

 const main_channel = 'sessions';
 const query_channel = 'queries';
 const result_channel = 'results';

// Configuration
// ================================================================================================
// Set up Mongoose
// mongoose.connect(config.db_dev);
// mongoose.connect(isDev ? config.db_dev : config.db); 
mongoose.connect('mongodb://18.207.169.66,52.21.9.14,18.213.16.23/mainDb?replicaSet=rs');
// mongoose.connect('mongodb://localhost/testDb2?replicaSet=rs');
const db = mongoose.connection;
db.once("open", () => {
    console.log(">>> 🖥️  MongoDB: Connection successful");
    app.listen(9000, () => {
        console.log('Node server running on port 9000');
      });
     const sessionCollection = db.collection('sessions');
     const queryCollection = db.collection('queries');
     const resultCollection = db.collection('results');
     const changeStream = sessionCollection.watch();
     const changeStreamQueries = queryCollection.watch();
     const updateResults = resultCollection.watch();

     updateResults.on('change', (change) => {
      if(change.operationType === 'insert') {
        const result = change.fullDocument;
        pusher.trigger(
          result_channel,
          'result_inserted',
          {
            id: result._id
          },
          );
      } else if (change.operationType === 'update') {
        const result=change.documentKey;
        pusher.trigger(
          result_channel,
          'result_updated',
            {},
          );
      } else if (change.operationType === 'delete') { 
        const result=change.fullDocument;
        pusher.trigger(
          result_channel,
          'result_deleted',
            {},
        );
      }
    }); 

    changeStreamQueries.on('change', (change) => { 
        if(change.operationType === 'insert') { 
          const query = change.fullDocument;
          pusher.trigger(
            query_channel,
            'query_inserted', 
            {
              id: query._id
            },
          ); 
        } else {}
      });

     changeStream.on('change', (change) => {
        if(change.operationType === 'insert') {
          const session = change.fullDocument;
          pusher.trigger(
            main_channel,
            'inserted', 
            {
              id: session._id
            },
          ); 
        } else if(change.operationType === 'update') { 
          const session = change.documentKey; 
          pusher.trigger(
            main_channel,
            'updated', 
            {},
          );
        }
      });
  })
  .on("error", err => {
    console.log(">>> 🖥️  MongoDB: Error connecting to server\n", err);
  });

mongoose.Promise = global.Promise;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', api);

// API routes
//require("./routes")(app);

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('../config/passport')(passport);

if (isDev) {
  const compiler = webpack(webpackConfig);

  app.use(
    historyApiFallback({
      verbose: false
    })
  );

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      contentBase: path.resolve(__dirname, "../client/public"),
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
      }
    })
  );

  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(path.resolve(__dirname, "../dist")));
} else {
  app.use(express.static(path.resolve(__dirname, "../dist")));
  app.get("*", function(req, res) {
    res.sendFile(path.resolve(__dirname, "../dist/index.html"));
    res.end();
  });
}

app.listen(port, "0.0.0.0", err => {
  if (err) {
    console.log(err);
  }

  console.info(">>> 🌎 Open http://localhost:%s/ in your browser.", port);
});

app.post('/query', (req, res, next) => {
  var today = new Date();
  var doc = new Query({ 
    'keyword': req.body.keyword, 
    'id': req.body.id,
    'date': today
  }); doc.save()
      .then(result => {
      res.send({
        result
      });
    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/session', (req, res, next) => { 
  var doc = new Session({
    'sessionTitle': req.body.sessionTitle })
    doc.save() 
    .then(result => {
      res.send({ 
        result
      });
    })
    .catch(err=> {
      console.log(err);
      return err;
    });  
 });

app.post('/result', (req,res,next) => { 
  var today = new Date();
  var doc = new Result({
    'id': req.body.id,
    'link': req.body.link,
    'snippet': req.body.snippet,
    'title': req.body.title,
    'date': today
  })
  doc.save()
  .then(result => { 
    res.send({
      result});
    })
  .catch(err=>{
    return err;
  })
});

app.post('/comment', (req, res, next) => {  
  var today  = new Date(); 
  var dateString = 
    today.getFullYear() +"-"+ 
    (today.getMonth()+1) +"-"+ 
    today.getDate() + " " + 
    today.getHours() + ":" + 
    today.getMinutes(); 
  var newComment = {
    comment_date: today,
    comment_date_string: dateString,
    comment_name: req.body.comment_name,
    comment_text: req.body.comment_text,
  };
  Result.findByIdAndUpdate(
    {_id: req.body.id}, {$push: {
      comments: newComment 
    }, $set: {
      date: today
    }},
    function(error,success){
      if (error) {
        console.log (error);
      } else {}
    }
  ).then(result=> {
    res.send({
      result
    })
  })
});

app.post('/delete', (req,res,next) => {
  Result.deleteOne({
    '_id': req.body.resultid
  }, function(error, success) {
    if (error) {
      console.log(error);
    } else {console.log(success)}
  }
  ).then(result => { 
        res.send({
          result
    })
  })
});

app.get('/session', (req,res,next) => {
  Session.findById(req.query.sessionid, function (err, success){
      if (err) {
        console.log(error);
      } else {}
    }).then(result => {
      res.send({
        result
      })
    })
});

app.get('/queries', (req,res,next) => { 
  Query.find({
    'id': req.query.sessionid 
  }, function (error, success) {
          if (error) {
              console.log(error);
          } else {}
    }
    ).sort({date: -1}).then(result => { 
        res.send({
          result
    });
  });
});

app.get('/results', (req,res,next) => { 
   Result.find({
    'id': req.query.sessionid 
  }, function (error, success) {
      if (error) {
        console.log(error);
      } else {}
    }
    ).sort({date: -1}).then(result => { 
        res.send({
          result
    });
  });
});

module.exports = app;

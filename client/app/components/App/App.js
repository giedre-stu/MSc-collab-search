import React, { Component } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../App/Main";
import Pusher from "pusher-js";
import ReactDOM from 'react-dom';

const API_URL = 'http://localhost:9000/api/';

const App = ({children}) => (

  	<body className = "grey blue test z-depth-3"> 
	    <Header/>   
	    <main> 
	    	<Main/>
	    </main> 
	    <Footer/>
	</body> 

);

export default App; 
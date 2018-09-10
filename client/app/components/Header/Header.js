 import React from 'react'; 

const Header = () => (

<header>  
  <nav>
    <div className="nav-wrapper blue header">
      <div className="brand-logo"><h5>Collaborative Search</h5></div>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li>
    	<a className="btn-flat white-text modal-trigger waves-effect waves-light" data-target="load">
            Open
         	<i className="material-icons right">folder_open</i>
        </a>
        </li>
        <li>
    	<a className="btn-flat white-text modal-trigger waves-effect waves-light" data-target="createnew" >
        	New session
         	<i className="material-icons right">add</i>
        </a> 
        </li> 
      </ul>
    </div>
  </nav>
</header>
);

export default Header;

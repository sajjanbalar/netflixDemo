var React = require('react');
var ReactDOM = require("react-dom")
var FullPage = require("./components/fullPage");

const app = document.getElementById( "main" );
ReactDOM.render(
  <FullPage /> ,
  document.getElementById('main')
);
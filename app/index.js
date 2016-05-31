const ReactDOM = require('react-dom');
const React = require('react');
let RootView = require('./views/index.jsx');

let uiKit = document.createElement('link'),
    uiRootClass = require('./helpers').classFromPlatform();

uiKit.rel = 'stylesheet';
uiKit.type = 'text/css';

uiKit.href = `themes/css/${uiRootClass}.css`;
document.head.appendChild(uiKit);

uiKit.addEventListener('load', function() {
  ReactDOM.render(React.createElement(RootView), document.querySelector('#content'));
});
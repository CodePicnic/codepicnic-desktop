const React = require('react');
const CodePicnic = require('codepicnic');
const StartScreenView = require('./startScreen.jsx');
const AppView = require('./app.jsx');

let uiRootClass;

switch(global.process.platform) {
  case 'darwin':
    uiRootClass = 'macosx';
  break;
  case 'win32':
    uiRootClass = 'windows10';
  break;
  default:
    uiRootClass = 'elementaryos';
  break;
}

const RootView = React.createClass({
  getInitialState: function() {
    var initialView = 'startScreenView';

    if (global.localStorage.getItem('client_key') && global.localStorage.getItem('secret_key')) {
      initialView = 'appView';
    }

    return { initialView: initialView };
  },
  startApp: function() {
    var self = this,
        initialView = self.refs.initialView,
        clientKey = initialView.refs.clientKey.value,
        secretKey = initialView.refs.secretKey.value;

    global.localStorage.setItem('client_key', clientKey);
    global.localStorage.setItem('secret_key', secretKey);

    CodePicnic.initialize(clientKey, secretKey).then(function() {
      return CodePicnic.Console.all();
    }).then(function(consoles) {
      self.setState({
        initialView: 'appView',
        consoles: consoles.filter(function(console) {
          return console.get('container_type') !== 'js';
        })
      });
    });
  },
  renderInitialView: function() {
    var initialView;

    switch(this.state.initialView) {
      case 'appView':
        initialView = <AppView ref="initialView" consoles={this.state.consoles} />;
      break;
      default:
        initialView = <StartScreenView ref="initialView" onClickStartButton={this.startApp} />;
      break;
    }

    return initialView;
  },
  render: function renderRootView() {
    return (
      <div className={`${uiRootClass} root no-scrollable`}>
        {this.renderInitialView()}
      </div>
    );
  }
});

module.exports = RootView;
const React = require('react');

let themePath;

switch(global.process.platform) {
  case 'darwin':
    themePath = 'macosx';
  break;
  case 'win32':
    themePath = 'windows10';
  break;
  default:
    themePath = 'elementaryos';
  break;
}

const Icon = React.createClass({
  render: function renderIcon() {
    return <img src={`icons/${themePath}/${this.props.id}.svg`} className="icon" />;
  }
});

module.exports = Icon;
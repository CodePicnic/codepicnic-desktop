const React = require('react');

let themePath = require('../helpers').classFromPlatform();

const Icon = React.createClass({
  render: function renderIcon() {
    return <img src={`icons/${themePath}/${this.props.id}.svg`} className="icon" />;
  }
});

module.exports = Icon;
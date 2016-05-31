const React = require('react');

const StartScreenView = React.createClass({
  getInitialState: function() {
    return { startButtonDisabled: true };
  },
  checkInputs: function() {
    if (this.refs.clientKey.value.trim() !== '' && this.refs.secretKey.value.trim() !== '') {
      this.setState({ startButtonDisabled: false });
    }
    else {
      this.setState({ startButtonDisabled: true });
    }
  },
  render: function StartScreenView() {
    return (
      <div className="stack-layout-vertical center-horizontal center-vertical">
        <img src="icons/icon.png" width="96" height="96" />
        <h1>Welcome to CodePicnic</h1>
        <p>CodePicnic Desktop needs both Client Id and Client Secret to start.<br/>You can find them on your <a href="https://codepicnic.com/dashboard/profile" target="_blank">profile page</a>.</p>
        <div className="input-element vertical">
          <input className="toolbar-input" onChange={this.checkInputs} ref="clientKey" type="text" size="64" placeholder="Enter your Client Id here" />
        </div>
        <div className="input-element vertical">
          <input className="toolbar-input" onChange={this.checkInputs} ref="secretKey" type="text" size="64" placeholder="Enter your Client Secret here" />
        </div>
        <button className="primary" disabled={this.state.startButtonDisabled ? true : null} onClick={this.props.onClickStartButton}>Start</button>
      </div>
    );
  }
});

module.exports = StartScreenView;
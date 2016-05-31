const React = require('react');
const moment = require('moment');
const Icon = require('../components/icon.jsx');
const Table = require('../components/table.jsx');

moment.locale('en');

let emptyConsoles = [];

function fetchConsoles() {
  return CodePicnic.Console.all().catch(function() {
    var clientKey = global.localStorage.getItem('client_key'),
        secretKey = global.localStorage.getItem('secret_key');

    return CodePicnic.initialize(clientKey, secretKey).then(function() {
      return CodePicnic.Console.all();
    });
  });
}

function filterConsolesByContainerType(console) {
  return console.get('container_type') !== 'js';
}

const AppView = React.createClass({
  getDefaultProps: function getDefaultProps() {
    return { consoles: emptyConsoles };
  },
  getInitialState: function getInitialState() {
    return { consoles: this.props.consoles, currentConsole: null };
  },
  componentDidMount: function componentDidMount() {
    if (this.state.consoles.length === 0) {
      this.loadConsoles();
    }
  },
  componentDidUpdate: function(nextProps, nextState) {
    if (nextState.loadingConsoleIndex && this.refs.currentTerminal) {
      this.refs.currentTerminal.focus();
    }
  },
  loadConsoles: function loadConsoles() {
    var self = this;

    self.state.consoles.length = 0;
    self.setState({ consoles: self.state.consoles });

    fetchConsoles().then(function(consoles) {
      var previousConsoles = self.state.consoles;

      previousConsoles.length = 0;
      previousConsoles = previousConsoles.concat(consoles.filter(filterConsolesByContainerType));

      self.setState({ consoles: previousConsoles });
      self = null;
    });
  },
  onClickReloadButton: function onClickReloadButton() {
    this.loadConsoles();
  },
  onClickPlay: function onClickPlay(event) {
    var self = this,
        loadingConsoleIndex = event.currentTarget.dataset.index,
        currentConsole = self.state.consoles[loadingConsoleIndex];

    self.setState({ currentConsole: undefined, loadingConsoleIndex: loadingConsoleIndex });
    document.querySelector('body').classList.add('cursor-progress');
    currentConsole.set('containerName', currentConsole.get('container_name'));
    currentConsole.start().then(function() {
      self.setState({ currentConsole: currentConsole, loadingConsoleIndex: undefined });
      document.querySelector('body').classList.remove('cursor-progress');
      self = null;
    });
  },
  renderTerminal: function renderTerminal() {
    var currentConsole = this.state.currentConsole;

    if (currentConsole) {
      return <iframe ref="currentTerminal" frameBorder="0" style={{ minWidth: '66%' }} src={currentConsole.get('terminal_url')}></iframe>;
    }
  },
  renderTableRow: function renderTableRow(console, index) {
    var selectedClass = (console === this.state.currentConsole) ? 'selected' : undefined,
        icon = (this.state.loadingConsoleIndex == index) ? <div className="progress-ring icon"></div> : <Icon id="play" />;

    return (
      <tr key={index} className={selectedClass}>
        <td title={console.get('name')}>{console.get('name')}</td>
        <td>{moment(console.get('created_at')).format('LL')}</td>
        <td>
          <button title="Start" data-index={index} onClick={this.onClickPlay}>{icon}</button>
        </td>
      </tr>
    );
  },
  render: function renderAppView() {
    return (
      <div className="stack-layout-vertical">
        <nav className="toolbar">
          <button type="button" className="toolbar-button" title="Add a console"><Icon id="plus" /></button>
          <input className="full" type="search" placeholder="Search consoles" />
          <button type="button" className="toolbar-button" title="Reload" onClick={this.onClickReloadButton}><Icon id="reload" /></button>
          <button type="button" className="toolbar-button" title="Settings"><Icon id="settings" /></button>
        </nav>
        <div className="stack-layout-horizontal">
          <Table items={this.state.consoles} renderRow={this.renderTableRow}>
            <th style={{ minWidth: '300px', maxWidth: '80%' }}>Name</th>
            <th style={{ width: '120px' }}>Created at</th>
            <th style={{ width: '60px' }}></th>
          </Table>
          {this.renderTerminal()}
        </div>
      </div>
    );
  }
});

module.exports = AppView;
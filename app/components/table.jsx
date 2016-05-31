const React = require('react');
const Icon = require('../components/icon.jsx');

const Table = React.createClass({
  renderTableBody: function renderTableBody() {
    if (this.props.items.length > 0) {
      return this.props.items.map(this.props.renderRow);
    }

    return (
      <tr>
        <td colSpan={this.props.children.length} className="view">
          <div className="progress-ring small block-center"></div>
        </td>
      </tr>
    );
  },
  render: function renderTable() {
    return (
      <div className="table-wrapper stack-layout-vertical scroll-layout">
        <table>
          <thead>
            <tr>{this.props.children}</tr>
          </thead>
        </table>
        <div className="table-body">
          <table className="table-headerless">
            <thead>
              <tr>{this.props.children}</tr>
            </thead>
            <tbody>{this.renderTableBody()}</tbody>
          </table>
        </div>
      </div>
    );
  }
});

module.exports = Table;
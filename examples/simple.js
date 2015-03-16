/** @jsx React.DOM */
// use jsx to render html, do not modify simple.html
var CascadeSelect = require('rc-cascade-select');
var React = require('react');

function simulateData(value) {
  var data = [];
  for (var i = 0; i < 4; i++) {
    data.push({
      name: value + '_' + i + ' : data',
      value: value + '_' + i
    })
  }
  return data;
}

class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: []
    };
  }

  onChange(value) {
    this.setState({
      value: value
    });
  }

  load(id, callback) {
    console.log('load data for: ' + id);
    callback(null, simulateData(id || '1'));
  }

  render() {
    return <CascadeSelect
      value={this.state.value}
      allText="i want all"
      onChange={this.onChange.bind(this)}
      load={this.load}>
      <select></select>
      <select></select>
      <select></select>
    </CascadeSelect>;
  }
}

React.render(<Component />, document.getElementById('__react-content'));

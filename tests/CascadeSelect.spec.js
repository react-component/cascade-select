'use strict';

var React = require('react/addons');
var expect = require('expect.js');
var CascadeSelect = require('../');
var TestUtils = React.addons.TestUtils;
var Simulate = TestUtils.Simulate;

function simulateData(value) {
  var data = [];
  for (var i = 0; i < 2; i++) {
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
    //console.log('value changed', value);
    this.setState({
      value: value
    });
  }

  load(id, callback) {
    //console.log('load data for: ' + id);
    callback(null, simulateData(id || '1'));
  }

  render() {
    return <CascadeSelect
      ref='select'
      value={this.state.value}
      allText="i want all"
      onChange={this.onChange.bind(this)}
      loader={this.load}>
      <span>
        <select ref='s1'></select>
      </span>
      <select ref='s2'></select>
    </CascadeSelect>;
  }
}

describe('cascade-select', ()=> {
  var component;
  var div = document.createElement('div');
  document.body.appendChild(div);

  beforeEach(()=> {
    component = React.render(<Component />, div);
  });

  afterEach(()=> {
    React.unmountComponentAtNode(div);
  });

  it('simple works', ()=> {
    var options = TestUtils.scryRenderedDOMComponentsWithTag(component.refs.s1, 'option');
    var data = options.map(function (o) {
      return {
        name: o.props.children,
        value: o.props.value
      }
    });
    expect(data).to.eql([{"name": "i want all", "value": ""}, {
      "name": "1_0 : data",
      "value": "1_0"
    }, {"name": "1_1 : data", "value": "1_1"}]);
    options = TestUtils.scryRenderedDOMComponentsWithTag(component.refs.s2, 'option');
    data = options.map(function (o) {
      return {
        name: o.props.children,
        value: o.props.value
      }
    });
    expect(data).to.eql([{"name": "i want all", "value": ""}]);
  });

  it('cascade works', ()=> {
    component.refs.s1.getDOMNode().selectedIndex = 1;
    Simulate.change(component.refs.s1.getDOMNode());
    var options = TestUtils.scryRenderedDOMComponentsWithTag(component.refs.s2, 'option');
    var data = options.map(function (o) {
      return {
        name: o.props.children,
        value: o.props.value
      }
    });
    expect(data).to.eql([{
      "name": "i want all",
      "value": ""
    }, {
      "name": "1_0_0 : data",
      "value": "1_0_0"
    }, {
      "name": "1_0_1 : data",
      "value": "1_0_1"
    }]);
    expect(component.refs.s2.getDOMNode().selectedIndex).to.be(0);

    component.refs.s2.getDOMNode().selectedIndex = 1;
    Simulate.change(component.refs.s2.getDOMNode());

    component.refs.s1.getDOMNode().selectedIndex = 2;
    Simulate.change(component.refs.s1.getDOMNode());
     options = TestUtils.scryRenderedDOMComponentsWithTag(component.refs.s2, 'option');
     data = options.map(function (o) {
      return {
        name: o.props.children,
        value: o.props.value
      }
    });
    expect(data).to.eql([{
      "name": "i want all",
      "value": ""
    }, {
      "name": "1_1_0 : data",
      "value": "1_1_0"
    }, {
      "name": "1_1_1 : data",
      "value": "1_1_1"
    }]);
    expect(component.refs.s2.getDOMNode().selectedIndex).to.be(0);
  });

});

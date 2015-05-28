'use strict';

/**
 * yiminghe@gmail.com
 * cascade select
 */
var React = require('react');

function series(datas, fn, end) {
  var next = (error)=> {
    if (error) {
      end(error);
    } else {
      start++;
      if (start === datas.length) {
        end();
        return;
      }
      fn(datas[start], next);
    }
  };
  var start = -1;
  next();
}

function findFromChildrenOfParent(parentData, id) {
  var children = parentData && parentData.children || [];
  var i;
  for (i = 0; i < children.length; i++) {
    if (String(children[i].value) === id) {
      return children[i];
    }
  }
}

function addOptions(self, children) {
  var i = 0;
  var value = self.props.value;
  var parentData = self.state.data;
  var doIt = (doChildren) => {
    // depth first
    return React.Children.map(doChildren, (c) => {
      if (c.type === 'select') {
        var newProps = {};
        var v = value[i] || '';
        var data = parentData && parentData.children || [];
        if (v) {
          parentData = findFromChildrenOfParent(parentData, v);
        } else {
          parentData = null;
        }
        newProps.onChange = self.select.bind(self, i);
        newProps.value = v;
        var options = [<option value="">{self.props.allText}</option>].concat(data.map((d) => {
          return <option value={d.value}>{d.name}</option>;
        }));
        c = React.cloneElement(c, newProps, options);
        i++;
      } else if (c.props && c.props.children) {
        c = React.cloneElement(c, null, doIt(c.props.children));
      }
      return c;
    });
  };

  var ret = doIt(children);
  self.selectCount = i;
  return ret;
}

function complementTreeByValue(self, data, value) {
  var time = self.time;
  if (value && value.length) {
    var parentData = data;
    var i = 0;
    series(value, (id, callback) => {
      i++;
      var node = findFromChildrenOfParent(parentData, id);
      parentData = node;
      if (!node) {
        callback('end');
        return;
      }
      if (node.children) {
        callback();
        return;
      }
      if (i === self.selectCount) {
        callback();
        return;
      }
      self.props.loader(id, (error, ret) => {
        if (error) {
          callback(error);
          return;
        }
        node.children = ret;
        callback();
      });
    }, ()=> {
      if (self.time === time) {
        self.setState({
          data: data
        });
      }
    });
  } else {
    self.setState({
      data: data
    });
  }
}

class CascadeSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        children: []
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    this.time = Date.now();
    complementTreeByValue(this, {children: this.state.data.children}, nextProps.value);
  }

  componentDidMount() {
    var props = this.props;
    props.loader(null, (error, data)=> {
      if (error) {
        return;
      }
      this.time = Date.now();
      complementTreeByValue(this, {children: data}, this.props.value);
    });
  }

  select(index, e) {
    var value = this.props.value.concat([]);
    for (var i = index + 1; i < value.length; i++) {
      value[i] = '';
    }
    value[index] = e.target.value;
    this.props.onChange(value);
  }

  render() {
    var props = this.props;
    var children = addOptions(this, props.children);
    return <span className={props.className}>{children}</span>;
  }
}

CascadeSelect.defaultProps = {
  value: [],
  allText: 'all',
  onChange() {
  },
  loader() {
  }
};

module.exports = CascadeSelect;

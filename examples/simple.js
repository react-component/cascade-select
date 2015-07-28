webpackJsonp([0,1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// use jsx to render html, do not modify simple.html
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var CascadeSelect = __webpack_require__(2);
	var React = __webpack_require__(5);
	
	function simulateData(value) {
	  var data = [];
	  for (var i = 0; i < 4; i++) {
	    data.push({
	      name: value + '_' + i + ' : data',
	      value: value + '_' + i
	    });
	  }
	  return data;
	}
	
	var Component = (function (_React$Component) {
	  _inherits(Component, _React$Component);
	
	  function Component(props) {
	    _classCallCheck(this, Component);
	
	    _get(Object.getPrototypeOf(Component.prototype), 'constructor', this).call(this, props);
	    this.state = {
	      value: []
	    };
	  }
	
	  _createClass(Component, [{
	    key: 'onChange',
	    value: function onChange(value) {
	      console.log('value changed', value);
	      this.setState({
	        value: value
	      });
	    }
	  }, {
	    key: 'load',
	    value: function load(id, callback) {
	      console.log('load data for: ' + id);
	      callback(null, simulateData(id || '1'));
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        CascadeSelect,
	        {
	          value: this.state.value,
	          allText: "i want all",
	          onChange: this.onChange.bind(this),
	          loader: this.load },
	        React.createElement(
	          'span',
	          null,
	          React.createElement('select', null)
	        ),
	        React.createElement('select', null),
	        React.createElement('select', null)
	      );
	    }
	  }]);
	
	  return Component;
	})(React.Component);
	
	React.render(React.createElement(
	  'div',
	  null,
	  React.createElement(
	    'h1',
	    null,
	    'simple cascade select'
	  ),
	  React.createElement(
	    'div',
	    null,
	    React.createElement(Component, null)
	  )
	), document.getElementById('__react-content'));

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(3);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(4);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * yiminghe@gmail.com
	 * cascade select
	 */
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var React = __webpack_require__(5);
	
	function series(datas, fn, end) {
	  var next = function next(error) {
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
	  var doIt = function doIt(doChildren) {
	    // depth first
	    return React.Children.map(doChildren, function (c) {
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
	        var options = [React.createElement(
	          'option',
	          { value: "" },
	          self.props.allText
	        )].concat(data.map(function (d) {
	          return React.createElement(
	            'option',
	            { value: d.value },
	            d.name
	          );
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
	    series(value, function (id, callback) {
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
	      self.props.loader(id, function (error, ret) {
	        if (error) {
	          callback(error);
	          return;
	        }
	        node.children = ret;
	        callback();
	      });
	    }, function () {
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
	
	var CascadeSelect = (function (_React$Component) {
	  _inherits(CascadeSelect, _React$Component);
	
	  function CascadeSelect(props) {
	    _classCallCheck(this, CascadeSelect);
	
	    _get(Object.getPrototypeOf(CascadeSelect.prototype), 'constructor', this).call(this, props);
	    this.state = {
	      data: {
	        children: []
	      }
	    };
	  }
	
	  _createClass(CascadeSelect, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      this.time = Date.now();
	      complementTreeByValue(this, { children: this.state.data.children }, nextProps.value);
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this = this;
	
	      var props = this.props;
	      props.loader(null, function (error, data) {
	        if (error) {
	          return;
	        }
	        _this.time = Date.now();
	        complementTreeByValue(_this, { children: data }, _this.props.value);
	      });
	    }
	  }, {
	    key: 'select',
	    value: function select(index, e) {
	      var value = this.props.value.concat([]);
	      for (var i = index + 1; i < value.length; i++) {
	        value[i] = '';
	      }
	      value[index] = e.target.value;
	      this.props.onChange(value);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var props = this.props;
	      var children = addOptions(this, props.children);
	      return React.createElement(
	        'span',
	        { className: props.className },
	        children
	      );
	    }
	  }]);
	
	  return CascadeSelect;
	})(React.Component);
	
	CascadeSelect.defaultProps = {
	  value: [],
	  allText: 'all',
	  onChange: function onChange() {},
	  loader: function loader() {}
	};
	
	module.exports = CascadeSelect;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = React;

/***/ }
]);
//# sourceMappingURL=simple.js.map
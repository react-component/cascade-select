webpackJsonp([0,1],[
/* 0 */
/*!********************!*\
  !*** multi simple ***!
  \********************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./examples/simple.js */1);


/***/ },
/* 1 */
/*!****************************!*\
  !*** ./examples/simple.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	// use jsx to render html, do not modify simple.html
	var CascadeSelect = __webpack_require__(/*! rc-cascade-select */ 3);
	var React = __webpack_require__(/*! react */ 2);
	
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
	
	var ____Class0=React.Component;for(var ____Class0____Key in ____Class0){if(____Class0.hasOwnProperty(____Class0____Key)){Component[____Class0____Key]=____Class0[____Class0____Key];}}var ____SuperProtoOf____Class0=____Class0===null?null:____Class0.prototype;Component.prototype=Object.create(____SuperProtoOf____Class0);Component.prototype.constructor=Component;Component.__superConstructor__=____Class0;
	  function Component(props) {"use strict";
	    ____Class0.call(this,props);
	    this.state = {
	      value: []
	    };
	  }
	
	  Object.defineProperty(Component.prototype,"onChange",{writable:true,configurable:true,value:function(value) {"use strict";
	    console.log('value changed', value);
	    this.setState({
	      value: value
	    });
	  }});
	
	  Object.defineProperty(Component.prototype,"load",{writable:true,configurable:true,value:function(id, callback) {"use strict";
	    console.log('load data for: ' + id);
	    callback(null, simulateData(id || '1'));
	  }});
	
	  Object.defineProperty(Component.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";
	    return React.createElement(CascadeSelect, {
	      value: this.state.value, 
	      allText: "i want all", 
	      onChange: this.onChange.bind(this), 
	      loader: this.load}, 
	      React.createElement("span", null, 
	        React.createElement("select", null)
	      ), 
	      React.createElement("select", null), 
	      React.createElement("select", null)
	    );
	  }});
	
	
	React.render(React.createElement("div", null, 
	  React.createElement("h1", null, "simple cascade select"), 
	  React.createElement("div", null, React.createElement(Component, null))
	), document.getElementById('__react-content'));


/***/ },
/* 2 */
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = React;

/***/ },
/* 3 */
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./lib/CascadeSelect */ 4);


/***/ },
/* 4 */
/*!******************************!*\
  !*** ./lib/CascadeSelect.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */
	
	'use strict';
	
	/**
	 * yiminghe@gmail.com
	 * cascade select
	 */
	var React = __webpack_require__(/*! react */ 2);
	
	function series(datas, fn, end) {
	  var next = function(error) {
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
	  var doIt = function(children)  {
	    // depth first
	    return React.Children.map(children, function(c)  {
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
	        var options = [React.createElement("option", {value: ""}, self.props.allText)].concat(data.map(function(d)  {
	          return React.createElement("option", {value: d.value}, d.name);
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
	    series(value, function(id, callback)  {
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
	      self.props.loader(id, function(error, data)  {
	        if (error) {
	          callback(error);
	          return;
	        }
	        node.children = data;
	        callback();
	      });
	    }, function() {
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
	
	var ____Class1=React.Component;for(var ____Class1____Key in ____Class1){if(____Class1.hasOwnProperty(____Class1____Key)){CascadeSelect[____Class1____Key]=____Class1[____Class1____Key];}}var ____SuperProtoOf____Class1=____Class1===null?null:____Class1.prototype;CascadeSelect.prototype=Object.create(____SuperProtoOf____Class1);CascadeSelect.prototype.constructor=CascadeSelect;CascadeSelect.__superConstructor__=____Class1;
	  function CascadeSelect(props) {
	    ____Class1.call(this,props);
	    this.state = {
	      data: {
	        children: []
	      }
	    };
	  }
	
	  Object.defineProperty(CascadeSelect.prototype,"componentWillReceiveProps",{writable:true,configurable:true,value:function(nextProps) {
	    this.time = Date.now();
	    complementTreeByValue(this, {children: this.state.data.children}, nextProps.value);
	  }});
	
	  Object.defineProperty(CascadeSelect.prototype,"componentDidMount",{writable:true,configurable:true,value:function() {
	    var props = this.props;
	    props.loader(null, function(error, data) {
	      if (error) {
	        return;
	      }
	      this.time = Date.now();
	      complementTreeByValue(this, {children: data}, this.props.value);
	    }.bind(this));
	  }});
	
	  Object.defineProperty(CascadeSelect.prototype,"select",{writable:true,configurable:true,value:function(index, e) {
	    var value = this.props.value.concat([]);
	    for (var i = index + 1; i < value.length; i++) {
	      value[i] = '';
	    }
	    value[index] = e.target.value;
	    this.props.onChange(value);
	  }});
	
	  Object.defineProperty(CascadeSelect.prototype,"render",{writable:true,configurable:true,value:function() {
	    var props = this.props;
	    var children = addOptions(this, props.children);
	    return React.createElement("span", {className: props.className}, children);
	  }});
	
	
	CascadeSelect.defaultProps = {
	  value: [],
	  allText: 'all',
	  onChange:function() {
	  },
	  loader:function() {
	  }
	};
	
	module.exports = CascadeSelect;


/***/ }
]);
//# sourceMappingURL=simple.js.map
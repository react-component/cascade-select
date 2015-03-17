# rc-cascade-select
---

cascade-select ui component for react.

[![NPM version][npm-image]][npm-url]
[![SPM version](http://spmjs.io/badge/rc-cascade-select)](http://spmjs.io/package/rc-cascade-select)
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![gemnasium deps][gemnasium-image]][gemnasium-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]
[![Sauce Test Status](https://saucelabs.com/buildstatus/rc-cascade-select)](https://saucelabs.com/u/rc-cascade-select)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/rc-cascade-select.svg)](https://saucelabs.com/u/rc-cascade-select)

[npm-image]: http://img.shields.io/npm/v/rc-cascade-select.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-cascade-select
[travis-image]: https://img.shields.io/travis/react-component/cascade-select.svg?style=flat-square
[travis-url]: https://travis-ci.org/react-component/cascade-select
[coveralls-image]: https://img.shields.io/coveralls/react-component/cascade-select.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/cascade-select?branch=master
[gemnasium-image]: http://img.shields.io/gemnasium/react-component/cascade-select.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/react-component/cascade-select
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/rc-cascade-select.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-cascade-select

## Feature

* support ie8,ie8+,chrome,firefox,safari

## install

[![rc-cascade-select](https://nodei.co/npm/rc-cascade-select.png)](https://npmjs.org/package/rc-cascade-select)


## Development

```
npm install
npm start
```

## Example

http://localhost:8000/examples/

online example: http://react-component.github.io/cascade-select/build/examples/


## Api

### CascadeSelect props

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 50px;">type</th>
        <th style="width: 50px;">default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>className</td>
          <td>String</td>
          <td></td>
          <td>additional css class of root dom node</td>
        </tr>
        <tr>
          <td>value</td>
          <td>String[]</td>
          <td>[]</td>
          <td>current value like input's value</td>
        </tr>
        <tr>
           <td>allText</td>
           <td>String</td>
           <td>all</td>
           <td></td>
         </tr>
         <tr>
            <td>loader</td>
            <td>Function(value, callback:Function(error, data:Object[])</td>
            <td></td>
            <td>called when select a option, return children options corresponding to current option, data's child type must be type of {name,value}</td>
          </tr>
    </tbody>
</table>

## Test Case

http://localhost:8000/tests/runner.html?coverage

## Coverage

http://localhost:8000/node_modules/rc-server/node_modules/node-jscover/lib/front-end/jscoverage.html?w=http://localhost:8000/tests/runner.html?coverage

## License

rc-cascade-select is released under the MIT license.

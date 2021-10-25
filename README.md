# model-test

![Build Status](https://github.com/janis-commerce/model-test/workflows/Build%20Status/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/janis-commerce/model-test/badge.svg?branch=master)](https://coveralls.io/github/janis-commerce/model-test?branch=master)
[![npm version](https://badge.fury.io/js/%40janiscommerce%2Fmodel-test.svg)](https://www.npmjs.com/package/@janiscommerce/model-test)

A helper package to test Janis Model created with (@janiscommerce/model)](https://www.npmjs.com/package/@janiscommerce/model)

## Usage

You must add a `tests/model-test.js` file like the following

```js
'use strict';

const modelTest = require('@janiscommerce/model-test');

modelTest();
```
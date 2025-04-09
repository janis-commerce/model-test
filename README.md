# model-test

![Build Status](https://github.com/janis-commerce/model-test/workflows/Build%20Status/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/janis-commerce/model-test/badge.svg?branch=master)](https://coveralls.io/github/janis-commerce/model-test?branch=master)
[![npm version](https://badge.fury.io/js/%40janiscommerce%2Fmodel-test.svg)](https://www.npmjs.com/package/@janiscommerce/model-test)

A helper package to test Janis Model created with [@janiscommerce/model](https://www.npmjs.com/package/@janiscommerce/model).

## :hammer: Usage

You must add a `./tests/model-test.js` file like the following.

```js
'use strict';

const modelTest = require('@janiscommerce/model-test');

modelTest();
```

## Models

The package will look for the models of a service located in the `./{process.env.MS_PATH}/models/` folder.

### Exclude models from testing

You can exclude specific model files from being tested by passing an `exclude` array to the test function.

```js
const modelTest = require('@janiscommerce/model-test');

modelTest({
	exclude: ['model-to-skip', 'another-model']
});
```

Each item in the array should be the filename of the model you want to skip — **do not include the** `.js` extension.

> 📝 The names are matched against the model filenames located in your models folder. Matching is case-sensitive.

## Validations

The package automatically will validate each model according [@janiscommerce/model](https://www.npmjs.com/package/@janiscommerce/model).

The validations performed by the package are as follows

### Table/Collection

The table/collection is validated using the _static getter_ `table`. Should return a _String_ value.

### Database Key

The databaseKey is validated using the _non-static getter_ `databaseKey`. Should return a _String_ value.

### Statuses

The statuses are validated using the _static getter_ `statuses`. Should return an _Object_ with **keys** and **values** as _Strings_.

### Fields

The fields are validated using the _static getter_ `fields`. Should return an _Object_ with **keys** and **values** as _Strings_.

The validation is performed with a struct.

```js
'use strict';

const { struct } = require('superstruct');

module.exports = struct.partial({
	field: 'string?',
	type: 'string?'
});
```

### Indexes

The indexes are validated using the _static getter_ `indexes`. Should return an _Object_ with **keys** and **values** as _Strings_.

The validation is performed with a struct.

```js
'use strict';

const { struct } = require('superstruct');

module.exports = struct.partial({
	name: 'string',
	key: 'object',
	unique: 'boolean?',
	expireAfterSeconds: 'number?',
	partialFilterExpression: 'object?',
	sparse: 'boolean?'
});
```

For more information see [@janiscommerce/mongodb-index-creator](https://www.npmjs.com/package/@janiscommerce/mongodb-index-creator).

### Log Creation

The automatic Log Creation is validated using the _static getter_ `shouldCreateLogs`. Should return a _Boolean_.

For more information see [@janiscommerce/log](https://www.npmjs.com/package/@janiscommerce/log).

### Excluding fields from logs

The validation is performed using the _static getter_ `excludeFieldsInLog`. Should return a _String Array_.

For more information see [@janiscommerce/log](https://www.npmjs.com/package/@janiscommerce/log).
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

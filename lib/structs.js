'use strict';

const { struct } = require('superstruct');

module.exports.statusesStruct = struct.dict(['string', 'string']);

module.exports.fieldStruct = struct.partial({
	field: 'string?',
	type: 'string?'
});

module.exports.indexStruct = struct.partial({
	name: 'string',
	key: 'object',
	unique: 'boolean?',
	expireAfterSeconds: 'number?',
	partialFilterExpression: 'object?',
	sparse: 'boolean?'
});

module.exports.excludeFieldsInLogStruct = struct(['string']);

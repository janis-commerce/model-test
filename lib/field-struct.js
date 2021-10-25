'use strict';

const { struct } = require('superstruct');

module.exports = struct.partial({
	field: 'string?',
	type: 'string?'
});

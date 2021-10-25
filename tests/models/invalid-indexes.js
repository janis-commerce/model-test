'use strict';

const ValidModel = require('./valid');

module.exports = class InvalidIndexes extends ValidModel {

	static get indexes() {
		return { name: 'name' };
	}
};

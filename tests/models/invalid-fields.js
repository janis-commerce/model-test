'use strict';

const ValidModel = require('./valid');

module.exports = class InvalidFields extends ValidModel {

	static get fields() {
		return ['name'];
	}
};

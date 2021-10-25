'use strict';

const ValidModel = require('./valid');

module.exports = class InvalidTable extends ValidModel {

	static get table() {
		return 9999;
	}
};

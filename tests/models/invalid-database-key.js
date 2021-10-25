'use strict';

const ValidModel = require('./valid');

module.exports = class InvalidDatabaseKey extends ValidModel {

	get databaseKey() {
		return 44;
	}
};

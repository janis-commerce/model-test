'use strict';

const Model = require('@janiscommerce/model');

module.exports = class ValidModel extends Model {

	get databaseKey() {
		return 'core';
	}

	static get table() {
		return 'valid-model-documents';
	}

	static get fields() {
		return {
			nameNotEqual: {
				field: 'nameNotEqual',
				type: 'notEqual'
			}
		};
	}

	static get indexes() {
		return [{
			name: 'referenceId',
			key: { referenceId: 1 },
			unique: true
		}, {
			name: 'name',
			key: { name: 1 }
		}];
	}
};

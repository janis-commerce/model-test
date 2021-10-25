'use strict';

const assert = require('assert');

const fs = require('fs');
const path = require('path');
const mockRequire = require('mock-require');

const sinon = require('sinon');
const ModelHelper = require('../lib/model-helper');

const modelTest = require('../lib/model-test');

const ValidModel = require('./models/valid');
const InvalidTableModel = require('./models/invalid-table');
const InvalidDatabaseKeyModel = require('./models/invalid-database-key');
const InvalidFieldsModel = require('./models/invalid-fields');
const InvalidIndexesModel = require('./models/invalid-indexes');

require('lllog')('none');

describe('ModelTest', () => {

	afterEach(() => {
		sinon.restore();
		mockRequire.stopAll();
	});

	const mockModel = (fileName, modelClass) => {
		sinon.stub(fs, 'readdirSync')
			.returns([fileName]);

		mockRequire(path.join(ModelHelper.path, fileName), modelClass);
	};

	context('When validating a valid model', () => {

		it('Should not throw', () => {
			mockModel('valid-model.js', ValidModel);
			assert.doesNotThrow(modelTest);
		});

	});

	context('When invalid models were found', () => {

		it('Should throw when the table is wrong', () => {
			mockModel('invalid-table-model.js', InvalidTableModel);
			assert.throws(() => {
				modelTest();
			}, {
				code: 'ERR_ASSERTION'
			});
		});

	});

	context('When no models were found', () => {

		it('Should not throw', () => {

			sinon.stub(fs, 'readdirSync')
				.returns([]);

			assert.doesNotThrow(modelTest);
		});
	});

});

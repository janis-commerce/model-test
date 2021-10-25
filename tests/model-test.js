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
		sinon.stub(fs.promises, 'readdir')
			.resolves([fileName]);

		mockRequire(path.join(ModelHelper.path, fileName), modelClass);
	};

	context('When validating a valid model', () => {

		it('Should not throw', async () => {

			mockModel('valid-model.js', ValidModel);

			await assert.doesNotReject(() => modelTest());
		});

	});

	context('When invalid models were found', () => {

		it.only('Should throw when the table is wrong', async () => {

			mockModel('invalid-table-model.js', InvalidTableModel);

			await modelTest();

			await assert.rejects(() => modelTest(), {
				code: 'ERR_ASSERTION'
			});
		});

	});

	context('When no models were found', () => {

		it('Should not throw', async () => {

			sinon.stub(fs, 'readdirSync')
				.returns([]);

			assert.doesNotReject(modelTest);
		});
	});

});

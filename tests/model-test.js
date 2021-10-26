'use strict';

const assert = require('assert');

const fs = require('fs');
const path = require('path');
const mockRequire = require('mock-require');

const sinon = require('sinon');

const Model = require('@janiscommerce/model');

const ModelHelper = require('../lib/model-helper');

const modelTest = require('../lib/model-test');

require('lllog')('none');

describe('ModelTest', () => {

	const oldEnv = { ...process.env };

	afterEach(() => {
		process.env = oldEnv;
		sinon.restore();
		mockRequire.stopAll();
	});

	const mockModel = (fileName, modelClass) => {
		sinon.stub(fs.promises, 'readdir')
			.resolves([fileName]);

		mockRequire(path.join(ModelHelper.path, fileName), modelClass);
	};

	context('When validating a valid model', () => {

		it('Should not reject when valid databaseKey is defined', async () => {

			class ValidModel extends Model {

				get databaseKey() {
					return 'other-database-key';
				}

				static get table() {
					return 'valid-model-documents';
				}
			}

			mockModel('valid-model.js', ValidModel);

			await assert.doesNotReject(() => modelTest());
		});

		it('Should not reject when valid table is defined', async () => {

			class ValidModel extends Model {

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
			}

			mockModel('valid-model.js', ValidModel);

			await assert.doesNotReject(() => modelTest());
		});

		it('Should not reject when valid fields are defined', async () => {

			class ValidModel extends Model {

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
			}

			mockModel('valid-model.js', ValidModel);

			await assert.doesNotReject(() => modelTest());
		});

		it('Should not reject when valid indexes are defined', async () => {

			class ValidModel extends Model {

				static get table() {
					return 'valid-model-documents';
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
			}

			mockModel('valid-model.js', ValidModel);

			await assert.doesNotReject(() => modelTest());
		});

		it('Should not reject when shouldCreateLogs is defined and returns true', async () => {

			class ValidModel extends Model {

				static get table() {
					return 'valid-model-documents';
				}

				static get shouldCreateLogs() {
					return true;
				}
			}

			mockModel('valid-model.js', ValidModel);

			await assert.doesNotReject(() => modelTest());
		});

		it('Should not reject when shouldCreateLogs is defined and returns false', async () => {

			class ValidModel extends Model {

				static get table() {
					return 'valid-model-documents';
				}

				static get shouldCreateLogs() {
					return false;
				}
			}

			mockModel('valid-model.js', ValidModel);

			await assert.doesNotReject(() => modelTest());
		});

		it('Should not reject when valid statuses are defined', async () => {

			class ValidModel extends Model {

				static get table() {
					return 'valid-model-documents';
				}

				static get statuses() {
					return {
						success: 'success',
						error: 'error'
					};
				}
			}

			mockModel('valid-model.js', ValidModel);

			await assert.doesNotReject(() => modelTest());
		});


		it('Should find models in correct path', async () => {

			process.env.MS_PATH = '';

			class ValidModel extends Model {

				static get table() {
					return 'valid-model-documents';
				}
			}

			mockModel('valid-model.js', ValidModel);

			await assert.doesNotReject(() => modelTest());

		});

	});

	context('When no models were found', () => {

		it('Should not reject when no model were found', async () => {

			sinon.stub(fs.promises, 'readdir')
				.resolves([]);

			await assert.doesNotReject(() => modelTest());
		});

		it('Should not reject when readdir rejects', async () => {

			sinon.stub(fs.promises, 'readdir')
				.rejects(new Error('Some fs error'));

			await assert.doesNotReject(() => modelTest());
		});
	});

});

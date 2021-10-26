'use strict';

const assert = require('assert');

const ModelHelper = require('./model-helper');

const { statusesStruct, indexStruct, fieldStruct, excludeFieldsInLogStruct } = require('./structs');

const isObject = value => typeof value === 'object' && !Array.isArray(value);

module.exports = async () => {

	const modelsClasses = await ModelHelper.getModels();

	modelsClasses.map(Model => describe(`Model ${Model.name}`, () => {

		it('Should have table/collection defined as string with the static getter table', () => {
			assert.strictEqual(typeof Model.table, 'string');
		});

		it('Should have the database key defined as string with the getter databaseKey', () => {
			const modelInstance = new Model();
			assert.strictEqual(typeof modelInstance.databaseKey, 'string');
		});

		it('Should have valid statuses defined as strings object with the getter statuses', () => {
			assert.doesNotThrow(() => statusesStruct(Model.statuses));
		});

		if(typeof Model.fields !== 'undefined') {

			it('Should have fields defined as an Object with the static getter fields', () => assert(isObject(Model.fields)));

			Object.entries(Model.fields).forEach(([fieldName, fieldDefinition]) => {
				it(`Should define field ${fieldName} with valid structure`, () => {
					assert.doesNotThrow(() => fieldStruct(fieldDefinition));
				});
			});
		}

		if(typeof Model.indexes !== 'undefined') {

			it('Should have indexes defined as an Array with the static getter indexes', () => {
				assert(Array.isArray(Model.indexes));
			});

			Model.indexes.forEach(index => {
				it('Should use correct index struct', () => {
					assert.doesNotThrow(() => indexStruct(index));
				});
			});
		}

		if(typeof Model.shouldCreateLogs !== 'undefined') {
			it('Should define shouldCreateLogs as a boolean static getter', () => {
				assert.strictEqual(typeof Model.shouldCreateLogs, 'boolean');
			});
		}

		if(typeof Model.excludeFieldsInLog !== 'undefined') {
			it('Should define excludeFieldsInLog as a String Array static getter', () => {
				assert.doesNotThrow(() => excludeFieldsInLogStruct(Model.excludeFieldsInLog));
			});
		}

	}));
};

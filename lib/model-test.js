'use strict';

const assert = require('assert');

const indexStruct = require('./index-struct');
const fieldStruct = require('./field-struct');
const ModelHelper = require('./model-helper');

const isObject = value => typeof value === 'object' && !Array.isArray(value);

module.exports = () => {

	const modelsClasses = ModelHelper.getModels();

	modelsClasses.forEach(Model => {

		describe(`Model ${Model.name}`, () => {

			it('Should have table/collection defined as string with the static getter table', () => {
				assert.strictEqual(typeof Model.table, 'string');
			});

			it('Should have the database key defined as string with the getter databaseKey', () => {
				const modelInstance = new Model();
				assert.strictEqual(typeof modelInstance.databaseKey, 'string');
			});

			if(Model.fields) {

				it('Should have fields defined as an Object with the static getter fields', () => assert(isObject(Model.fields)));

				Object.entries(Model.fields).forEach(([fieldName, fieldDefinition]) => {
					it(`Should define field ${fieldName} with valid structure`, () => fieldStruct(fieldDefinition));
				});
			}

			if(Model.indexes) {

				it('Should have indexes defined as an Array with the static getter indexes', () => {
					assert(Array.isArray(Model.indexes));
				});

				Model.indexes.forEach(index => it('Should use correct index struct', () => indexStruct(index)));
			}

		});

	});
};

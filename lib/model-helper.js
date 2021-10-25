'use strict';

const fs = require('fs').promises;
const path = require('path');

const logger = require('lllog')();

module.exports = class ModelHelper {

	static get path() {
		return path.join(process.cwd(), process.env.MS_PATH || '', 'models');
	}

	static async getModels() {

		const modelFiles = await this.findModels();

		return modelFiles.reduce((models, modelFile) => {

			// eslint-disable-next-line global-require, import/no-dynamic-require
			const ModelClass = require(path.join(this.path, modelFile));

			models.push(ModelClass);

			return models;
		}, []);
	}

	static findModels() {

		try {
			return fs.readdir(this.path);
		} catch(error) {
			logger.warn('Operation skipped: No models found.');
			return [];
		}
	}
};

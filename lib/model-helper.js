'use strict';

const fs = require('fs').promises;
const path = require('path');

const logger = require('lllog')();

module.exports = class ModelHelper {

	static get path() {
		return path.join(process.cwd(), process.env.MS_PATH || '', 'models');
	}

	static async getModels(modelsToExclude) {

		const modelFiles = await this.findModels();

		return modelFiles.reduce((models, modelFile) => {

			if(!modelsToExclude.includes(modelFile.replace('.js', ''))) {
				// eslint-disable-next-line global-require, import/no-dynamic-require
				const ModelClass = require(path.join(this.path, modelFile));
				models.push(ModelClass);
			}

			return models;
		}, []);
	}

	static async findModels() {

		try {
			const dir = await fs.readdir(this.path);
			return dir;
		} catch(error) {
			logger.warn('Operation skipped: No models found.');
			return [];
		}
	}
};

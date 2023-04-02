import { API_URL } from '../..';
import { Feature, FeatureConfig } from '../template';
import { Area } from './area';

export enum LogType {
	Info = 'INFO',
	Warning = 'WARNING',
	Error = 'ERROR',
}

export const LOGS_API_URL = API_URL + '/logs';

export class Logs extends Feature {
	public readonly Area: {
		new (name: string): Area;
	};

	constructor(config: FeatureConfig) {
		super(config);

		this.Area = Area.bind(this, {
			fish: this.config.fish,
			apiKey: this.config.projectConfig.apiKey,
		});
	}
}

import { Fish } from '@shark0f/fish';
import { ProjectConfig } from '..';

export interface FeatureConfig {
	projectConfig: ProjectConfig;
	fish: Fish;
}

export class Feature {
	constructor(protected readonly config: FeatureConfig) {}
}

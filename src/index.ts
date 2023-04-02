import { Fish } from '@shark0f/fish';
import { Logs } from './features/logs';

export interface ProjectConfig {
	/**
	 * The key used to identify your project.
	 * You can find this key in the project settings.
	 */
	apiKey: string;
	/**
	 * The password used for the encryption.
	 */
	password: string;
}

export const API_URL = 'https://27363.shark0.com';

/**
 * @example
 * ```typescript
 * const project = new Project({ secret: 'abc...', apiKey: 'abc...' });
 * ```
 */
export class Project {
	private readonly fish: Fish;

	public readonly logs: Logs;

	constructor(config: ProjectConfig) {
		this.fish = new Fish(config.password);

		this.logs = new Logs({ projectConfig: config, fish: this.fish });
	}
}

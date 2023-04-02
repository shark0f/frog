import { Fish } from '@shark0f/fish';
import fetch from 'node-fetch';

export interface FrogConfig {
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

interface FrogAreaConfig extends Pick<FrogConfig, 'apiKey'> {
	fish: Fish;
}

export enum LogType {
	Info = 'INFO',
	Warning = 'WARNING',
	Error = 'ERROR',
}

export const API_URL = 'https://27363.shark0.com/';

class FrogArea {
	private readonly config: FrogAreaConfig;
	private readonly areaName: string;

	constructor(config: FrogAreaConfig, areaName: string) {
		this.config = config;
		this.areaName = areaName;
	}

	private joinPieces(pieces: unknown[]) {
		const formattedPieces = [];

		for (const piece of pieces) {
			if (piece instanceof Error) {
				formattedPieces.push(piece.message);
				continue;
			}

			if (typeof piece === 'object') {
				formattedPieces.push(JSON.stringify(piece));
				continue;
			}

			formattedPieces.push(String(piece));
		}

		return formattedPieces.join(' ');
	}

	private async send({
		area,
		content: _content,
		type,
	}: {
		area: string;
		content: string;
		type: LogType;
	}) {
		const content = this.config.fish.encrypt(_content);

		await fetch(API_URL, {
			method: 'post',
			headers: {
				'X-API-Key': this.config.apiKey,
			},
			body: JSON.stringify({ area, content, type }),
		});
	}

	public async info(...pieces: unknown[]) {
		return await this.send({
			area: this.areaName,
			content: this.joinPieces(pieces),
			type: LogType.Info,
		});
	}

	public async warning(...pieces: unknown[]) {
		return await this.send({
			area: this.areaName,
			content: this.joinPieces(pieces),
			type: LogType.Warning,
		});
	}

	public async error(...pieces: unknown[]) {
		return await this.send({
			area: this.areaName,
			content: this.joinPieces(pieces),
			type: LogType.Error,
		});
	}
}

/**
 * @example
 * ```typescript
 * const frog = new Frog({ secret: 'abc...', apiKey: 'abc...' });
 * const log = new frog.Area('sign-up');
 * ```
 */
export class Frog {
	private readonly config: FrogConfig;
	private readonly fish: Fish;

	/**
	 * @example
	 * ```typescript
	 * const frog = new Frog(...);
	 * const log = new frog.Area('sign-up');
	 * ```
	 */
	public Area: {
		new (areaName: string): FrogArea;
	};

	constructor(config: FrogConfig) {
		this.config = config;
		this.fish = new Fish(config.password);

		this.Area = FrogArea.bind(this, {
			fish: this.fish,
			apiKey: this.config.apiKey,
		}) as {
			new (areaName: string): FrogArea;
		};
	}
}

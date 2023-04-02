import { Fish } from '@shark0f/fish';
import fetch from 'node-fetch';
import { LOGS_API_URL, LogType } from '.';

interface AreaConfig {
	fish: Fish;
	apiKey: string;
}

/**
 * @example
 * ```typescript
 * const project = new Project(...);
 * const log = new project.logs.Area('sign-up');
 * ```
 */
export class Area {
	private readonly config: AreaConfig;
	private readonly name: string;

	constructor(config: AreaConfig, name: string) {
		this.config = config;
		this.name = name;
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

		await fetch(LOGS_API_URL, {
			method: 'post',
			headers: {
				'X-API-Key': this.config.apiKey,
			},
			body: JSON.stringify({ area, content, type }),
		});
	}

	public async info(...pieces: unknown[]) {
		return await this.send({
			area: this.name,
			content: this.joinPieces(pieces),
			type: LogType.Info,
		});
	}

	public async warning(...pieces: unknown[]) {
		return await this.send({
			area: this.name,
			content: this.joinPieces(pieces),
			type: LogType.Warning,
		});
	}

	public async error(...pieces: unknown[]) {
		return await this.send({
			area: this.name,
			content: this.joinPieces(pieces),
			type: LogType.Error,
		});
	}
}

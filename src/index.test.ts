import { expect, test } from 'vitest';
import { Project } from '.';

test('Can create project and access features', () => {
	const project = new Project({
		apiKey: 'test',
		password: 'test',
	});

	expect(project.logs);
});

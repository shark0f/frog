# @shark0f/frog

The shark0.com SDK for Node.js.

## Usage

```typescript
/**
 * apiKey: string;
 * The key used to identify your project.
 * You can find this key in the project settings.
 *
 * password: string;
 * The password used for the encryption.
 */
const project = new Project({ apiKey: 'abc...', password: 'abc...' });
const log = new project.logs.Area('sign_up');

try {
	await insertUserIntoDatabase(user);
	log.info('A new user signed up! Their email is', user.email);
} catch (error) {
	log.error('An error occured :(', error);
}
```

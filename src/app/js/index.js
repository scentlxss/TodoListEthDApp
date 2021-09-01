import $ from 'jquery';
import App from './lib/app';

$(() => {
	const app = new App();
	app.setup()
		.then(() => {
			return app.init();
		})
		.then(() => {
			console.log('ToDo list Dapp loaded');
		})
		.catch((error) => {
			console.error('something went wrong');
		});
});

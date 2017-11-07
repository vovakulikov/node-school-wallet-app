module.exports = {
	apps: [
		{
			name: 'node-school-app',
			script: 'source/app.js',
			env: {
				NODE_PATH: '.'
			},
			env_development: {
				NODE_ENV: 'development'
			},
			env_production: {
				NODE_ENV: 'production'
			}
		},
		{
			name: 'node-school-task',
			script: 'source/tasksExecutor.js',
			env: {
				NODE_PATH: '.'
			}
		},
		{
			name: 'node-school-bot',
			script: 'source/telegram-bot/app.js',
			env: {
				NODE_PATH: '.'
			}
		}
	]
};

const production = process.env.NODE_ENV === 'production';

module.exports = {
  apps: [
    {
      name: 'app',
      script: 'app.mjs',
      watch: false,
      exec_mode: 'cluster',
      source_map_support: false,
      instances: production ? 'max' : 1,
      wait_ready: true,
      listen_timeout: 2000,
      merge_logs: true,
      ignore_watch: ['logs', 'node_modules', '.pm2', '.npm'],
      env_production: {
        NODE_ENV: 'production',
      },
      env_development: {
        NODE_ENV: 'development',
      },
    },
    {
      name: 'cron',
      script: 'cron.mjs',
      watch: false,
      source_map_support: false,
      exec_mode: 'fork',
      instances: 1,
      merge_logs: true,
      listen_timeout: 2000,
      cron_restart: '1 0 * * *',
      ignore_watch: ['logs', 'node_modules', '.pm2', '.npm'],
      env_production: {
        NODE_ENV: 'production',
      },
      env_development: {
        NODE_ENV: 'development',
      },
    },
  ],
};

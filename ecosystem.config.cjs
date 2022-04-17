module.exports = {
  apps: [
    {
      name: 'app',
      script: 'app.mjs',
      watch: false,
      exec_mode: 'cluster',
      source_map_support: false,
      instances: 'max',
      wait_ready: true,
      listen_timeout: 5000,
      merge_logs: true,
      env: {
        NODE_ENV: 'production',
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
      listen_timeout: 5000,
      cron_restart: '1 0 * * *',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};

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
  ],
};

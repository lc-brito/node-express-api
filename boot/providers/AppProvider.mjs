import express from 'express';

export default {
  boot: (app) => {
    app.enable('trust proxy');
    app.set('view engine', 'pug');
    app.use('/assets', express.static('resources/assets'));
    app.use(express.urlencoded({ limit: '1mb', extended: true }));
    app.use(express.json({ limit: '1mb' }));
  },
};

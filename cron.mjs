import dotenv from 'dotenv/config';

import express from 'express';
import cron from './boot/cron.mjs';

cron(
  express(),
);

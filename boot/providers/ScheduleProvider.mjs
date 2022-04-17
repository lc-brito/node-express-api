import { CronJob } from 'cron';
import Application from '../../config/app.mjs';

function schedule(job) {
  const onTick = (onCompleteCallback) => {
    try {
      job.onStartCallback()();
      job.handle()();
      onCompleteCallback();
    } catch (error) {
      throw new Error(`Error at running task ${job.name}. ${error.message}`);
    }
  };

  try {
    const cronJob = new CronJob(
      job.executionTime,
      onTick,
      job.onCompleteCallback(),
      false,
      Application.timezone,
    );

    cronJob.start();
  } catch (error) {
    throw new Error(`Error at scheduling task ${job.name}. ${error.message}`);
  }

  console.info(`Task scheduled: ${job.name}`);
}

export default {
  boot: (app) => {
    app.locals.schedule = schedule;
  },
};

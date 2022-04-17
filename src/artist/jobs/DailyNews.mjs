import Job from '../../../adapters/job/Job.js';

class DailyNews extends Job {
  constructor(executionTime) {
    super(
      'Notify fans about what their favorite artists are doing',
      executionTime,
    );
  }

  handle() {
    return () => {
      console.log('Notifying fans...');
    };
  }
}

export default DailyNews;

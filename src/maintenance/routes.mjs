import { Router } from 'express';

const router = Router();

router.route('/healthcheck')
  .get((request, response) => response.json({ status: 'healthy' }));

router.all('*', (request, response) => {
  response.status(400).json({
    message: 'Whoops, wrong way.',
  });
});

export default router;

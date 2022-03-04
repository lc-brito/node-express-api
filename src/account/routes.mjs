import { Router } from 'express';
import validateToken from '../auth/middleware/validateToken.mjs';

import * as AccountController from './controllers/AccountController.mjs';

const router = Router();

router.route('/v1/account').get(validateToken, AccountController.index);
router.route('/v1/account/:id').get(validateToken, AccountController.show);
router.route('/v1/account').post(AccountController.store);
router.route('/v1/account/:id').delete(validateToken, AccountController.remove);

export default router;

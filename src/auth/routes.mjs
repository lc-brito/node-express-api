import { Router } from 'express';

import * as AuthenticateController from './controllers/AuthenticateController.mjs';
import * as ChangePasswordController from './controllers/ChangePasswordController.mjs';
import * as RequestChangePasswordController from './controllers/RequestChangePasswordController.mjs';
import * as RefreshTokenController from './controllers/RefreshTokenController.mjs';

const router = Router();

router.route('/v1/auth/authenticate').post(AuthenticateController.authenticate);
router.route('/v1/auth/logout').post(AuthenticateController.logout);
router.route('/v1/auth/change-password').put(ChangePasswordController.change);
router.route('/v1/auth/request-change-password').post(RequestChangePasswordController.requestChange);
router.route('/v1/auth/refresh-token').post(RefreshTokenController.refresh);

export default router;

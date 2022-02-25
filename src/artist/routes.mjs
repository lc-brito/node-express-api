import { Router } from 'express';

import * as ArtistController from './controllers/ArtistController.mjs';
import * as AlbumController from './controllers/AlbumController.mjs';

const router = Router();

router.route('/v1/artists').get(ArtistController.index);
router.route('/v1/artists/search').get(ArtistController.search);
router.route('/v1/artists/:id').get(ArtistController.show);
router.route('/v1/artists').post(ArtistController.store);
router.route('/v1/artists/:id').put(ArtistController.update);

router.route('/v1/artists/:id').delete(ArtistController.remove);
router.route('/v1/artists/:artist/albums').get(AlbumController.index);
router.route('/v1/artists/:artist/albums/search').get(AlbumController.search);
router.route('/v1/artists/:artist/albums/:id').get(AlbumController.show);
router.route('/v1/artists/:artist/albums').post(AlbumController.store);
router.route('/v1/artists/:artist/albums/:id').put(AlbumController.update);

router.route('/v1/artists/:artist/albums/:id').delete(AlbumController.remove);

export default router;

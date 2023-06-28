import { Router } from 'express'
import { getStreamers, getStreamerById, createStreamer, updateStreamer } from '../controllers/streamers.controller.js'
import { streamerMiddleware } from '../helpers/streamers.middlewares.js';
import { schemaUpdateStreamer, schemaCreateStreamer } from '../helpers/streamers.schemas.js';

const router = Router();

router.route('/')
    .get(getStreamers)
    .post(streamerMiddleware(schemaCreateStreamer), createStreamer)

router.route('/:id')
    .get(getStreamerById)
    
router.route('/:id/vote')
    .put(streamerMiddleware(schemaUpdateStreamer), updateStreamer)

export default router
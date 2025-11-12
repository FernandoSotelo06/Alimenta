import Router from 'express';

import { likeRecipe } from '../controllers/likeController.js';

const router = Router()

router.post('/', likeRecipe)

export default router
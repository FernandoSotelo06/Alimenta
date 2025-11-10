import Router from 'express';

import {getAllIngredients} from '../controllers/ingredients.controllers.js'

const router = Router()

router.get('/ingredients', getAllIngredients)

export default router
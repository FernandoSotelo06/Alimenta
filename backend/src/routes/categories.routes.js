import { Router } from "express";

import { 
    getAllCategories,
    getCategoriesWithIngredients
} from "../controllers/categories.controllers.js";

const router = Router()

router.get('/categories', getAllCategories)
router.get('/categories-ingredients', getCategoriesWithIngredients)

export default router
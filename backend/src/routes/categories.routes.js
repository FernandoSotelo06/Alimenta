import { Router } from "express";

import { 
    getAllCategories 
} from "../controllers/categories.controllers.js";

const router = Router()

router.get('/categories', getAllCategories)

export default router
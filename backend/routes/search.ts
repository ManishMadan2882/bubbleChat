import { searchUsers } from "../controllers/search";
import express from 'express'
const router = express.Router();
router.get('/',searchUsers) //pass query as /?username='johndoe'
export default router
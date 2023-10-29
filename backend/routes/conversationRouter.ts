import express from 'express'
import authenticateToken from '../middleware/verify';
import { createConversation, getConversation, getEndToEndConversation } from '../controllers/conversation';
const router= express.Router()

router.route('/create').post(authenticateToken,createConversation)
router.route('/').get(authenticateToken,getConversation)
router.route('/find/:firstUserId/:secondUserId').get(authenticateToken,getEndToEndConversation)
export default router
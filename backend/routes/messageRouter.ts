import express from 'express'
import authenticateToken from '../middleware/verify';
import { addMessage, getAllConversation,getConversation } from '../controllers/messages';

const router= express.Router()

router.route('/add').post(authenticateToken,addMessage)
router.route('/').get(authenticateToken,getAllConversation)
router.route('/:receiverId').get(authenticateToken,getConversation)

export default router
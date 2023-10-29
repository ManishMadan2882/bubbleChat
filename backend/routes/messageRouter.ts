import express from 'express'
import authenticateToken from '../middleware/verify';
import { addMessage, getMessage } from '../controllers/messages';

const router= express.Router()

router.route('/add').post(authenticateToken,addMessage)

router.route('/:conversationId').get(authenticateToken,getMessage)

export default router
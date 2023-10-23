import { Router } from 'express'
import { decodeUserFromToken } from '../middleware/auth.js'
import * as chatCtrl from '../controllers/chats.js'


const router = Router()

/*---------- Public Routes ----------*/
router.get('/chats/:chatId')

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/chats/:chatId', chatCtrl.createChat)
router.post('/chats/:chatId/messages', chatCtrl.addMessageToChat)


export { router }
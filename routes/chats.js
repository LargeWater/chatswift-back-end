import { Router } from 'express'
import { decodeUserFromToken } from '../middleware/auth.js'


const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post()


export { router }
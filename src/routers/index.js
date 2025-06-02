import { Router } from 'express';
import authRouter from './auth.js';
import contactsRouter from './contacts.js';
import { auth } from '../middlewares/auth.js';
const router = Router();
router.use('/auth', authRouter);
router.use('/contacts', auth, contactsRouter);

export default router;

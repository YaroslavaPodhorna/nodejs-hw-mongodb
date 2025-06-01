import { Router } from 'express';
import authRouter from './auth.js';
import contactsRouter from './contacts.js';
import { auth } from '../middlewares/auth.js';
const router = Router();
router.use('/api/auth', authRouter);
router.use('/api/contacts', auth, contactsRouter);

export default router;

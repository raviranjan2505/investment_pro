import express from 'express';
import * as cryptoController from '../controllers/cryptoController.js';
import asyncHandler from '../utils/asyncHandler.js';
import { requireAuth } from '../middleware/auth.js';
import { sensitiveLimiter } from '../middleware/rateLimiters.js';

const router = express.Router();

router.post('/create-payment', requireAuth, sensitiveLimiter, asyncHandler(cryptoController.createPayment));
router.post('/webhook', sensitiveLimiter, asyncHandler(cryptoController.webhook));

export default router;

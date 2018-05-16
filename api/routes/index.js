import { Router } from 'express';

import productRouter from './product';
import userRouter from './user';

const router = Router();

router.use('/products', productRouter);
router.use('/users', userRouter);

router.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

export default router;

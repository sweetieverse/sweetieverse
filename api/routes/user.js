import { Router } from 'express';

import { UserController } from '../controllers';

const router = Router();

router.post('/:userId/purchases',
  UserController.savePurchase,
);

export default router;

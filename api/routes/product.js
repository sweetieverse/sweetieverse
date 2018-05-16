import { Router } from 'express';

import { ProductController } from '../controllers';

const router = Router();

router.get('/:productId',
  ProductController.getProduct,
);

export default router;

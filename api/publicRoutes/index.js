import { Router } from 'express';

import { UserController } from '../controllers';

const router = Router();

router.get('/:userId',
  UserController.publicGetUser,
);

router.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

export default router;

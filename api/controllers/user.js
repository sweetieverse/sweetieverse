import path from 'path';

import { SuccessResponse } from '../utils';
import { FirebaseService } from '../services';

/* eslint-disable import/no-dynamic-require */
// const config = require(path.resolve(__dirname, '../../sweetiebird'));
/* eslint-enable import/no-dynamic-require */

class UserController {
  // public routes

  static async publicGetUser(req, res) {
    const { userId } = req.params;
    const purchases = await FirebaseService.getUserPurchases(userId);
    SuccessResponse(res, purchases);
  }

  // api routes

  static async savePurchase(req, res) {
    const { userId } = req.params;
    const { purchase, product, guid } = req.body;

    await FirebaseService.saveUserPurchase(userId, purchase, product, guid);

    return SuccessResponse(res, { status: 'SUCCESS' });
  }
}

export default UserController;

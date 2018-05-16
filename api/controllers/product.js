import { SuccessResponse } from '../utils';
import { ProductService } from '../services';

class ProductController {
  static async getProduct(req, res) {
    const { productId } = req.params;
    const prodConfig = await ProductService.getProductConfig(productId);
    return SuccessResponse(res, prodConfig);
  }
}

export default ProductController;

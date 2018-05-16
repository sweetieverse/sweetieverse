import packageJson from 'package-json';

class ProductService {
  static async getProductConfig(productId) {
    const config = await packageJson(productId, {
      fullMetadata: true,
    });

    return config.sweetiebird ? config.sweetiebird : {};
  }
}

export default ProductService;

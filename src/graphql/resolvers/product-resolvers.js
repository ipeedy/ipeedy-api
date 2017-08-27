import Product from '../../models/Product';

export default {
  getProducts: () => Product.find({}),
};

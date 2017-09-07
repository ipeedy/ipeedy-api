import faker from 'faker/locale/vi';

import User from '../models/User';
import Product from '../models/Product';

const USERS_TOTAL = 5;
const PRODUCT_TOTAL = 4;

export default async () => {
  try {
    await User.remove();
    await Product.remove();

    await Array.from({ length: USERS_TOTAL }).forEach(async () => {
      const user = await User.create({
        name: faker.name.findName(),
        phone: faker.phone.phoneNumber().replace(/\s+/g, ''),
        email: faker.internet.email(),
        avatar: faker.internet.avatar(),
        authCode: {
          code: 1235,
          codeValid: true,
          generatedAt: new Date(),
        },
      });

      await Array.from({ length: PRODUCT_TOTAL }).forEach(async () => {
        await Product.create({
          user: user._id,
          name: faker.commerce.productName(),
          description: faker.lorem.sentences(4),
          images: [faker.image.food(), faker.image.food(), faker.image.food()],
          price: faker.commerce.price(),
          geometry: {
            coordinates: [faker.address.longitude(), faker.address.latitude()],
          },
          reviews: [
            {
              user: user._id,
              text: faker.lorem.sentences(2),
              rating: 4,
            },
            {
              user: user._id,
              text: faker.lorem.sentences(2),
              rating: 3,
            },
            {
              user: user._id,
              text: faker.lorem.sentences(2),
              rating: 5,
            },
          ],
          availableCount: faker.random.number(100),
          soldCount: faker.random.number(30),
        });
      });
    });
  } catch (error) {
    throw error;
  }
};

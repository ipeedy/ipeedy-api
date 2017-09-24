import faker from 'faker/locale/vi';

import User from '../models/User';
import Category from '../models/Category';
import Product from '../models/Product';

const USER_COORDINATE = [106.67903, 10.83651];
const USERS_TOTAL = 6;
const CATEGORIES_TOTAL = 2;
const PRODUCT_TOTAL = 3;

function generateRandomPoint(center, radius) {
  const x0 = center[0];
  const y0 = center[1];
  // Convert Radius from meters to degrees.
  const rd = radius / 111300;

  const u = Math.random();
  const v = Math.random();

  const w = rd * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  const x = w * Math.cos(t);
  const y = w * Math.sin(t);

  const xp = x / Math.cos(y0);

  // Resulting point.
  return [xp + x0, y + y0];
}

export default async () => {
  try {
    // await User.remove();
    await Product.remove();
    await Category.remove();

    await Array.from({ length: USERS_TOTAL }).forEach(async () => {
      const user = await User.create({
        name: faker.name.findName(),
        phone: faker.phone.phoneNumber().replace(/\s+/g, ''),
        email: faker.internet.email(),
        geometry: {
          coordinates: generateRandomPoint(USER_COORDINATE, 150),
        },
        avatar: faker.internet.avatar(),
        authCode: {
          code: 1235,
          codeValid: true,
          generatedAt: new Date(),
        },
      });

      await Array.from({ length: CATEGORIES_TOTAL }).forEach(async () => {
        const category = await Category.create({
          name: faker.commerce.department(),
          image: faker.image.food(),
          icon:
            'https://s3-ap-southeast-1.amazonaws.com/ipeedy/uploads/ipeedy.png',
          user: user._id,
        });

        await Array.from({ length: PRODUCT_TOTAL }).forEach(async () => {
          await Product.create({
            user: user._id,
            name: faker.commerce.productName(),
            category: category._id,
            description: faker.lorem.sentences(4),
            geometry: user.geometry,
            images: [
              faker.image.animals(),
              faker.image.nature(),
              faker.image.food(),
            ],
            price: faker.commerce.price(),
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
            orderRange: [1, 10],
            availableCount: faker.random.number(100),
            soldCount: faker.random.number(30),
          });
        });
      });
    });
  } catch (error) {
    throw error;
  }
};

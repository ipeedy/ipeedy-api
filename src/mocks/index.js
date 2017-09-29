import faker from 'faker/locale/vi';

import User from '../models/User';
import Product from '../models/Product';

const USER_COORDINATE = [106.629322, 10.853074];
const USERS_TOTAL = 6;
const CATEGORIES = [
  '59c8c7f1a197cd703073b8ce',
  '59c8c7dfa197cd703073b8cd',
  '59c8c7b7a197cd703073b8cc',
  '59c8c742a197cd703073b8cb',
  '59c8c499a197cd703073b8ca',
];
const TOPICS = ['food', 'drink', 'coffee', 'clothes', 'accessory'];

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
    // await Product.remove();
    // await Category.remove();

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

      const minRange = Math.floor(Math.random() * 10 + 1);
      const PRODUCT_TOTAL = Math.floor(Math.random() * 3 + 1);

      await Array.from({ length: PRODUCT_TOTAL }).forEach(async () => {
        await Product.create({
          user: user._id,
          name: faker.commerce.productName(),
          category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
          description: faker.lorem.sentences(4),
          geometry: user.geometry,
          images: [
            `https://source.unsplash.com/random/640x460/?${TOPICS[
              Math.floor(Math.random() * TOPICS.length)
            ]}`,
            `https://source.unsplash.com/random/640x460/?${TOPICS[
              Math.floor(Math.random() * TOPICS.length)
            ]}`,
            `https://source.unsplash.com/random/640x460/?${TOPICS[
              Math.floor(Math.random() * TOPICS.length)
            ]}`,
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
          orderRange: [minRange, minRange + 20],
          availableCount: faker.random.number(100),
          soldCount: faker.random.number(30),
        });
      });
    });
  } catch (error) {
    throw error;
  }
};

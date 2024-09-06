import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'dilaram',
      email: 'admin@dilaram.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'dummy',
      email: 'dummy@dummy.com',
      password: bcrypt.hashSync('abcde'),
    },
  ],
  products: [
    {
      // _id: 1,
      name: 'lorem ipsum text1',
      slug: 'lorem-ipsum-text1',
      category: 'Shirts',
      image: '/images/p1.jpg',
      price: 120,
      countInStock: 10,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality product',
    },
    {
      // _id: 2,
      name: 'lorem ipsum text2',
      slug: 'lorem-ipsum-text2',
      category: 'Shirts',
      image: '/images/p2.jpg',
      price: 120,
      countInStock: 0,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality product',
    },
    {
      // _id: 3,
      name: 'lorem ipsum text3',
      slug: 'lorem-ipsum-text3',
      category: 'Shirts',
      image: '/images/p3.jpg',
      price: 120,
      countInStock: 10,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality product',
    },
    {
      // _id: 4,
      name: 'lorem ipsum text4',
      slug: 'lorem-ipsum-text4',
      category: 'Shirts',
      image: '/images/p4.jpg',
      price: 120,
      countInStock: 10,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality product',
    },
  ],
};

export default data;

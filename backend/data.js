import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'kavita',
      email: 'sharma97kavita@gmail.com',
      password: bcrypt.hashSync('simplyClothesTest123@.com'),
      isAdmin: true,
    },
    {
      name: 'test',
      email: 'test@test.com',
      password: bcrypt.hashSync('test@test.com'),
    },
  ],
  products: [
    {
      name: 'Classic Checkered Shirt',
      slug: 'classic-checkered-shirt',
      category: 'Shirts',
      image: '/images/shirt-checkered.webp',
      price: 30,
      countInStock: 15,
      brand: "Levi's",
      rating: 4.7,
      numReviews: 25,
      description:
        'Stylish checkered shirt made from premium cotton, perfect for casual wear.',
    },
    {
      name: 'Slim Fit Chinos',
      slug: 'slim-fit-chinos',
      category: 'Pants',
      image: '/images/pants-chinos.webp',
      price: 40,
      countInStock: 20,
      brand: 'Dockers',
      rating: 4.6,
      numReviews: 18,
      description:
        'Comfortable slim fit chinos made from stretchable fabric, great for both casual and formal looks.',
    },
    {
      name: 'Leather Biker Jacket',
      slug: 'leather-biker-jacket',
      category: 'Jackets',
      image: '/images/jacket-leather.webp',
      price: 120,
      countInStock: 8,
      brand: 'Zara',
      rating: 4.8,
      numReviews: 30,
      description:
        'High-quality leather jacket with a sleek design, perfect for a bold, stylish look.',
    },
    {
      name: 'Navy Blue Dress Shirt',
      slug: 'navy-blue-dress-shirt',
      category: 'Shirts',
      image: '/images/shirt-navy.webp',
      price: 35,
      countInStock: 12,
      brand: 'Tommy Hilfiger',
      rating: 4.5,
      numReviews: 22,
      description:
        'Elegant navy blue dress shirt, ideal for business or formal occasions.',
    },
    {
      name: 'Grey Dress Trousers',
      slug: 'grey-dress-trousers',
      category: 'Pants',
      image: '/images/pants-grey.webp',
      price: 50,
      countInStock: 18,
      brand: 'H&M',
      rating: 4.4,
      numReviews: 15,
      description:
        'Modern fit grey dress trousers that pair perfectly with formal shirts for a professional look.',
    },
    {
      name: 'Denim Jacket',
      slug: 'denim-jacket',
      category: 'Jackets',
      image: '/images/jacket-denim.webp',
      price: 80,
      countInStock: 10,
      brand: 'Wrangler',
      rating: 4.6,
      numReviews: 28,
      description:
        'Classic denim jacket with a timeless style, great for casual everyday wear.',
    },
    {
      name: 'White Oxford Shirt',
      slug: 'white-oxford-shirt',
      category: 'Shirts',
      image: '/images/shirt-white.webp',
      price: 28,
      countInStock: 25,
      brand: 'Ralph Lauren',
      rating: 4.7,
      numReviews: 34,
      description:
        'Crisp white Oxford shirt that offers a perfect balance of smart-casual versatility.',
    },
    {
      name: 'Dark Blue Slim Jeans',
      slug: 'dark-blue-slim-jeans',
      category: 'Pants',
      image: '/images/pants-jeans.webp',
      price: 45,
      countInStock: 22,
      brand: 'Calvin Klein',
      rating: 4.8,
      numReviews: 40,
      description:
        'Slim fit dark blue jeans with a stylish and comfortable feel, suitable for casual wear.',
    },
    {
      name: 'Puffer Winter Jacket',
      slug: 'puffer-winter-jacket',
      category: 'Jackets',
      image: '/images/jacket-puffer.webp',
      price: 150,
      countInStock: 5,
      brand: 'The North Face',
      rating: 4.9,
      numReviews: 35,
      description:
        'Warm and durable puffer jacket, ideal for cold weather outdoor activities.',
    },
  ],
};

export default data;

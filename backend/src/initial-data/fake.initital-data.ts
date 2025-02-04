import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ProductService } from 'src/product/services/product.service';

@Injectable()
export class FakeInititalData implements OnApplicationBootstrap {
  private fakeProducts = [
    {
      name: 'Smartphone X100',
      description: 'High-end smartphone with cutting-edge features.',
      stock: 35,
      price: 899.99,
      imageUrl: '',
      category: { name: 'Eletrônicos' },
    },
    {
      name: 'Wireless Headphones Pro',
      description:
        'Noise-canceling wireless headphones with long battery life.',
      stock: 50,
      price: 199.99,
      imageUrl: '',
      category: { name: 'Eletrônicos' },
    },
    // {
    //   name: 'Gaming Laptop G200',
    //   description: 'High-performance laptop for gaming enthusiasts.',
    //   stock: 20,
    //   price: 1299.99,
    //   imageUrl: '',
    //   category: { name: 'Eletrônicos' },
    // },
    // {
    //   name: 'Mechanical Keyboard MK900',
    //   description: 'RGB mechanical keyboard with tactile switches.',
    //   stock: 100,
    //   price: 89.99,
    //   imageUrl: '',
    //   category: { name: 'Eletrônicos' },
    // },
    // {
    //   name: 'Ergonomic Office Chair',
    //   description: 'Comfortable office chair with lumbar support.',
    //   stock: 25,
    //   price: 259.99,
    //   imageUrl: '',
    //   category: { name: 'Mobília' },
    // },
    // {
    //   name: '4K UHD Smart TV',
    //   description: 'Large screen TV with vibrant colors and streaming apps.',
    //   stock: 15,
    //   price: 1099.99,
    //   imageUrl: '',
    //   category: { name: 'Eletrônicos' },
    // },
    // {
    //   name: 'Bluetooth Speaker',
    //   description: 'Portable speaker with powerful sound and water resistance.',
    //   stock: 60,
    //   price: 79.99,
    //   imageUrl: '',
    //   category: { name: 'Eletrônicos' },
    // },
    // {
    //   name: 'Running Shoes RX100',
    //   description: 'Lightweight and comfortable running shoes.',
    //   stock: 120,
    //   price: 99.99,
    //   imageUrl: '',
    //   category: { name: 'Roupas esportivas' },
    // },
    // {
    //   name: 'Water Bottle 1L',
    //   description: 'Reusable water bottle made from stainless steel.',
    //   stock: 200,
    //   price: 24.99,
    //   imageUrl: '',
    //   category: { name: 'Roupas esportivas' },
    // },
    // {
    //   name: 'Digital Camera XZ50',
    //   description: 'Compact digital camera with 20MP sensor.',
    //   stock: 10,
    //   price: 499.99,
    //   imageUrl: '',
    //   category: { name: 'Eletrônicos' },
    // },
    // {
    //   name: 'Coffee Maker Deluxe',
    //   description: 'Programmable coffee maker with a thermal carafe.',
    //   stock: 30,
    //   price: 149.99,
    //   imageUrl: '',
    //   category: { name: 'Eletrodomésticos de cozinha' },
    // },
    // {
    //   name: 'Electric Scooter',
    //   description: 'Eco-friendly electric scooter with long battery life.',
    //   stock: 8,
    //   price: 799.99,
    //   imageUrl: '',
    //   category: { name: 'Transporte' },
    // },
    // {
    //   name: 'Yoga Mat Pro',
    //   description: 'Non-slip yoga mat for all fitness levels.',
    //   stock: 150,
    //   price: 29.99,
    //   imageUrl: '',
    //   category: { name: 'Roupas esportivas' },
    // },
    // {
    //   name: 'Wireless Mouse M400',
    //   description: 'Ergonomic wireless mouse with fast response time.',
    //   stock: 90,
    //   price: 49.99,
    //   imageUrl: '',
    //   category: { name: 'Accessories' },
    // },
    // {
    //   name: 'Smartwatch Z10',
    //   description: 'Stylish smartwatch with fitness tracking features.',
    //   stock: 40,
    //   price: 199.99,
    //   imageUrl: '',
    //   category: { name: 'Eletrônicos' },
    // },
  ];

  constructor(private productService: ProductService) {}

  async onApplicationBootstrap() {
    await this.productFakeData();
  }

  async productFakeData() {
    for (const product of this.fakeProducts) {
      try {
        await this.productService.addProduct({
          name: product.name,
          price: product.price,
          stock: product.stock,
          imageUrl: '',
          description: product.description,
          categoryName: product.category.name,
        });
      } catch {
        /* empty */
      }
    }
  }
}

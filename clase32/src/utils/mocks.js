
export const mockingProduct = async () => {
    const product = {
      id:faker.database.mongodbObjectId(),
      title: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      code: faker.random.numeric(5),
      price: faker.commerce.price(),
      status: faker.datatype.boolean(),
      stock: faker.random.numeric(2),
      category: faker.commerce.department(),
      thumbnail: faker.image.people(),
    };
    return product;
  };
  
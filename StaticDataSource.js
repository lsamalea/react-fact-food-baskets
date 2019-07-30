import * as R from 'ramda';

const map = R.addIndex(R.map)
const flatmap = R.chain;
const enhanceWithId = (id, val) => ({ ...val, id });
const forEach = R.forEach;
const pipe = R.pipe;

const plainData = {
  categories: [
    {
      categoryName: 'bread',
      products: [
        { productName: 'bread 1' },
        { productName: 'bread 2' },
        { productName: 'bread 3' },
        { productName: 'bread 4' },
        { productName: 'bread 5' },
        { productName: 'bread 6' },
        { productName: 'bread 7' },
      ]
    },
    {
      categoryName: 'butter',
      products: [
        { productName: 'butter 1' },
        { productName: 'butter 2' },
        { productName: 'butter 3' },
        { productName: 'butter 4' },
      ]
    },
    {
      categoryName: 'jam',
      products: [
        { productName: 'jam 1' },
        { productName: 'jam 2' },
        { productName: 'jam 3' },
        { productName: 'jam 4' },
        { productName: 'jam 5' },
        { productName: 'jam 6' },
        { productName: 'jam 7' },
      ]
    },
  ]
};



export class StaticDataSource {
  constructor() {
    const enhanceCategoryWithId = R.flip(enhanceWithId);
    const enhanceProductWithId = R.flip(enhanceWithId);
    const enhanceProductWithCategoryId = R.curry((categoryId, val) => ({ ...val, categoryId }));
    const enhanceCategoriesAndSubProductsWithIds = map(
      pipe(
        enhanceCategoryWithId,
        (category) => {
          const enhanceSubProductsWithIds = map(
            pipe(
              enhanceProductWithId,
              enhanceProductWithCategoryId(category.id)
            )
          );
          return {
            ...category,
            products: enhanceSubProductsWithIds(category.products)
          }
        }
      )
    );
    this.data = {
      categories: enhanceCategoriesAndSubProductsWithIds(plainData.categories)
    };
  }

  getData() {
    return this.data;
  }

  getProducts() {
    const pluckProducts = flatmap((category) => category.products);
    return pluckProducts(this.data.categories);
  }
}
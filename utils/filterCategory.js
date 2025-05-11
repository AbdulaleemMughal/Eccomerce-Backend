const filterCategory = (products, cate) => {
  const filterData = products.filter((product) => {
    return (
      product.category &&
      product.category.trim().toLowerCase() === cate.trim().toLowerCase()
    );
  });

  if (filterData.length === 0) {
    throw new Error("No Product Found");
  }

  return filterData;
};

module.exports = { filterCategory };

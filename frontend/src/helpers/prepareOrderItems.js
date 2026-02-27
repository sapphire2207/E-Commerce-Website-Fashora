// utils/prepareOrderItems.js
export const prepareOrderItems = (cartItems, products) => {
  const orderItems = [];

  for (const productId in cartItems) {
    for (const size in cartItems[productId]) {
      const quantity = cartItems[productId][size];

      if (quantity > 0) {
        const productInfo = products.find(p => p._id === productId);

        if (productInfo) {
          orderItems.push({
            _id: productInfo._id,
            name: productInfo.name,
            price: productInfo.price,
            image: productInfo.images?.[0]?.url,
            size,
            quantity,
          });
        }
      }
    }
  }

  return orderItems;
};

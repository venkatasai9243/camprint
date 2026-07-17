import { Cart } from '../types';

export const MOCK_CART: Cart = {
  cartId: "cart_888",
  items: [
    {
      id: "item_001",
      serviceType: "manual",
      title: "Data Structures & Algorithms Lab Manual",
      subtitle: "B.Tech IT - Year 2, Semester 3",
      quantity: 1,
      printOptions: {
        copies: 1,
        color: false,
        singleSided: false,
        bindingType: "spiral",
        paperSize: "a4"
      },
      priceBreakdown: {
        base: 0,
        printing: 45,
        binding: 30,
        color: 0,
        total: 75
      },
      estimatedDelivery: "Tomorrow, 2:00 PM",
      status: "in_cart",
      editable: true,
      removable: true
    }
  ],
  summary: {
    subtotal: 75,
    discount: 0,
    tax: 3.75, // 5% GST
    total: 78.75
  },
  deliveryInfo: {
    location: "College Campus",
    block: "Block A",
    floor: "3rd Floor",
    classroom: "Lab 304"
  }
};

import { useOrderContext } from '../providers/OrderProvider';

export const useOrder = () => {
  const { order, isLoading, error, fetchOrder, cancelOrder } = useOrderContext();
  return { order, isLoading, error, fetchOrder, cancelOrder };
};

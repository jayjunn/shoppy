import { useMutation, useQuery, useQueryClient } from "react-query";
import { getCart, addOrUpdateToCart, removeCartItem } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";

export default function useCarts() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();

  const cartQuery = useQuery(["carts", uid], () => getCart(uid), {
    staleTime: 1000 * 60,
  });

  const addOrUpdateCart = useMutation(
    ({ product }) => addOrUpdateToCart(uid, product),
    {
      onSuccess: () => queryClient.invalidateQueries(["carts"], uid),
    }
  );

  const deleteFromCart = useMutation(({ id }) => removeCartItem(uid, id), {
    onSuccess: () => queryClient.invalidateQueries(["carts"], uid),
  });
  return { cartQuery, addOrUpdateCart, deleteFromCart };
}

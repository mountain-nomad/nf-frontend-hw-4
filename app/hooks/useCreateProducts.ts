import { axiosInstance } from "../lib/axiosInstance";
import { Product } from "../types/product";
import { useMutation, useQueryClient, UseMutationResult } from "react-query";

interface ProductData {
    title: string,
    price: string,
    category: string,
    description: string,
    image: string
}

const createProduct = async (ProductData: ProductData): Promise<Product> => {
    const res = await axiosInstance.post<Product>('product', ProductData);
    return res.data;
}

export default function useCreatePost() {
    const queryClient = useQueryClient();

    return useMutation<Product, Error, ProductData>({
      mutationFn: createProduct,
      onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['product']});
      },
  });
}
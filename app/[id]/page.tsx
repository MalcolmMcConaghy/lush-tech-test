import { getClient } from "@/lib/client";
import { fetchProduct, FetchProductResponse } from "@/queries/fetchProduct";
import Image from "next/image";

export default async function Product({ params }: { params: { id: string } }) {
  const { data } = await getClient().query<FetchProductResponse>({
    query: fetchProduct(params.id),
  });

  const { id, name, media } = data.products.edges[0].node;

  return (
    <>
      <Image width={100} height={100} src={media[0].url} alt={media[0].alt} />
      <Image width={100} height={100} src={media[1].url} alt={media[1].alt} />
    </>
  );
}

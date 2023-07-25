import { Carousel } from "@/components/ui/carousel";
import { getClient } from "@/lib/client";
import { fetchProduct, FetchProductResponse } from "@/queries/fetchProduct";
import Image from "next/image";

export default async function Product({ params }: { params: { id: string } }) {
  const { data } = await getClient().query<FetchProductResponse>({
    query: fetchProduct(params.id),
  });

  const { id, name, media, description, pricing } = data.products.edges[0].node;

  const descriptionBlocks = JSON.parse(description).blocks;

  console.log(descriptionBlocks);

  return (
    <>
      <div className="lg:w-3/4 mx-auto">
        <Carousel>
          {media.map((image, i) => {
            return (
              <div className="relative h-64 flex-[0_0_100%]" key={i}>
                <Image
                  src={image.url}
                  fill
                  className="object-cover"
                  alt={image.alt}
                />
              </div>
            );
          })}
        </Carousel>
      </div>
      <div className="p-4">
        <div className="flex flex-col space-y-2">
          <div className="text-2xl font-semibold">{name}</div>
          <div className="text-xl">
            {Intl.NumberFormat("en-US", {
              style: "currency",
              currency: pricing.priceRangeUndiscounted.start.currency,
            }).format(pricing.priceRangeUndiscounted.start.gross.amount)}
          </div>
          {descriptionBlocks.map((block) => {
            const { id, data } = block;

            return (
              <div
                key={id}
                dangerouslySetInnerHTML={{ __html: data.text }}
                className="text-md"
              ></div>
            );
          })}
        </div>
      </div>
    </>
  );
}

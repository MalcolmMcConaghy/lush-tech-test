import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";
import { getClient } from "@/lib/client";
import { fetchProduct, FetchProductResponse } from "@/queries/fetchProduct";
import Image from "next/image";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";

interface Block {
  id: string;
  data: {
    text: string;
  };
}

export default async function Product({ params }: { params: { id: string } }) {
  const { data } = await getClient().query<FetchProductResponse>({
    query: fetchProduct(decodeURIComponent(params.id)),
  });

  const { id, name, media, description, pricing, rating } =
    data.products.edges[0].node;

  const descriptionBlocks = JSON.parse(description)?.blocks ?? [];

  return (
    <div className="lg:flex lg:p-4 xl:max-w-5xl xl:m-auto">
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
      <div className="p-4 lg:p-0 lg:pl-4 mb-[75px] xl:mb-0">
        <div className="flex flex-col space-y-2">
          <div className="text-2xl font-semibold">{name}</div>
          <div className="flex space-x-4 items-center">
            <div className="text-xl">
              {Intl.NumberFormat("en-US", {
                style: "currency",
                currency: pricing.priceRangeUndiscounted.start.currency,
              }).format(pricing.priceRangeUndiscounted.start.gross.amount)}
            </div>
            <div className="flex space-x-1">
              {[...Array(5)].map((star, i) => {
                const roundedRating = Math.round(rating);

                if (i + 1 <= roundedRating) return <StarFilledIcon key={i} />;
                return <StarIcon key={i} />;
              })}
            </div>
          </div>

          {descriptionBlocks.map((block: Block) => {
            const { id, data } = block;

            return (
              <div
                key={id}
                dangerouslySetInnerHTML={{ __html: data.text }}
                className="text-md"
              ></div>
            );
          })}

          <Button className="text-lg font-semibold px-8 w-3/4 bg-slate-950 max-w-xs hidden md:block">
            Add to cart
          </Button>
        </div>
      </div>
      <div className="p-4 flex justify-center border-t-2 fixed bottom-0 w-full bg-white md:hidden">
        <Button className="text-lg font-semibold px-8 w-3/4 bg-slate-950 max-w-xs">
          Add to cart
        </Button>
      </div>
    </div>
  );
}

import { getClient } from "@/lib/client";
import { fetchProducts, FetchProductsResponse } from "@/queries/fetchProducts";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const { data } = await getClient().query<FetchProductsResponse>({
    query: fetchProducts,
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 lg:p-24">
      <div className="flex flex-col space-y-4 items-center">
        <div className="text-2xl font-semibold">Products</div>
        <div className="grid grid-cols-2 gap-4">
          {data.products.edges.map((product) => {
            const { id, name, thumbnail, pricing } = product.node;
            if (!thumbnail?.url) return;
            return (
              <Link key={id} href={`/${id}`}>
                <Card className="p-4">
                  <div className="flex justify-center items-center mb-2">
                    <Image
                      width={100}
                      height={100}
                      src={thumbnail?.url ?? ""}
                      alt={thumbnail?.alt ?? ""}
                    />
                  </div>
                  <CardTitle className="text-sm flex">{name}</CardTitle>
                  <CardDescription>
                    From{" "}
                    {Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: pricing.priceRangeUndiscounted.start.currency,
                    }).format(
                      pricing.priceRangeUndiscounted.start.gross.amount
                    )}
                  </CardDescription>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}

"use client";

import { fetchProducts, FetchProductsResponse } from "@/queries/fetchProducts";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import useDebounce from "@/lib/useDebounce";

export default function Home() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const { data, loading, error, fetchMore } = useQuery<FetchProductsResponse>(
    fetchProducts,
    {
      variables: {
        first: 16,
        last: null,
        before: null,
        after: null,
        search: "",
      },
    }
  );

  useEffect(() => {
    fetchMore({
      variables: { search: debouncedSearch },
      updateQuery: (previousQueryResult, { fetchMoreResult }) => {
        return fetchMoreResult;
      },
    });
  }, [debouncedSearch]);

  if (loading)
    return (
      <div className="text-2xl font-semibold text-center mt-4">Loading...</div>
    );

  if (error)
    return (
      <div className="text-2xl font-semibold text-center mt-4">
        {error.message}
      </div>
    );

  if (!data)
    return (
      <div className="text-2xl font-semibold text-center mt-4">
        No products found
      </div>
    );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 max-w-[800px] m-auto">
      <div className="flex flex-col space-y-4 items-center min-w-full sm:min-w-[400px] md:min-w-[750px]">
        <div className="text-2xl font-semibold">Products</div>
        <Input
          type="text"
          placeholder="Search name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {data.products.edges.length ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
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
        ) : (
          <>
            <div className="text-2xl font-semibold text-center mt-4">
              {`No products found for ${debouncedSearch}`}
            </div>
          </>
        )}
        <div className="flex justify-center w-full space-x-2">
          <Button
            disabled={!data.products.pageInfo.hasPreviousPage}
            className="bg-black min-w-[100px]"
            onClick={() => {
              const { startCursor } = data.products.pageInfo;

              fetchMore({
                variables: { first: null, last: 16, before: startCursor },
                updateQuery: (previousQueryResult, { fetchMoreResult }) => {
                  return fetchMoreResult;
                },
              });
            }}
          >
            Previous
          </Button>
          <Button
            disabled={!data.products.pageInfo.hasNextPage}
            className="bg-black min-w-[100px]"
            onClick={() => {
              const { endCursor } = data.products.pageInfo;

              fetchMore({
                variables: { after: endCursor },
                updateQuery: (previousQueryResult, { fetchMoreResult }) => {
                  return fetchMoreResult;
                },
              });
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </main>
  );
}

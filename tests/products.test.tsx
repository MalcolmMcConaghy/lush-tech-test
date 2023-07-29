import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import Home from "../app/page";
import { fetchProducts } from "@/queries/fetchProducts";

const mocks: any[] = [
  {
    request: {
      query: fetchProducts,
      variables: {
        first: 16,
        last: null,
        before: null,
        after: null,
        search: "",
      },
    },
    result: {
      data: {
        products: {
          pageInfo: {
            hasNextPage: true,
            hasPreviousPage: false,
            startCursor: "WyIxMDAwLWtpc3Nlcy1kZWVwIl0=",
            endCursor: "WyIxMDAwLWtpc3Nlcy1kZWVwLXBlcmZ1bWUiXQ==",
          },
          edges: [
            {
              node: {
                id: "UHJvZHVjdDoyMTc1",
                name: "1000 Kisses Deep",
                pricing: {
                  priceRangeUndiscounted: {
                    start: {
                      currency: "GBP",
                      gross: {
                        amount: 10,
                      },
                    },
                  },
                },
                thumbnail: {
                  url: "https://unicorn-staging.eu.saleor.cloud/media/thumbnails/products/1000_kisses_deep_solid_perfume_2020_bbd63475_thumbnail_256.png",
                  alt: "",
                },
              },
            },
            {
              node: {
                id: "UHJvZHVjdDo4MjM=",
                name: "1000 Kisses Deep",
                pricing: {
                  priceRangeUndiscounted: {
                    start: {
                      currency: "GBP",
                      gross: {
                        amount: 55,
                      },
                    },
                  },
                },
                thumbnail: {
                  url: "https://unicorn-staging.eu.saleor.cloud/media/thumbnails/products/1000_kisses_deep_the_perfume_library_100ml_perfume_2021_thumbnail_256.png",
                  alt: "A glass perfume bottle filled with amber liquid. A black label reads 'The Perfume Library' and '1000 Kisses Deep'.",
                },
              },
            },
          ],
        },
      },
    },
  },
];

it("renders without error", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Home />
    </MockedProvider>
  );
  expect(await screen.findByText("Products")).toBeInTheDocument();
});

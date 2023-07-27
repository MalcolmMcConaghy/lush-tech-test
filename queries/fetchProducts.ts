import { gql } from "@apollo/client";

export interface FetchProductsResponse {
  products: {
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string;
      endCursor: string;
    };
    edges: {
      node: {
        id: number;
        name: string;
        pricing: {
          priceRangeUndiscounted: {
            start: {
              currency: string;
              gross: {
                amount: number;
              };
            };
          };
        };
        thumbnail: {
          url: string;
          alt: string;
        };
      };
    }[];
  };
}

export const fetchProducts = gql`
  query fetchProducts(
    $first: Int
    $last: Int
    $before: String
    $after: String
    $search: String
  ) {
    products(
      channel: "uk"
      first: $first
      last: $last
      before: $before
      after: $after
      filter: { search: $search }
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          name
          pricing {
            priceRangeUndiscounted {
              start {
                currency
                gross {
                  amount
                }
              }
            }
          }
          thumbnail {
            url
            alt
          }
        }
      }
    }
  }
`;

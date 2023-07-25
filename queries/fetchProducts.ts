import { gql } from "@apollo/client";

export interface FetchProductsResponse {
  products: {
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
  query {
    products(channel: "uk", first: 20) {
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

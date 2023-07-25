import { gql } from "@apollo/client";

export interface FetchProductResponse {
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
        media: {
          url: string;
          alt: string;
        }[];
      };
    }[];
  };
}

export const fetchProduct = (id: string) => gql`
  query {
    products(filter: {ids: ["${id}"]}, channel: "uk", first: 20) {
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
          media {
            url
            alt
          }
        }
      }
    }
  }
`;

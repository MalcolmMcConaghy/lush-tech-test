import { gql } from "@apollo/client";

export interface FetchProductResponse {
  products: {
    edges: {
      node: {
        id: number;
        name: string;
        description: string;
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
        rating: number;
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
          description
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
          rating
          media {
            url
            alt
          }
        }
      }
    }
  }
`;

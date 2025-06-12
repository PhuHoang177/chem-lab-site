import { TypedObject } from "@portabletext/types";

export type CardType = {
  page: string;
  order: number;
  slug: {
    current: string;
  };
  title: string;
  content: TypedObject[];
  image?: {
    asset?: {
      url?: string;
    };
  };
  link?: string;
  linkLabel?: string;
};

export const CARD_QUERY = `
  *[_type == "cardType" && page == $page] | order(order asc){
    page,
    order,
    slug,
    title,
    content,
    image{
      asset->{url}
    },
    link,
    linkLabel,
  }
`;

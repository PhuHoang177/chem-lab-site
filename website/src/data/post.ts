import type { TypedObject } from "@portabletext/types";

export type PostType = {
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
  updatedAt: string;
};

// Query to get all posts for a given page, ordered by "order"
export const POSTS_QUERY = `
  *[_type == "postType" && page == $page] | order(order asc){
    page,
    order,
    slug,
    title,
    content,
    image{
      asset->{url}
    },
    updatedAt,
  }
`;

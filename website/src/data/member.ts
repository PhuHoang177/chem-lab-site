import { TypedObject } from "@portabletext/types";

export type MemberType = {
  page: string;
  order: number;
  slug: {
    current: string;
  };
  title: string;
  role: string;
  content: TypedObject[];
  image?: {
    asset?: {
      url?: string;
    };
  };
};

export const MEMBER_QUERY = `
  *[_type == "memberType" && page == $page] | order(order asc){
    page,
    order,
    slug,
    title,
    role,
    content,
    image{
      asset->{url}
    },
  }
`;

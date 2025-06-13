import type { TypedObject } from "@portabletext/types";

export type MemberType = {
  order: number;
  title: string;
  content?: TypedObject[];
  image?: { asset: { url: string } };
};

export type MembersType = {
  order: number;
  title: string;
  membersList?: MemberType[];
};

export const MEMBERS_QUERY = `
  *[_type == "membersType"] | order(order asc) {
    order,
    title,
    membersList[] | order(order asc) {
      order,
      title,
      content,
      image {
        asset->{url}
      }
    }
  }
`;

import type { TypedObject } from "@portabletext/types";

export type FooterType = {
  title: string;
  content: TypedObject[];
  socials: {
    link: string;
    icon: { asset: { url: string } };
  }[];
  partner: { asset: { url: string } };
  partnerLink: string;
  partnerRelationship: string;
};

export const FOOTER_QUERY = `
*[_type == "footerType"][0]{
  title,
  content,
  socials[]{
    link,
    icon{
      asset->{url}
    }
  },
  partner{
    asset->{url}
  },
  partnerLink,
  partnerRelationship
}`;

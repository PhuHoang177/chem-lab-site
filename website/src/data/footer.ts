import type { TypedObject } from "@portabletext/types";

export type FooterType = {
  page: string;
  title: string;
  info: TypedObject[];
  socialsMedia: {
    link: string;
    icon: { asset: { url: string } };
  }[];
  partner: { asset: { url: string } };
  partnerLink: string;
  partnerRelationship: string;
};

export const FOOTER_QUERY = `
*[_type == "footerType" && page == $page][0]{
  page,
  title,
  info,
  socialsMedia[]{
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

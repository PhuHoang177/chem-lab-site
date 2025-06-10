import type { TypedObject } from "@portabletext/types";

export type FooterType = {
  page: string;
  title: string;
  info: TypedObject[];
  socialsMedia: {
    label: string;
    link: string;
    icon: { asset: { url: string } };
  }[];
  partner: { asset: { url: string } };
  partnerLink: string;
  partnerRelationship: string;
};

export const SINGLE_FOOTER_QUERY = `
*[_type == "footerType" && page == $page][0]{
  page,
  title,
  info,
  socialsMedia[]{
    label,
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

export type HeaderType = {
  page: string;
  title: string;
  content?: string;
  image?: {
    asset?: {
      url?: string;
    };
  };
};

export const HEADER_QUERY = `
  *[_type == "headerType" && page == $page][0]{
    page,
    title,
    content,
    image{
      asset->{url}
    }
  }
`;

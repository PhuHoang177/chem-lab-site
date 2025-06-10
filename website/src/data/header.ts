export type HeaderType = {
  page: string;
  title: string;
  subtitle?: string;
  image?: {
    asset?: {
      url?: string;
    };
  };
};

// Query to get the header for a given page
export const SINGLE_HEADER_QUERY = `
  *[_type == "headerType" && page == $page][0]{
    page,
    title,
    subtitle,
    image{
      asset->{url}
    }
  }
`;

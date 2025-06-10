export type GoalType = {
  page: string;
  order: number;
  slug: {
    current: string;
  };
  title: string;
  description: string;
  icon: {
    asset?: {
      url?: string;
    };
  };
  link?: string;
  linkLabel?: string;
};

// Query to get all goals for a given page, ordered by "order"
export const GOALS_BY_PAGE_QUERY = `
  *[_type == "goalType" && page == $page] | order(order asc){
    page,
    order,
    slug,
    title,
    description,
    icon{
      asset->{url}
    },
    link,
    linkLabel
  }
`;

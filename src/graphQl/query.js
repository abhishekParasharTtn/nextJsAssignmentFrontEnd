export const queries = {
  getBlogsData: () => {
    return `query {
  blogs {
    data {
      id
      attributes {
        Title
        Summary
        Slug
        ComponentType
        Image {
          data {
            attributes {
              name
              alternativeText
              url
            }
          }
        }
      }
    }
  }
}
`;
  },
  getDataFromSlug: (slug) => {
    return `query {
  blogs(filters: { Slug: { eq: "${slug}" } }) {
    data {
      attributes {
        Title
        Summary
        Slug
        ComponentType
        Image {
          data {
            attributes {
              name
              alternativeText
              url
            }
          }
        }
      }
    }
  }
}
`;
  },
  deleteBlogById: () => {
    return `
  mutation DeleteBlog($id: ID!) {
    deleteBlog(id: $id) {
      data {
        id
      }
    }
  }
`;
  },
  EditBlogById: () => {
    return `mutation UpdateBlog($id: ID!, $data: BlogInput!) {
    updateBlog(id: $id, data: $data) {
      data {
        id
        attributes {
          Title
          Summary
        }
      }
    }
  }
`;
  },
};

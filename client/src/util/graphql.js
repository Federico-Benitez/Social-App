import gql from "graphql-tag";

export const FETCH_POSTS_QUERY = gql`
  {
    getAllPosts {
      id
      body
      username
      createdAt
      commentsCount
      comments {
        id
        createdAt
        username
        body
      }
      likesCount
      likes {
        id
        createdAt
        username
      }
    }
  }
`;

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

export const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likesCount
    }
  }
`;

export const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likesCount
      likes {
        username
      }
      commentsCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

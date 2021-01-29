const postsResolvers = require("./posts");
const usersResolvers = require("./users");
const commentsResolvers = require("./comments");

module.exports = {
  Post: {
    likesCount(parent) {
      let likes = 0;
      parent.likes.forEach(() => {
        likes++;
      });
      return likes;
    },
    commentsCount: (parent) => {
      let comments = 0;
      parent.comments.forEach(() => {
        comments++;
      });
      return comments;
    }
  },
  Query: {
    ...postsResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation
  },
  Subscription: {
    ...postsResolvers.Subscriptcion
  }
};

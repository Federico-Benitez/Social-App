const { AuthenticationError, UserInputError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../util/check-auth");

module.exports = {
  Query: {
    async getAllPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 }); //obtener los ultimos primero
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context);

      if (body.trim() === "") {
        throw new Error("La publicacion no puede estar vacia!");
      }

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });

      const post = await newPost.save();
      context.pubsub.publish("NEW_POST", {
        newPost: post
      });
      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);
      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return "Post eliminado";
        } else {
          //el usuario que intenta eliminar el post no es el creador
          throw new AuthenticationError("Accion no valida");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async likePost(_, { postId }, context) {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          //El post ya tenia un like del usuario, se quita el like
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          //Nuevo like
          post.likes.push({
            username,
            createdAt: new Date().toISOString()
          });
        }
        //guardar cambios
        await post.save();
        return post;
      } else throw new UserInputError("Post not found");
    }
  },
  Subscriptcion: {
    newPost: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_POST")
    }
  }
};

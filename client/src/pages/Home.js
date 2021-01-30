import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Container, Grid } from "semantic-ui-react";

import PostCard from "../component/PostCard";
import { AuthContext } from "../context/auth";

function Home() {
  const { user } = useContext(AuthContext);

  const { loading, data: { getAllPosts: posts } = {} } = useQuery(
    FETCH_POSTS_QUERY
  );

  return (
    <Grid columns={3}>
      <Grid.Row>
        <Container textAlign="center">
          <h1>
            {/* <p>Hola {user ? user.username : null}</p> */}
            Publicaciones Recientes
          </h1>
        </Container>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1> Cargando...</h1>
        ) : (
          posts &&
          posts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}

const FETCH_POSTS_QUERY = gql`
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

export default Home;

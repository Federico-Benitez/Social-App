import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Button, Card, Icon, Label, Image, Grid } from "semantic-ui-react";
import moment from "moment";

import { FETCH_POST_QUERY } from "../util/graphql";
import { AuthContext } from "../context/auth";
import LikeButton from "../component/LikeButton";
import DeleteButton from "../component/DeleteButton";

function SinglePost(props) {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  //Asigno a getPost un object vacio
  const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
  });

  function deletePostCallback() {
    props.history.push("/");
  }

  let postMarkup;

  if (!getPost) {
    postMarkup = <p>Loading post...</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likesCount,
      commentsCount
    } = getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width="2">
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              size="small"
              float="right"
            />
          </Grid.Column>
          <Grid.Column width="10">
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likesCount, likes }} />
                <Button
                  as="div"
                  labelPosition="right"
                  onClick={() => console.log("comentando")}
                >
                  <Button basic color="blue">
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="blue" pointing="left">
                    {commentsCount}
                  </Label>
                </Button>
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return postMarkup;
}

export default SinglePost;
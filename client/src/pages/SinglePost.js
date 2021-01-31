import React, { useContext, useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Card,
  Form,
  Icon,
  Label,
  Image,
  Grid,
  CardContent,
  CardHeader
} from "semantic-ui-react";
import moment from "moment";

import { FETCH_POST_QUERY, SUBMIT_COMMENT_MUTATION } from "../util/graphql";
import { AuthContext } from "../context/auth";
import LikeButton from "../component/LikeButton";
import DeleteButton from "../component/DeleteButton";

function SinglePost(props) {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  const commentInputRef = useRef(null);

  const [comment, setComment] = useState("");
  //Asigno a getPost un object vacio
  const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
  });

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment("");
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment
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
                <Card.Header>@{username}</Card.Header>
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
            {user && (
              <Card fluid>
                <CardContent>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="Escribe un comentario.."
                        name="comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        ref={commentInputRef}
                      />
                      <button
                        type="submit"
                        className="ui button blue"
                        disabled={comment.trim() === ""}
                        onClick={submitComment}
                      >
                        Enviar
                      </button>
                    </div>
                  </Form>
                </CardContent>
              </Card>
            )}
            {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <CardContent>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <CardHeader>
                    <p>@{comment.username}</p>
                  </CardHeader>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>
                    <p style={{ fontWeight: "bold" }}>{comment.body}</p>
                  </Card.Description>
                </CardContent>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return postMarkup;
}

export default SinglePost;

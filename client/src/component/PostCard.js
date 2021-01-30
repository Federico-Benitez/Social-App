import React from "react";
import {
  Button,
  Card,
  Icon,
  Label,
  Image,
  CardContent
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

function PostCard({
  post: { body, createdAt, id, username, likes, commentsCount, likesCount }
}) {
  function likePost() {
    console.log("Like");
  }
  function commentPost() {
    console.log("comment");
  }
  return (
    <Card>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/post/${id}`}>
          {moment(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as="div" labelPosition="right" onClick={likePost}>
          <Button color="red" basic>
            <Icon name="heart" />
          </Button>
          <Label as="a" basic color="red" pointing="left">
            {likesCount}
          </Label>
        </Button>
        <Button as="div" labelPosition="right" onClick={commentPost}>
          <Button color="blue" basic>
            <Icon name="comments" />
          </Button>
          <Label as="a" basic color="blue" pointing="left">
            {commentsCount}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  );
}

export default PostCard;

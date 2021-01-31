import React, { useContext } from "react";
import { Button, Card, Icon, Label, Image, Popup } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

function PostCard({
  post: { body, createdAt, id, username, likes, commentsCount, likesCount }
}) {
  const { user } = useContext(AuthContext);

  return (
    <Card>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>@{username}</Card.Header>
        <Card.Meta as={Link} to={`/post/${id}`}>
          {moment(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Popup
          content="Click para comentar"
          inverted
          trigger={<LikeButton user={user} post={{ id, likes, likesCount }} />}
        />
        <Button labelPosition="right" as={Link} to={`/post/${id}`}>
          <Popup
            content="Comentar publicación"
            inverted
            trigger={
              <Button color="blue" basic>
                <Icon name="comments" />
              </Button>
            }
          />

          <Label as="a" basic color="blue" pointing="left">
            {commentsCount}
          </Label>
        </Button>
        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
}

export default PostCard;

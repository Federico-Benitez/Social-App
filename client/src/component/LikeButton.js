import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Button, Label, Icon, Popup } from "semantic-ui-react";

import { LIKE_POST_MUTATION } from "../util/graphql";

function LikeButton({ user, post: { id, likesCount, likes } }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((likes) => likes.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id }
  });

  const likeButton = user ? (
    liked ? (
      <Popup
        content="Quitar like"
        inverted
        trigger={
          <Button color="red">
            <Icon name="heart" />
          </Button>
        }
      />
    ) : (
      <Popup
        content="Dar like"
        inverted
        trigger={
          <Button color="red" basic>
            <Icon name="heart" />
          </Button>
        }
      />
    )
  ) : (
    <Button as={Link} to="/login" color="red" basic>
      <Icon name="heart" />
    </Button>
  );

  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      {likeButton}
      <Label as="a" basic color="red" pointing="left">
        {likesCount}
      </Label>
    </Button>
  );
}

export default LikeButton;

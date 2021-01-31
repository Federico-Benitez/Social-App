import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Confirm, Icon, Popup } from "semantic-ui-react";

import {
  DELETE_POST_MUTATION,
  FETCH_POSTS_QUERY,
  DELETE_COMMENT_MUTATION
} from "../util/graphql";

function DeleteButton({ postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrComment] = useMutation(mutation, {
    refetchQueries: [{ query: FETCH_POSTS_QUERY }],

    update(proxy) {
      setConfirmOpen(false);

      if (callback) callback();
    },
    variables: {
      postId,
      commentId
    }
  });
  return (
    <>
      <Popup
        content={commentId ? "Eliminar comentario" : "Eliminar publicación"}
        inverted
        trigger={
          <Button
            as="div"
            color="red"
            floated="right"
            onClick={() => setConfirmOpen(true)}
          >
            <Icon name="trash" style={{ margin: 0 }} />
          </Button>
        }
      />
      <Confirm
        open={confirmOpen}
        onCancel={() => {
          console.log(postId);
          setConfirmOpen(false);
        }}
        onConfirm={deletePostOrComment}
      />
    </>
  );
}

export default DeleteButton;

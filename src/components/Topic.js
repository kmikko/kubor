import React from "react";
import Message from "../components/Message";

const Topic = ({ match }) => {
  const { params: { topicId: topicId }, ...rest } = match;
  return (
    <Message
      header={match.params.topicId}
      body={`This is body for topic ${topicId}`}
    />
  );
};

export default Topic;

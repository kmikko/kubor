import React from "react";
import { Route } from "react-router-dom";

import Topic from "../components/Topic";
import Message from "../components/Message";

const Topics = ({ match }) =>
  <div className="column is-10">
    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route
      exact
      path={match.url}
      render={() => <h1 className="title">Topics</h1>}
    />
  </div>;
export default Topics;

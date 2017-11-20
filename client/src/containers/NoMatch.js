import React from "react";

const NoMatch = ({ location }) =>
  <div>
    <p>
      No match for <code>{location.pathname}</code>
    </p>
  </div>;

export default NoMatch;

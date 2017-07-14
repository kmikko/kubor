import React from "react";

const Message = props =>
  <article className="message">
    <div className="message-header">
      {props.header}
      <button className="delete" />
    </div>
    <div className="message-body">
      {props.body}
    </div>
  </article>;

export default Message;

import React from "react";
import PropTypes from "prop-types";

const Notification = props => {
  const { type = "primary", text, onClick } = props;
  return (
    <div className={`notification is-${type}`} style={{ marginBottom: "1em" }}>
      <button className="delete" onClick={onClick} />
      {text}
    </div>
  );
};

Notification.propTypes = {
  type: PropTypes.oneOf(["primary", "info", "success", "warning", "dander"]),
  text: PropTypes.string.isRequired
};

export default Notification;

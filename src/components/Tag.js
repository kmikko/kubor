import React from "react";
import PropTypes from "prop-types";

const Tag = props => {
  const { type, text } = props;
  return (
    <span className={`tag is-${type}`}>
      {text}
    </span>
  );
};

Tag.propTypes = {
  type: PropTypes.oneOf([
    "black",
    "dark",
    "light",
    "white",
    "primary",
    "info",
    "success",
    "warning",
    "danger"
  ]),
  text: PropTypes.string
};

export default Tag;

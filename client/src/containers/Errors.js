import React from "react";
import { connect } from "react-redux";

import Notification from "../components/Notification";

import Transition from "react-transition-group/Transition";
import TransitionGroup from "react-transition-group/TransitionGroup";

import { hideError } from "../actions";
import { getErrors } from "../reducers/errors";

const duration = 500;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0
};

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 }
};

class Errors extends React.Component {
  constructor(props) {
    super(props);

    this.handleHideError = this.handleHideError.bind(this);
  }
  handleHideError = id => {
    this.props.hideError(id);
  };

  render() {
    const { errors } = this.props;
    return (
      <div
        style={{
          position: "absolute",
          top: "1em",
          right: "1em",
          width: "30em"
        }}
      >
        <TransitionGroup>
          {errors.map(item => (
            <Transition
              timeout={duration}
              key={item.id}
              onEntered={() => {
                setTimeout(() => {
                  this.handleHideError(item.id);
                }, 5000);
              }}
            >
              {state => (
                <div
                  style={{
                    ...defaultStyle,
                    ...transitionStyles[state]
                  }}
                >
                  <Notification
                    type="danger"
                    text={item.message}
                    onClick={() => this.handleHideError(item.id)}
                  />
                </div>
              )}
            </Transition>
          ))}
        </TransitionGroup>
      </div>
    );
  }
}

export default connect(
  state => ({
    errors: getErrors(state)
  }),
  {
    hideError
  }
)(Errors);

import React, { Component } from "react";

class CheckboxGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedValues: props.defaultChecked
    };

    this.handleOnChange = this.handleOnChange.bind(this);
  }
  handleOnChange(event) {
    const checked = event.target.checked;
    const value = event.target.value;

    this.setState((prevState, props) => ({
      checkedValues: checked
        ? [...prevState.checkedValues, value]
        : prevState.checkedValues
            .slice(0, prevState.checkedValues.indexOf(value), 1)
            .concat(
              prevState.checkedValues.slice(
                prevState.checkedValues.indexOf(value) + 1
              )
            )
    }));
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        {React.Children.map(
          children,
          child =>
            child.type === "input"
              ? React.cloneElement(child, {
                  onChange: this.handleOnChange,
                  checked:
                    this.state.checkedValues.indexOf(child.props.value) > -1
                })
              : child
        )}
      </div>
    );
  }
}

export default CheckboxGroup;

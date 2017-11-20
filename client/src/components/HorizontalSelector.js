import React from "react";
import PropTypes from "prop-types";
import "./HorizontalSelector.css";

class HorizontalSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: this.props.index
    };
  }

  componentDidMount() {
    this.handleLeftClick = this.handleLeftClick.bind(this);
    this.handleRightclick = this.handleRightclick.bind(this);
  }

  handleLeftClick = () => {
    const { index: currentIndex } = this.state;
    const { values } = this.props;
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      this.changeSelection(newIndex, values);
    }
  };

  handleRightclick = () => {
    const { index: currentIndex } = this.state;
    const { values } = this.props;
    if (currentIndex < values.length - 1) {
      const newIndex = currentIndex + 1;
      this.changeSelection(newIndex, values);
    }
  };

  changeSelection = (index, values) => {
    this.setState(
      {
        index: index
      },
      this.props.onSelectionChange(values[index])
    );
  };

  render() {
    const { values } = this.props;
    const { index } = this.state;

    const first = index === 0;
    const last = values.length === 0 || index === values.length - 1;

    return (
      <div className="horizontal-selector">
        <div className="horizontal-selector-left">
          <button
            className="button is-link"
            onClick={this.handleLeftClick}
            disabled={first}
          >
            <i className="fa fa-chevron-left" />
          </button>
        </div>
        <div>{values[index]}</div>
        <div className="horizontal-selector-right">
          <button
            className="button is-link"
            onClick={this.handleRightclick}
            disabled={last}
          >
            <i className="fa fa-chevron-right" />
          </button>
        </div>
      </div>
    );
  }
}

HorizontalSelector.propTypes = {
  index: PropTypes.number,
  values: PropTypes.array.isRequired
};

HorizontalSelector.defaultProps = {
  index: 0,
  values: []
};

export default HorizontalSelector;

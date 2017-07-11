import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//import { toggleTodo, receiveTodos } from "../actions";
import * as actions from "../actions";

import { getVisibleTodos } from "../reducers";
import TodoList from "../components/TodoList";

class VisibleTodoList extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter);
  }

  render() {
    const { toggleTodo, ...rest } = this.props;
    return <TodoList {...rest} onTodoClick={toggleTodo} />;
  }
}

const mapStateToProps = (state, { match }) => {
  const filter = match.params.filter || "all";
  return {
    todos: getVisibleTodos(state, filter),
    filter
  };
};

/*
When the arguments for the callback prop match the arguments to the action creator exactly,
we can pass a special object, a map, in between the names of the callback props that we want
to inject and the action creator functions that create the corresponding actions.

const mapDispatchToProps = dispatch => ({
  onTodoClick(id) {
    dispatch(toggleTodo(id));
  }
});

const VisibleTodoList = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TodoList)
);

*/

// Name of the callback prop: actio creator function
VisibleTodoList = withRouter(
  connect(mapStateToProps, actions)(VisibleTodoList)
);

export default VisibleTodoList;

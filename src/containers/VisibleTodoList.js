import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toggleTodo } from "../actions";
import { getVisibleTodos } from "../reducers";
import TodoList from "../components/TodoList";

const mapStateToProps = (state, { match }) => ({
  todos: getVisibleTodos(state, match.params.filter || "all")
});

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
const VisibleTodoList = withRouter(
  connect(mapStateToProps, { onTodoClick: toggleTodo })(TodoList)
);

export default VisibleTodoList;

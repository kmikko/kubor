import { v4 } from "node-uuid";

const fakeDatabase = {
  todos: [
    {
      id: v4(),
      text: "hey",
      completed: true
    },
    {
      id: v4(),
      text: "ho",
      completed: false
    },
    {
      id: v4(),
      text: "let's go",
      completed: true
    }
  ]
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const fetchTodos = filter =>
  delay(5000).then(() => {
    switch (filter) {
      case "all":
        return fakeDatabase.todos;
      case "active":
        return fakeDatabase.todos.filter(t => !t.completed);
      case "completed":
        return fakeDatabase.todos.filter(t => t.completed);
      default:
        return fakeDatabase.todos;
    }
  });

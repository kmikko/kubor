const initialState = {
  startDate: new Date(Date.UTC(2017, 8, 1)),
  endDate: new Date(Date.UTC(2017, 8, 30, 23, 59, 59)),
  resourceFilters: ["cpu", "memory", "storage"]
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TIME_INTERVAL_FILTER_CHANGE":
      const { startDate, endDate } = action.payload;
      return {
        ...state,
        startDate: startDate,
        endDate: endDate
      };
    case "RESOURCE_FILTER_CHANGE":
      const { resource, checked } = action.payload;
      const { resourceFilters: prevState } = state;

      return {
        ...state,
        resourceFilters: checked
          ? [...prevState, resource]
          : prevState
              .slice(0, prevState.indexOf(resource), 1)
              .concat(prevState.slice(prevState.indexOf(resource) + 1))
      };
    default:
      return state;
  }
};

export default uiReducer;

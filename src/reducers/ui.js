const initialState = {
  startDate: new Date(Date.UTC(2017, 8, 1)),
  endDate: new Date(Date.UTC(2017, 8, 30, 23, 59, 59))
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
    default:
      return state;
  }
};

export default uiReducer;

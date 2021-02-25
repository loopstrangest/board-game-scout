const initialState = { showExplainer: false, loadingResults: false };

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_EXPLAINER":
      return {
        ...state,
        showExplainer: !state.showExplainer,
      };
    case "LOADING_RESULTS":
      return {
        ...state,
        loadingResults: action.payload.loadingResults,
      };
    default:
      return { ...state };
  }
};

export default appReducer;

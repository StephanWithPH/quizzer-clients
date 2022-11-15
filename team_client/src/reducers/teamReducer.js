const initialState = {
  _id: 0,
  name: null,
  roundPoints: 0,
  accepted: false,
};

// eslint-disable-next-line default-param-last
export default function teamReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_TEAM':
      return {
        ...action.payload,
      };
    default:
      return state;
  }
}

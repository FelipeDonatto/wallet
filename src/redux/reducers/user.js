const INITIAL_STATE = '';

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'USER_LOGIN':
    return { ...state, email: action.email };
  default:
    return state;
  }
};

export default user;

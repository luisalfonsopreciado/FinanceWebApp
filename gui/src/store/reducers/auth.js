import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";
// import { setUserInformation } from '../actions/auth'

const initialState = {
  token: null,
  error: null,
  loading: false,
  authRedirectPath: "/profile",
  userData: {},
};
const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};
const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    userData: action.userData,
    error: null,
    loading: false
  });
};
const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};
const authLogout = (state, action) => {
  return updateObject(state, { token: null, userId: null, userData: {} });
};
const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path });
};
const setUserInformationInGlobalState = (state, action) => {
  return updateObject(state, { userData: action.userData });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAILED:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.AUTH_SET_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    case actionTypes.SET_USER_INFORMATION:
      return setUserInformationInGlobalState(state, action);
    default:
      return state;
  }
};

export default reducer;

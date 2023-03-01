import { getUser } from "../../api/index";
import { setUser, resetUser } from "./../actions/user";

export const attemptGetUser = (token) => (dispatch) =>
  getUser(token)
    .then((data) => {
      if (data.data.user) {
        dispatch(setUser(data.data.user));
      } else {
        dispatch(resetUser());
      }
    })
    .catch(() => {
      dispatch(resetUser());
    });

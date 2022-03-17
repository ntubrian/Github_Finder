import { createContext, useReducer } from "react";
import "../styles/globals.css";

export const UserContext = createContext();
export const ACTION_TYPES = {
  SET_INPUT_USER_NAME: "SET_INPUT_USER_NAME",
  SET_USER_AVATAR_URL: "SET_USER_AVATAR_URL",
};

const userMetaReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_INPUT_USER_NAME: {
      return { ...state, inputUserName: action.payload.inputUserName };
    }
    case ACTION_TYPES.SET_USER_REAL_NAME: {
      return { ...state, userRealName: action.payload.userRealName };
    }
    case ACTION_TYPES.SET_USER_AVATAR_URL: {
      return { ...state, userAvatarUrl: action.payload.userAvatarUrl };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
const UserProvider = ({ children }) => {
  const initialState = {
    inputUserName: "",
    userRealName: "",
    userAvatarUrl: [],
  };

  const [indexPageState, dispatch] = useReducer(userMetaReducer, initialState);
  return (
    <UserContext.Provider value={{ indexPageState, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;

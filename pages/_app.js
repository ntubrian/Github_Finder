import { createContext, useReducer } from "react";
import "../styles/globals.css";

export const UserContext = createContext();
export const ACTION_TYPES = {
  SET_INPUT_USER_NAME: "SET_INPUT_USER_NAME",
  SET_USER_AVATAR_URL: "SET_USER_AVATAR_URL",
  SET_USER_REAL_NAME: "SET_USER_REAL_NAME",
  SET_SELECTED_REPO_NAME: "SET_SELECTED_REPO_NAME",
  SET_SELECTED_REPO_NODE_ID: "SET_SELECTED_REPO_NODE_ID",
  SET_SELECTED_REPO_DESCRIPTION: "SET_SELECTED_REPO_DESCRIPTION",
  SET_SELECTED_REPO_STAR_COUNTS: "SET_SELECTED_REPO_STAR_COUNTS",
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
    case ACTION_TYPES.SET_SELECTED_REPO_NAME: {
      return { ...state, selectedRepoName: action.payload.selectedRepoName };
    }
    case ACTION_TYPES.SET_SELECTED_REPO_NODE_ID: {
      return {
        ...state,
        selectedRepoNodeId: action.payload.selectedRepoNodeId,
      };
    }
    case ACTION_TYPES.SET_SELECTED_REPO_DESCRIPTION: {
      return {
        ...state,
        selectedRepoDescription: action.payload.selectedRepoDescription,
      };
    }
    case ACTION_TYPES.SET_SELECTED_REPO_STAR_COUNTS: {
      return {
        ...state,
        selectedRepoStarCounts: action.payload.selectedRepoStarCounts,
      };
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
    selectedRepoName: "",
    selectedRepoNodeId: "",
    selectedRepoDescription: "",
    selectedRepoStarCounts: 0,
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

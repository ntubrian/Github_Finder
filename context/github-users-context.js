import { createContext, useReducer } from "react";
export const UsersContext = createContext();
export const ACTION_TYPES2 = {
  SET_USERS: "SET_USERS",
  SET_SEARCHUSERSINPUT: "SET_SEARCHUSERSINPUT",
};

const usersMetaReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES2.SET_USERS: {
      return { ...state, usersMeta: action.payload.usersMeta };
    }
    case ACTION_TYPES2.SET_SEARCHUSERSINPUT: {
      return { ...state, searchUsersInput: action.payload.searchUsersInput };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const UsersProvider = ({ children }) => {
  const initialState = {
    usersMeta: [],
    searchUsersInput: "",
  };

  const [usersPageState, dispatchUsers] = useReducer(
    usersMetaReducer,
    initialState
  );
  return (
    <UsersContext.Provider value={{ usersPageState, dispatchUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;

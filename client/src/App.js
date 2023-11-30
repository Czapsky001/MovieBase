import MainPage from "./components/main/MainPage";
import { useReducer } from "react";
import AuthContext from "./components/AuthContext";

const initialState = {
  loginClicked: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOGIN_CLICKED":
      return {
        ...state,
        loginClicked: action.payload,
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <AuthContext.Provider value={{ state, dispatch }}>
        <MainPage></MainPage>
      </AuthContext.Provider>
    </div>
  );
}

export default App;

import React, { useReducer } from "react";
import JoinBlock from "./components/JoinBlock";

function App() {
  const [state, dispatch] = useReducer(reducer, {
    isJoin: false,
  });

  return (
    <div className="wrapper">
      <JoinBlock />
    </div>
  );
}

export default App;

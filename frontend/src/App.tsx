import React, { useState } from "react";
import AuthForm from "containers/AuthForm/container";
import MainPage from "components/MainPage/component";
import "./App.scss";

function App() {
  const [screenIsAuth, setScreenIsAuth] = useState(true);

  const handleScreen = () => {
    setScreenIsAuth(!screenIsAuth);
  };
  return (
    <div className="App">
      {screenIsAuth ? (
        <AuthForm handleScreen={handleScreen} />
      ) : (
        <MainPage handleScreen={handleScreen} />
      )}
    </div>
  );
}

export default App;

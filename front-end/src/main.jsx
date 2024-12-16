import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import Store from "./store";
import App from "./components/App";
import "./index.css";
import { createGlobalStyle } from "styled-components";
import { PersistGate } from "redux-persist/integration/react";

const { persistor, store } = Store();

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;
    color: #172b4d;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    background-color: rgb(0, 121, 191);
    height: 100vh;
    overflow: hidden;
  }
  
  * {
    box-sizing: border-box;
  }
  
  #root {
    height: 100%;
  }
`;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyle />
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
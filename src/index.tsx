import React from "react";
import ReactDOM from "react-dom/client";
// third-party
import { Provider as ReduxProvider } from "react-redux";
// project import
import "./index.css";
import App from "./App";
import { store } from "@/store";
import InjectTailwind from "./InjectTailwind";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ReduxProvider store={store}>
        <InjectTailwind>
          <App />
        </InjectTailwind>
      </ReduxProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

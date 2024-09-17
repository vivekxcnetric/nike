import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { StrollerRounded } from "@mui/icons-material";
import store from "./redux/store";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// Fix for Leaflet's default marker icon by using online URLs
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <PayPalScriptProvider
      options={{
        "client-id":
          "AUKvP8ae0aMLtrs2Fxk76rEV_02atz98Zn_mkIFlBpmogGo2iAzBc4iLeKhIDxCOKuPAg6R70OgNOClL",
        components: "buttons",
      }}
    > */}
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    {/* </PayPalScriptProvider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

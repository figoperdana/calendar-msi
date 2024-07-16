import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { gapi } from "gapi-script";
import { AuthProvider } from "./context/AuthProvider";  // Ensure the correct path
import 'bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById("root");
const root = createRoot(container);

const initClient = () => {
  gapi.client.init({
    apiKey: "AIzaSyDVcomcSG9hCH8frHYEctEqZgHoDOuc_Bk",
    clientId: "909692978574-k0gfvactkcfs4qijao97euktdndvf5v7.apps.googleusercontent.com",
    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
    scope: "https://www.googleapis.com/auth/calendar.events",
    cookiepolicy: 'single_host_origin'
  }).then(() => {
    root.render(
      <React.StrictMode>
        <AuthProvider>
          <App />
        </AuthProvider>
      </React.StrictMode>
    );
  }, (error) => {
    console.error("Error initializing Google API client: ", error);
  });
};

gapi.load("client:auth2", initClient);





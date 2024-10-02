import React from 'react';
import { createRoot } from 'react-dom/client';
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import App from './App';

const msalConfig = {
  auth: {
    clientId: "31203414-02ed-4c77-ac0d-793dfb78535f",
    authority: "https://login.microsoftonline.com/d305944c-1191-4f11-9dfa-46441ece1655", // tenant ID
    redirectUri: "http://localhost:3000"  // Ensure this matches what's in Azure
  },
  cache: {
    cacheLocation: "localStorage", // This allows users to stay logged in even after a page refresh
    storeAuthStateInCookie: false  // Set to true if you face issues on IE11 or Edge
  }
};

const pca = new PublicClientApplication(msalConfig);


const container = document.getElementById('root');
const root = createRoot(container); 
root.render(
  <MsalProvider instance={pca}>
    <App />
  </MsalProvider>
);

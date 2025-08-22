import React from "react";
import AccountStore from "../store/AccountStore";

let initializationPromise: Promise<void> | null = null;

const initializeApp = async (): Promise<void> => {
  try {
    await AccountStore.loadCurrentUser();
  } catch (error) {
    console.error("❌ App initialization failed:", error);
  }
};

const AppInitializer = ({ children }: {
  children: React.ReactNode;
}) => {
  if (!initializationPromise) {
    initializationPromise = initializeApp();
  }

  React.use(initializationPromise);

  return <>{children}</>;
};

export default AppInitializer;

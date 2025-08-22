import { useEffect, useState } from "react";
import AccountStore from "../stores/AccountStore";

let initializationPromise: Promise<void> | null = null;
let isInitialized = false;

/*
 * This is a hack to show loading fallback while the app is initializing
 */
const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const [, forceUpdate] = useState({});

  if (!initializationPromise) {
    initializationPromise = initializeApp();
  }

  useEffect(() => {
    initializationPromise?.then(() => {
      forceUpdate({});
    });
  }, []);

  if (!isInitialized) {
    // TODO: replace with `React.use()` in future
    /*
     * Throwing promise to trigger Suspense fallback.
     */
    throw initializationPromise;
  }

  return <>{children}</>;
};

const initializeApp = async (): Promise<void> => {
  if (isInitialized) return;

  try {
    await AccountStore.loadCurrentUser();
  } catch (error) {
  } finally {
    isInitialized = true;
  }
};

export default AppInitializer;

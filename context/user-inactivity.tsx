import { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import { router } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { MMKV } from "react-native-mmkv";

const storage = new MMKV({
  id: "inactivity-storage",
});

export const UserInactivityProvider = ({ children }: { children: any }) => {
  const appState = useRef(AppState.currentState);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    if (nextAppState === "background") {
      recordStartTime();
    } else if (
      nextAppState === "active" &&
      appState.current.match(/background/)
    ) {
      const elapsed = Date.now() - (storage.getNumber("startTime") || 0);
      console.log({ elapsed });
      if (elapsed > 3000 && isSignedIn) {
        console.log("Are you running", { isSignedIn });
        router.replace("/lock-screen");
      }
    }

    appState.current = nextAppState;
  };

  const recordStartTime = () => {
    storage.set("startTime", Date.now());
  };

  return children;
};

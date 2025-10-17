import { lock } from "@/store/slices/lockSlice";
import { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import { useDispatch } from "react-redux";

export default function useBackgroundLock() {
  const dispatch = useDispatch();
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const onAppStateChange = (nextState: AppStateStatus) => {
      if (appState.current.match(/active/) && nextState.match(/inactive|background/)) {
        console.log("App moved to background → locking");
        dispatch(lock());
      }
      appState.current = nextState;
    };

    const sub = AppState.addEventListener("change", onAppStateChange);
    return () => sub.remove();
  }, []);

}

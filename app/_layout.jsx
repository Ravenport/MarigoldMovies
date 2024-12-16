import { Slot } from "expo-router";
import { SessionProvider } from "../context";

export default function Layout() {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}

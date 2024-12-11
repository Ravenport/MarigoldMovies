import { Stack } from "expo-router";

export default function Layout() {
  console.log(true);
  return (<Stack>
    <Stack.Screen
      name="index"
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="details"
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="search"
      options={{
        headerShown: false,
      }}
    />
  </Stack>
  );
}

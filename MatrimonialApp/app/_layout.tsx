import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        contentStyle: {
          backgroundColor: "#F8F4EC",
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="biodata/all" />
      <Stack.Screen name="details/[id]" />
      <Stack.Screen name="admin/dashboard" />
      <Stack.Screen name="create-biodata" />
      <Stack.Screen name="subscription" />
    </Stack>
  );
}
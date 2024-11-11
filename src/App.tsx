import { Spinner } from "@/components/ui/spinner";
import { RootContainer as router } from "@/containers";
import { QueryProvider } from "@/providers";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/them-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryProvider>
        <RouterProvider router={router} fallbackElement={<Spinner />} />
      </QueryProvider>
    </ThemeProvider>
  );
}

export default App;

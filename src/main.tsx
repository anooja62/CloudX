import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import React Query
import "./index.css";
import App from "./App.tsx";

const queryClient = new QueryClient(); // Create a QueryClient instance

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}> {/* Wrap App with QueryClientProvider */}
      <App />
    </QueryClientProvider>
  </StrictMode>
);

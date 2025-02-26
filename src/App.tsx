import "./App.css";
import AppRoutes from "./Router";
import { AuthProvider } from "./context/AuthContext"; // ✅ Import AuthProvider

function App() {
  return (
    <AuthProvider> {/* ✅ Wrap everything inside AuthProvider */}
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;

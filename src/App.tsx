import "./App.css";
import AppRoutes from "./Router";
import { AuthProvider, useAuth } from "./context/AuthContext";

const AppContent = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-slate-900">
        <h2 className="text-white text-2xl">Loading...</h2>
      </div>
    );
  }

  return <AppRoutes />;
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

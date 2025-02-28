import Google from "../../assets/google.png";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {  // ✅ Explicitly typing as a Functional Component
  const { loginWithGoogle }: { loginWithGoogle: () => Promise<void> } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await loginWithGoogle();
    navigate("/"); // Redirect to the main layout
  };

  return (
    <div className="h-screen flex justify-center items-center bg-slate-900">
      <div className="bg-slate-800 p-8 rounded-lg shadow-2xl w-96">
        <h2 className="text-white text-3xl font-semibold text-center mb-4">
          CloudX Login
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Secure Cloud Storage Solutions
        </p>

        <button
          onClick={handleLogin}
          className="w-full bg-white text-gray-700 flex items-center justify-center space-x-2 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition-all"
        >
          <img src={Google} alt="Google Logo" className="w-5 h-5" />
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;

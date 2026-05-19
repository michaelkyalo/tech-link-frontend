import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/forms/LoginForm";

const Login = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/"); 
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 p-6 shadow-lg">

        {/* Back button */}
        <button
          onClick={handleBack}
          className="mb-3 text-black-600 hover:underline"
        >
          ← Back
        </button>

        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
   ;
  
import LoginForm from "../../components/forms/LoginForm";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
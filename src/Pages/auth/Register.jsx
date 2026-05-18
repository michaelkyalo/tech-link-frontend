import RegisterForm from "../../components/forms/RegisterForm";

const Register = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
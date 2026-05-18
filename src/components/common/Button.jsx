const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}) => {
  const variants = {
    primary:
      "bg-green-600 hover:bg-green-700 text-white",

    secondary:
      "bg-gray-600 hover:bg-gray-700 text-white",

    danger:
      "bg-red-500 hover:bg-red-600 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded transition ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
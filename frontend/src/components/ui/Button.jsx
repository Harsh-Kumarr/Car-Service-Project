const Button = ({ children, className = "", ...props }) => {
  const classes = className || "w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700";
  return (
    <button
      {...props}
      className={classes}
    >
      {children}
    </button>
  );
};

export default Button;
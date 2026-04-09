const Input = ({ label, register, name, errors = {}, ...props }) => {
  return (
    <div className="mb-4">
      <label className="block mb-1">{label}</label>

      <input
        {...(register ? register(name) : {})}
        {...props}
        className="w-full p-2 border rounded"
      />

      {errors?.[name] && (
        <p className="text-red-500 text-sm">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

export default Input;
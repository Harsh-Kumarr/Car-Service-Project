const Input = ({ label, register, name, errors = {}, ...props }) => {
  return (
    <div className="mb-4">
      <label className="block mb-1 ">{label}</label>

      <input
        {...(register ? register(name) : {})}
        {...props}
        className="w-full p-2 shadow-[inset_0_2px_8px_rgba(0,0,0,0.20)] rounded-xl focus:outline-none"
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
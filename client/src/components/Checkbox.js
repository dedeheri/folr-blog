function Checkbox({ label, ...rest }) {
  return (
    <div className="space-x-2">
      <input type={"checkbox"} id="remember-me" name="remember-me" {...rest} />
      <label
        htmlFor="remember-me"
        className="text-md cursor-pointer text-gray-400 hover:text-gray-500 hover:dark:text-gray-300 duration-300"
      >
        {label}
      </label>
    </div>
  );
}

export default Checkbox;

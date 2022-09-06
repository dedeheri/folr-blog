function Checkbox({ ...rest }) {
  return (
    <div className="flex items-center space-x-2">
      <input type={"checkbox"} id="remember-me" name="rememberMe" {...rest} />
      <label
        htmlFor="remember-me"
        className="text-md cursor-pointer text-gray-400 hover:text-gray-500 hover:dark:text-gray-300 duration-300"
      >
        Tetap Masuk
      </label>
    </div>
  );
}

export default Checkbox;

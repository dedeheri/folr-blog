function Button({ color, label, ...rest }) {
  return (
    <button
      {...rest}
      type="submit"
      className={`h-11 w-full text-white text-lg font-medium duration-300 rounded-md bg-[#2374e1] hover:bg-[#0f5abb]`}
    >
      {label}
    </button>
  );
}

export default Button;

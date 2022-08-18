import { ExclamationIcon } from "@heroicons/react/outline";

function Input({ label, placeholder, type, error, link, ...rest }) {
  return (
    <div className="space-y-1">
      <label className="text-lg">{label}</label>
      <input
        type={type}
        className={`h-11 bg-transparent w-full px-2 outline-none border rounded-md ${
          link ? "text-blue-700 dark:text-blue-500" : ""
        } ${error ? "border-red-500" : "dark:border-[#353535] "} `}
        placeholder={placeholder}
        {...rest}
      />

      {error && (
        <div className="flex space-x-2 text-red-400">
          <ExclamationIcon className="w-4" />
          <h1 className="text-md">{error}</h1>
        </div>
      )}
    </div>
  );
}

export default Input;

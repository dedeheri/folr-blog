import { getAllCookies } from "../utils/cookie";

function DarkMode({ children }) {
  const { theme } = getAllCookies();

  return (
    <div className={theme === "dark" ? "dark" : "light"}>
      <div className="bg-white  dark:bg-[#18191a] text-black dark:text-white min-h-screen h-screen overflow-y-auto scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full scrollbar-thin">
        {children}
      </div>
    </div>
  );
}

export default DarkMode;

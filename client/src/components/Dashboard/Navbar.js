import { Link } from "react-router-dom";

// components
import Profil from "./Profil";
import Notification from "./Notification";
import Search from "./Search";

// logo
import { logo } from "../../assets/image";

function Navbar({ theme, loading, data }) {
  return (
    <div className="h-16 flex sticky top-0 bg-white dark:bg-[#18191a] z-40 dark:border-[#353535] items-center justify-end border-b px-10">
      <div className="flex items-center space-x-2">
        {/* search */}
        <Search />
        {/* notif */}
        <Notification />
        {/* profil  */}
        <Profil data={data} loading={loading} theme={theme} />
      </div>
    </div>
  );
}

export default Navbar;

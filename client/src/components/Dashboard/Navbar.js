import { Link } from "react-router-dom";

// components
import Profil from "./Profil";
import Notification from "./Notification";
import Search from "./Search";

// logo
import { logo } from "../../assets/image";

function Navbar({ theme, loading, data }) {
  return (
    <div className="h-20 flex items-center justify-between max-w-7xl mx-auto px-4">
      <Link to={"/dashboard"}>
        <img src={logo} alt={logo} className="w-9 md:w-11" />
      </Link>

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

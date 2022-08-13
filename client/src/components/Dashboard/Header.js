import Nav from "./Nav";
import Navbar from "./Navbar";

function Header({ theme, setTheme, loading, data }) {
  return (
    <div className="sticky z-50 top-0 bg-white  dark:bg-[#18191a]">
      <Navbar theme={theme} data={data} loading={loading} />
      <Nav />
    </div>
  );
}

export default Header;

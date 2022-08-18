import React from "react";

// image
import { logo } from "../../assets/image";

function NavbarAuth() {
  return (
    <div className="h-20 flex items-center justify-between max-w-7xl mx-auto px-4 sticky top-0">
      <img src={logo} alt="Logo" className="w-9 md:w-11" />
    </div>
  );
}

export default NavbarAuth;

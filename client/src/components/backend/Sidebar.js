import {
  ChartBarIcon,
  ChatIcon,
  ClipboardListIcon,
  CogIcon,
  PencilAltIcon,
  UserAddIcon,
  ViewGridIcon,
} from "@heroicons/react/outline";
import React from "react";

import { NavLink } from "react-router-dom";

function Sidebar({ sidebar }) {
  const active =
    "flex items-center px-3 text-[#2374E1] space-x-2 bg-[#E8F2FF] dark:bg-[#1C314D] p-2 border-l-4 border-[#2374E1]";
  const nonActive =
    "flex space-x-2 px-3 p-2 text-[#909090] border-l-4 border-transparent hover:bg-[#E8F2FF] hover:dark:bg-[#1C314D] duration-300";
  return (
    <div
      className={`shadow-md z-50 bg-white dark:bg-[#18191a] duration-300 h-full fixed border-r dark:border-[#3A3B3C]  py-3 space-y-1 ${
        sidebar ? "w-16" : " md:w-56"
      }`}
    >
      <NavLink
        to={"/"}
        end={true}
        className={({ isActive }) => (isActive ? active : nonActive)}
      >
        <ViewGridIcon className="w-6 md:w-7" />
        {!sidebar && (
          <h1 className="text-lg hidden font-medium md:flex">Dasbor</h1>
        )}
      </NavLink>
      <NavLink
        to={"/articles"}
        className={({ isActive }) => (isActive ? active : nonActive)}
      >
        <PencilAltIcon className="w-6 md:w-7" />
        {!sidebar && (
          <h1 className="text-lg hidden font-medium md:flex">Artikel</h1>
        )}
      </NavLink>
      <NavLink
        to={"/category"}
        className={({ isActive }) => (isActive ? active : nonActive)}
      >
        <ClipboardListIcon className="w-6 md:w-7" />
        {!sidebar && (
          <h1 className="text-lg hidden font-medium md:flex">Kategori</h1>
        )}
      </NavLink>
      <NavLink
        to={"/articel"}
        className={({ isActive }) => (isActive ? active : nonActive)}
      >
        <ChartBarIcon className="w-6 md:w-7" />
        {!sidebar && (
          <h1 className="text-lg hidden font-medium md:flex">Analisis</h1>
        )}
      </NavLink>
      <div className="border-b dark:border-[#3A3B3C]" />
      <NavLink
        to={"/articel"}
        className={({ isActive }) => (isActive ? active : nonActive)}
      >
        <UserAddIcon className="w-6 md:w-7" />
        {!sidebar && (
          <h1 className="text-lg hidden font-medium md:flex">Pengguna</h1>
        )}
      </NavLink>

      <NavLink
        to={"/articel"}
        className={({ isActive }) => (isActive ? active : nonActive)}
      >
        <CogIcon className="w-6 md:w-7" />
        {!sidebar && (
          <h1 className="text-lg hidden font-medium md:flex">Pengaturan</h1>
        )}
      </NavLink>
      <div className="border-b dark:border-[#3A3B3C]" />
      <NavLink
        to={"/articel"}
        className={({ isActive }) => (isActive ? active : nonActive)}
      >
        <ChatIcon className="w-6 md:w-7" />
        {!sidebar && (
          <h1 className="text-lg hidden font-medium md:flex">Masukan</h1>
        )}
      </NavLink>
    </div>
  );
}

export default Sidebar;

import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navigation() {
  const navigate = useNavigate();
  const Link = ({ image, path }) => {
    return (
      <li
        className="bg-white rounded-full p-1 cursor-pointer"
        onClick={() => navigate(path)}
      >
        <img src={`${image}`} width={30} alt="" className="rounded-full" />
      </li>
    );
  };

  return (
    <nav className="w-full flex justify-center items-center">
      <ul className="flex gap-1 bg-black bg-opacity-50 rounded-full p-1">
        <Link image="/icons/add.svg" path="/new" />
        <Link image="/icons/global.svg" path="/" />
        <Link image="/icons/account.svg" path="/signin-signup" />
      </ul>
    </nav>
  );
}

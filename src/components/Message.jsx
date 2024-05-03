import React from "react";
import { useSelector } from "react-redux";

export default function Message({ message }) {
  const { user } = useSelector((state) => state.user);

  const isuser = user._id === message.sender;

  return (
    <div
      className={`"w-full flex " ${
        isuser
          ? "justify-end text-end"
          : "justify-end text-start flex-row-reverse"
      }`}
    >
      <h1 className="bg-white py-1 px-2 rounded-lg drop-shadow-lg max-w-[75%]">
        {message.text}
      </h1>
      <div className="flex justify-center items-start">
        <img
          src={`/icons/profile/${user.avatar}.svg`}
          className="rounded-full"
          width={35}
          alt=""
        />
      </div>
    </div>
  );
}

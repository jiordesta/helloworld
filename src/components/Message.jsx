import React from "react";

export default function Message({ message }) {
  return (
    <div
      className={`"w-full flex " ${
        message.isUser
          ? "justify-end text-end"
          : "justify-end text-start flex-row-reverse"
      }`}
    >
      <h1 className="bg-white py-1 px-2 rounded-lg drop-shadow-lg max-w-[75%]">
        {message.data}
      </h1>
      <div className="flex justify-center items-start">
        <img
          src="/icons/profile/1.svg"
          className="rounded-full"
          width={35}
          alt=""
        />
      </div>
    </div>
  );
}

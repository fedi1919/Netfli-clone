import React from "react";

const Icon = ({ item }) => {
  return (
    <div className="m-2 cursor-pointer  hover:scale-150 ease-in duration-500 ">
      <img
        className="rounded-full w-[140px] h-[70px] object-fill"
        src={`https://image.tmdb.org/t/p/w500/${item?.profile_path}`}
        alt={item?.title}
      />

      <h2 className="text-white text-bold text-sm  text-center ">
        {item?.name}
      </h2>

      <h3 className="text-gray-400 text-sm text-center group-hover:hidden ">
        {item?.character}
      </h3>
    </div>
  );
};

export default Icon;

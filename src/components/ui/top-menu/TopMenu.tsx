'use client'
import { RouterApp, titleFont } from "@/config";
import { useUiStore } from "@/store";
import Link from "next/link";
import React from "react";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";

export const TopMenu = () => {

  const openSideMenu = useUiStore((state) => state.openSideMenu)

  return (
    <nav className="flex px-5 justify-between items-center w-full">
      {/*Logo */}
      <div>
        <Link href={RouterApp.home}>
          <span className={`${titleFont.className} antialiased font-bold`}>
            Tienda
          </span>
          <span>| Carlos</span>
        </Link>
      </div>

      {/*Center Menu */}
      <div className=" hidden sm:block">
        <Link
          href={RouterApp.categoryMen}
          className="m-2 rounded-md transition-all hover:bg-gray-100"
        >
          Hombres
        </Link>

        <Link
          href={RouterApp.categoryWomen}
          className="m-2 rounded-md transition-all hover:bg-gray-100"
        >
          Mujeres
        </Link>

        <Link
          href={RouterApp.categoryKids}
          className="m-2 rounded-md transition-all hover:bg-gray-100"
        >
          Niños
        </Link>
      </div>

      {/*Search, Cart, Menu*/}
      <div className="flex items-center">
        <Link href={RouterApp.search} className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>

        <Link href={RouterApp.cart} className="mx-2">
          <div className="relative">
            <span className="absolute text-xs px-1 rounded-full  font-bold -top-2 bg-blue-700 text-white -right-2">
              3
            </span>
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>

        <button
          onClick={()=>openSideMenu()}
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">
          Menu
        </button>
      </div>
    </nav>
  );
};

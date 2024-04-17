"use client";
import Link from "next/link";
import Image from "next/image";
import headerImg from "@/public/IMG_20221126_101739-removebg-preview.png";

import { HiMenu } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { tweenAnimateFromLeft10 } from "@/utils/variants";

const Header = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <section id="header" className="bg-color2   h-[470px] sm:min-h-screen">
      <header className=" shadow-md  w-full">
        <div className="py-5 px-[2vmax] lg:px-[4vmax]  flex flex-col gap-5 lg:flex-row lg:justify-between lg:items-center">
          <div className="flex justify-between items-center z-40 ">
            <Link
              href="/"
              className="text-xl  flex items-center font-bold rounded-2xl px-2 ubuntu text-[#fafafa] "
            >
              <Image src={"/rlogo1.png"} width={250} height={70} alt="logo" />
            </Link>

            <button
              className="HAMBURGER-ICON-MD ||  lg:hidden || space-y-[6px] p-1 || flex flex-col justify-center items-center"
              onClick={handleOpen}
            >
              <span
                className={` block ||  h-0.5 w-6  bg-gray-100 ||    transition-all duration-300  || ${
                  open ? "-rotate-45 translate-y-2" : ""
                } `}
              ></span>
              <span
                className={` block ||  h-0.5 w-6  bg-gray-100 ||   transition-all origin-right  duration-300    || ${
                  open ? "w-0 bg-transparent" : ""
                }  `}
              ></span>
              <span
                className={` block ||  h-0.5 w-6  bg-gray-100 ||    transition-all duration-300  H| ${
                  open ? "rotate-45 -translate-y-2" : ""
                }   `}
              ></span>
            </button>
          </div>

          <div
            className={`flex pb-5 pt-5   text-white duration-500 ease-in-out  flex-col lg:gap-5 gap-10 absolute lg:static  ${
              open
                ? "bg-color1 lg:bg-black top-0 left-0 pl-[3vmax] w-[180px] pt-[35px] items-start shadow-md    h-[100vh] "
                : "top-0  left-[-100%] h-[100vh] "
            } lg:h-[100%]  lg:flex-row lg:justify-between lg:items-center  lg:w-[60%] lg:shadow-none z-[999] pt-[10px] lg:-0`}
          >
            <Link
              href={"/"}
              className="text-md navlink relative text-white hover:text-gray-200 duration-300 "
            >
              Home
            </Link>

            <Link
              href={"#about"}
              className="text-md navlink relative text-white hover:text-gray-200 duration-300"
              scroll={false}
            >
              About
            </Link>
            <Link
              href={"#skills"}
              className="text-md navlink relative text-white hover:text-gray-200 duration-300"
              scroll={false}
            >
              Skills
            </Link>
            <Link
              href={"#services"}
              className="text-md navlink relative text-white hover:text-gray-200 duration-300"
              scroll={false}
            >
              Services
            </Link>
            <Link
              href={"#projects"}
              className="text-md navlink relative text-white hover:text-gray-200 duration-300"
              scroll={false}
            >
              My Projects
            </Link>
            <Link
              href={"#contactme"}
              className="text-md navlink relative text-white hover:text-gray-200 duration-300"
              scroll={false}
            >
              Contact
            </Link>
          </div>
        </div>
      </header>
    </section>
  );
};

export default Header;

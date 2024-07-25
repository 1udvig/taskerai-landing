import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
// import { Github } from "lucide-react";

type pageUrl = `/${string}`;
const NavItem = ({ text, page }: { text: string; page: pageUrl }) => {
  // className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-light"
  return (
    <Link
      href={page}
      className="  hover:text-foreground/80 text-foreground/60 text-sm"
    >
      {text}
    </Link>
  );
};

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0  bg-slate-100 bg-opacity-30 backdrop-blur-md z-10 p-2 sm:p-3 border-b-gray-200 border">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center ">
            <div className="flex-shrink-0">
              <h1 className="text-foreground  text-center  font-medium tracking-tighter text-sm md:text-2xl lg:leading-[1.1] text-balance">
                Tasker
                <span className="bg-slate-900 px-2 ml-1 rounded-md">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500 scale-50">
                    AI
                  </span>
                </span>
              </h1>
            </div>

            <div className="ml-2 sm:ml-10 flex items-baseline space-x-2 sm:space-x-6">
              <NavItem text="Home" page="/" />
              <NavItem text="Features" page="/features" />
              <NavItem text="Pricing" page="/pricing" />
              <NavItem text="ROI" page="/roi" />
              {/* <NavItem text="Contact" /> */}
            </div>
          </div>
          <Link href={"https://github.com/1udvig/taskerai"}>
            <Image src={"github.svg"} alt="github" width={20} height={20} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

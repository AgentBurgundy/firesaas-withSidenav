"use client";

import { useAuth } from "@/lib/context/AuthContext";
import { auth } from "@/lib/firebase/firebaseClient";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar({ children }: any) {
  const { currentUser, isLoadingAuth } = useAuth();
  const router = useRouter();

  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <>
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <div className="w-full navbar">
            <div className="flex-none">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
                onClick={() => {
                  setShowUserMenu(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <Link
              className="btn btn-ghost font-extrabold text-xl mx-2"
              href={"/"}
            >
              FireSaaS
            </Link>
            <div className="flex-1"></div>
            <div className="flex-none hidden md:block">
              {/* <ul className="menu menu-horizontal">
                <li>
                  <a>Navbar Item 1</a>
                </li>
                <li>
                  <a>Navbar Item 2</a>
                </li>
              </ul> */}
            </div>
          </div>
          {children}
        </div>

        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200">
            {/* Sidebar content here */}
            <Link
              className="btn btn-ghost font-extrabold text-xl mx-2"
              href={"/"}
            >
              FireSaaS
            </Link>

            {!currentUser && !isLoadingAuth && (
              <li>
                <Link href="/login">Login</Link>
              </li>
            )}

            <div className="flex-grow"></div>

            {currentUser && (
              <div
                onBlur={() => {
                  setShowUserMenu(false);
                }}
                tabIndex={0}
                className="w-full"
              >
                {showUserMenu && (
                  <ul className="menu bg-base-100 rounded-b-none w-full rounded-box">
                    <li
                      onClick={async () => {
                        await signOut(auth);
                      }}
                    >
                      <a>Logout</a>
                    </li>
                  </ul>
                )}

                <div
                  onClick={() => {
                    setShowUserMenu(!showUserMenu);
                  }}
                  className={`w-full btn btn-ghost ${
                    showUserMenu ? "bg-base-100 rounded-t-none" : ""
                  }`}
                >
                  <span>{currentUser.email}</span>
                </div>
              </div>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

"use client";

import Image from "next/image";
import logo from "../assets/logo.svg";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const isUserLoggedIn = session;
  const [providers, setProviders] = useState();
  const [toggleDropDown, setToggleDropDown] = useState();

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };
    fetchProviders();
  }, []);
  return (
    <nav className="w-full mt-10 flex justify-between">
      <Link href="/" className="flex">
        <Image
          src={logo}
          width={30}
          height={30}
          alt="prompton"
          className="mr-4"
        />
        <div className="logo_text">Prompton</div>
      </Link>

      {/* Desktop navigation */}
      <div className="sm:flex hidden">
        {
          // session
          isUserLoggedIn ? (
            <div className="flex gap-3 md:gap-5">
              <Link href="/create-prompt" className="black_btn mr-2">
                Create Post
              </Link>
              <button
                type="button"
                className="outline_btn"
                onClick={() => {
                  signOut();
                }}
              >
                Sign Out
              </button>
              <Link href="/profile">
                <Image
                  src={session?.user.image}
                  width={30}
                  height={30}
                  alt="profile"
                  className="mr-4 rounded-full"
                />
              </Link>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    Sign In
                  </button>
                ))}
            </>
          )
        }
      </div>

      {/* Mobile navigation */}
      <div className="sm:hidden flex relative">
        {
          // session
          isUserLoggedIn ? (
            <div className="flex">
              <Image
                src={session?.user.image}
                width={30}
                height={30}
                alt="profile"
                className="mr-4 rounded-full"
                onClick={() => setToggleDropDown((prev) => !prev)}
              />
              {toggleDropDown && (
                <div className="dropdown">
                  <Link
                    href="/profile"
                    className="dropdown_link"
                    onClick={() => setToggleDropDown(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/create-prompt"
                    className="dropdown_link"
                    onClick={() => setToggleDropDown(false)}
                  >
                    Create Post
                  </Link>
                  <button
                    type="button"
                    className="mt-5 w-full black_btn"
                    onClick={() => {
                      setToggleDropDown(false);
                      signOut();
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    Sign In
                  </button>
                ))}
            </>
          )
        }
      </div>
    </nav>
  );
};

export default Nav;

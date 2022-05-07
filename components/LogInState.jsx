import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { magic } from "lib/magic_login/magicClient";
import { useTranslation } from "next-i18next";
const LogInState = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const { t } = useTranslation("common");
  // const [username, setUsername] = useState("QQ");
  const router = useRouter();
  const handleShowDropdown = (e) => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
  };
  const handleSignout = async (e) => {
    e.preventDefault();
    try {
      await magic.user.logout();
      console.log(await magic.user.isLoggedIn());
      router.push("/login");
    } catch (err) {
      console.error("Error during logging out api call");
      router.push("/login");
    }
  };

  useEffect(async () => {
    // userMetaData

    try {
      const { email, publicAddress } = await magic.user.getMetadata();
      if (email) {
        setUserEmail(email);
      }
    } catch (err) {
      console.error("Something wrong during magic getMetaData call", err);
    }
  }, []);

  return (
    <nav className="flex group ml-auto lg:inline-flex lg:w-auto w-full px-3 py-2 items-center lg:justify-center overflow-hidden">
      <button
        className="font-bold flex items-center overflow-hidden group-hover:bg-gray-600 group-hover:rounded "
        onClick={handleShowDropdown}
      >
        <a className="text-base font-bold group-hover:text-white mb-0 text-ellipsis">
          {userEmail}
        </a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#2C68A1"
          className={`fill-slate-900 group-hover:fill-white lg:rotate-0 ${
            showDropdown && "-rotate-90"
          }`}
        >
          <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
          <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
        </svg>
        {/** Expand more icon */}
        {/* <Image
            src={"/svg/expand_more.svg"}
            alt="Expand dropdown"
            width="24px"
            height="24px"
            className="fill-slate-900"
          /> */}
      </button>

      {showDropdown && (
        <div className="absolute mt-0 ml-48 lg:ml-0 lg:mt-32 px-2 py-1 lg:px-4 lg:py-2 bg-slate-200 border-[1px] rounded	border-blue-400	">
          <div>
            <a
              className="block px-2 text-sm lg:text-base leading-5 rounded "
              onClick={handleSignout}
            >
              {t("sign_out")}
            </a>
            <div className="px-2"></div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default LogInState;

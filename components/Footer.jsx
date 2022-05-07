import { useState } from "react";
import { useEffect } from "react";
import En from "components/i18/en";
import Zh from "components/i18/zh";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();
  const [toggle, setToggle] = useState(router.locale === "zh");
  // console.log(router.locale === "zh");
  const toggleClass = " transform translate-x-3 lg:translate-x-6";

  const { pathname, asPath, query } = router;
  const handleLanguage = () => {
    setToggle(!toggle);
    console.log(router.locale);
    // if (toggle === false) {
    router.push({ pathname, query }, asPath, {
      locale: router.locale === "en" ? "zh" : "en",
    });
    // console.log("hi");
    // } else {
    //   router.push({ pathname, query }, asPath, { locale: "zh" });
    // }
  };
  return (
    <footer className="bg-gray-300 h-7 lg:h-16 w-full flex justify-center items-center fixed inset-x-0 bottom-0 space-x-2 lg:space-x-3">
      <Zh toggle={toggle}></Zh>
      <div className="flex flex-col justify-center items-center">
        {/*   Switch Container */}

        <div
          className="md:w-14 md:h-7 w-8 lg:w-12 h-3 lg:h-6 flex items-center bg-gray-400 rounded-full p-1 cursor-pointer"
          onClick={handleLanguage}
        >
          {/* Switch */}
          <div
            className={
              "bg-black md:w-6 md:h-6 h-3 w-3 lg:h-5 lg:w-5 rounded-full shadow-md transform duration-300 ease-in-out" +
              (toggle ? null : toggleClass)
            }
          ></div>
        </div>
      </div>
      <En toggle={toggle}></En>
    </footer>
  );
};

export default Footer;

import { useEffect, useState } from "react";
import { BiArrowFromBottom } from "react-icons/bi";

import { classNames } from "utils/classNames";

const LocalScrollToTop = ({ bottomPosition, rightPosition, id }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (document.getElementById(id).scrollTop > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    document.getElementById(id).scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const body = document.getElementById(id);
    body.addEventListener("scroll", toggleVisibility);

    return () => {
      body.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-2 right-2 z-30">
      <button
        type="button"
        onClick={scrollToTop}
        className={classNames(
          isVisible ? "opacity-100" : "hidden",
          "bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 inline-flex items-center rounded-full p-3 text-white shadow-sm transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2"
        )}
      >
        <BiArrowFromBottom className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
};

export default LocalScrollToTop;

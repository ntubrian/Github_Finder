import { useEffect, useState } from "react";
import { BiArrowFromBottom } from "react-icons/bi";
import { useRouter } from "next/router";
import { classNames } from "utils/classNames";

const GlobalScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const hiddenRoute = {
    LOGIN: "login",
  };
  const [isHiddenRoute, setHidden] = useState(
    router.route === hiddenRoute.LOGIN
  );

  useEffect(() => {
    if (router.route !== hiddenRoute.LOGIN) {
      setHidden(false);
    }
  }, [router.route]);

  const toggleVisibility = () => {
    if (window.pageYOffset > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div
      className={`${isHiddenRoute ? "hidden" : ""}fixed bottom-2 right-2 z-30`}
    >
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

export default GlobalScrollToTop;

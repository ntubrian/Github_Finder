import "styles/globals.css";
import "styles/variables.less";
import { Router, useRouter } from "next/router";
import nProgress from "nprogress";
import "styles/nprogress.css";
import UserProvider from "context/github-user-context";
import UsersProvider from "context/github-users-context";
import Navbar from "components/Navbar";
import GlobalScrollToTop from "components/GlobalScrollToTop";
import { useEffect, useState } from "react";
import { magiclink } from "lib/magic_login/magicClient";
import { appWithTranslation } from "next-i18next";
import Footer from "components/Footer";
Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);
function MyApp({ Component, pageProps }) {
  // console.log(process.env.NODE_ENV);
  // console.log(process.env.NEXT_PUBLIC_VERCEL_URL);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  // const [isLoggedIn, setLoggedIn] = useState(false);
  // console.log(router.locale);
  const magic = magiclink(router.locale);

  // const checkLog = async () => {
  //   return await magic.user.isLoggedIn();
  // };
  // const isLoggedIn = ;
  useEffect(async () => {
    // const logOrNot = await checkLog();
    // console.log(isLoggedIn);
    // setLoggedIn(logOrNot);

    const isLoggedIn = await magic.user.isLoggedIn();
    if (isLoggedIn) {
      router.push(router.asPath);
    } else {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);
  return isLoading ? (
    <div className="bg-white flex space-x-2 p-5 rounded-full justify-center items-center">
      <div className="bg-blue-600 p-2  w-4 h-4 rounded-full animate-bounce "></div>
      <div className="bg-green-600 p-2 w-4 h-4 rounded-full animate-bounce animation-delay-200"></div>

      <div className="bg-red-600 p-2  w-4 h-4 rounded-full animate-bounce animation-delay-400"></div>
    </div>
  ) : (
    <UsersProvider>
      <UserProvider>
        <Navbar title="GitHub Finder" magic={magic}></Navbar>
        <GlobalScrollToTop></GlobalScrollToTop>
        <Component
          style={{ backgroundImage: "url(/img/wall_paper.jpg)" }}
          magic={magic}
          {...pageProps}
        />
        <Footer></Footer>
      </UserProvider>
    </UsersProvider>
  );
}

export default appWithTranslation(MyApp);

import "styles/globals.css";
import "styles/variables.less";
import { Router } from "next/router";
import nProgress from "nprogress";
import "styles/nprogress.css";
import UserProvider from "context/github-user-context";
import UsersProvider from "context/github-users-context";
import Navbar from "components/Navbar";
import GlobalScrollToTop from "components/GlobalScrollToTop";
Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);
function MyApp({ Component, pageProps }) {
  return (
    <UsersProvider>
      <UserProvider>
        <Navbar title="hi"></Navbar>
        <GlobalScrollToTop></GlobalScrollToTop>
        <Component {...pageProps} />
      </UserProvider>
    </UsersProvider>
  );
}

export default MyApp;

import "../styles/globals.css";
import "../styles/variables.less";
import { Router } from "next/router";
import nProgress from "nprogress";
import "/styles/nprogress.css";
import UserProvider from "../context/github-user-context";
import Navbar from "../components/Navbar";
Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);
function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Navbar title="hi"></Navbar>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;

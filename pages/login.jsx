import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { magic } from "lib/magic_login/magicClient";
const Login = () => {
  const [email, setEmail] = useState("");
  const [userMsg, setUserMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bounceDot, setBounceDot] = useState(true);
  const router = useRouter();
  const handleOnChangeEmail = (e) => {
    setUserMsg("");
    const email = e.target.value;
    setEmail(email);
  };

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();
    if (email) {
      // router.push("/");
      try {
        setIsLoading(true);
        const didToken = await magic.auth.loginWithMagicLink({
          email: email,
        });
        console.log({ didToken });
        if (didToken) {
          router.push("/");
        }
        // {didToken: 'WyIweDIxNjc3YTQzMTRhNTdmMDU4ZTg5ZWMwM2M0MjBiODE0Mm…hMGE2ZWM0MTg2MWRiNGEwOTc0ZTgyYmZlZTNkNzFiXCJ9Il0='}
      } catch (err) {
        // Handle errors if required!
        console.error("Bug in magic login api call");
        console.log(err);
        setIsLoading(false);
      }
    } else {
      setUserMsg("Enter a valid email address");
      setIsLoading(false);
    }
  };
  const handleRemoveDot = () => {
    setBounceDot(false);
  };

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
  return (
    <div className="">
      <Head>
        <title>User Sign In</title>
      </Head>
      <main className="w-full h-full relative flex z-10 justify-center mt-16 lg:mt-40">
        <div className="flex flex-col pb-20 pt-8 bg-slate-300 lg:h-2/6 px-6 lg:px-12 rounded-md mx-8 shadow-lg min-w-[292px]">
          <h1 className="font-bold mb-8">Sign In</h1>
          {bounceDot && (
            <span className="flex h-3 w-3 absolute mt-12">
              <span className="animate-ping  inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </span>
          )}
          <input
            type="text"
            placeholder="Email address"
            className="p-1 w-full  h-12 text-base lg:text-xl"
            onChange={handleOnChangeEmail}
            onFocus={handleRemoveDot}
          />

          <p className={`my-1 text-slate-700 w-full rounded-md mt-6`}>
            {userMsg}
          </p>
          <button
            type="button"
            onClick={handleLoginWithEmail}
            className={`bg-blue-400 px-12 py-2 md:text-xl leading-7 text-white inline-flex items-center justify-center space-x-3 rounded-full whitespace-nowrap ${
              isLoading && "cursor-progress disabled:opacity-50"
            }`}
            disabled={isLoading}
          >
            <span className="" aria-hidden="true">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.1474 2.1798L2.63237 12.2521C1.73316 12.7596 1.81135 14.0869 2.74966 14.4773L8.26222 16.7417V20.7237C8.26222 21.934 9.70878 22.4415 10.4516 21.5436L12.8365 18.6546L17.7626 20.6847C18.5054 20.997 19.3655 20.5285 19.4828 19.7087L21.985 3.42907C22.1413 2.41404 21.0467 1.63324 20.1474 2.1798ZM9.51329 20.7237V17.2882L11.6245 18.1471L9.51329 20.7237ZM18.2708 19.5525L10.1779 16.1951L17.9972 7.02074C18.1926 6.7865 17.8799 6.47418 17.6453 6.66938L7.67578 15.1801L3.25791 13.3452L20.773 3.23388L18.2708 19.5525Z"
                  fill="#FFFFFF"
                  fill-opacity="1"
                ></path>
              </svg>
            </span>

            {isLoading ? <span>Loading</span> : <span>Send Magic Link</span>}
          </button>
          {isLoading && (
            <div className="flex justify-center h-6">
              <div className="circle animate-loader"></div>
              <div className="circle animate-loader animation-delay-200"></div>
              <div className="circle animate-loader animation-delay-400"></div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Login;

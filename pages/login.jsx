import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { magic } from "lib/magic_login/magicClient";
const Login = () => {
  const [email, setEmail] = useState("");
  const [userMsg, setUserMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleOnChangeEmail = (e) => {
    setUserMsg("");
    const email = e.target.value;
    setEmail(email);
  };

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();
    if (email) {
      if (email === "k333hoisi@gmail.com") {
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
      }
    } else {
      setUserMsg("Enter a valid email address");
      setIsLoading(false);
    }
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
      <main className="w-full h-full relative flex z-10 justify-center mt-40">
        <div className="flex flex-col pb-20 pt-8 bg-slate-300 h-2/6 px-12 rounded-md">
          <h1 className="font-bold mb-8">Sign In</h1>

          <input
            type="text"
            placeholder="Email address"
            className="p-1 w-full pb-4 h-12 text-xl"
            onChange={handleOnChangeEmail}
          />

          <p className={`my-1 text-slate-700 w-full rounded-md mt-6`}>
            {userMsg}
          </p>
          <button
            type="button"
            onClick={handleLoginWithEmail}
            className={`bg-blue-400 px-12 py-2 text-xl leading-7 ${
              isLoading && "cursor-progress disabled:opacity-50"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Loading" : "Sign in"}
          </button>
          {isLoading && (
            <div className="flex justify-center h-6">
              <div className=" circle animate-loader"></div>
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

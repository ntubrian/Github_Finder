import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const repos = (props) => {
  const routerProps = useRouter();
  const userName = routerProps.query.username;
  const [userMeta, setUserMeta] = useState("");
  // console.log(routerProps.query);
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          `../../api/getUserRepos?username=${userName}`
        );
        const result = await response.json();
        setUserMeta(result);
        console.log(result);
      } catch (error) {
        console.error("api response error");
      }
    };
    fetchRepos();
  }, []);
  return (
    <div>
      <p>{routerProps.query.username}</p>
      <div>
        {typeof userMeta !== "undefined" &&
        typeof userMeta.data !== "undefined" &&
        typeof userMeta.data[0] !== "undefined" &&
        typeof userMeta.data[0].id !== "undefined"
          ? <p>{userMeta.data[0].id}</p> && (
              <ol>
                {userMeta.data.map((data) => {
                  return (
                    <li>
                      <span>{data.name}</span>
                      <span> 🌟{data.stargazers_count}</span>
                    </li>
                  );
                })}
              </ol>
            )
          : "no data"}
      </div>
    </div>
  );
};

export default repos;

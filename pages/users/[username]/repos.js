import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { List, message, Avatar, Skeleton, Divider, Empty } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import "antd/dist/antd.css";
const repos = (props) => {
  // console.log("props", props);
  const routerProps = useRouter();
  console.log("routerProps", routerProps);
  const userName = routerProps.query.username;
  const publicRepoLength = routerProps.query.public_repos;

  // console.log("routerProps",routerProps)
  const [userMeta, setUserMeta] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  // console.log(routerProps.query);
  const ContainerHeight = 400;
  const onScroll = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop === ContainerHeight) {
      setPage((prev) => prev + 1);
      fetchRepos();
    }
  };
  const fetchRepos = async () => {
    if (loading) {
      return;
    }
    setPage((prev) => prev + 1);
    setLoading(true);
    try {
      const response = await fetch(
        `../../api/getUserRepos?username=${userName}&page=${page}`
      );
      const result = await response.json();
      setUserMeta(userMeta.concat(result.data));
      setLoading(false);
      console.log(result);
    } catch (error) {
      console.error("api response error");
      setLoading(false);
    }
    console.log(userMeta);
  };

  useEffect(() => {
    fetchRepos();
  }, []);
  return (
    <div>
      <p>{routerProps.query.username}</p>
      {/* <div>
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
      </div> */}
      <div
        style={{
          padding: "24px",
        }}
      >
        <div
          id="scrollableDiv"
          style={{
            height: 400,
            overflow: "auto",
            padding: "0 16px",
            border: "1px solid rgba(140, 140, 140, 0.35)",
          }}
        >
          <InfiniteScroll
            dataLength={userMeta.length}
            next={fetchRepos}
            hasMore={userMeta.length < publicRepoLength}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget="scrollableDiv"
          >
            <List
              dataSource={userMeta}
              locale={{ emptyText: "Loading" }}
              renderItem={(item) => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    // avatar={<Avatar src={item.picture.large} />}
                    title={item.name}
                    description={`🌟${item.stargazers_count}`}
                  />
                  <div>{item.stargazers_count}</div>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      </div>
      <div>
        <p>{page}</p>
      </div>
    </div>
  );
};

export default repos;

import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { UserContext, ACTION_TYPES } from "../../../_app";
import { List, message, Avatar, Skeleton, Divider, Empty } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

import "antd/dist/antd.css";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import style from "../../../../styles/repos.module.css";
const repos = (props) => {
  // console.log("props", props);
  const routerProps = useRouter();
  // console.log("routerProps", routerProps);
  const { indexPageState, dispatch } = useContext(UserContext);
  console.log("###indexPageState###", indexPageState);
  const userName = routerProps.query.username;

  // 跳到這個route才設定inputUserName可能有點怪？
  // **更 到Results.js 那邊設定

  const publicRepoLength = routerProps.query.public_repos;

  console.log("routerProps", routerProps);
  const [userMeta, setUserMeta] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  console.log(userMeta);
  const ContainerHeight = 400;
  const onScroll = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop === ContainerHeight) {
      setPage((prev) => prev + 1);
      fetchRepos();
    }
  };
  const setSeletedRepoContext = (item) => {
    dispatch({
      type: ACTION_TYPES.SET_SELECTED_REPO_NAME,
      payload: { selectedRepoName: item.name },
    });
    dispatch({
      type: ACTION_TYPES.SET_SELECTED_REPO_NODE_ID,
      payload: { selectedRepoNodeId: item.node_id },
    });
    dispatch({
      type: ACTION_TYPES.SET_SELECTED_REPO_DESCRIPTION,
      payload: { selectedRepoDescription: item.description },
    });
    dispatch({
      type: ACTION_TYPES.SET_SELECTED_REPO_STAR_COUNTS,
      payload: { selectedRepoStarCounts: item.stargazers_count },
    });
  };
  const fetchRepos = async () => {
    if (loading) {
      return;
    }
    setPage((prev) => prev + 1);
    setLoading(true);
    try {
      const response = await fetch(
        `../../api/getUserRepos?username=${indexPageState.inputUserName}&page=${page}`
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
    // dispatch({
    //   type: ACTION_TYPES.SET_INPUT_USER_NAME,
    //   payload: { inputUserName: userName },
    // });
    fetchRepos();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        paddingTop: "10vh",
      }}
    >
      <Head>
        <title>{`${userName}'s github repos`}</title>
        <meta name="description" content={`${userName}'s github repos`}></meta>
      </Head>
      <div
        style={{
          textAlign: "center",
          paddingLeft: "5vw",
        }}
      >
        <div
          style={{
            // borderRadius: "50%",
            // overflow: "hidden",
            display: "inline",
          }}
        >
          <Image
            src={indexPageState.userAvatarUrl[0]}
            width={260}
            height={160}
            layout="fixed"
            objectFit="cover"
          ></Image>
        </div>
        <h2>{indexPageState.userRealName}</h2>
        <p>{indexPageState.inputUserName}</p>
      </div>
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
            height: 300,
            width: 400,
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
              locale={{
                emptyText:
                  publicRepoLength > 0
                    ? "Loading"
                    : "This guy is so LAZY！！！ Not Even a repo",
              }}
              renderItem={(item) => (
                <Link
                  href={`/users/${userName}/repos/${item.name}@${item.node_id}`}
                >
                  <List.Item
                    key={item.id}
                    onClick={() => setSeletedRepoContext(item)}
                    className={style.listItem}
                  >
                    <List.Item.Meta
                      // avatar={<Avatar src={item.picture.large} />}
                      title={item.name}
                      // description={`🌟${item.stargazers_count}`}
                    />
                    <div>{`🌟${item.stargazers_count}`}</div>
                  </List.Item>
                </Link>
              )}
            />
          </InfiniteScroll>
        </div>
      </div>
      {/* <div>
        <p>{page}</p>
      </div> */}
    </div>
  );
};

export default repos;

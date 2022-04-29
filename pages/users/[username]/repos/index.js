import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import {
  UserContext,
  ACTION_TYPES,
} from "../../../../context/github-user-context";
import { List, Skeleton, Divider } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import "antd/dist/antd.css";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import style from "../../../../styles/repos.module.css";
import Home from "../../../../components/Home";

const repos = (props) => {
  const routerProps = useRouter();
  const [userName, setUserName] = useState(routerProps.query.username);
  const [publicRepoLength, setPublicRepoLength] = useState(
    routerProps.query.public_repos
  );
  const [isBigScreen, setBigScreen] = useState(0);
  const [idArr, setId] = useState(Array(10).fill(0));

  const { indexPageState, dispatch } = useContext(UserContext);
  const [userMeta, setUserMeta] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setBigScreen(window.innerWidth > 600);
  }, []);

  // 跳到這個route才設定inputUserName可能有點怪？
  // **更 到Results.js 那邊設定

  const ContainerHeight = 400;
  const onScroll = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop === ContainerHeight) {
      setPage((prev) => prev + 1);
      fetchRepos();
    }
  };
  const setSeletedRepoContext = (item) => {
    sessionStorage.setItem("selectedRepoName", item.name);
    sessionStorage.setItem("selectedRepoDescription", item.description);
    sessionStorage.setItem("selectedRepoStarCounts", item.stargazers_count);
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
    // dispatch({
    //   type: ACTION_TYPES.SET_USER_AVATAR_URL,
    //   payload: { userAvatarUrl: [meta.data.avatar_url] },
    // });
  };
  const fetchRepos = async () => {
    if (loading) {
      return;
    }
    setPage((prev) => prev + 1);
    setLoading(true);
    try {
      const response = await fetch(
        `../../api/getUserRepos?username=${sessionStorage.getItem(
          "inputUserName"
        )}&page=${page}`
      );
      const result = await response.json();

      const arr = [];

      result.data.forEach((element) => {
        arr.push(element.id);
      });

      setId(idArr.concat(arr));
      setUserMeta(userMeta.concat(result.data));
      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch({
      type: ACTION_TYPES.SET_INPUT_USER_NAME,
      payload: { inputUserName: sessionStorage.getItem("inputUserName") },
    });
    dispatch({
      type: ACTION_TYPES.SET_USER_REAL_NAME,
      payload: { userRealName: sessionStorage.getItem("userRealName") },
    });
    dispatch({
      type: ACTION_TYPES.SET_USER_AVATAR_URL,
      payload: { userAvatarUrl: [sessionStorage.getItem("userAvatarUrl")] },
    });
    dispatch({
      type: ACTION_TYPES.SET_SELECTED_USER_FOLLOWERS,
      payload: {
        selectedUserFollowers: sessionStorage.getItem("selectedUserFollowers"),
      },
    });
    fetchRepos();
    setUserName(routerProps.query.username);
    setPublicRepoLength(routerProps.query.public_repos);
  }, [userName, routerProps]);
  return (
    <div className={style.outerContainer}>
      <Head>
        <title>{`${userName}'s github repos`}</title>
        <meta name="description" content={`${userName}'s github repos`}></meta>
      </Head>

      <div className={style.profileContainer}>
        <div className={style.picContainer}>
          <Image
            src={
              indexPageState.userAvatarUrl.length > 0
                ? indexPageState.userAvatarUrl[0]
                : "https://c.tenor.com/I6kN-6X7nhAAAAAi/loading-buffering.gif"
            }
            width={isBigScreen ? 276 : 200}
            height={isBigScreen ? 276 : 200}
            layout="fixed"
            objectFit="cover"
            className={style.circleAvatar}
          ></Image>
        </div>
        {indexPageState.userRealName !== "null" && (
          <h2>{indexPageState.userRealName}</h2>
        )}
        <p>{indexPageState.inputUserName}</p>
        <p>👥{`${indexPageState.selectedUserFollowers} followers`}</p>
      </div>

      <div className={style.reposContainer}>
        <div
          id="scrollableDiv"
          className={style.scroll}
          style={{
            height: 320,
            width: "55vw",
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
                    : "This guy doesn't leave any public repos",
              }}
              renderItem={(item) => (
                <Link
                  href={`/users/${userName}/repos/${item.name}@${item.node_id}`}
                >
                  <List.Item
                    key={item.id}
                    onClick={() => setSeletedRepoContext(item)}
                    className={`${style.listItem} ${
                      Math.floor(idArr.indexOf(item.id) / 10) % 2 == 1
                        ? style.oddGroupPage
                        : style.evenGroupPage
                    }`}
                  >
                    <List.Item.Meta
                      title={<p className={style.title}>{item.name}</p>}
                    />
                    <div
                      className={style.starContext}
                    >{`⭐${item.stargazers_count}`}</div>
                  </List.Item>
                </Link>
              )}
            />
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default repos;

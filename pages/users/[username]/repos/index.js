import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { UserContext, ACTION_TYPES } from "../../../_app";
import { List, message, Avatar, Skeleton, Divider, Empty } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import pageAccessedByReload from "../../../../lib/pageAccessedByReload";
import "antd/dist/antd.css";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import style from "../../../../styles/repos.module.css";
import Home from "../../../../components/Home";
import { useMediaQuery } from "react-responsive";
const repos = (props) => {
  const [isBigScreen, setBigScreen] = useState(0);

  // const resize = () => {
  //   setBigScreen(window.innerWidth > 600)
  //   if (window.innerWidth > 600) {
  //     setBigScreen(true);
  //   } else {
  //     setBigScreen(false);
  //   }
  // };
  useEffect(() => {
    // window.addEventListener("resize", resize);
    setBigScreen(window.innerWidth > 600);
  }, []);

  // const isMobile = useMediaQuery({ query: `(min-width: 700px)` });
  const [idArr, setId] = useState(Array(10).fill(0));
  // console.log("props", props);
  const routerProps = useRouter();
  // console.log("routerProps", routerProps);
  const { indexPageState, dispatch } = useContext(UserContext);
  // const userName = routerProps.query.username;
  // console.log(userName);
  // 跳到這個route才設定inputUserName可能有點怪？
  // **更 到Results.js 那邊設定

  // const publicRepoLength = routerProps.query.public_repos;
  const [userName, setUserName] = useState(routerProps.query.username);
  const [publicRepoLength, setPublicRepoLength] = useState(
    routerProps.query.public_repos
  );

  const [userMeta, setUserMeta] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  // console.log("@@@@", userMeta);
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
      // console.log(indexPageState.inputUserName);
      const response = await fetch(
        `../../api/getUserRepos?username=${sessionStorage.getItem(
          "inputUserName"
        )}&page=${page}`
      );
      const result = await response.json();

      const arr = [];
      // console.log("DATSTTSTS", result.data);
      // console.log("tyoeof@@@@", typeof result);
      // for (let i = 0; i < result.length; i++) {
      //   // arr.push(result[i].id);
      //   console.log("@");
      //   console.log("########", result.data[i].id);
      // }
      result.data.forEach((element) => {
        arr.push(element.id);
      });
      // console.log("AAA", arr);
      setId(idArr.concat(arr));
      setUserMeta(userMeta.concat(result.data));
      setLoading(false);
      console.log(result);
    } catch (error) {
      console.log(error);
      // console.error("api response error");
      setLoading(false);
    }
    console.log(userMeta);
  };

  // useEffect(() => {
  //   // dispatch({
  //   //   type: ACTION_TYPES.SET_INPUT_USER_NAME,
  //   //   payload: { inputUserName: userName },
  //   // });
  //   // console.log("I'm hot reload", indexPageState.inputUserName);
  //   // if (pageAccessedByReload()) {
  //   //   dispatch({
  //   //     type: ACTION_TYPES.SET_INPUT_USER_NAME,
  //   //     payload: { inputUserName: sessionStorage.getItem("inputUserName") },
  //   //   });
  //   //   alert(`InputUserName${indexPageState.inputUserName}`);
  //   // }
  //   // console.log(sessionStorage.getItem("inputUserName"));
  //   // console.log(indexPageState.inputUserName, "GOGOGOGOGOG");
  //   // console.log(indexPageState.inputUserName);
  //   fetchRepos();
  // }, []);

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

    // console.log(routerProps.query.username);
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
      <div className={style.navContainer}>
        <Home></Home>
        {/* <Back backTo={routerProps.back}></Back> */}
      </div>
      <div
        className={style.profileContainer}
        // style={{
        //   textAlign: "center",
        //   paddingLeft: "5vw",
        // }}
      >
        <div
          className={style.picContainer}
          style={
            {
              // borderRadius: "50%",
              // overflow: "hidden",
              // display: "inline",
            }
          }
        >
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
                      <span> ⭐{data.stargazers_count}</span>
                    </li>
                  );
                })}
              </ol>
            )
          : "no data"}
      </div> */}
      <div
        className={style.reposContainer}
        style={
          {
            // padding: "24px",
          }
        }
      >
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
                      // style={{ color: "white" }}
                      // avatar={<Avatar src={item.picture.large} />}
                      title={<p className={style.title}>{item.name}</p>}
                      // description={`🌟${item.stargazers_count}`}
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
      {/* <div>
        <p>{page}</p>
      </div> */}
    </div>
  );
};

export default repos;

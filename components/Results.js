import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { ACTION_TYPES, UserContext } from "../context/github-user-context";
import { Card } from "antd";
import style from "../styles/Home.module.css";
const Result = (props) => {
  const { inputUserName, meta, debounce } = props;
  const [new_href, setNewHref] = useState("");
  const { indexPageState, dispatch } = useContext(UserContext);
  const { Meta } = Card;
  const [scrrenWidth, setScreenWidth] = useState(0);
  const examineUndefined = () => {
    if (typeof meta !== "undefined" && typeof meta.data !== "undefined") {
      // dispatch({
      //   type: ACTION_TYPES.SET_USER_AVATAR_URL,
      //   payload: { userAvatarUrl: [meta.data.avatar_url] },
      // });
      console.log("I'm Meta", meta);
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (meta?.data?.login) {
      sessionStorage.setItem("inputUserName", meta.data.login);
      sessionStorage.setItem("userRealName", meta.data.name);
      sessionStorage.setItem("userAvatarUrl", meta.data.avatar_url);
      sessionStorage.setItem("selectedUserFollowers", meta.data.followers);
      dispatch({
        type: ACTION_TYPES.SET_INPUT_USER_NAME,
        payload: { inputUserName: meta.data.login },
      });
      dispatch({
        type: ACTION_TYPES.SET_USER_REAL_NAME,
        payload: { userRealName: meta.data.name },
      });
      dispatch({
        type: ACTION_TYPES.SET_USER_AVATAR_URL,
        payload: { userAvatarUrl: [meta.data.avatar_url] },
      });
      dispatch({
        type: ACTION_TYPES.SET_SELECTED_USER_FOLLOWERS,
        payload: { selectedUserFollowers: meta.data.followers },
      });

      setNewHref(
        `users/${meta.data.login}/repos` +
          `?public_repos=${meta.data.public_repos}`
      );
    }
  }, [debounce]);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, [scrrenWidth]);

  // if (inputUserName === "") {
  //   return <Image src="/img/search.png" width={260} height={260}></Image>;
  // }

  return (
    <Link href={meta?.data?.login ? new_href : ""}>
      {/* <Image src={props.imgUrl} width={260} height={160}></Image> */}
      {meta?.data?.login ? (
        <Card
          // size={scrrenWidth < 600 ? "small" : "default"}
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src={meta?.data?.avatar_url} />}
        >
          <Meta
            title={meta?.data?.name == "null" ? "" : meta?.data?.name}
            description={meta?.data?.login}
          />
        </Card>
      ) : (
        <>
          <Image src="/img/no_data.png" width={260} height={260}></Image>
          <h1 className={style.noData}>No data！</h1>
        </>
      )}
    </Link>
  );
};

export default Result;

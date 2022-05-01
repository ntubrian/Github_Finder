import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { ACTION_TYPES, UserContext } from "context/github-user-context";
import { Card } from "antd";
import style from "styles/Home.module.css";
import { getOneUserMeta } from "lib/getOneUserMeta";
const ShowUsersResult = (props) => {
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
  const keepCardInfo = () => {
    sessionStorage.setItem("inputUserName", meta?.login);
    sessionStorage.setItem("userAvatarUrl", meta?.avatar_url);
    dispatch({
      type: ACTION_TYPES.SET_INPUT_USER_NAME,
      payload: { inputUserName: meta?.login },
    });
    dispatch({
      type: ACTION_TYPES.SET_USER_AVATAR_URL,
      payload: { userAvatarUrl: [meta?.avatar_url] },
    });
  };

  useEffect(() => {
    let isUnmount = false;
    const fetchUserMeta = async () => {
      if (meta?.login) {
        // sessionStorage.setItem("inputUserName", meta?.login);
        // sessionStorage.setItem("userRealName", meta.data.name);
        // sessionStorage.setItem("userAvatarUrl", meta?.avatar_url);
        // sessionStorage.setItem("selectedUserFollowers", meta.data.followers);
        // dispatch({
        //   type: ACTION_TYPES.SET_INPUT_USER_NAME,
        //   payload: { inputUserName: meta?.login },
        // });
        // dispatch({
        //   type: ACTION_TYPES.SET_USER_REAL_NAME,
        //   payload: { userRealName: meta.data.name },
        // });
        // dispatch({
        //   type: ACTION_TYPES.SET_USER_AVATAR_URL,
        //   payload: { userAvatarUrl: [meta?.avatar_url] },
        // });
        // dispatch({
        //   type: ACTION_TYPES.SET_SELECTED_USER_FOLLOWERS,
        //   payload: { selectedUserFollowers: meta.data.followers },
        // });
        const returnPicAndName = await getOneUserMeta(inputUserName);
        if (!isUnmount) {
          setNewHref(
            `users/${meta.login}/repos` +
              `?public_repos=${returnPicAndName?.data?.public_repos}`
          );
        }
      }
    };
    fetchUserMeta();
    return () => (isUnmount = true);
  }, [debounce]);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, [scrrenWidth]);

  return (
    <Link href={meta?.login ? new_href : ""}>
      {meta?.login ? (
        <Card
          // size={scrrenWidth < 600 ? "small" : "default"}
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src={meta?.avatar_url} />}
          onClick={keepCardInfo}
          className={style.transForm}
        >
          <Meta
            title={meta?.login == "null" ? "" : meta?.login} // 這邊要記得改為 .name
            description="visit profile"
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

export default ShowUsersResult;

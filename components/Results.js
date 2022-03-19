import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { ACTION_TYPES, UserContext } from "../pages/_app";
import { Card } from "antd";
import style from "../styles/Home.module.css";
const Result = (props) => {
  const { userName, meta } = props;
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
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (examineUndefined()) {
      console.log("###Meta", meta.data.login);
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
  }, [userName, meta]);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, [scrrenWidth]);

  return (
    <Link href={examineUndefined() ? new_href : ""}>
      {/* <Image src={props.imgUrl} width={260} height={160}></Image> */}
      {examineUndefined() ? (
        <Card
          size={scrrenWidth < 600 ? "small" : "default"}
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src={indexPageState.userAvatarUrl[0]} />}
        >
          <Meta
            title={indexPageState.userRealName}
            description={indexPageState.inputUserName}
          />
        </Card>
      ) : (
        <>
          <Image src="/img/no_data.png" width={260} height={260}></Image>
          <div className={style.noData}>No data！</div>
        </>
      )}
    </Link>
  );
};

export default Result;

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { ACTION_TYPES, UserContext } from "../pages/_app";

const Result = (props) => {
  const { userName, meta } = props;
  const [new_href, setNewHref] = useState("");
  const { indexPageState, dispatch } = useContext(UserContext);
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
      setNewHref(
        `users/${meta.data.login}/repos` +
          `?public_repos=${meta.data.public_repos}`
      );
    }
  }, [userName, meta]);

  return (
    <Link href={examineUndefined() ? new_href : ""}>
      {/* <Image src={props.imgUrl} width={260} height={160}></Image> */}
      {examineUndefined() ? (
        <div>
          <p>{meta.data.name}</p>
          <Image src={meta.data.avatar_url} width={260} height={160}></Image>
        </div>
      ) : (
        <p>no data</p>
      )}
    </Link>
  );
};

export default Result;

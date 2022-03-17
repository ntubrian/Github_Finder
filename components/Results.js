import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { ACTION_TYPES, UserContext } from "../pages/_app";

const Result = (props) => {
  const { href, meta } = props;
  const [new_href, setNewHref] = useState("");
  const { dispatch } = useContext(UserContext);
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
      setNewHref(href + `?public_repos=${meta.data.public_repos}`);
      
      dispatch({
        type: ACTION_TYPES.USER_REAL_URL,
        payload: { userRealName: meta.data.name },
      });
      dispatch({
        type: ACTION_TYPES.SET_USER_AVATAR_URL,
        payload: { userAvatarUrl: [meta.data.avatar_url] },
      });
    }
  }, [href, meta]);
  console.log(meta);
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

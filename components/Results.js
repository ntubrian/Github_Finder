import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
const Result = (props) => {
  const { href, meta } = props;
  const [new_href, setNewHref] = useState("");
  const examineUndefined = () => {
    if (typeof meta !== "undefined" && typeof meta.data !== "undefined") {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (examineUndefined()) {
      setNewHref(href + `?public_repos=${meta.data.public_repos}`);
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

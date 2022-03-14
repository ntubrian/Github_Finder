import Link from "next/link";
import Image from "next/image";
const Result = (props) => {
  const { href, meta } = props;
  const examineUndefined = () => {
    if (typeof meta !== "undefined" && typeof meta.data !== "undefined") {
      return true;
    }
    return false;
  };
  console.log(meta);
  return (
    <Link href={href}>
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

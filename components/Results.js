import Link from "next/link";

const Result = (props) => {
  return (
    <Link href={props.href}>
      <Image src={props.imgUrl} width={260} height={160}></Image>
    </Link>
  );
};

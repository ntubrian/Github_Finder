import Link from "next/link";
import { ArrowLeftOutlined } from "@ant-design/icons";
import style from "/styles/repo.module.css";
const Back = (props) => {
  const backTo = props.backTo;
  return <ArrowLeftOutlined className={style.back} onClick={backTo} />;
};

export default Back;

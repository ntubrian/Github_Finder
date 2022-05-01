import Link from "next/link";
import { HomeOutlined } from "@ant-design/icons";
import style from "styles/repo.module.css";
const Home = (props) => {
  return (
    <Link href="/">
      <HomeOutlined className={style.home} />
    </Link>
  );
};

export default Home;

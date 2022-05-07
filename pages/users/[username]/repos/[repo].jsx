import Head from "next/head";
import { useEffect, useContext } from "react";
import { UserContext, ACTION_TYPES } from "context/github-user-context";
import style from "styles/repo.module.css";
import { Button } from "antd";
import { useRouter } from "next/router";
import Back from "components/Back";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
export async function getServerSideProps(context) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common"])),
    },
  };
}
const repo = (props) => {
  const { indexPageState, dispatch } = useContext(UserContext);
  const router = useRouter();
  const { t } = useTranslation("common");
  const restoreBackUp = () => {
    dispatch({
      type: ACTION_TYPES.SET_INPUT_USER_NAME,
      payload: { inputUserName: sessionStorage.getItem("inputUserName") },
    });
    dispatch({
      type: ACTION_TYPES.SET_SELECTED_REPO_NAME,
      payload: { selectedRepoName: sessionStorage.getItem("selectedRepoName") },
    });
    dispatch({
      type: ACTION_TYPES.SET_SELECTED_REPO_DESCRIPTION,
      payload: {
        selectedRepoDescription: sessionStorage.getItem(
          "selectedRepoDescription"
        ),
      },
    });
    dispatch({
      type: ACTION_TYPES.SET_SELECTED_REPO_STAR_COUNTS,
      payload: {
        selectedRepoStarCounts: sessionStorage.getItem(
          "selectedRepoStarCounts"
        ),
      },
    });
  };

  //  這是前端作業要求使用的第二支 api 不過覺得有點浪費資源
  //  因為第一支 api GET /users/{username}/repos 就已經回傳這邊的資料
  //  因此這邊僅實作，但不使用它
  const fetchSingleRepoMeta = async () => {
    try {
      const response = await fetch(
        `../../../api/getUserSingleRepo?owner=${indexPageState.inputUserName}&repo=${indexPageState.selectedRepoName}`
      );
      const result = await response.json();
      console.log("NewAPI", result);
    } catch (error) {
      console.log(error);
      console.error();
    }
  };
  useEffect(() => {
    restoreBackUp();
    // fetchSingleRepoMeta();
    console.log(indexPageState.inputUserName);
  }, [router]);
  return (
    <div>
      <Head>
        <title>{`${indexPageState.selectedRepoName}`}</title>
        <meta
          name="description"
          content={`${indexPageState.selectedRepoName}`}
        ></meta>
      </Head>
      <div className={style.navContainer}>
        <Back backTo={router.back}></Back>
      </div>

      <div className={style.repoContainer}>
        <p className={style.repoName}>{indexPageState.selectedRepoName}</p>
        <p className={style.repoDescription}>
          {indexPageState.selectedRepoDescription === "null"
            ? "This guy is lazy to leave a project description!!!"
            : indexPageState.selectedRepoDescription}
        </p>
        <Button
          type="primary"
          href={`https://github.com/${indexPageState.inputUserName}/${indexPageState.selectedRepoName}`}
          target="_blank"
          shape="round"
          size="large"
        >
          {t("take_me_to_the_project")}
        </Button>
        <div className={style.starCount}>
          <p className={style.starSize}>⭐</p>
          <p className={style.starCountNum}>
            +{indexPageState.selectedRepoStarCounts}
          </p>
        </div>
      </div>
    </div>
  );
};

export default repo;

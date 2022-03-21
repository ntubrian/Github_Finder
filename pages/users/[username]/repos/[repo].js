import { useEffect, useState, useContext } from "react";
import { UserContext, ACTION_TYPES } from "../../../_app";
import style from "../../../../styles/repo.module.css";
import { Button } from "antd";
import { useRouter } from "next/router";
import Back from "../../../../components/Back";
import Home from "../../../../components/Home";
const repo = () => {
  const { indexPageState, dispatch } = useContext(UserContext);
  const router = useRouter();
  const restoreBackUp = () => {
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
  useEffect(() => {
    restoreBackUp();
  }, [router]);
  return (
    <div>
      <div className={style.navContainer}>
        <Home></Home>
        <Back backTo={router.back}></Back>
      </div>

      {/* <p>{indexPageState.selectedRepoName}</p> */}
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
          Take me to the project
        </Button>
        <div className={style.starCount}>
          <p className={style.starSize}>⭐</p>
          <p className={style.starCountNum}>
            +{indexPageState.selectedRepoStarCounts}
          </p>
        </div>
        {/* <a
          href={`https://github.com/${indexPageState.inputUserName}/${indexPageState.selectedRepoName}`}
          target="_blank"
        >
          {indexPageState.selectedRepoName}
        </a> */}
      </div>
    </div>
  );
};

export default repo;

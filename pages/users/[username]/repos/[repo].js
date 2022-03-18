import { useEffect, useState, useContext } from "react";
import { UserContext, ACTION_TYPES } from "../../../_app";
import style from "../../../../styles/repo.module.css";
import { Button } from "antd";

const repo = () => {
  const { indexPageState, dispatch } = useContext(UserContext);
  console.log(indexPageState.selectedRepoDescription);
  return (
    <div>
      {/* <p>{indexPageState.selectedRepoName}</p> */}
      <div className={style.repoContainer}>
        <p className={style.repoName}>{indexPageState.selectedRepoName}</p>
        <p className={style.repoDescription}>
          {indexPageState.selectedRepoDescription === null
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

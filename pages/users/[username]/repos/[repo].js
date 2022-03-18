import { useEffect, useState, useContext } from "react";
import { UserContext, ACTION_TYPES } from "../../../_app";

const repo = () => {
  const { indexPageState, dispatch } = useContext(UserContext);
  console.log(indexPageState.selectedRepoDescription);
  return (
    <div>
      {/* <p>{indexPageState.selectedRepoName}</p> */}
      <a
        href={`https://github.com/${indexPageState.inputUserName}/${indexPageState.selectedRepoName}`}
        target="_blank"
      >
        {indexPageState.selectedRepoName}
      </a>
      <p>
        {indexPageState.selectedRepoDescription === null
          ? "This guy is lazy to leave a project description!!!"
          : indexPageState.selectedRepoDescription}
      </p>
      <p>{indexPageState.selectedRepoStarCounts}</p>
    </div>
  );
};

export default repo;

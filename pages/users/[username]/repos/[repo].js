import { useEffect, useState, useContext } from "react";
import { UserContext, ACTION_TYPES } from "../../../_app";

const repo = () => {
  const { indexPageState, dispatch } = useContext(UserContext);

  return (
    <div>
      <p>{indexPageState.selectedRepoName}</p>
      <p>
        {indexPageState.selectedRepoDescription.length > 0
          ? indexPageState.selectedRepoDescription
          : "This guy is lazy to leave a project description!!!"}
      </p>
      <p>{indexPageState.selectedRepoStarCounts}</p>
    </div>
  );
};

export default repo;

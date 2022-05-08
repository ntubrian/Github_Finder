import React from "react";
import { List } from "antd";
import style from "styles/repos.module.css";
import { useContext } from "react";
import { UserContext, ACTION_TYPES } from "context/github-user-context";
const ReposList = React.forwardRef(({ onClick, href, idArr, item }, ref) => {
  const { dispatch } = useContext(UserContext);
  const setSeletedRepoContext = () => {
    sessionStorage.setItem("selectedRepoName", item.name);
    sessionStorage.setItem("selectedRepoNodeId", item.node_id);
    sessionStorage.setItem("selectedRepoDescription", item.description);
    sessionStorage.setItem("selectedRepoStarCounts", item.stargazers_count);
    dispatch({
      type: ACTION_TYPES.SET_SELECTED_REPO_NAME,
      payload: { selectedRepoName: item.name },
    });
    dispatch({
      type: ACTION_TYPES.SET_SELECTED_REPO_NODE_ID,
      payload: { selectedRepoNodeId: item.node_id },
    });
    dispatch({
      type: ACTION_TYPES.SET_SELECTED_REPO_DESCRIPTION,
      payload: { selectedRepoDescription: item.description },
    });
    dispatch({
      type: ACTION_TYPES.SET_SELECTED_REPO_STAR_COUNTS,
      payload: { selectedRepoStarCounts: item.stargazers_count },
    });
    // dispatch({
    //   type: ACTION_TYPES.SET_USER_AVATAR_URL,
    //   payload: { userAvatarUrl: [meta.data.avatar_url] },
    // });
  };
  return (
    <a href={href} onClick={onClick} ref={ref}>
      <List.Item
        key={item.id}
        onClick={setSeletedRepoContext}
        className={`${style.listItem} ${
          Math.floor(idArr.indexOf(item.id) / 10) % 2 == 1
            ? style.oddGroupPage
            : style.evenGroupPage
        }`}
      >
        <List.Item.Meta title={<p className={style.title}>{item.name}</p>} />
        <div className={style.starContext}>{`⭐${item.stargazers_count}`}</div>
      </List.Item>
    </a>
  );
});

export default ReposList;

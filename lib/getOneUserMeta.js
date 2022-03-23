import { Octokit } from "@octokit/core";
// import { ACTION_TYPES } from "../pages/_app";
export const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUP_PERSONAL_TOKEN,
});

export const getOneUserMeta = async (userName) => {
  try {
    const res = await octokit.request("/users/{username}", {
      username: userName,
    });
    return res;
  } catch (error) {
    console.error("Something wrong");
  }
};

export const getOneUserReposMeta = async (userName, page) => {
  console.log(userName);
  try {
    const res = await octokit.request("/users/{username}/repos", {
      username: userName,
      per_page: 10,
      page: page,
    });
    return res;
    // setReturnObj(res);
  } catch (error) {
    console.log(error);
    console.error("Something wrong in 28");
  }
};

export const getOneUserSingleRepoMeta = async (owner, repo) => {
  try {
    const res = await octokit.request("/repos/{owner}/{repo}", {
      owner: owner,
      repo: repo,
    });
    return res;
  } catch (error) {
    console.log(error);
    console.error("Something wrong in 43");
  }
};

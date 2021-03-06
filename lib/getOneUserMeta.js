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
    console.error("Error at lib/getOneUserMeta");
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
    console.error("Error at lib/getOneUserReposMeta");
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
    console.error("Error at lib/getOneUserSingleRepoMeta");
  }
};

export const getUsers = async (name) => {
  try {
    const res = await octokit.request("/search/users", {
      q: name,
    });
    return res;
  } catch (error) {
    console.log(error);
    console.error("Error at lib/getUsers");
  }
};

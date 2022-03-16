import { Octokit } from "@octokit/core";

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
  try {
    const res = await octokit.request("/users/{username}/repos", {
      username: userName,
      per_page: 10,
      page: page,
    });
    return res;
    // setReturnObj(res);
  } catch (error) {
    console.error("Something wrong");
  }
};

import { Octokit } from "@octokit/core";

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUP_PERSONAL_TOKEN,
});

const getOneUserMeta = async (userName, setReturnObj) => {
  try {
    const res = await octokit.request("GET /users/{username}", {
      username: userName,
    });
    setReturnObj(res);
  } catch (error) {
    console.error("Some thing wrong");
  }
};

export default getOneUserMeta;

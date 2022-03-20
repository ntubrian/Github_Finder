import { getOneUserReposMeta } from "../../lib/getOneUserMeta";

const getUserRepos = async (req, res) => {
  try {
    const { username, page } = req.query;
    // console.log("~~~~I'm hot reload~~~~", username);
    console.log("username", username);
    const response = await getOneUserReposMeta(username, page);
    res.status(200);
    res.json(response);
    // console.log(response);
  } catch (error) {
    console.error("Backend API Error");
  }
};

export default getUserRepos;

import { getOneUserSingleRepoMeta } from "lib/getOneUserMeta";

const getUserSingleRepo = async (req, res) => {
  try {
    const { owner, repo } = req.query;
    // console.log("~~~~I'm hot reload~~~~", username);
    console.log("owner", owner);
    const response = await getOneUserSingleRepoMeta(owner, repo);
    res.status(200);
    res.json(response);
    // console.log(response);
  } catch (error) {
    console.error("Backend API Error");
  }
};

export default getUserSingleRepo;

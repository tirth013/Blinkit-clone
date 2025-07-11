import Axios from "./Axios";
import SummaryApi from "../common/SummaryApi";

const fetchUserDetails = async () => {
  try {
    const response = await Axios({
      method: SummaryApi.userDetails.method,
      url: SummaryApi.userDetails.url,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default fetchUserDetails;

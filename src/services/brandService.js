import { notification } from "antd";
import axios from "axios";

export const fetchBrands = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/brands`);
    return res.data;
  } catch (error) {
    notification.info({
      message: error.response.data,
    });
  }
};

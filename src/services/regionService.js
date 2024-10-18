import { notification } from "antd";
import axios from "axios";

export const fetchRegions = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/regions`);
    return res.data;
  } catch (error) {
    notification.info({
      message: error.response.data,
    });
  }
};

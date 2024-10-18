import { notification } from "antd";
import axios from "axios";

export const fetchVisitDays = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/visits`);
    return res.data;
  } catch (error) {
    notification.info({
      message: error.response.data,
    });
  }
};

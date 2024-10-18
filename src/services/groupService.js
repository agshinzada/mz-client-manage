import { notification } from "antd";
import axios from "axios";

export const fetchGroupCodes = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/groups`);
    return res.data;
  } catch (error) {
    notification.info({
      message: error.response.data,
    });
  }
};

export const fetchGroupTypes = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/groups/types`);
    return res.data;
  } catch (error) {
    notification.info({
      message: error.response.data,
    });
  }
};

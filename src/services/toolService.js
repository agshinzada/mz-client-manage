import { notification } from "antd";
import axios from "axios";

export const fetchLastStickerCode = async (token) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/tools/createsticker?token=${token}`
    );
    return res.data;
  } catch (error) {
    notification.info({
      message: error.response.data,
    });
  }
};

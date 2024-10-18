import { notification } from "antd";
import axios from "axios";

export async function fetchLogin(data) {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/auth/login`,
      data
    );
    return res.data;
  } catch (error) {
    notification.info({
      message: error.response.data,
    });
  }
}

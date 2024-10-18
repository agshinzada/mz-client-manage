import { notification } from "antd";
import axios from "axios";

export const fetchDiscounts = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/campaigns/discounts`
    );
    return res.data;
  } catch (error) {
    notification.info({
      message: error.response.data,
    });
  }
};

export const fetchCampaigns = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/campaigns`);
    return res.data;
  } catch (error) {
    notification.info({
      message: error.response.data,
    });
  }
};

import { notification } from "antd";
import axios from "axios";

export const fetchDeliveryByFilter = async (regionId) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/delivery/filter?r=${regionId}`
    );
    return res.data;
  } catch (error) {
    notification.info({
      message: error.response.data,
    });
  }
};

export const fetchDelivery = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/delivery`);
    return res.data;
  } catch (error) {
    notification.info({
      message: error.response.data,
    });
  }
};

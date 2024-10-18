import { notification } from "antd";
import axios from "axios";

export const fetchTradeGroups = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/root/trade`);
    return res.data;
  } catch (error) {
    notification.info({
      message: error.response.data,
    });
  }
};

export const fetchDistrictByRegion = async (value) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/root/districts?name=${value}`
    );
    return res.data;
  } catch (error) {
    notification.info({
      message: error.response.data,
    });
  }
};

export const fetchRoutes = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/root/routes`);
    return res.data;
  } catch (error) {
    notification.info({
      message: error.response.data,
    });
  }
};

export const fetchRoutesByFilter = async (regionId, brandId) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/root/routes/filter?r=${regionId}&b=${brandId}`
    );
    return res.data;
  } catch (error) {
    notification.info({
      message: error.response.data,
    });
  }
};

export const fetchRoutesBySearch = async (value) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/root/routes/search?code=${value}`
    );
    return res.data;
  } catch (error) {
    notification.info({
      message: error.response.data,
    });
  }
};

export const fetchLowlevelcode = async (data, levelCode) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/root/lowlevel${levelCode}`,
      data
    );
    return res.data;
  } catch (error) {
    notification.info({
      message: error.response.data,
    });
  }
};

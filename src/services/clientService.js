import { notification } from "antd";
import axios from "axios";

export const fetchNewClient = async (data) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API}/clients`, data);
    notification.success({ message: res.data });
    return true;
  } catch (error) {
    notification.info({
      message: error.response.data,
    });
    return false;
  }
};

export const fetchUpdateClientsTax = async (data) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API}/clients/update/tax`,
      data
    );
    notification.success({ message: res.data });
    return true;
  } catch (error) {
    notification.info({
      message: error.response.data,
    });
  }
};

export const fetchInsertedClients = async (id) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/clients/inserted/${id}`
    );
    return res.data;
  } catch (error) {
    notification.info({
      message: error.response.data,
    });
  }
};
export const fetchInsertedClientsBySearch = async (id, value) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/clients/inserted/search?id=${id}&value=${value}`
    );
    return res.data;
  } catch (error) {
    notification.info({
      message: error.response.data,
    });
  }
};
export const fetchInsertedClientsByRange = async (id, from, to) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/clients/inserted/range?from=${from}&to=${to}&id=${id}`
    );
    return res.data;
  } catch (error) {
    notification.info({
      message: error.response.data,
    });
  }
};

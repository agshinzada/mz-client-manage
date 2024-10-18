import { notification } from "antd";
import axios from "axios";

export const fetchStickerBySearch = async (value) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/stickers/search?q=${value}`
    );
    return res.data;
  } catch (error) {
    notification.info({
      message: error.response.data,
    });
  }
};

export const fetchStickerHierarchy = async (data) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/stickers/hierarchy`,
      data
    );
    return res.data;
  } catch (error) {
    notification.info({
      message: error.response.data,
    });
  }
};

export const fetchUpdateTaxBySticker = async (data) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API}/stickers/update/tax`,
      data
    );
    notification.success({
      message: res.data,
    });
    return true;
  } catch (error) {
    notification.info({
      message: error.response.data,
    });
  }
};

export const fetchUpdateNameBySticker = async (data) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API}/stickers/update/name`,
      data
    );
    notification.success({
      message: res.data,
    });
    return true;
  } catch (error) {
    notification.info({
      message: error.response.data,
    });
  }
};

export const fetchNewSticker = async (data) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API}/stickers`, data);
    notification.success({
      message: res.data,
    });
    return true;
  } catch (error) {
    notification.info({
      message: error.response.data,
    });
    return false;
  }
};

export const createStickerLastCode = (data) => {
  try {
    let lastCode = data.CODE;
    let lastNum = parseInt(data.NUMBER) + 1;
    const length = 5 - lastNum.toString().length;
    lastNum = lastNum.toString().padStart(length, "0");
    lastCode += lastNum;
    return lastCode;
  } catch (error) {
    throw error;
  }
};

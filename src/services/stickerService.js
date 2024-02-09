import { notification } from "antd";
import { Navigate } from "react-router-dom";
import { encryptStorage } from "../utils/storage";

export const fetchStickerBySearch = async (value) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/stickers/search?q=${value}`
    );
    if (res.status === 200 && res.statusText === "OK") {
      const data = await res.json();
      return data;
    } else if (res.status === 500) {
      console.log(await res.json());
    }
  } catch (error) {
    throw error;
  }
};

export const fetchStickerByFilter = async (param, input) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/stickers/filter?p=${param}&&i=${input}`
    );
    if (res.status === 200 && res.statusText === "OK") {
      const data = await res.json();
      return data;
    } else if (res.status === 500) {
      console.log(await res.json());
    }
  } catch (error) {
    throw error;
  }
};

export const fetchStickerHierarchy = async (data) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API}/stickers/hierarchy`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.status === 200 && res.statusText === "OK") {
      const data = await res.json();
      return data;
    } else if (res.status === 500) {
      console.log(await res.json());
    }
  } catch (error) {
    throw error;
  }
};

export const fetchUpdateStickerTax = async (data) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/stickers/update/tax`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (res.status === 200 && res.statusText === "OK") {
      notification.success({
        message: "Yeniləmə",
        description: "Düzəliş edildi",
        placement: "topRight",
      });
      return true;
    } else {
      notification.error({
        message: "Yeniləmə",
        description: "Sistem xətası baş verdi",
        placement: "topRight",
      });
      return true;
    }
  } catch (error) {
    throw error;
  }
};

export const fetchUpdateNameBySticker = async (data) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/stickers/update/name`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (res.status === 200 && res.statusText === "OK") {
      notification.success({
        message: "Yeniləmə",
        description: "Düzəliş edildi",
        placement: "topRight",
      });
      return true;
    } else {
      notification.error({
        message: "Yeniləmə",
        description: "Sistem xətası baş verdi",
        placement: "topRight",
      });
      return true;
    }
  } catch (error) {
    throw error;
  }
};

export const fetchNewSticker = async (data) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API}/stickers`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.status === 200 && res.statusText === "OK") {
      notification.success({
        message: "Müştəri əlavəsi",
        description: "Sistemə uğurla əlavə edildi!",
        placement: "topRight",
      });
      return true;
    } else if (res.status === 515) {
      notification.warning({
        message: "Müştəri əlavəsi",
        description: "Bu müştəri sistemdə mövcuddur!",
        placement: "topRight",
      });
    } else if (res.status === 401) {
      setTimeout(() => {
        encryptStorage.clear();
        notification.warning({
          message: "Stiker əlavəsi",
          description: "Giriş müddəti keçib!",
          placement: "topRight",
        });
        Navigate("/auth/login");
      }, 700);
    } else {
      notification.error({
        message: "Müştəri əlavəsi",
        description: "Sistem xətası baş verdi!",
        placement: "topRight",
      });
    }
    return false;
  } catch (error) {
    throw error;
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

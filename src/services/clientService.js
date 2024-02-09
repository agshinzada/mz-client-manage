import { message, notification } from "antd";
import { Navigate } from "react-router-dom";
import { encryptStorage } from "../utils/storage";

export const fetchNewClient = async (data) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API}/clients`, {
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

export const fetchUpdateClientsTax = async (data) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API}/clients/update/tax`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.status === 200 && res.statusText === "OK") {
      notification.success({
        message: "Yeniləmə",
        description: "VÖEN uğurla dəyişildi",
        placement: "topRight",
      });
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

export const fetchClientsBySticker = async (sticker) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API}/clients/sticker`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sticker),
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

export const fetchChangeClientStatus = async (data, user, token) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/clients/status?user=${user}&token=${token}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const fetchCreateClientCodesBulk = async (data) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API}/clients/codes/bulk`, {
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

export const fetchCheckBulkClientCodes = async (data) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/clients/codes/bulk/check`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
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

export const fetchPostBulkClients = async (data) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API}/clients/bulk`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.status === 200 && res.statusText === "OK") {
      message.success("Müştərilər uğurla əlavə edildi!");
      return true;
    } else {
      throw await res.json();
    }
  } catch (error) {
    throw error;
  }
};

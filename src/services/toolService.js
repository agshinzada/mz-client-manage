import { notification } from "antd";

export const fetchLastClientCode = async (sticker, token) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/tools/createclient?token=${token}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sticker),
      }
    );
    if (res.status === 200 && res.statusText === "OK") {
      return res;
    } else if (res.status === 500) {
      console.log(await res.json());
    }
  } catch (error) {
    throw error;
  }
};

export const fetchLastStickerCode = async (token) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/tools/createsticker?token=${token}`,
      {
        method: "POST",
      }
    );
    if (res.status === 200 && res.statusText === "OK") {
      const { code } = await res.json();
      return code;
    } else {
      notification.error({
        message: "Stiker əlavəsi",
        description: "Sistem xətası baş verdi!",
        placement: "topRight",
      });
    }
  } catch (error) {
    throw error;
  }
};

export const fetchBrandCheck = async (data) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API}/tools/checkbrand`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.status === 200 && res.statusText === "OK") {
      const data = await res.text();
      return data;
    } else if (res.status === 500) {
      console.log(await res.json());
    }
  } catch (error) {
    throw error;
  }
};

export const fetchClientRefs = async (data) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API}/tools/refs`, {
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

export const fetchCheckExistRefs = async (data) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API}/tools/refs?p=exist`, {
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

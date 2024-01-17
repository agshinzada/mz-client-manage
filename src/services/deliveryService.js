export const fetchDeliveryByFilter = async (regionId) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/delivery/filter?r=${regionId}`
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

export const fetchDelivery = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API}/delivery`);
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

export const fetchDeliveryBySearch = async (value) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/delivery/search?q=${value}`
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

export const fetchChangeDeliveryStatus = async (data, token) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/delivery/status?id=${data.ID}&&s=${data.STATUS}&&token=${token}`,
      {
        method: "PUT",
      }
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const fetchPutDelivery = async (data, token) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/delivery?token=${token}`,
      {
        method: "PUT",
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

export const fetchNewDelivery = async (data, token) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/delivery?token=${token}`,
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

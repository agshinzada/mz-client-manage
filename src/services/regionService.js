export const fetchRegions = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API}/regions`);
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

export const fetchRegionBySearch = async (value) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/regions/search?q=${value}`
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

export const fetchChangeRegionStatus = async (data, token) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/regions/status?id=${data.ID}&&s=${data.STATUS}&&token=${token}`,
      {
        method: "PUT",
      }
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const fetchPutRegion = async (data, token) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/regions?token=${token}`,
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

export const fetchNewRegion = async (data, token) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/regions?token=${token}`,
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

export const fetchBrands = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API}/brands`);
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

export const fetchBrandBySearch = async (value) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/brands/search?q=${value}`
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

export const fetchNewBrand = async (data, token) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/brands?token=${token}`,
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

export const fetchChangeBrandStatus = async (data, token) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/brands/status?id=${data.ID}&&s=${data.STATUS}&&token=${token}`,
      {
        method: "PUT",
      }
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const fetchPutBrand = async (data, token) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/brands?token=${token}`,
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

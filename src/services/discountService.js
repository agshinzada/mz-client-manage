export const fetchDiscounts = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API}/campaigns/discounts`);
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

export const fetchNewDiscount = async (data) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/campaigns/discounts`,
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

export const fetchChangeDiscountStatus = async (data, token) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/campaigns/discounts/status?id=${data.ID}&&s=${data.STATUS}&&token=${token}`,
      {
        method: "PUT",
      }
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const fetchDiscountBySearch = async (value) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/campaigns/discounts/search?q=${value}`
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

export const fetchPutDiscount = async (data, token) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/campaigns/discounts?token=${token}`,
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

export const fetchCampaigns = async (param) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API}/campaigns/${param}`);
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

export const fetchCampaignBySearch = async (value, param) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/campaigns/${param}/search?q=${value}`
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

export const fetchNewCampaign = async (data, token) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/campaigns?token=${token}`,
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

export const fetchChangeCampaignStatus = async (param, data, token) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/campaigns/${param}/status?id=${data.ID}&&s=${data.STATUS}&&token=${token}`,
      {
        method: "PUT",
      }
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const fetchPutCampaign = async (data, param, token) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/campaigns/${param}?token=${token}`,
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

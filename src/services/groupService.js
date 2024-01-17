export const fetchGroupCodes = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API}/groups`);
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

export const fetchGroupCodesBySearch = async (value) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/groups/search?q=${value}`
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

export const fetchGroupTypes = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API}/groups/types`);
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

export const fetchNewGroupCodeType = async (data, token) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/groups/types?token=${token}`,
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

export const fetchChangeGroupTypeStatus = async (data, token) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/groups/types/status?id=${data.ID}&&s=${data.STATUS}&&token=${token}`,
      {
        method: "PUT",
      }
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const fetchGroupTypesBySearch = async (value) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/groups/types/search?q=${value}`
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

export const fetchPutGroupTypes = async (data, token) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/groups/types?token=${token}`,
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

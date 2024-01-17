export const fetchVisitDays = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API}/visits`);
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

export const fetchChangeVisitStatus = async (data, token) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/visits/status?id=${data.ID}&&s=${data.STATUS}&&token=${token}`,
      {
        method: "PUT",
      }
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const fetchVisitDayBySearch = async (value) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/visits/search?q=${value}`
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

export const fetchPutVisitDay = async (data, token) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/visits?token=${token}`,
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

export const fetchNewVisitDay = async (data, token) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/visits?token=${token}`,
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

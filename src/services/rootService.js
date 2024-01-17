export const fetchTradeGroups = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API}/root/trade`);
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

export const fetchTradeGroupBySearch = async (value) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/root/trade/search?q=${value}`
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

export const fetchDistrictByRegion = async (value) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/root/districts?name=${value}`
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

export const fetchRoutes = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API}/root/routes`);
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

export const fetchRoutesByFilter = async (regionId, brandId) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/root/routes/filter?r=${regionId}&b=${brandId}`
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

export const fetchRoutesBySearch = async (value) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/root/routes/search?code=${value}`
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

export const fetchLowlevelcode = async (sticker, levelCode) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/root/lowlevel${levelCode}`,
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
      const data = await res.json();
      return data;
    } else if (res.status === 400) {
      console.log(await res.text());
    } else if (res.status === 500) {
      console.log(res);
    }
  } catch (error) {
    throw error;
  }
};

export const fetchNewClient = async (data, userRef, token) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/clients?userRef=${userRef}&&token=${token}`,
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
    return res;
  } catch (error) {
    throw error;
  }
};

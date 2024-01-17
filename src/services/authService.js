export const fetchLogin = async (username, password) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const fetchChangePass = async (userId, password, token) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API}/auth/users/pass`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        password: password,
        token,
      }),
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const fetchPutUser = async (data, token) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/auth/users?token=${token}`,
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

export const fetchUsers = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API}/auth/users`);
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

export const fetchChangeUserStatus = async (data, token) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/auth/users/status?id=${data.ID}&&s=${data.STATUS}&&token=${token}`,
      {
        method: "PUT",
      }
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const fetchUserBySearch = async (value) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/auth/users/search?q=${value}`
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

export const fetchNewUser = async (data, token) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/auth/users?token=${token}`,
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

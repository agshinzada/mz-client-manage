export const fetchLogs = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API}/logs`);
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

export const fetchLogBySearch = async (value) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/logs/search?q=${value}`
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

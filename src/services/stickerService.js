export const fetchStickerBySearch = async (value) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/stickers/search?q=${value}`
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

export const fetchStickerByFilter = async (param, input) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/stickers/filter?p=${param}&&i=${input}`
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

export const fetchNewSticker = async (data, userRef, token) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API}/stickers?userRef=${userRef}&&token=${token}`,
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

export const createStickerLastCode = (data) => {
  try {
    let lastCode = data.CODE;
    let lastNum = parseInt(data.NUMBER) + 1;
    const length = 5 - lastNum.toString().length;
    lastNum = lastNum.toString().padStart(length, "0");
    lastCode += lastNum;
    return lastCode;
  } catch (error) {
    throw error;
  }
};

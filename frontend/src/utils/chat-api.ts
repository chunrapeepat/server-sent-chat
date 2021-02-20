import axios from "axios";

export const initConnection = async (
  username: string,
  endpointUrl: string
): Promise<boolean> => {
  try {
    const { data } = await axios.post(`${endpointUrl}/connect`, {
      user: username,
    });

    return data.success === true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const sendMessage = async (
  message: string,
  username: string,
  endpointUrl: string
): Promise<boolean> => {
  try {
    const { data } = await axios.post(`${endpointUrl}/message`, {
      user: username,
      message,
    });

    return data.success === true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

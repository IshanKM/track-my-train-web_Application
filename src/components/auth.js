import axios from "axios";

// Endpoint for obtaining JWT token
const TOKEN_URL = "https://api.trackmytrain.online/api/v1/auth/token"; // Replace with your token URL
const API_KEY = "user-api-key-123456"; // Replace with your API key

let token = null;
let tokenExpiry = null;

const getJWTToken = async () => {
  try {
    const response = await axios.post(
      TOKEN_URL,
      {},
      {
        headers: {
          "x-api-key": API_KEY,
        },
      }
    );
    token = response.data.token;
    const decodedToken = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );
    tokenExpiry = decodedToken.exp * 1000; // Convert to milliseconds
    console.log(
      "Token obtained, expires at:",
      new Date(tokenExpiry).toLocaleString()
    );
    return token;
  } catch (error) {
    console.error("Failed to obtain JWT token:", error.message);
    throw new Error("Token retrieval failed");
  }
};

const refreshTokenIfNeeded = async () => {
  const currentTime = Date.now();
  if (!token || !tokenExpiry || currentTime >= tokenExpiry - 60000) {
    // Refresh 1 minute before expiration
    return await getJWTToken();
  }
  return token;
};

export { refreshTokenIfNeeded };

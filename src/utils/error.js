export const getErrorMessage = (error, fallback = "Something went wrong.") => {
  // Axios error shape: error.response.data.message or error.message
  const serverMessage = error?.response?.data?.message;
  if (typeof serverMessage === "string" && serverMessage.trim().length > 0) {
    return serverMessage;
  }
  const nestedMsg = error?.data?.message;
  if (typeof nestedMsg === "string" && nestedMsg.trim().length > 0) {
    return nestedMsg;
  }
  if (typeof error?.message === "string" && error.message.trim().length > 0) {
    return error.message;
  }
  return fallback;
};

export const mapFriendlyAuthMessage = (message, status) => {
  const msg = (message || "").toLowerCase();
  if (status === 401 || msg.includes("invalid user credentials") || msg.includes("invalid credentials")) {
    return "Email or password is incorrect.";
  }
  if (msg.includes("user does not exist")) {
    return "Account not found.";
  }
  if (msg.includes("username or email is required")) {
    return "Please enter email or username.";
  }
  return message;
};



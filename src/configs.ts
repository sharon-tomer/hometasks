// Dear someone with access to this file, yeah, I know I should'nt put secrets in the client. And yes, you do now have access to my JSONBIN API key.

export const JSONBinFetchConfig = {
  get: {
    url: "https://api.jsonbin.io/v3/b/66735126acd3cb34a85a05e4/latest",
    options: {
      method: "GET",
      headers: {
        "X-Master-Key":
          "$2a$10$AV06ioVMIQIoNUWB/RfU2uPakHCqBwPt0mLPa.UVeAJbt5f6nPJwu",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  },
  put: {
    url: "https://api.jsonbin.io/v3/b/66735126acd3cb34a85a05e4",
    options: {
      method: "PUT",
      headers: {
        "X-Master-Key":
          "$2a$10$AV06ioVMIQIoNUWB/RfU2uPakHCqBwPt0mLPa.UVeAJbt5f6nPJwu",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
  },
};

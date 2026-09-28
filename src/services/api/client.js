// API Client with typed mock resolvers mimicking asynchronous network transport
export const apiClient = {
  get: async (endpoint, mockResponse, delayMs = 250) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockResponse);
      }, delayMs);
    });
  },
  post: async (endpoint, data, mockResponse, delayMs = 350) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockResponse);
      }, delayMs);
    });
  },
  put: async (endpoint, data, mockResponse, delayMs = 300) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockResponse);
      }, delayMs);
    });
  },
};

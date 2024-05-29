// PRODUCTION CONTROL
const apiUrls = {
    development: "http://localhost:8080",
    production: "https://thevault-ae9i.onrender.com",
  };
  
  export const getApiUrl = (env) => {
    return apiUrls[env] || apiUrls.development;
  };
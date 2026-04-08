import API from "./api";

export const getDashboardStats = async (token) => {
  return API.get("/admin/dashboard/stats", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllUsers = async (token) => {
  return API.get("/admin/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllBiodata = async (token) => {
  return API.get("/admin/biodata", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllPayments = async (token) => {
  return API.get("/admin/payments", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
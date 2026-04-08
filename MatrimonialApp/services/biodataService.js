import API from "./api";

// CREATE BIODATA
export const createBiodata = (data, token) =>
  API.post("/biodata/create", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// GET MY BIODATA
export const getMyBiodata = (token) =>
  API.get("/biodata/my", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// UPDATE MY BIODATA
export const updateMyBiodata = (data, token) =>
  API.put("/biodata/update", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// GET ALL BIODATA
export const getAllBiodata = () => API.get("/biodata");

// GET SINGLE BIODATA
export const getBiodataById = (id) => API.get(`/biodata/${id}`);
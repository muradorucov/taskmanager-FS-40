import { api } from "../api";

export const getActiveDepartments = async () => {
  const res = await api.get("/department/active");
  if (!res.data) {
    throw new Error("Get All Task fetch error");
  }
  return res.data
}
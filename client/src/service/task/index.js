const { api } = require("../api")

export const getAllTask = async () => {
  const res = await api.get("/task");
  if (!res.data) {
    throw new Error("Get All Task fetch error");
  }
  return res.data
}

export const singleTask = async (id) => {
  const res = await api.get("/task/" + id);
  if (!res.data) {
    throw new Error("Get Single Task fetch error Id= " + id);
  }
  return res.data
}
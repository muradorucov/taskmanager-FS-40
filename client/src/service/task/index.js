const { api } = require("../api")
export const createTask = async (body) => {
  const res = await api.post("/task/create", body);
  if (!res.data) {
    throw new Error("Create Task fetch error");
  }
  return res.data
}


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

export const changeProgressTask = async (id, status) => {
  const res = await api.patch("/task/" + id + "/progress", {
    status
  });
  if (!res.data) {
    throw new Error("changeProgressTask fetch error Id= " + id);
  }
  return res.data
}

export const changeStatusTask = async (id) => {
  const res = await api.patch("/task/" + id);
  if (!res.data) {
    throw new Error("changeStatusTask fetch error Id= " + id);
  }
  return res.data
}

export const deleteTask = async (id) => {
  const res = await api.delete("/task/" + id);
  if (!res.data) {
    throw new Error("deleteTask fetch error Id= " + id);
  }
  return res.data
}
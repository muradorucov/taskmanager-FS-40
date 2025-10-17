import { api } from "../api"

export const login = async () => {
  const res = await api.post("/auth/login", {
    "email": "orucowmurad@gmail.com",
    "password": "test16011"
  })

  if (!res.data) {
    throw new Error("Login Ftech Error");
  }

  return res.data
}

import axios from "axios";

const API = `https://65fb147d14650eb210094953.mockapi.io/list`;

const todos = {
  get: () => axios.get(API).then(({ data }) => data),

  delete: (id) => axios.delete(`${API}/${id}`).then(({ data }) => data),

  patch: (id, item) =>
    axios.patch(`${API}/${id}`, item).then(({ data }) => data),

  put: (id, item) => axios.put(`${API}/${id}`, item).then(({ data }) => data),

  post: (item) => axios.post(API, item).then(({ data }) => data),
};

export default todos;
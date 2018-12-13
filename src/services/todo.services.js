import store from "@/store";
import $http from "./config";

const RESOURCE_NAME = "/todos";

export default {
  async post(payload) {
    try {
      let response = await $http.post(RESOURCE_NAME, payload);
      let data = await response.data;
      return data;
    } catch (error) {
      store.commit("SET_LOADING", {
        status: "error",
        text: "Whoops, " + error
      });
      console.log("😵 Whoops, " + error);
    }
  },
  async getAll() {
    try {
      let response = await $http.get(RESOURCE_NAME);
      let data = await response.data;
      return data;
    } catch (error) {
      store.commit("SET_LOADING", {
        status: "error",
        text: "😵 Whoops, " + error
      });
      console.log("Whoops, " + error);
    }
  },
  async updateItem(payload) {
    try {
      let response = await $http.put(`${RESOURCE_NAME}/${payload.id}`, payload);
      let data = await response.data;
      return data;
    } catch (error) {
      store.commit("SET_LOADING", {
        status: "error",
        text: "😵 Whoops, " + error
      });
      console.log("Whoops, " + error);
    }
  },
  async deleteItem(payload) {
    try {
      let response = await $http.delete(`${RESOURCE_NAME}/${payload.id}`);
      return response;
    } catch (error) {
      store.commit("SET_LOADING", {
        status: "error",
        text: "😵 Whoops, " + error
      });
      console.log("Whoops, " + error);
    }
  }
};

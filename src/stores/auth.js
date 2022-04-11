import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({}),
  actions: {
    async logInUser() {},
    async logOutUser() {},
  },
});

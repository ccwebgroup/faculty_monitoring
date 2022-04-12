import { defineStore } from "pinia";
import { auth, fireauth } from "boot/firebase";
import { Dialog } from "quasar";

export const useAuthStore = defineStore("auth", {
  state: () => ({}),
  actions: {
    async logInUser(payload) {
      try {
        const userCredential = await fireauth.signInWithEmailAndPassword(
          auth,
          payload.email,
          payload.password
        );
        if (this.$route.query.redirect) {
          this.router.push(this.$route.query.redirect);
        } else {
          this.router.replace("/");
        }
      } catch (err) {
        const errorMessage = err.message;
        Dialog.create({
          title: "Sign in Error",
          message: errorMessage,
        });
      }
    },

    async logOutUser() {
      await auth.signOut();
      this.router.replace("/auth/login");
    },
  },
});

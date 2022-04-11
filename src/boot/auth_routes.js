import { boot } from "quasar/wrappers";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default boot(async ({ router }) => {
  const auth = getAuth();

  await new Promise((resolve) => {
    const stopObserver = onAuthStateChanged(getAuth(), (firebaseUser) => {
      resolve(firebaseUser);
      stopObserver();
    });
  });

  router.beforeEach((to, from) => {
    if (auth.currentUser && to.path === "/auth/login") {
      return { path: from.path };
    }

    if (to.meta.requiresAuth && !auth.currentUser) {
      return {
        path: "/auth/login",
        // save the location we were at to come back later
        query: { redirect: to.fullPath },
      };
    }
  });
});

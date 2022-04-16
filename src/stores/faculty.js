import { defineStore } from "pinia";
import { Notify, Dialog } from "quasar";
import {
  auth,
  db,
  storage,
  firestorage,
  fireauth,
  firestore,
} from "boot/firebase";

export const useFacultyStore = defineStore("faculties", {
  state: () => ({
    faculties: [],
    facultyProfile: null,
  }),
  actions: {
    async getFacultyProfile() {
      this.facultyProfile = auth.currentUser;
    },

    async updateFacultyAvatar(blob) {
      const uid = auth.currentUser.uid;
      const avatarsRef = firestorage.ref(
        storage,
        `faculty/${uid}/avatar/${uid}`
      );

      try {
        await firestorage.uploadBytes(avatarsRef, blob);
        const url = await firestorage.getDownloadURL(avatarsRef);
        await fireauth.updateProfile(auth.currentUser, { photoURL: url });
        const userRef = firestore.doc(db, "users", uid);
        await firestore.updateDoc(userRef, { photoURL: url });
        Notify.create({
          type: "positive",
          icon: "how_to_reg",
          message: "Profile avatar updated.",
        });
        return true;
      } catch (err) {
        Dialog.create({
          title: "Sorry, upload error!",
          message: `There is an error uploading your image. ${err.code}`,
        });
      }
    },
  },
});

import { defineStore } from "pinia";
import { ref } from "vue";
import { auth, googleProvider } from "@/firebase";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
} from "firebase/auth";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const isLoading = ref(true);

  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser;
    isLoading.value = false;
    if (currentUser) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        })
      );
    } else {
      localStorage.removeItem("user");
    }
  });

  const popupInFlight = ref(false);
  const signInWithGoogle = async () => {
    if (popupInFlight.value) {
      return; // Prevent multiple concurrent popups
    }
    try {
      isLoading.value = true;
      popupInFlight.value = true;
      // Create a fresh provider instance to avoid stale internal state
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      await signInWithPopup(auth, provider);
    } catch (e) {
      // Fallback to redirect for odd internal popup errors
      if (
        e?.message?.includes("Pending promise was never set") ||
        e?.code === "auth/popup-blocked" ||
        e?.code === "auth/cancelled-popup-request"
      ) {
        try {
          await signInWithRedirect(auth, googleProvider);
          await getRedirectResult(auth);
        } catch (redirectErr) {
          console.error("Redirect sign-in also failed:", redirectErr);
          throw redirectErr;
        }
      } else {
        throw e;
      }
    } finally {
      popupInFlight.value = false;
      isLoading.value = false;
    }
  };

  const logout = async () => {
    try {
      isLoading.value = true;
      await signOut(auth);
    } finally {
      isLoading.value = false;
    }
  };

  return { user, isLoading, signInWithGoogle, logout };
});

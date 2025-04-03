import { defineStore } from "pinia";
import { ref } from "vue";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const isLoading = ref(true);

  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser;
    isLoading.value = false;
    
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
  });

  return { user, isLoading };
});
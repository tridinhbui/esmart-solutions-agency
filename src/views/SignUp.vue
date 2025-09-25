<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="login-content">
        <h2 class="login-title">{{ $t("auth.signUpTitle") }}</h2>

        <!-- Phần đăng ký bằng Google -->
        <div class="social-login">
          <p class="social-login-title">{{ $t("auth.socialSignup") }}</p>
          <GoogleSignInButton
            variant="full"
            :disabled="authStore.isLoading"
            @click="handleGoogleSignUp"
          >
            <template #default>
              <span v-if="!authStore.isLoading">{{
                $t("auth.googleSignUp")
              }}</span>
              <span v-else>{{ $t("auth.processing") }}</span>
            </template>
          </GoogleSignInButton>
        </div>

        <!-- Dòng ngăn cách OR -->
        <div class="or-divider">
          <span class="or-line" />
          <span class="or-text">{{ $t("auth.or") }}</span>
          <span class="or-line" />
        </div>

        <!-- Form đăng ký -->
        <form class="login-form" @submit.prevent="handleSubmit">
          <div class="input-group">
            <input
              v-model="form.name"
              type="text"
              :placeholder="$t('auth.fullNamePlaceholder')"
              class="input-field"
              required
            />
          </div>

          <div class="input-group">
            <input
              v-model="form.email"
              type="email"
              :placeholder="$t('auth.emailPlaceholder')"
              class="input-field"
              required
            />
          </div>

          <div class="input-group password-group">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              :placeholder="$t('auth.passwordPlaceholder')"
              class="input-field"
              required
            />
            <button
              type="button"
              class="toggle-password"
              @click="togglePassword"
            >
              <svg
                v-if="showPassword"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#64748b"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#64748b"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
          </div>
          <div class="input-group">
            <input
              v-model="form.confirmPassword"
              type="password"
              :placeholder="$t('auth.confirmPasswordPlaceholder')"
              class="input-field"
              required
            />
          </div>

          <div class="button-container">
            <button
              type="submit"
              class="submit-btn"
              :disabled="authStore.isLoading"
            >
              <span v-if="!authStore.isLoading">{{
                $t("auth.btnSignUp")
              }}</span>
              <span v-else>{{ $t("auth.creating") }}</span>
            </button>
          </div>
        </form>
        <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>
      </div>
    </div>
    <div class="welcome-section">
      <div class="welcome-content">
        <p class="account-exists">{{ $t("auth.haveAccount") }}</p>
        <router-link
          :to="{
            path: '/sign-in',
            query: $route.query.redirect
              ? { redirect: $route.query.redirect }
              : {},
          }"
          class="signin-btn"
        >
          {{ $t("auth.btnSignIn") }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { auth } from "@/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthStore } from "@/stores/auth";
import GoogleSignInButton from "@/components/GoogleSignInButton.vue";

const router = useRouter();
const { t } = useI18n();
const authStore = useAuthStore();
const showPassword = ref(false);
const form = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});
const errorMessage = ref(null);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const handleSubmit = async () => {
  if (form.value.password !== form.value.confirmPassword) {
    errorMessage.value = t("auth.errors.passwordMismatch");
    return;
  }
  try {
    errorMessage.value = null;
    const cred = await createUserWithEmailAndPassword(
      auth,
      form.value.email,
      form.value.password
    );
    if (form.value.name && cred.user.displayName !== form.value.name) {
      await updateProfile(cred.user, { displayName: form.value.name });
    }
    const redirect = router.currentRoute.value.query.redirect || "/";
    router.push(redirect);
  } catch (e) {
    console.error("Signup error", e);
    errorMessage.value = mapError(e);
  }
};

const handleGoogleSignUp = async () => {
  try {
    errorMessage.value = null;
    await authStore.signInWithGoogle();
    const redirect = router.currentRoute.value.query.redirect || "/";
    router.push(redirect);
  } catch (e) {
    console.error("Google signup failed", e);
    errorMessage.value = mapError(e);
  }
};

function mapError(e) {
  const code = e?.code || "";
  switch (code) {
    case "auth/email-already-in-use":
      return t("auth.errors.emailInUse");
    case "auth/invalid-email":
      return t("auth.errors.invalidEmail");
    case "auth/operation-not-allowed":
      return t("auth.errors.operationNotAllowed");
    case "auth/weak-password":
      return t("auth.errors.weakPassword");
    case "auth/popup-blocked":
      return t("auth.errors.popupBlocked");
    case "auth/popup-closed-by-user":
      return t("auth.errors.popupClosed");
    default:
      return t("auth.errors.genericSignup");
  }
}
</script>

<style scoped>
/* Layout chính */
.login-wrapper {
  position: relative;
  display: flex;
  min-height: 100vh;
  background: linear-gradient(to right, white 65%, #6089f1 35%);
  overflow: hidden;
}

/* Hiệu ứng kim cương */
.login-wrapper::after {
  content: "";
  position: absolute;
  right: 0;
  width: 35%;
  height: 100%;
  background: conic-gradient(
      from 45deg at 25% 25%,
      rgba(255, 255, 255, 0.1) 0deg 90deg,
      transparent 90deg 180deg,
      rgba(255, 255, 255, 0.08) 180deg 270deg,
      transparent 270deg
    ),
    conic-gradient(
      from -15deg at 75% 30%,
      transparent 0deg 90deg,
      rgba(255, 255, 255, 0.12) 90deg 180deg,
      transparent 180deg 270deg,
      rgba(255, 255, 255, 0.05) 270deg
    ),
    conic-gradient(
      from 30deg at 50% 70%,
      rgba(255, 255, 255, 0.07) 0deg 90deg,
      transparent 90deg 270deg,
      rgba(255, 255, 255, 0.15) 270deg
    );
  background-size: 150px 150px, 200px 200px, 180px 180px;
  opacity: 0.25;
  z-index: 0;
  mix-blend-mode: overlay;
}

.login-container {
  width: 70%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 16.5%;
  padding-right: 7%;
  position: relative;
  z-index: 1;
}

.login-content {
  width: 100%;
  max-width: 580px;
  padding: 3rem;
}

/* Tiêu đề */
.login-title {
  text-align: center;
  margin-bottom: 1.8rem;
  color: #1e293b;
  font-size: 2.8rem;
  font-weight: 800;
}

/* Input fields - ĐÃ FIX */
.input-group {
  margin-bottom: 1.5rem;
  position: relative;
}

.input-field {
  width: 100%;
  padding: 15px 20px;
  font-size: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  background-color: white;
  transition: all 0.3s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.input-field:focus {
  outline: none;
  border-color: #6089f1;
  box-shadow: 0 0 0 3px rgba(96, 137, 241, 0.2);
}

.input-field::placeholder {
  color: #94a3b8;
}

.password-group .input-field {
  padding-right: 50px;
}

/* Nút toggle password */
.toggle-password {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
  margin-top: 2.2px;
}

.toggle-password svg {
  transition: stroke 0.3s ease;
}

.toggle-password:hover svg {
  stroke: #475569;
}

/* Social login - ĐÃ FIX */
.social-login {
  text-align: center;
  margin-bottom: 1.75rem;
}

.social-login-title {
  color: #64748b;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  font-weight: 500;
}

/* Removed old circular Google button styles to use shared component styling */
/* Align Google button styling with SignIn page */
.social-login .google-btn {
  width: 100%;
  max-width: 300px;
  margin: 0 auto 1rem;
  background: #ffffff;
  border: 2px solid #e2e8f0;
  color: #1e293b;
}
.social-login .google-btn:hover {
  background: #f8fafc;
}

.error-msg {
  margin-top: 1rem;
  font-size: 0.85rem;
  color: #b91c1c;
  background: #fee2e2;
  border: 1px solid #fecaca;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  text-align: center;
}

.or-divider {
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
}

.or-line {
  flex: 1;
  height: 1px;
  background-color: #e2e8f0;
}

.or-text {
  padding: 0 1rem;
  color: #94a3b8;
  font-size: 0.875rem;
  font-weight: 500;
}

.submit-btn {
  width: 100%;
  padding: 16px;
  background: #6089f1;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(96, 137, 241, 0.2);
  margin-top: 1rem;
}

.submit-btn:hover {
  background: #4f7ae9;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(96, 137, 241, 0.25);
}

.submit-btn:active {
  transform: translateY(0);
}

.welcome-section {
  position: absolute;
  right: 0;
  top: 0;
  width: 35%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1; /* Đảm bảo nút click được */
}

.welcome-content {
  max-width: 300px;
  text-align: center;
  color: white;
  padding: 2rem;
}

.account-exists {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.signin-btn {
  background: white;
  color: #6089f1;
  border: none;
  padding: 14px 28px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 0;
  transform: translateX(5px);
  padding: 12px 24px;
}

.signin-btn:hover {
  background: #f8fafc;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.account-exists {
  font-size: 1.8rem;
  font-weight: 500;
  white-space: nowrap;
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  line-height: 1.4;
  position: relative;
  left: -50px;
  gap: 10px;
}

.signin-link {
  background: white;
  color: #6089f1;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  white-space: nowrap; /* Đảm bảo text trong nút không xuống dòng */
}

/* Responsive */
@media (max-width: 768px) {
  .login-wrapper {
    flex-direction: column;
    background: white;
  }

  .login-container {
    width: 100%;
    padding: 2rem;
  }

  .login-title {
    font-size: 2rem;
  }

  .welcome-section {
    position: static;
    width: 100%;
    background: #6089f1;
    padding: 2rem 1.5rem;
  }

  .account-exists {
    font-size: 1.4rem;
  }
}
</style>

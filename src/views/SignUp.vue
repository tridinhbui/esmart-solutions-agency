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
            name: 'SignIn',
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
import { ref, watch, onMounted } from "vue";
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
const hasNavigatedAfterAuth = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

// Wait until auth store reflects a signed-in user (or timeout)
const waitForAuthUser = async (timeoutMs = 8000) => {
  const start = Date.now();
  while (!authStore.user && Date.now() - start < timeoutMs) {
    await new Promise((r) => setTimeout(r, 50));
  }
  return !!authStore.user;
};

const navigateAfterAuthOnce = () => {
  if (hasNavigatedAfterAuth.value) return;
  if (!authStore.user) return;
  hasNavigatedAfterAuth.value = true;
  const redirect = router.currentRoute.value.query.redirect || "/";
  router.replace(redirect);
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
    await waitForAuthUser();
    navigateAfterAuthOnce();
  } catch (e) {
    console.error("Signup error", e);
    errorMessage.value = mapError(e);
  }
};

const handleGoogleSignUp = async () => {
  try {
    errorMessage.value = null;
    await authStore.signInWithGoogle();
    await waitForAuthUser();
    navigateAfterAuthOnce();
  } catch (e) {
    console.error("Google signup failed", e);
    errorMessage.value = mapError(e);
  }
};

// Handle cases where auth completes via redirect or user is already signed in
onMounted(() => {
  if (authStore.user) navigateAfterAuthOnce();
});

watch(
  () => authStore.user,
  (u) => {
    if (u) navigateAfterAuthOnce();
  }
);

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
  background: linear-gradient(to right, var(--bg-primary) 65%, #ffffff 35%);
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
  color: var(--text-primary);
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
  border: 2px solid var(--border-light);
  border-radius: 10px;
  background-color: var(--card-bg);
  transition: all 0.3s ease;
  box-shadow: var(--shadow-sm);
  color: var(--text-primary);
}

.input-field:focus {
  outline: none;
  border-color: #6089f1;
  box-shadow: 0 0 0 3px rgba(96, 137, 241, 0.2);
}

.input-field::placeholder {
  color: var(--text-muted);
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
  stroke: var(--text-secondary);
}

/* Social login - ĐÃ FIX */
.social-login {
  text-align: center;
  margin-bottom: 1.75rem;
}

.social-login-title {
  color: var(--text-muted);
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
  background: var(--card-bg);
  border: 2px solid var(--border-light);
  color: var(--text-primary);
}
.social-login .google-btn:hover {
  background: var(--bg-secondary);
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
  background-color: var(--border-light);
}

.or-text {
  padding: 0 1rem;
  color: var(--text-muted);
  font-size: 0.875rem;
  font-weight: 500;
}




.login-btn {
  background: var(--button-primary-bg);
    color: var(--text-inverse);
  border: none;
  padding: 10px 16px;
  border-radius: 12px;
  font-family: "Inter", sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: var(--shadow-blue);
}
.login-btn:hover {
  background: var(--button-primary-hover);
  transform: translateY(-2px);
}


.submit-btn {
  width: 100%;
  padding: 16px;
  background: var(--button-primary-bg);
  color: var(--text-inverse);
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-blue);
  margin-top: 1rem;
}

.submit-btn:hover {
  background: var(--button-primary-hover);
  transform: translateY(-2px);
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
  color: #1e293b;
  padding: 2rem;
}




.signin-btn {
  background:  var(--button-primary-bg);
  color: var(--text-inverse);
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-family: "Inter", sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  box-shadow: var(--shadow-blue);
  margin-top: 0;
  transform: translateX(5px);
}

.signin-btn:hover {
  background:  var(--button-primary-hover);
  transform: translateX(5px) translateY(-2px);
}

.account-exists {
  font-size: 1.8rem;
  font-weight: 600;
  white-space: nowrap;
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  line-height: 1.4;
  position: relative;
  left: -50px;
  gap: 10px;
  color: #1e293b;
}

.signin-link {
  background: #6089f1;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  box-shadow: 0 4px 15px rgba(96, 137, 241, 0.3);
  white-space: nowrap; /* Đảm bảo text trong nút không xuống dòng */
}

.signin-link:hover {
  background: #5078e0;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(96, 137, 241, 0.4);
}

/* Responsive */
@media (max-width: 768px) {
  .login-wrapper {
    flex-direction: column;
    background: var(--bg-primary);
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
    background: #ffffff;
    padding: 2rem 1.5rem;
  }

  .account-exists {
    font-size: 1.4rem;
  }

  .social-login .google-btn {
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .login-container {
    padding: 1.5rem;
  }

  .login-title {
    font-size: 1.5rem;
  }

  .social-login {
    margin-bottom: 1.5rem;
  }

  .social-login-title {
    font-size: 0.9rem;
  }

  .social-login .google-btn {
    max-width: 100% !important;
  }

  .submit-btn {
    padding: 0.75rem;
    font-size: 0.95rem;
  }

  .input-field {
    font-size: 16px;
    padding: 0.75rem;
  }

  .welcome-section {
    padding: 1.5rem 1rem;
  }

  .account-exists {
    font-size: 1.2rem;
    left: 0;
  }

  .signin-btn {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
}
</style>

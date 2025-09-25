<template>
  <div class="login-wrapper">
    <!-- Navigation Bar with Logo -->
    <nav class="login-navbar">
      <router-link to="/" class="navbar-logo">
        <img
          src="@/assets/logo.png"
          alt="ESmart Logo"
          class="navbar-logo-img"
        />
        <span class="navbar-logo-text">ESmart Solutions</span>
      </router-link>
    </nav>

    <!-- Quantum Background Effects -->
    <div class="quantum-background">
      <div
        v-for="(item, index) in backgroundItems"
        :key="index"
        class="background-item"
        :style="{ animationDelay: `${index * 0.5}s` }"
      />
      <div class="energy-waves">
        <div
          v-for="(item, index) in energyWaves"
          :key="index"
          class="energy-wave"
          :style="{ animationDelay: `${index * 0.3}s` }"
        />
      </div>
      <div class="neural-grid">
        <div v-for="i in 8" :key="`h-${i}`" class="grid-line horizontal" />
        <div v-for="i in 6" :key="`v-${i}`" class="grid-line vertical" />
      </div>
    </div>

    <div class="welcome-section">
      <div class="cosmic-glow" />
      <h3 class="welcome-title">
        <span class="quantum-text">{{ $t("auth.welcomeNew") }}</span>
      </h3>
      <p class="welcome-subtitle">
        {{ $t("auth.welcomeSubtitle") }}
      </p>
      <button class="signup-btn quantum-button" @click="handleSignUp">
        <span class="button-glow" />
        <span class="button-text">{{ $t("auth.ctaGetStarted") }}</span>
      </button>
    </div>
    <div class="signin-container">
      <div class="login-content">
        <div class="hologram-frame" />
        <h2 class="login-title">
          <span class="quantum-text">{{ $t("auth.signInTitle") }}</span>
        </h2>

        <!-- Phần đăng nhập bằng Google -->
        <div class="social-login">
          <p class="social-login-title">{{ $t("auth.socialLogin") }}</p>
          <GoogleSignInButton
            :disabled="authStore.isLoading"
            @click="handleGoogleLogin"
          >
            <template #default>
              <span v-if="!authStore.isLoading">{{
                $t("auth.googleSignIn")
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

        <!-- Form đăng nhập bằng email/password -->
        <form class="login-form" @submit.prevent="handleEmailLogin">
          <div class="input-group">
            <input
              id="email"
              v-model="email"
              type="email"
              :placeholder="$t('auth.emailPlaceholder')"
              class="input-field"
              required
            />
          </div>

          <div class="input-group password-group">
            <input
              id="password"
              v-model="password"
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

          <div class="button-container">
            <button type="submit" class="submit-btn quantum-button">
              <span class="button-glow" />
              <span class="button-text">{{ $t("auth.btnSignIn") }}</span>
            </button>
          </div>
        </form>

        <p v-if="errorMessage" class="error">
          {{ errorMessage }}
        </p>
        <div class="account-switch">
          <span class="switch-text">{{ $t("auth.noAccount") }}</span>
          <router-link to="/sign-up" class="switch-link">{{
            $t("auth.btnSignUp")
          }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthStore } from "@/stores/auth";
import GoogleSignInButton from "@/components/GoogleSignInButton.vue";

const router = useRouter();
const { t } = useI18n();
const authStore = useAuthStore();
const showPassword = ref(false);
const email = ref("");
const password = ref("");
const errorMessage = ref(null);

// Toggle password visibility
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

// Handle email/password login
const handleEmailLogin = async () => {
  try {
    errorMessage.value = null; // Reset lỗi trước khi thử đăng nhập
    await signInWithEmailAndPassword(auth, email.value, password.value);
    // Store will update via onAuthStateChanged

    // Kiểm tra redirect từ router (nếu có)
    const redirect = router.currentRoute.value.query.redirect || "/";
    await router.push(redirect);
  } catch (err) {
    console.error("Lỗi đăng nhập:", err);
    handleLoginError(err);
  }
};

// Handle Google login
const handleGoogleLogin = async () => {
  try {
    errorMessage.value = null;
    await authStore.signInWithGoogle();
    router.push("/");
  } catch (err) {
    handleLoginError(err);
  }
};

// Common error handler
const handleLoginError = (err) => {
  console.error("Login error:", err);

  switch (err.code) {
    case "auth/wrong-password":
      errorMessage.value = t("auth.errors.wrongPassword");
      break;
    case "auth/user-not-found":
      errorMessage.value = t("auth.errors.userNotFound");
      break;
    case "auth/invalid-email":
      errorMessage.value = t("auth.errors.invalidEmail");
      break;
    case "auth/popup-closed-by-user":
      errorMessage.value = t("auth.errors.popupClosed");
      break;
    default:
      errorMessage.value = t("auth.errors.genericLogin");
  }
};

// Navigate to signup page, preserve redirect param
const handleSignUp = () => {
  const redirect = router.currentRoute.value.query.redirect;
  router.push({
    path: "/sign-up",
    ...(redirect ? { query: { redirect } } : {}),
  });
};
</script>

<style scoped>
/* Login Navbar */
.login-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0.85rem 2rem;
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  z-index: 1000;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

.login-navbar .navbar-logo-text {
  background: none;
  -webkit-text-fill-color: #1e293b;
  color: #1e293b;
  text-shadow: none;
}

.login-navbar .navbar-logo-img {
  filter: none;
}

.navbar-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: all 0.3s ease;
}

.navbar-logo:hover {
  transform: translateY(-2px);
}

.navbar-logo-img {
  width: 40px;
  height: 40px;
  object-fit: contain;
  margin-right: 0.75rem;
  filter: drop-shadow(0 0 10px rgba(255, 107, 53, 0.5));
}

.navbar-logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #ff6b35 0%, #f59e0b 50%, #fff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 20px rgba(255, 107, 53, 0.3);
}

/* Flattened login wrapper to align with homepage */
.login-wrapper {
  display: flex;
  min-height: 100vh;
  padding-top: 80px; /* Space for navbar */
  background: #ffffff;
  position: relative;
  overflow: hidden;
}

/* Quantum Background Effects */
.quantum-background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.quantum-particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: radial-gradient(circle, #ff6b35 0%, transparent 70%);
  border-radius: 50%;
  animation: quantumDrift 12s infinite linear;
  box-shadow: 0 0 15px rgba(255, 107, 53, 0.5);
}

.quantum-particle:nth-child(odd) {
  animation-duration: 15s;
  background: radial-gradient(circle, #f59e0b 0%, transparent 70%);
}

.quantum-particle:nth-child(1) {
  left: 10%;
  animation-delay: 0s;
}
.quantum-particle:nth-child(2) {
  left: 20%;
  animation-delay: 2s;
}
.quantum-particle:nth-child(3) {
  left: 30%;
  animation-delay: 4s;
}
.quantum-particle:nth-child(4) {
  left: 40%;
  animation-delay: 1s;
}
.quantum-particle:nth-child(5) {
  left: 50%;
  animation-delay: 3s;
}
.quantum-particle:nth-child(6) {
  left: 60%;
  animation-delay: 5s;
}
.quantum-particle:nth-child(7) {
  left: 70%;
  animation-delay: 2.5s;
}
.quantum-particle:nth-child(8) {
  left: 80%;
  animation-delay: 4.5s;
}
.quantum-particle:nth-child(9) {
  left: 90%;
  animation-delay: 1.5s;
}
.quantum-particle:nth-child(10) {
  left: 15%;
  animation-delay: 6s;
}
.quantum-particle:nth-child(11) {
  left: 25%;
  animation-delay: 7s;
}
.quantum-particle:nth-child(12) {
  left: 35%;
  animation-delay: 8s;
}
.quantum-particle:nth-child(13) {
  left: 45%;
  animation-delay: 3.5s;
}
.quantum-particle:nth-child(14) {
  left: 65%;
  animation-delay: 5.5s;
}
.quantum-particle:nth-child(15) {
  left: 85%;
  animation-delay: 7.5s;
}

.energy-waves {
  position: absolute;
  width: 100%;
  height: 100%;
}

.energy-wave {
  position: absolute;
  left: -50%;
  width: 200%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #ff6b35, transparent);
  animation: energyFlow 8s infinite linear;
  opacity: 0.3;
}

.energy-wave:nth-child(1) {
  top: 20%;
  animation-delay: 0s;
}
.energy-wave:nth-child(2) {
  top: 40%;
  animation-delay: 2s;
}
.energy-wave:nth-child(3) {
  top: 60%;
  animation-delay: 4s;
}
.energy-wave:nth-child(4) {
  top: 80%;
  animation-delay: 6s;
}
.energy-wave:nth-child(5) {
  top: 90%;
  animation-delay: 1s;
}

.neural-grid {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.1;
}

.grid-line {
  position: absolute;
  background: linear-gradient(90deg, transparent, #ff6b35, transparent);
}

.grid-line.horizontal {
  width: 100%;
  height: 1px;
}

.grid-line.vertical {
  width: 1px;
  height: 100%;
}

/* Container Styling */
.welcome-section {
  width: 45%;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  background: #ffffff;
}

.cosmic-glow {
  display: none;
}

.welcome-title {
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 2rem;
  text-align: center;
}

.quantum-text {
  background: none;
  -webkit-text-fill-color: inherit;
  color: #1e293b;
  text-shadow: none;
  animation: none;
}

.welcome-subtitle {
  color: #64748b;
  font-size: 1.05rem;
  text-align: center;
  margin-bottom: 2.25rem;
  line-height: 1.5;
  max-width: 400px;
}

.signin-container {
  width: 55%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
  z-index: 1;
}

.login-content {
  width: 100%;
  max-width: 500px;
  padding: 3rem;
  background: #ffffff;
  border-radius: 20px;
  border: 2px solid #f1f5f9;
  position: relative;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.hologram-frame {
  display: none;
}

.login-title {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: 800;
}

/* Social Login */
.social-login {
  text-align: center;
  margin-bottom: 2rem;
}

.social-login-title {
  color: #64748b;
  font-size: 0.85rem;
  margin-bottom: 1rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

/* Quantum Button Base */
.quantum-button {
  padding: 0.85rem 1.5rem;
  border: none;
  border-radius: 12px;
  background: #3b82f6;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.25s ease, transform 0.25s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
.quantum-button:hover {
  background: #2563eb;
  transform: translateY(-2px);
}

.button-glow {
  display: none;
}
.button-text {
  position: relative;
}

/* Google Button */
.google-btn {
  width: 100%;
  max-width: 300px;
  margin: 0 auto 1rem;
  background: #ffffff;
  border: 2px solid #e2e8f0;
  color: #1e293b;
}
.google-btn:hover {
  background: #f8fafc;
}

.google-icon {
  width: 20px;
  height: 20px;
}

/* Welcome Section Button */
.signup-btn {
  width: 100%;
  max-width: 300px;
  font-size: 1rem;
}

/* OR Divider */
.or-divider {
  display: flex;
  align-items: center;
  margin: 2rem 0;
}

.or-line {
  flex: 1;
  height: 1px;
  background: #e2e8f0;
}

.or-text {
  padding: 0 1rem;
  color: #64748b;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Form */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-group {
  position: relative;
}

.input-field {
  width: 100%;
  padding: 0.85rem 1.2rem;
  background: #ffffff;
  border: 2px solid #e2e8f0;
  border-radius: 14px;
  font-size: 0.95rem;
  color: #1e293b;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.input-field::placeholder {
  color: #94a3b8;
}
.input-field:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
}

/* Button Container */
.button-container {
  margin-top: 1rem;
}

/* Submit Button */
.submit-btn {
  width: 100%;
  font-size: 1rem;
}

.error {
  color: #b91c1c;
  background: #fee2e2;
  border: 1px solid #fecaca;
  margin-top: 1rem;
  text-align: center;
  font-size: 0.85rem;
  padding: 0.75rem;
  border-radius: 10px;
}

.account-switch {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  align-items: center;
  flex-wrap: wrap;
}
.account-switch .switch-text {
  color: #64748b;
}
.account-switch .switch-link {
  color: #3b82f6;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;
}
.account-switch .switch-link:hover {
  color: #2563eb;
}

.password-group {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.6);
  transition: color 0.3s ease;
}

.toggle-password:hover {
  color: rgba(255, 107, 53, 0.8);
}

/* Quantum Animations */
@keyframes quantumDrift {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-100vh) rotate(180deg);
    opacity: 1;
  }
}

@keyframes energyFlow {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes cosmicPulse {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.1;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.3;
  }
}

@keyframes quantumGlow {
  0%,
  100% {
    text-shadow: 0 0 30px rgba(255, 107, 53, 0.3);
  }
  50% {
    text-shadow: 0 0 40px rgba(255, 107, 53, 0.6),
      0 0 60px rgba(245, 158, 11, 0.4);
  }
}

@keyframes hologramBorder {
  0% {
    background: linear-gradient(45deg, #ff6b35, #f59e0b, #d97706, #ff6b35);
  }
  25% {
    background: linear-gradient(90deg, #f59e0b, #d97706, #ff6b35, #f59e0b);
  }
  50% {
    background: linear-gradient(135deg, #d97706, #ff6b35, #f59e0b, #d97706);
  }
  75% {
    background: linear-gradient(180deg, #ff6b35, #f59e0b, #d97706, #ff6b35);
  }
  100% {
    background: linear-gradient(45deg, #ff6b35, #f59e0b, #d97706, #ff6b35);
  }
}

/* Grid positioning */
.grid-line.horizontal:nth-child(1) {
  top: 12.5%;
}
.grid-line.horizontal:nth-child(2) {
  top: 25%;
}
.grid-line.horizontal:nth-child(3) {
  top: 37.5%;
}
.grid-line.horizontal:nth-child(4) {
  top: 50%;
}
.grid-line.horizontal:nth-child(5) {
  top: 62.5%;
}
.grid-line.horizontal:nth-child(6) {
  top: 75%;
}
.grid-line.horizontal:nth-child(7) {
  top: 87.5%;
}
.grid-line.horizontal:nth-child(8) {
  top: 100%;
}

.grid-line.vertical:nth-child(1) {
  left: 16.66%;
}
.grid-line.vertical:nth-child(2) {
  left: 33.33%;
}
.grid-line.vertical:nth-child(3) {
  left: 50%;
}
.grid-line.vertical:nth-child(4) {
  left: 66.66%;
}
.grid-line.vertical:nth-child(5) {
  left: 83.33%;
}
.grid-line.vertical:nth-child(6) {
  left: 100%;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .login-wrapper {
    flex-direction: column;
  }

  .welcome-section,
  .signin-container {
    width: 100%;
  }

  .welcome-section {
    padding: 2rem;
    min-height: 40vh;
  }

  .welcome-title {
    font-size: 3rem;
  }

  .signin-container {
    min-height: 60vh;
  }
}

@media (max-width: 768px) {
  .welcome-title {
    font-size: 2.5rem;
  }

  .welcome-subtitle {
    font-size: 1rem;
  }

  .login-content {
    padding: 2rem;
    margin: 1rem;
  }

  .login-title {
    font-size: 2rem;
  }

  .quantum-particle {
    display: none;
  }

  .energy-wave {
    opacity: 0.1;
  }
}

@media (max-width: 480px) {
  .welcome-section {
    padding: 1rem;
  }

  .welcome-title {
    font-size: 2rem;
  }

  .login-content {
    padding: 1.5rem;
  }

  .quantum-button {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }
}
</style>

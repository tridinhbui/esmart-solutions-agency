<template>
  <div class="login-wrapper">
    <!-- Navigation Bar with Logo -->
    <nav class="login-navbar">
      <router-link to="/" class="navbar-logo">
        <img
          src="@/assets/logo.png"
          alt="ESmart Logo"
          class="navbar-logo-img"
        >
        <span class="navbar-logo-text">ESmart Solutions</span>
      </router-link>
    </nav>

    <!-- Quantum Background Effects -->
    <div class="quantum-background">
      <div class="quantum-particle" v-for="i in 15" :key="i" />
      <div class="energy-waves">
        <div class="energy-wave" v-for="i in 5" :key="i" />
      </div>
      <div class="neural-grid">
        <div class="grid-line horizontal" v-for="i in 8" :key="`h-${i}`" />
        <div class="grid-line vertical" v-for="i in 6" :key="`v-${i}`" />
      </div>
    </div>

    <div class="welcome-section">
      <div class="cosmic-glow"></div>
      <h3 class="welcome-title">
        <span class="quantum-text">Lần đầu tới đây?</span>
      </h3>
      <p class="welcome-subtitle">
        Khám phá thế giới đổi mới số và những khả năng vô hạn cùng ESmart Solutions!
      </p>
      <button
        class="signup-btn quantum-button"
        @click="handleSignUp"
      >
        <span class="button-glow"></span>
        <span class="button-text">Bắt đầu hành trình</span>
      </button>
    </div>
    <div class="login-container">
      <div class="login-content">
        <div class="hologram-frame"></div>
        <h2 class="login-title">
          <span class="quantum-text">Cổng đăng nhập</span>
        </h2>
        
        <!-- Phần đăng nhập bằng Google -->
        <div class="social-login">
          <p class="social-login-title">
            Đăng nhập qua mạng xã hội
          </p>
          <button
            class="google-btn quantum-button"
            @click="handleGoogleLogin"
          >
            <span class="button-glow"></span>
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              class="google-icon"
            >
            <span class="button-text">Đăng nhập Google</span>
          </button>
        </div>

        <!-- Dòng ngăn cách OR -->
        <div class="or-divider">
          <span class="or-line" />
          <span class="or-text">HOẶC</span>
          <span class="or-line" />
        </div>

        <!-- Form đăng nhập bằng email/password -->
        <form
          class="login-form"
          @submit.prevent="handleEmailLogin"
        >
          <div class="input-group">
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="Địa chỉ email"
              class="input-field"
              required
            >
          </div>
    
          <div class="input-group password-group">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Mật khẩu"
              class="input-field"
              required
            >
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
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line
                  x1="1"
                  y1="1"
                  x2="23"
                  y2="23"
                />
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
                <circle
                  cx="12"
                  cy="12"
                  r="3"
                />
              </svg>
            </button>
          </div>
    
          <div class="button-container">
            <button
              type="submit"
              class="submit-btn quantum-button"
            >
              <span class="button-glow"></span>
              <span class="button-text">Đăng nhập</span>
            </button>
          </div>
        </form>
    
        <p
          v-if="error"
          class="error"
        >
          {{ error }}
        </p>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth, googleProvider } from '@/firebase';
import { 
  signInWithEmailAndPassword,
  signInWithPopup 
} from 'firebase/auth';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const showPassword = ref(false);
const email = ref('');
const password = ref('');
const error = ref(null);

// Toggle password visibility
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

// Handle email/password login
const handleEmailLogin = async () => {
  try {
    error.value = null; // Reset lỗi trước khi thử đăng nhập
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    
    // Cập nhật store và chuyển hướng
    authStore.user = userCredential.user;
    
    // Kiểm tra redirect từ router (nếu có)
    const redirect = router.currentRoute.value.query.redirect || '/';
    await router.push(redirect);
    
  } catch (err) {
    console.error('Lỗi đăng nhập:', err);
    handleLoginError(err);
  }
};

  
// Handle Google login
const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    
    // User data is automatically saved via onAuthStateChanged in authStore
    console.log('Google login successful:', result.user);
    router.push('/');
    
  } catch (err) {
    handleLoginError(err);
  }
};

// Common error handler
const handleLoginError = (error) => {
  console.error('Login error:', error);
  
  switch (error.code) {
    case 'auth/wrong-password':
      error.value = 'Incorrect password. Please try again.';
      break;
    case 'auth/user-not-found':
      error.value = 'No account found with this email.';
      break;
    case 'auth/invalid-email':
      error.value = 'Invalid email format.';
      break;
    case 'auth/popup-closed-by-user':
      error.value = 'Google login popup was closed.';
      break;
    default:
      error.value = 'Login failed. Please try again later.';
  }
};

// Navigate to signup page
const handleSignUp = () => {
  router.push('/sign-up');
};

</script>
  
<style scoped>
/* Login Navbar */
.login-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1rem 2rem;
  background: rgba(10, 10, 20, 0.9);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 107, 53, 0.2);
  z-index: 1000;
  display: flex;
  align-items: center;
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

/* Quantum Mystical Login Wrapper */
.login-wrapper {
  display: flex;
  min-height: 100vh;
  padding-top: 80px; /* Space for navbar */
  background: 
    radial-gradient(circle at 20% 30%, rgba(255, 107, 53, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(245, 158, 11, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(217, 119, 6, 0.05) 0%, transparent 70%),
    linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%);
  position: relative;
  overflow: hidden;
}

/* Quantum Background Effects */
.quantum-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
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

.quantum-particle:nth-child(1) { left: 10%; animation-delay: 0s; }
.quantum-particle:nth-child(2) { left: 20%; animation-delay: 2s; }
.quantum-particle:nth-child(3) { left: 30%; animation-delay: 4s; }
.quantum-particle:nth-child(4) { left: 40%; animation-delay: 1s; }
.quantum-particle:nth-child(5) { left: 50%; animation-delay: 3s; }
.quantum-particle:nth-child(6) { left: 60%; animation-delay: 5s; }
.quantum-particle:nth-child(7) { left: 70%; animation-delay: 2.5s; }
.quantum-particle:nth-child(8) { left: 80%; animation-delay: 4.5s; }
.quantum-particle:nth-child(9) { left: 90%; animation-delay: 1.5s; }
.quantum-particle:nth-child(10) { left: 15%; animation-delay: 6s; }
.quantum-particle:nth-child(11) { left: 25%; animation-delay: 7s; }
.quantum-particle:nth-child(12) { left: 35%; animation-delay: 8s; }
.quantum-particle:nth-child(13) { left: 45%; animation-delay: 3.5s; }
.quantum-particle:nth-child(14) { left: 65%; animation-delay: 5.5s; }
.quantum-particle:nth-child(15) { left: 85%; animation-delay: 7.5s; }

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

.energy-wave:nth-child(1) { top: 20%; animation-delay: 0s; }
.energy-wave:nth-child(2) { top: 40%; animation-delay: 2s; }
.energy-wave:nth-child(3) { top: 60%; animation-delay: 4s; }
.energy-wave:nth-child(4) { top: 80%; animation-delay: 6s; }
.energy-wave:nth-child(5) { top: 90%; animation-delay: 1s; }

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
}

.cosmic-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255, 107, 53, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(40px);
  animation: cosmicPulse 4s infinite ease-in-out;
}

.welcome-title {
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 2rem;
  text-align: center;
}

.quantum-text {
  background: linear-gradient(135deg, #ff6b35 0%, #f59e0b 50%, #fff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(255, 107, 53, 0.3);
  animation: quantumGlow 3s infinite ease-in-out;
}

.welcome-subtitle {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 3rem;
  line-height: 1.6;
  max-width: 400px;
}

.login-container {
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
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(255, 107, 53, 0.2);
  position: relative;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.hologram-frame {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #ff6b35, #f59e0b, #d97706, #ff6b35);
  border-radius: 22px;
  z-index: -1;
  animation: hologramBorder 3s infinite linear;
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
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  margin-bottom: 1.5rem;
  display: block;
}

/* Quantum Button Base */
.quantum-button {
  position: relative;
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  background: rgba(255, 107, 53, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s ease;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 1px solid rgba(255, 107, 53, 0.3);
}

.quantum-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 30px rgba(255, 107, 53, 0.3);
  border-color: rgba(255, 107, 53, 0.6);
}

.button-glow {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.quantum-button:hover .button-glow {
  left: 100%;
}

.button-text {
  position: relative;
  z-index: 1;
}

/* Google Button */
.google-btn {
  width: 100%;
  max-width: 300px;
  margin: 0 auto 1rem;
}

.google-icon {
  width: 20px;
  height: 20px;
}

/* Welcome Section Button */
.signup-btn {
  width: 100%;
  max-width: 300px;
  font-size: 1.1rem;
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
  background: linear-gradient(90deg, transparent, rgba(255, 107, 53, 0.3), transparent);
}

.or-text {
  padding: 0 1rem;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
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
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 107, 53, 0.2);
  border-radius: 50px;
  font-size: 1rem;
  color: white;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.input-field::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.input-field:focus {
  outline: none;
  border-color: rgba(255, 107, 53, 0.6);
  box-shadow: 0 0 20px rgba(255, 107, 53, 0.3);
  background: rgba(255, 255, 255, 0.15);
}

/* Button Container */
.button-container {
  margin-top: 1rem;
}

/* Submit Button */
.submit-btn {
  width: 100%;
  font-size: 1.1rem;
}

.error {
  color: #ff6b6b;
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
  background: rgba(255, 107, 107, 0.1);
  padding: 0.75rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 107, 107, 0.3);
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
  0%, 100% {
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
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.1;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.3;
  }
}

@keyframes quantumGlow {
  0%, 100% {
    text-shadow: 0 0 30px rgba(255, 107, 53, 0.3);
  }
  50% {
    text-shadow: 0 0 40px rgba(255, 107, 53, 0.6), 0 0 60px rgba(245, 158, 11, 0.4);
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
.grid-line.horizontal:nth-child(1) { top: 12.5%; }
.grid-line.horizontal:nth-child(2) { top: 25%; }
.grid-line.horizontal:nth-child(3) { top: 37.5%; }
.grid-line.horizontal:nth-child(4) { top: 50%; }
.grid-line.horizontal:nth-child(5) { top: 62.5%; }
.grid-line.horizontal:nth-child(6) { top: 75%; }
.grid-line.horizontal:nth-child(7) { top: 87.5%; }
.grid-line.horizontal:nth-child(8) { top: 100%; }

.grid-line.vertical:nth-child(1) { left: 16.66%; }
.grid-line.vertical:nth-child(2) { left: 33.33%; }
.grid-line.vertical:nth-child(3) { left: 50%; }
.grid-line.vertical:nth-child(4) { left: 66.66%; }
.grid-line.vertical:nth-child(5) { left: 83.33%; }
.grid-line.vertical:nth-child(6) { left: 100%; }

/* Responsive Design */
@media (max-width: 1024px) {
  .login-wrapper {
    flex-direction: column;
  }
  
  .welcome-section,
  .login-container {
    width: 100%;
  }
  
  .welcome-section {
    padding: 2rem;
    min-height: 40vh;
  }
  
  .welcome-title {
    font-size: 3rem;
  }
  
  .login-container {
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
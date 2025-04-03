<template>
  <div class="login-wrapper">
    <div class="welcome-section">
      <h3 class="welcome-title">New Here?</h3>
      <p class="welcome-subtitle">Sign up and discover a great amount of new opportunities!</p>
      <button class="signup-btn" @click="handleSignUp">Sign Up</button>
    </div>
    <div class="login-container">
      <div class="login-content">
        <h2 class="login-title">Login to Your Account</h2>
        
        <!-- Phần đăng nhập bằng Google -->
        <div class="social-login">
          <p class="social-login-title">Login using social networks</p>
          <button @click="handleGoogleLogin" class="google-btn">
              <img src="https://www.google.com/favicon.ico" alt="Google" class="google-icon">
          </button>
        </div>

        <!-- Dòng ngăn cách OR -->
        <div class="or-divider">
          <span class="or-line"></span>
          <span class="or-text">OR</span>
          <span class="or-line"></span>
        </div>

        <!-- Form đăng nhập bằng email/password -->
        <form @submit.prevent="handleEmailLogin" class="login-form">
          <div class="input-group">
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="Email"
              class="input-field"
              required
            >
          </div>
    
          <div class="input-group password-group">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Password"
              class="input-field"
              required
            >
            <button type="button" class="toggle-password" @click="togglePassword">
              <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
              <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
          </div>
    
          <div class="button-container">
            <button type="submit" class="submit-btn">
              Sign In
            </button>
          </div>
        </form>
    
        <p v-if="error" class="error">{{ error }}</p>
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
/* Wrapper với 2 màu nền - bên trái trắng, bên phải xanh */
.login-wrapper {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(to right, white 65%, #6089f1 35%);
}
/* Phần nền bên phải */
.login-wrapper::after {
  content: "";
  position: absolute;
  right: 0;
  width: 35%;
  height: 100%;
  background: 
    conic-gradient(
      from 45deg at 25% 25%,
      rgba(255,255,255,0.1) 0deg 90deg,
      transparent 90deg 180deg,
      rgba(255,255,255,0.08) 180deg 270deg,
      transparent 270deg
    ),
    conic-gradient(
      from -15deg at 75% 30%,
      transparent 0deg 90deg,
      rgba(255,255,255,0.12) 90deg 180deg,
      transparent 180deg 270deg,
      rgba(255,255,255,0.05) 270deg
    ),
    conic-gradient(
      from 30deg at 50% 70%,
      rgba(255,255,255,0.07) 0deg 90deg,
      transparent 90deg 270deg,
      rgba(255,255,255,0.15) 270deg
    );
  background-size: 
    150px 150px,
    200px 200px,
    180px 180px;
  opacity: 0.25;
  z-index: 0;
  mix-blend-mode: overlay;
}

/* Container */
.login-container {
  width: 70%; 
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 16.5%;
  padding-right: 7%;
}
.login-content {
  width: 100%;
  max-width: 580px;
  padding: 3rem;
}

.login-title {
  text-align: right;
  margin-bottom: 2rem;
  color: #1e293b;
  font-size: 3.5rem;
  font-weight: 800;
  letter-spacing: -1px;
  line-height: 1.1;
  white-space: nowrap;
  width: 100%;
  padding: 0 40px 0 20px;
  margin-left: 30px;
  position: relative;
  right: 80px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Social Login */
.social-login {
  text-align: center;
  margin-bottom: 0.5rem;
}

.social-login-title {
  color: #64748b;
  font-size: 1.1rem;
  margin-bottom: 0.9rem;
  display: block;
}

/* Google Button */
.google-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: white;
  border: 1px solid #e0f2fe;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 0.5rem;
}

.google-btn:hover {
  background: #f0f9ff;
  border-color: #bae6fd;
  transform: scale(1.05);
}

.google-icon {
  width: 24px;
  height: 24px;
}

/* OR Divider */
.or-divider {
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
}

.or-line {
  flex: 1;
  height: 1px;
  background: #e2e8f0;
}

.or-text {
  padding: 0 1rem;
  color: #64748b;
  font-size: 0.8rem;
  text-transform: uppercase;
}

/* Form */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}


.input-field {
  padding: 16px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  background: white;
  width: 100%;
  box-sizing: border-box;
}

.input-field:focus {
  outline: none;
  border-color: #38bdf8; /* Màu xanh khi focus */
  box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.2);
}

/* Button Container */
.button-container {
  margin-top: 1.5rem;
}

/* Submit Button */
.submit-btn {
  width: 100%;
  padding: 16px;
  background: #6089f1;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background: #38bdf8;
}

.error {
  color: #ef4444;
  margin-top: 1rem;
  text-align: left;
  font-size: 0.9rem;
}

.password-group {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-password svg {
  transition: all 0.3s ease;
}

.toggle-password:hover svg {
  stroke: #475569;
}

.input-field {
  padding-right: 50px !important; /* Tạo khoảng trống cho nút */
}
.welcome-section {
  position: absolute;
  right: 7%;
  top: 50%;
  transform: translateY(-50%);
  width: 30%;
  max-width: 350px;
  color: white;
  text-align: center;
  padding: 2rem;
  z-index: 1;
}

.welcome-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.welcome-subtitle {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.5;
}

.signup-btn {
  background: white;
  color: #6089f1;
  border: none;
  padding: 14px 28px;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.signup-btn:hover {
  background: #f8fafc;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}


/* Responsive */
@media (max-width: 768px) {
  .login-wrapper {
    background: white;
    flex-direction: column;
  }
  
  .login-container {
    width: 100%;
    padding: 2rem;
  }
  
  .login-content {
    padding: 2rem;
    box-shadow: none;
  }
  .login-title {
    font-size: 2.5rem;
    text-align: center;
    right: 0;
    margin-left: 0;
    padding: 0;
  }
  .toggle-password {
    right: 12px;
  }
  .welcome-section {
    position: static;
    width: 100%;
    max-width: none;
    transform: none;
    padding: 2rem 1.5rem;
    background: #6089f1;
    margin-top: 2rem;
  }
  
  .welcome-title {
    font-size: 1.8rem;
  }
}
</style>
<template>
  <section class="simple-marketing-assessment">
    <!-- Background Pattern with Radial Gradients -->
    <div class="flat-background">
      <div class="geometric-pattern"></div>
      <div class="radial-ribbon ribbon-1"></div>
      <div class="radial-ribbon ribbon-2"></div>
      <div class="radial-ribbon ribbon-3"></div>
    </div>
    
    <!-- Main Content -->
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <div class="header-icon slide-up-element" data-delay="0.2">
          <i class="fas fa-chart-line"></i>
        </div>
        <h2 class="section-title slide-up-element" data-delay="0.4">
          <span class="typing-text" data-text="FREE MARKETING ASSESSMENT"></span>
        </h2>
        <p class="section-subtitle slide-up-element" data-delay="0.6">
          <span class="typing-text" data-text="Get a comprehensive analysis of your marketing strategy"></span>
        </p>
      </div>
      
      <!-- Assessment Form -->
      <div class="assessment-form-container slide-up-element" data-delay="0.8">
        <div class="form-card">
          <h3 class="form-title typing-text" data-text="Ready to Transform Your Business?"></h3>
          <p class="form-description typing-text" data-text="Discover how our strategic approach can drive real results for your business. Get insights, recommendations, and a clear roadmap to success."></p>
          
          <form class="assessment-form" @submit.prevent="submitAssessment">
            <div class="form-grid">
              <div class="form-group">
                <label for="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="formData.name" 
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div class="form-group">
                <label for="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="formData.email" 
                  placeholder="Enter your email address"
                  required
                />
              </div>
              
              <div class="form-group">
                <label for="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  v-model="formData.phone" 
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div class="form-group">
                <label for="company">Company Name</label>
                <input 
                  type="text" 
                  id="company" 
                  v-model="formData.company" 
                  placeholder="Enter your company name"
                />
              </div>
              
              <div class="form-group full-width">
                <label for="website">Website URL</label>
                <input 
                  type="url" 
                  id="website" 
                  v-model="formData.website" 
                  placeholder="https://yourwebsite.com"
                />
              </div>
              
              <div class="form-group full-width">
                <label for="industry">Industry</label>
                <select id="industry" v-model="formData.industry">
                  <option value="">Select your industry</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="saas">SaaS/Tech</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="finance">Finance</option>
                  <option value="education">Education</option>
                  <option value="real-estate">Real Estate</option>
                  <option value="consulting">Consulting</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div class="form-group full-width">
                <label for="goals">Marketing Goals</label>
                <textarea 
                  id="goals" 
                  v-model="formData.goals" 
                  placeholder="What are your main marketing objectives? (e.g., increase brand awareness, generate more leads, improve conversion rates)"
                  rows="4"
                ></textarea>
              </div>
              
              <div class="form-group full-width">
                <label for="challenges">Current Challenges</label>
                <textarea 
                  id="challenges" 
                  v-model="formData.challenges" 
                  placeholder="What marketing challenges are you currently facing?"
                  rows="3"
                ></textarea>
              </div>
            </div>
            
            <div class="form-actions">
              <button type="submit" class="submit-btn">
                <i class="fas fa-rocket"></i>
                <span>Get Free Assessment</span>
              </button>
            </div>
          </form>
          
          <div class="form-benefits">
            <div class="benefit-item">
              <i class="fas fa-check-circle"></i>
              <span>Comprehensive analysis report</span>
            </div>
            <div class="benefit-item">
              <i class="fas fa-check-circle"></i>
              <span>Strategic recommendations</span>
            </div>
            <div class="benefit-item">
              <i class="fas fa-check-circle"></i>
              <span>Actionable roadmap</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- BRANDING + PERFORMANCE Section -->
      <div class="branding-performance-section slide-up-element" data-delay="1.0">
        <div class="section-container">
          <h2 class="main-title">
            <span class="title-line-1 typing-text" data-text="NO MORE FLOOP"></span>
            <span class="title-line-2 typing-text" data-text="JUST MORE CASH"></span>
          </h2>
          <div class="description-container">
            <p class="subtitle typing-text" data-text="You don't need another nice-to-have campaign."></p>
            <p class="highlight-subtitle typing-text" data-text="You need a marketing partner that makes the cash register ring."></p>
          </div>
          
          <div class="cta-container">
            <button class="hero-cta-button" @click="startAssessment">
              <span class="cta-text">LET US MAKE YOU CASH</span>
              <div class="wave-effect"></div>
            </button>
            
            <button class="secondary-cta-button" @click="startAssessment">
              <span>Let's talk</span>
              <i class="fas fa-arrow-up"></i>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Contact Form Section -->
      <div class="contact-form-section slide-up-element" data-delay="1.2">
        <div class="section-container">
          <h3 class="section-title typing-text" data-text="Ready to Get Started?"></h3>
          <p class="section-subtitle typing-text" data-text="Fill out the form below and we'll get back to you within 24 hours"></p>
          
          <div class="contact-form-container">
            <form class="contact-form" @submit.prevent="submitContactForm">
              <div class="form-grid">
                <div class="form-group">
                  <label for="contact-name">Full Name</label>
                  <input 
                    type="text" 
                    id="contact-name" 
                    v-model="contactFormData.name" 
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div class="form-group">
                  <label for="contact-email">Email Address</label>
                  <input 
                    type="email" 
                    id="contact-email" 
                    v-model="contactFormData.email" 
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                
                <div class="form-group">
                  <label for="contact-phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="contact-phone" 
                    v-model="contactFormData.phone" 
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div class="form-group">
                  <label for="contact-channel">Channel Link</label>
                  <input 
                    type="url" 
                    id="contact-channel" 
                    v-model="contactFormData.channel" 
                    placeholder="https://your-channel.com"
                  />
                </div>
                
                <div class="form-group full-width">
                  <label for="contact-message">How can we help you?</label>
                  <textarea 
                    id="contact-message" 
                    v-model="contactFormData.message" 
                    placeholder="Tell us about your project or what you need help with..."
                    rows="4"
                  ></textarea>
                </div>
              </div>
              
              <div class="form-actions">
                <button type="submit" class="submit-contact-btn">
                  <i class="fas fa-paper-plane"></i>
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SimpleMarketingAssessment',
  data() {
    return {
      formData: {
        name: '',
        email: '',
        phone: '',
        company: '',
        website: '',
        industry: '',
        goals: '',
        challenges: '',
      },
      contactFormData: {
        name: '',
        email: '',
        phone: '',
        channel: '',
        message: '',
      },
      typingElements: [],
      scrollObserver: null
    };
  },
  mounted() {
    this.initSlideUpAnimations();
    this.initTypingEffect();
    this.initScrollAnimations();
  },
  beforeUnmount() {
    if (this.scrollObserver) {
      this.scrollObserver.disconnect();
    }
  },
  methods: {
    submitAssessment() {
      console.log("Assessment submitted:", this.formData);
      alert("Thank you for your interest! We will send your free assessment report shortly.");
      // Reset form
      this.formData = {
        name: '',
        email: '',
        phone: '',
        company: '',
        website: '',
        industry: '',
        goals: '',
        challenges: '',
      };
    },
    submitContactForm() {
      console.log("Contact form submitted:", this.contactFormData);
      alert("Thank you for your message! We will get back to you within 24 hours.");
      // Reset contact form
      this.contactFormData = {
        name: '',
        email: '',
        phone: '',
        channel: '',
        message: '',
      };
    },
    startAssessment() {
      // Scroll to the assessment form
      const formElement = document.querySelector('.assessment-form-container');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    },
    initSlideUpAnimations() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const delay = parseFloat(entry.target.dataset.delay) || 0;
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, delay * 1000);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      // Observe all slide-up elements
      const slideUpElements = document.querySelectorAll('.slide-up-element');
      slideUpElements.forEach(el => observer.observe(el));
    },
    initTypingEffect() {
      this.typingElements = document.querySelectorAll('.typing-text');
      this.typingElements.forEach((element, index) => {
        const text = element.dataset.text;
        element.textContent = '';
        
        setTimeout(() => {
          this.typeText(element, text, 0);
        }, index * 500);
      });
    },
    typeText(element, text, index) {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        setTimeout(() => {
          this.typeText(element, text, index + 1);
        }, 50); // Typing speed
      }
    },
    initScrollAnimations() {
      this.scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Add scroll-triggered animations
            if (entry.target.classList.contains('form-card')) {
              entry.target.style.transform = 'translateY(0)';
              entry.target.style.opacity = '1';
            }
            
            // Animate form fields sequentially
            if (entry.target.classList.contains('form-group')) {
              const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
              setTimeout(() => {
                entry.target.style.transform = 'translateX(0)';
                entry.target.style.opacity = '1';
              }, delay);
            }
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      });

      // Observe form elements for scroll animations
      const formCard = document.querySelector('.form-card');
      const formGroups = document.querySelectorAll('.form-group');
      
      if (formCard) this.scrollObserver.observe(formCard);
      formGroups.forEach(group => this.scrollObserver.observe(group));
    }
  }
};
</script>

<style scoped>
/* Flat Design Marketing Assessment - Consistent with Overall Design */
.simple-marketing-assessment {
  position: relative;
  padding: 120px 0 160px 0; /* Increased bottom padding to push content below */
  background: #ffffff;
  overflow: hidden;
}

.flat-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.geometric-pattern {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
    linear-gradient(45deg, transparent 48%, rgba(59, 130, 246, 0.02) 50%, transparent 52%);
}

/* Radial Gradient Ribbons - Made Bigger */
.radial-ribbon {
  position: absolute;
  width: 500px; /* Increased from 300px */
  height: 500px; /* Increased from 300px */
  border-radius: 50%;
  opacity: 0.12; /* Increased from 0.08 */
  pointer-events: none;
  z-index: 0;
  animation: ribbonFloat 10s ease-in-out infinite; /* Increased duration */
}

.ribbon-1 {
  top: 5%;
  left: 15%;
  background: radial-gradient(circle at 30% 30%, 
    rgba(59, 130, 246, 0.25) 0%, 
    rgba(29, 78, 216, 0.18) 25%, 
    rgba(59, 130, 246, 0.12) 50%, 
    rgba(29, 78, 216, 0.08) 75%, 
    transparent 100%);
  animation-delay: 0s;
}

.ribbon-2 {
  bottom: 10%;
  right: 5%;
  background: radial-gradient(circle at 70% 70%, 
    rgba(59, 130, 246, 0.22) 0%, 
    rgba(29, 78, 216, 0.16) 30%, 
    rgba(59, 130, 246, 0.10) 60%, 
    rgba(29, 78, 216, 0.06) 80%, 
    transparent 100%);
  animation-delay: 2s;
}

.ribbon-3 {
  top: 60%;
  left: 55%;
  background: radial-gradient(circle at 50% 50%, 
    rgba(59, 130, 246, 0.20) 0%, 
    rgba(29, 78, 216, 0.14) 40%, 
    rgba(59, 130, 246, 0.08) 70%, 
    rgba(29, 78, 216, 0.04) 90%, 
    transparent 100%);
  animation-delay: 4s;
}

@keyframes ribbonFloat {
  0%, 100% {
    transform: translateY(0) scale(1) rotate(0deg);
    opacity: 0.12;
  }
  25% {
    transform: translateY(-30px) scale(1.08) rotate(90deg);
    opacity: 0.18;
  }
  50% {
    transform: translateY(-15px) scale(1.12) rotate(180deg);
    opacity: 0.15;
  }
  75% {
    transform: translateY(20px) scale(0.95) rotate(270deg);
    opacity: 0.10;
  }
}

/* Enhanced Typing Effect */
.typing-text {
  display: inline-block;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
}

.typing-text::after {
  content: '|';
  position: absolute;
  right: -4px;
  color: #3b82f6;
  font-weight: bold;
  animation: blink 1.2s infinite;
  text-shadow: 0 0 8px rgba(59, 130, 246, 0.6);
}

@keyframes blink {
  0%, 50% { 
    opacity: 1; 
    transform: scale(1);
  }
  51%, 100% { 
    opacity: 0; 
    transform: scale(0.8);
  }
}

/* Typing animation with staggered delays */
.typing-text[data-text] {
  animation: typingReveal 0.1s steps(1) forwards;
}

@keyframes typingReveal {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

/* Scroll-triggered animations for form elements */
.form-card {
  background: #ffffff;
  border: 2px solid #f1f5f9;
  border-radius: 20px;
  padding: 50px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
  transform: translateY(30px);
  opacity: 0;
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.form-group {
  transform: translateX(-30px);
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Enhanced hover effects for ribbons */
.radial-ribbon:hover {
  animation-play-state: paused;
  opacity: 0.15;
  transform: scale(1.1);
  transition: all 0.3s ease;
}

/* Responsive adjustments for bigger ribbons */
@media (max-width: 768px) {
  .radial-ribbon {
    width: 350px; /* Adjusted for mobile */
    height: 350px;
    opacity: 0.08;
  }
  
  .ribbon-1 {
    top: 3%;
    left: 8%;
  }
  
  .ribbon-2 {
    bottom: 8%;
    right: 3%;
  }
  
  .ribbon-3 {
    top: 55%;
    left: 50%;
  }
  
  .branding-performance-section {
    padding: 60px 0;
  }

  .main-title {
    font-size: 2.8rem;
  }

  .subtitle {
    font-size: 1.2rem;
  }

  .description {
    font-size: 1rem;
  }

  .highlight-text {
    font-size: 1.1rem;
  }

  .cta-button {
    padding: 14px 28px;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .radial-ribbon {
    width: 250px; /* Even smaller for mobile */
    height: 250px;
    opacity: 0.06;
  }
  
  .ribbon-1 {
    top: 2%;
    left: 5%;
  }
  
  .ribbon-2 {
    bottom: 5%;
    right: 2%;
  }
  
  .ribbon-3 {
    top: 50%;
    left: 45%;
  }
}

.container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 80px;
}

.header-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 30px;
  color: #ffffff;
  font-size: 32px;
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.25);
}

.section-title {
  font-family: 'Inter', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 20px 0;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: -0.02em;
}

.section-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
}

/* Assessment Form Container */
.assessment-form-container {
  margin-top: 60px;
  position: relative;
  z-index: 2;
}

.form-card {
  background: #ffffff;
  border: 2px solid #f1f5f9;
  border-radius: 20px;
  padding: 50px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
}

.form-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.form-card:hover::before {
  transform: scaleX(1);
}

.form-title {
  font-family: 'Inter', sans-serif;
  font-size: 2.2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 20px 0;
  text-align: center;
}

.form-description {
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  color: #64748b;
  line-height: 1.6;
  text-align: center;
  max-width: 600px;
  margin: 0 auto 40px auto;
}

/* Form Grid */
.assessment-form {
  margin-bottom: 40px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
}

.form-group {
  position: relative;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
  transition: all 0.3s ease;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 14px 18px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #374151;
  background: #ffffff;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.form-group input::placeholder,
.form-group select::placeholder,
.form-group textarea::placeholder {
  color: #9ca3af;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  transform: translateY(-1px);
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

/* Form Actions */
.form-actions {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.submit-btn {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: #ffffff;
  border: none;
  padding: 16px 32px;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.25);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.submit-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(59, 130, 246, 0.35);
  background: linear-gradient(135deg, #1d4ed8, #1e40af);
}

.submit-btn i {
  font-size: 16px;
  transition: transform 0.3s ease;
}

.submit-btn:hover i {
  transform: translateX(4px);
}

/* Form Benefits */
.form-benefits {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  padding-top: 30px;
  border-top: 1px solid #f1f5f9;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #3b82f6;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 500;
}

.benefit-item i {
  font-size: 1.2rem;
  color: #10b981;
}

/* BRANDING + PERFORMANCE Section - Minimalist Design */
.branding-performance-section {
  margin-top: 120px;
  padding: 100px 0;
  background: #ffffff;
  text-align: center;
  position: relative;
  z-index: 2;
  border-top: 1px solid #f1f5f9;
}

.section-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
}

.main-title {
  font-family: 'Inter', sans-serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 900;
  color: #1e40af;
  margin-bottom: 30px;
  line-height: 1.1;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.title-line-1, .title-line-2 {
  display: block;
  position: relative;
}

.title-line-1 {
  color: #1e40af;
}

.title-line-2 {
  color: #10b981;
  text-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
}

.main-title .typing-text {
  position: relative;
}

.main-title .typing-text::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #1d4ed8);
  border-radius: 2px;
}

.title-line-2 .typing-text::after {
  background: linear-gradient(90deg, #10b981, #059669);
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
}

.description-container {
  margin-bottom: 50px;
}

.subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 1.3rem;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 15px;
  font-weight: 400;
}

.highlight-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 1.3rem;
  color: #475569;
  line-height: 1.6;
  margin-bottom: 0;
  font-weight: 500;
}

.highlight-subtitle strong {
  color: #1e40af;
  font-weight: 700;
}

.cta-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
}

.hero-cta-button {
  width: 100%;
  max-width: 500px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: #ffffff;
  border: none;
  padding: 24px 40px;
  border-radius: 16px;
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  box-shadow: 0 12px 32px rgba(59, 130, 246, 0.25);
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;
}

.hero-cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.6s ease;
}

.hero-cta-button:hover::before {
  left: 100%;
}

.hero-cta-button:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.35);
  background: linear-gradient(135deg, #1d4ed8, #1e40af);
}

.hero-cta-button .cta-text {
  position: relative;
  z-index: 2;
  font-size: 1.3rem;
  font-weight: 900;
}

.wave-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.2));
  border-radius: 16px;
  opacity: 0;
  transition: all 0.4s ease;
  pointer-events: none;
}

.hero-cta-button:hover .wave-effect {
  opacity: 1;
  animation: wavePulse 2s infinite;
}

@keyframes wavePulse {
  0% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.05); opacity: 0.6; }
  100% { transform: scale(1); opacity: 0.3; }
}

.secondary-cta-button {
  background: transparent;
  color: #3b82f6;
  border: 2px solid #3b82f6;
  padding: 16px 32px;
  border-radius: 50px;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.1);
  text-transform: none;
  letter-spacing: 0.5px;
  min-width: 160px;
  justify-content: center;
}

.secondary-cta-button:hover {
  background: #3b82f6;
  color: #ffffff;
  border-color: #3b82f6;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.25);
}

.secondary-cta-button i {
  font-size: 14px;
  transition: transform 0.3s ease;
}

.secondary-cta-button:hover i {
  transform: translateY(-3px);
}

/* Enhanced Typing Effect for CASH */
.main-title .typing-text[data-text*="CASH"]::after {
  background: linear-gradient(90deg, #10b981, #059669);
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
}

/* Slide Up Animation */
.slide-up-element {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-up-element.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered delays for different elements */
.slide-up-element[data-delay="0.2"] { transition-delay: 0.2s; }
.slide-up-element[data-delay="0.4"] { transition-delay: 0.4s; }
.slide-up-element[data-delay="0.6"] { transition-delay: 0.6s; }
.slide-up-element[data-delay="0.8"] { transition-delay: 0.8s; }
.slide-up-element[data-delay="1.0"] { transition-delay: 1.0s; }

/* Responsive Design */
@media (max-width: 1024px) {
  .form-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .form-card {
    padding: 40px;
  }
  
  .section-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .simple-marketing-assessment {
    padding: 80px 0 120px 0;
  }
  
  .section-title {
    font-size: 2.2rem;
  }
  
  .section-subtitle {
    font-size: 1.1rem;
  }
  
  .form-card {
    padding: 30px;
  }
  
  .form-title {
    font-size: 1.8rem;
  }
  
  .form-description {
    font-size: 1rem;
  }
  
  .header-icon {
    width: 60px;
    height: 60px;
    font-size: 24px;
  }
  
  .form-benefits {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .branding-performance-section {
    padding: 60px 0;
  }

  .main-title {
    font-size: 2.8rem;
  }

  .subtitle {
    font-size: 1.2rem;
  }

  .description {
    font-size: 1rem;
  }

  .highlight-text {
    font-size: 1.1rem;
  }

  .cta-button {
    padding: 14px 28px;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .simple-marketing-assessment {
    padding: 60px 0 100px 0;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .section-subtitle {
    font-size: 1rem;
  }
  
  .form-card {
    padding: 25px;
  }
  
  .form-title {
    font-size: 1.6rem;
  }
  
  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 12px 16px;
    font-size: 0.95rem;
  }
  
  .submit-btn {
    padding: 14px 28px;
    font-size: 1rem;
  }
}

/* Contact Form Section */
.contact-form-section {
  margin-top: 80px;
  padding: 100px 0;
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  text-align: center;
  position: relative;
  z-index: 2;
  border-top: 1px solid #e2e8f0;
}

.contact-form-section .section-title {
  font-family: 'Inter', sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 20px;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: -0.02em;
}

.contact-form-section .section-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 50px;
  max-width: 600px;
  margin: 0 auto 50px auto;
}

.contact-form-container {
  max-width: 800px;
  margin: 0 auto;
}

.contact-form {
  background: #ffffff;
  border: 2px solid #e2e8f0;
  border-radius: 20px;
  padding: 50px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
}

.contact-form::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #10b981);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.contact-form:hover::before {
  transform: scaleX(1);
}

.contact-form .form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  margin-bottom: 30px;
}

.contact-form .form-group.full-width {
  grid-column: 1 / -1;
}

.contact-form .form-group label {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
  transition: all 0.3s ease;
}

.contact-form .form-group input,
.contact-form .form-group textarea {
  width: 100%;
  padding: 14px 18px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: #374151;
  background: #ffffff;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.contact-form .form-group input::placeholder,
.contact-form .form-group textarea::placeholder {
  color: #9ca3af;
}

.contact-form .form-group input:focus,
.contact-form .form-group textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  transform: translateY(-1px);
}

.contact-form .form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.submit-contact-btn {
  background: linear-gradient(135deg, #3b82f6, #10b981);
  color: #ffffff;
  border: none;
  padding: 16px 32px;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.25);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.submit-contact-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(59, 130, 246, 0.35);
  background: linear-gradient(135deg, #1d4ed8, #059669);
}

.submit-contact-btn i {
  font-size: 16px;
  transition: transform 0.3s ease;
}

.submit-contact-btn:hover i {
  transform: translateX(4px);
}
</style> 
<template>
  <div class="chatbot-container">
    <!-- Revolutionary Quantum Chatbot Toggle -->
    <div
      class="chatbot-toggle"
      :class="{ 'active': isChatOpen }"
      @click="toggleChat"
    >
      <!-- Quantum Background System -->
      <div class="toggle-quantum-background">
        <div class="quantum-orb" />
        <div class="quantum-energy-field" />
      </div>
      
      <!-- Toggle Icon with Quantum Effects -->
      <div class="toggle-icon">
        <transition
          name="icon-rotate"
          mode="out-in"
        >
          <i
            v-if="!isChatOpen"
            key="chat"
            class="fas fa-comments"
          />
          <i
            v-else
            key="close"
            class="fas fa-times"
          />
        </transition>
        <div class="icon-quantum-glow" />
      </div>
      
      <!-- Enhanced Pulse Rings -->
      <div class="pulse-rings">
        <div class="pulse-ring ring-1" />
        <div class="pulse-ring ring-2" />
        <div class="pulse-ring ring-3" />
        <div class="pulse-ring ring-4" />
      </div>
      
      <!-- Quantum Particles -->
      <div class="toggle-particles">
        <div
          v-for="i in 6"
          :key="'particle-'+i"
          class="quantum-particle"
        />
      </div>
      
      <!-- Enhanced Notification Badge -->
      <div
        v-if="hasUnreadMessage && !isChatOpen"
        class="notification-badge"
      >
        <span class="badge-number">{{ unreadCount }}</span>
        <div class="badge-quantum-glow" />
        <div class="badge-energy-ring" />
      </div>
      
      <!-- Lightning Effects -->
      <div class="toggle-lightning">
        <div
          v-for="i in 3"
          :key="'lightning-'+i"
          class="lightning-bolt"
        />
      </div>
    </div>

    <!-- Chatbot Window -->
    <transition name="chat-window">
      <div
        v-if="isChatOpen"
        class="chatbot-window"
      >
        <div class="chat-header">
          <div class="bot-avatar">
            <div class="avatar-glow" />
            <i class="fas fa-robot" />
            <div class="status-indicator" />
          </div>
          <div class="bot-info">
            <h3>{{ $t('chatbot.name') || 'ESmart Assistant' }}</h3>
            <p>{{ $t('chatbot.status') || 'Online • Ready to help!' }}</p>
          </div>
          <button
            class="close-btn"
            @click="toggleChat"
          >
            <i class="fas fa-minus" />
          </button>
        </div>

        <div
          ref="chatBody"
          class="chat-body"
        >
          <div
            v-if="messages.length === 0"
            class="welcome-message"
          >
            <div class="welcome-animation">
              <div class="floating-icons">
                <i class="fas fa-rocket" />
                <i class="fas fa-star" />
                <i class="fas fa-heart" />
              </div>
            </div>
            <h4>{{ $t('chatbot.welcome') || 'Welcome to ESmart!' }}</h4>
            <p>{{ $t('chatbot.welcomeMessage') || 'How can I help you today?' }}</p>
            <div class="quick-actions">
              <button
                class="quick-btn"
                @click="sendQuickMessage('pricing')"
              >
                <i class="fas fa-dollar-sign" />
                {{ $t('chatbot.pricing') || 'Pricing' }}
              </button>
              <button
                class="quick-btn"
                @click="sendQuickMessage('services')"
              >
                <i class="fas fa-cogs" />
                {{ $t('chatbot.services') || 'Services' }}
              </button>
              <button
                class="quick-btn"
                @click="sendQuickMessage('contact')"
              >
                <i class="fas fa-phone" />
                {{ $t('chatbot.contact') || 'Contact' }}
              </button>
            </div>
          </div>

          <div class="messages-container">
            <div
              v-for="(message, index) in messages"
              :key="index"
              :class="['message', message.type]"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <div
                v-if="message.type === 'bot'"
                class="message-avatar"
              >
                <i class="fas fa-robot" />
              </div>
              <div class="message-content">
                <div class="message-bubble">
                  <div
                    class="message-text"
                    v-html="message.text"
                  />
                  <div class="message-time">
                    {{ formatTime(message.timestamp) }}
                  </div>
                  <div class="bubble-glow" />
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="isTyping"
            class="typing-indicator"
          >
            <div class="typing-avatar">
              <i class="fas fa-robot" />
            </div>
            <div class="typing-content">
              <div class="typing-dots">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>

        <div class="chat-input">
          <form
            class="input-form"
            @submit.prevent="sendMessage"
          >
            <div class="input-container">
              <input
                ref="messageInput"
                v-model="currentMessage"
                :placeholder="$t('chatbot.placeholder') || 'Type your message...'"
                class="message-input"
                :disabled="isTyping"
              >
              <div class="input-glow" />
            </div>
            <button
              type="submit"
              class="send-btn"
              :disabled="!currentMessage.trim() || isTyping"
            >
              <div class="btn-background" />
              <i class="fas fa-paper-plane" />
              <div class="send-ripple" />
            </button>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'ChatBot',
  data() {
    return {
      isChatOpen: false,
      currentMessage: '',
      isTyping: false,
      hasUnreadMessage: true,
      unreadCount: 1,
      messages: []
    };
  },
  
  mounted() {
    // Add initial notification
    setTimeout(() => {
      this.hasUnreadMessage = true;
      this.unreadCount = 1;
    }, 3000);
  },
  methods: {
    toggleChat() {
      this.isChatOpen = !this.isChatOpen;
      if (this.isChatOpen) {
        this.hasUnreadMessage = false;
        this.unreadCount = 0;
        this.$nextTick(() => {
          if (this.$refs.messageInput) {
            this.$refs.messageInput.focus();
          }
        });
      }
    },
    
    async sendMessage() {
      if (!this.currentMessage.trim()) return;
      
      const userMessage = {
        type: 'user',
        text: this.currentMessage,
        timestamp: new Date()
      };
      
      this.messages.push(userMessage);
      const messageText = this.currentMessage;
      this.currentMessage = '';
      
      this.scrollToBottom();
      
      // Show typing indicator
      this.isTyping = true;
      
      // Simulate API response
      setTimeout(() => {
        const botResponse = this.generateBotResponse(messageText);
        this.messages.push(botResponse);
        this.isTyping = false;
        this.scrollToBottom();
      }, 1500);
    },
    
    sendQuickMessage(action) {
      const quickMessages = {
        pricing: this.$t('chatbot.quickPricing') || 'What are your pricing plans?',
        services: this.$t('chatbot.quickServices') || 'What services do you offer?',
        contact: this.$t('chatbot.quickContact') || 'How can I contact you?'
      };
      
      this.currentMessage = quickMessages[action];
      this.sendMessage();
    },
    
    generateBotResponse(userMessage) {
      const responses = {
        pricing: "Our pricing is flexible and depends on your specific needs. We offer:\n\n🚀 <strong>Starter Package</strong> - $500/month\n💼 <strong>Business Package</strong> - $1,500/month\n⭐ <strong>Enterprise Package</strong> - Custom pricing\n\nWould you like to schedule a consultation?",
        services: "We provide comprehensive digital solutions:\n\n✨ <strong>Digital Marketing</strong>\n🎯 <strong>SEO & SEM</strong>\n📱 <strong>Social Media Management</strong>\n🌐 <strong>Web Development</strong>\n📊 <strong>Analytics & Reporting</strong>\n\nWhich service interests you most?",
        contact: "You can reach us through multiple channels:\n\n📧 <strong>Email:</strong> info@esmart.com\n📞 <strong>Phone:</strong> +84 123 456 789\n💬 <strong>WhatsApp:</strong> +84 987 654 321\n🏢 <strong>Office:</strong> Ho Chi Minh City, Vietnam\n\nWe're available 24/7 for support!",
        default: "Thank you for your message! 🚀 Our team specializes in digital marketing and business growth solutions. How can we help transform your business today?"
      };
      
      let responseText = responses.default;
      const lowerMessage = userMessage.toLowerCase();
      
      if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
        responseText = responses.pricing;
      } else if (lowerMessage.includes('service') || lowerMessage.includes('what do you') || lowerMessage.includes('offer')) {
        responseText = responses.services;
      } else if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email')) {
        responseText = responses.contact;
      }
      
      return {
        type: 'bot',
        text: responseText,
        timestamp: new Date()
      };
    },
    
    formatTime(timestamp) {
      return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },
    
    scrollToBottom() {
      this.$nextTick(() => {
        if (this.$refs.chatBody) {
          this.$refs.chatBody.scrollTop = this.$refs.chatBody.scrollHeight;
        }
      });
    }
  }
};
</script>

<style scoped>
/* Enhanced CSS Variables with Quantum Theme */
:root {
  --primary-color: rgba(255, 107, 53, 1);
  --secondary-color: rgba(245, 158, 11, 1);
  --tertiary-color: rgba(217, 119, 6, 1);
  --quantum-blue: rgba(59, 130, 246, 1);
  --quantum-purple: rgba(139, 92, 246, 1);
  --quantum-green: rgba(34, 197, 94, 1);
  --gradient-magical: linear-gradient(135deg, rgba(255, 107, 53, 0.9) 0%, rgba(245, 158, 11, 0.8) 50%, rgba(217, 119, 6, 0.9) 100%);
  --gradient-primary: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  --gradient-secondary: linear-gradient(135deg, var(--secondary-color) 0%, var(--tertiary-color) 100%);
  --gradient-tertiary: linear-gradient(135deg, var(--tertiary-color) 0%, var(--primary-color) 100%);
  --gradient-quantum: linear-gradient(135deg, var(--quantum-blue) 0%, var(--quantum-purple) 50%, var(--primary-color) 100%);
  --gradient-cyber: linear-gradient(135deg, var(--quantum-green) 0%, var(--quantum-blue) 100%);
  --success-color: var(--quantum-green);
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
}

/* Chatbot Container with Super High Z-Index */
.chatbot-container {
  position: fixed !important;
  bottom: 2rem !important;
  right: 2rem !important;
  z-index: 999999 !important;
  pointer-events: none;
  /* Create a new stacking context to ensure z-index is respected */
  transform: translateZ(0);
}

/* Revolutionary Quantum Toggle */
.chatbot-toggle {
  width: 3.5rem;
  height: 3.5rem;
  background: var(--primary-gradient);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  z-index: 999999;
  pointer-events: all;
  box-shadow: 
    0 8px 32px rgba(138, 43, 226, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* Revolutionary Quantum Background */
.toggle-quantum-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
}

.quantum-orb {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--gradient-magical);
  border-radius: 50%;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: quantumOrbPulse 3s ease-in-out infinite;
}

.quantum-energy-field {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: var(--gradient-quantum);
  border-radius: 50%;
  filter: blur(15px);
  opacity: 0.6;
  animation: energyFieldRotate 8s linear infinite;
}

.toggle-icon {
  position: relative;
  z-index: 3;
  color: white;
  font-size: 1.5rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.icon-quantum-glow {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  background: var(--gradient-magical);
  border-radius: 50%;
  filter: blur(10px);
  opacity: 0.7;
  animation: iconGlowPulse 2s ease-in-out infinite;
  z-index: -1;
}

/* Enhanced Pulse Rings - Simplified */
.pulse-rings {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  opacity: 0;
}

.pulse-ring {
  position: absolute;
  border: 2px solid var(--secondary-color);
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
}

/* Quantum Particles - Simplified */
.toggle-particles {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  opacity: 0;
}

.quantum-particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: var(--secondary-color);
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
}

/* Lightning Effects - Simplified */
.toggle-lightning {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  opacity: 0;
}

.lightning-bolt {
  position: absolute;
  width: 2px;
  height: 20px;
  background: linear-gradient(45deg, var(--secondary-color), transparent);
  opacity: 0;
  pointer-events: none;
}

/* Enhanced Notification Badge */
.notification-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--gradient-quantum);
  color: white;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  border: 2px solid white;
  animation: quantumBadgePulse 2s infinite;
  z-index: 5;
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
}

.badge-number {
  position: relative;
  z-index: 2;
}

.badge-quantum-glow {
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  background: var(--gradient-cyber);
  border-radius: 50%;
  filter: blur(8px);
  opacity: 0.8;
  animation: badgeGlowRotate 3s linear infinite;
  z-index: -1;
}

.badge-energy-ring {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border: 2px solid var(--quantum-green);
  border-radius: 50%;
  animation: badgeRingPulse 2s ease-in-out infinite;
  opacity: 0.7;
}

.chatbot-toggle:hover {
  transform: translateY(-8px) scale(1.15);
  box-shadow: 
    0 20px 40px rgba(255, 107, 53, 0.4),
    0 0 30px rgba(59, 130, 246, 0.3);
}

.chatbot-toggle:hover .quantum-orb {
  background: var(--gradient-cyber);
  transform: scale(1.1) rotate(180deg);
}

.chatbot-toggle:hover .quantum-energy-field {
  opacity: 0.9;
  filter: blur(20px);
  animation-duration: 4s;
}

.chatbot-toggle:hover .toggle-icon {
  transform: scale(1.3) rotate(15deg);
  color: #fff;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.8));
}

.chatbot-toggle:hover .quantum-particle {
  animation-duration: 3s;
  transform: scale(1.5);
}

.chatbot-toggle:hover .lightning-bolt {
  opacity: 1;
  animation-duration: 1s;
}

.chatbot-toggle.active .quantum-orb {
  background: var(--gradient-tertiary);
  animation: quantumOrbActive 2s ease-in-out infinite;
}

.chatbot-toggle.active .quantum-energy-field {
  background: var(--gradient-magical);
  animation: energyFieldActive 6s linear infinite;
}

/* Enhanced Chat Window */
.chatbot-window {
  position: fixed;
  bottom: 5rem;
  right: 2rem;
  z-index: 99998;
  pointer-events: auto;
  max-width: 360px;
  width: 360px;
  max-height: 80vh;
  min-width: 260px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 24px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform-origin: bottom right;
}

.chat-header {
  background: var(--gradient-magical);
  color: white;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  overflow: hidden;
}

.chat-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  animation: headerShimmer 3s infinite;
}

.bot-avatar {
  position: relative;
  width: 45px;
  height: 45px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.avatar-glow {
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  background: var(--gradient-tertiary);
  border-radius: 50%;
  z-index: -1;
  filter: blur(8px);
  animation: avatarGlow 2s ease-in-out infinite;
}

.status-indicator {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  background: var(--success-color);
  border: 2px solid white;
  border-radius: 50%;
  animation: statusBlink 2s ease-in-out infinite;
}

.bot-info h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
}

.bot-info p {
  margin: 0;
  font-size: 0.85rem;
  opacity: 0.9;
}

.close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1) rotate(90deg);
}

/* Enhanced Chat Body */
.chat-body {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  position: relative;
}

.chat-body::-webkit-scrollbar {
  width: 6px;
}

.chat-body::-webkit-scrollbar-track {
  background: transparent;
}

.chat-body::-webkit-scrollbar-thumb {
  background: var(--gradient-magical);
  border-radius: 3px;
}

.welcome-message {
  text-align: center;
  padding: 2rem 0;
  animation: welcomeFadeIn 1s ease-out;
}

.welcome-animation {
  position: relative;
  margin-bottom: 1.5rem;
  height: 60px;
}

.floating-icons {
  position: relative;
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.floating-icons i {
  font-size: 2rem;
  color: var(--primary-color);
  animation: iconFloat 3s ease-in-out infinite;
}

.floating-icons i:nth-child(2) {
  animation-delay: 0.5s;
  color: var(--secondary-color);
}

.floating-icons i:nth-child(3) {
  animation-delay: 1s;
  color: var(--tertiary-color);
}

.welcome-message h4 {
  color: var(--text-primary);
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.welcome-message p {
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.quick-btn {
  background: var(--gradient-primary);
  color: white;
  border: none;
  border-radius: 25px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.quick-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.quick-btn:hover::before {
  left: 100%;
}

.quick-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 107, 53, 0.3);
}

/* Enhanced Messages */
.messages-container {
  margin-top: 1rem;
}

.message {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  animation: messageSlideIn 0.5s ease-out;
}

.message.user {
  flex-direction: row-reverse;
}

.message-avatar {
  width: 35px;
  height: 35px;
  background: var(--gradient-magical);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.9rem;
  flex-shrink: 0;
  position: relative;
}

.message-avatar::after {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: var(--gradient-tertiary);
  border-radius: 50%;
  z-index: -1;
  filter: blur(6px);
  animation: messagePulse 2s ease-in-out infinite;
}

.message-content {
  flex: 1;
  min-width: 0;
}

.message-bubble {
  background: white;
  border-radius: 18px;
  padding: 1rem 1.25rem;
  position: relative;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.message.user .message-bubble {
  background: var(--gradient-primary);
  color: white;
  margin-left: 2rem;
}

.message.bot .message-bubble {
  margin-right: 2rem;
}

.message-bubble:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.bubble-glow {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: var(--gradient-magical);
  border-radius: 18px;
  z-index: -1;
  filter: blur(10px);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.message-bubble:hover .bubble-glow {
  opacity: 0.3;
}

.message-text {
  line-height: 1.5;
  word-wrap: break-word;
}

.message-time {
  font-size: 0.75rem;
  opacity: 0.7;
  margin-top: 0.5rem;
}

/* Enhanced Typing Indicator */
.typing-indicator {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  animation: typingFadeIn 0.3s ease-out;
}

.typing-avatar {
  width: 35px;
  height: 35px;
  background: var(--gradient-magical);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.9rem;
  animation: typingPulse 1.5s ease-in-out infinite;
}

.typing-content {
  background: white;
  border-radius: 18px;
  padding: 1rem 1.25rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.typing-dots {
  display: flex;
  gap: 0.3rem;
}

.typing-dots span {
  width: 8px;
  height: 8px;
  background: var(--primary-color);
  border-radius: 50%;
  animation: typingDots 1.4s ease-in-out infinite;
}

.typing-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

/* Enhanced Input Area */
.chat-input {
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.3);
}

.input-form {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.input-container {
  flex: 1;
  position: relative;
}

.message-input {
  width: 100%;
  border: 2px solid transparent;
  border-radius: 25px;
  padding: 0.875rem 1.25rem;
  font-size: 0.95rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  outline: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.message-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 4px 20px rgba(255, 107, 53, 0.2);
}

.input-glow {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: var(--gradient-magical);
  border-radius: 25px;
  z-index: -1;
  filter: blur(8px);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.message-input:focus + .input-glow {
  opacity: 0.5;
}

.send-btn {
  width: 45px;
  height: 45px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  color: white;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--gradient-magical);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.send-btn:hover .btn-background {
  background: var(--gradient-secondary);
  transform: scale(1.1);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.send-btn:disabled .btn-background {
  transform: none;
}

.send-btn i {
  position: relative;
  z-index: 2;
  transition: transform 0.3s ease;
}

.send-btn:hover i {
  transform: translateX(2px);
}

.send-ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.6s ease;
}

.send-btn:active .send-ripple {
  width: 100px;
  height: 100px;
}

/* Transitions */
.chat-window-enter-active {
  animation: chatWindowOpen 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.chat-window-leave-active {
  animation: chatWindowClose 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.icon-rotate-enter-active,
.icon-rotate-leave-active {
  transition: all 0.3s ease;
}

.icon-rotate-enter-from {
  transform: rotate(-90deg) scale(0);
  opacity: 0;
}

.icon-rotate-leave-to {
  transform: rotate(90deg) scale(0);
  opacity: 0;
}

/* Animation Keyframes */
@keyframes quantumOrbPulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 20px rgba(255, 107, 53, 0.3);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(255, 107, 53, 0.5);
  }
}

@keyframes energyFieldRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes iconGlowPulse {
  0%, 100% { opacity: 0.7; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
}

@keyframes particleOrbit {
  0% { transform: rotate(0deg) translateX(30px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(30px) rotate(-360deg); }
}

@keyframes lightningFlash {
  0%, 90%, 100% { opacity: 0; }
  5%, 15% { opacity: 1; }
}

@keyframes quantumBadgePulse {
  0%, 100% { transform: scale(1); box-shadow: 0 0 15px rgba(59, 130, 246, 0.5); }
  50% { transform: scale(1.1); box-shadow: 0 0 25px rgba(59, 130, 246, 0.8); }
}

@keyframes badgeGlowRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes badgeRingPulse {
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.2); opacity: 1; }
}

@keyframes quantumOrbActive {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.1) rotate(180deg); }
}

@keyframes energyFieldActive {
  0% { transform: rotate(0deg); filter: blur(15px); }
  50% { transform: rotate(180deg); filter: blur(25px); }
  100% { transform: rotate(360deg); filter: blur(15px); }
}

@keyframes pulseRing {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(0.8);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.5);
  }
}

@keyframes badgeBounce {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

@keyframes chatWindowOpen {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes chatWindowClose {
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
}

@keyframes headerShimmer {
  0%, 100% {
    left: -100%;
  }
  50% {
    left: 100%;
  }
}

@keyframes avatarGlow {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}

@keyframes statusBlink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes welcomeFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes iconFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes messageSlideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes messagePulse {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
}

@keyframes typingFadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes typingPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes typingDots {
  0%, 60%, 100% {
    transform: scale(1);
    opacity: 0.7;
  }
  30% {
    transform: scale(1.3);
    opacity: 1;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .chatbot-container {
    bottom: 1.5rem;
    right: 1rem;
  }
  
  .chatbot-window {
    width: 90vw;
    max-width: 340px;
    min-width: 280px;
    bottom: 4.5rem;
    right: 1rem;
  }
  
  .chat-header {
    padding: 1rem;
  }
  
  .chat-body {
    padding: 1rem;
  }
  
  .chat-input {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .chatbot-container {
    bottom: 1rem;
    right: 0.5rem;
  }
  
  .chatbot-window {
    width: 95vw;
    max-width: 95vw;
    min-width: 280px;
    bottom: 4rem;
    right: 0.5rem;
  }
  
  .quick-actions {
    gap: 0.5rem;
  }
  
  .quick-btn {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

@media (prefers-contrast: high) {
  .message-bubble {
    border: 2px solid;
  }
  
  .chatbot-window {
    border: 2px solid;
    background: white;
  }
}
</style> 
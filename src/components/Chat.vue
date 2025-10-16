<template>
  <div
    class="chat-container"
    :class="{ 'chat-open': isOpen }"
  >
    <!-- Chat button -->
    <button 
      v-if="!isOpen" 
      class="chat-button" 
      aria-label="Open chat"
      @click="toggleChat"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        <circle
          cx="12"
          cy="12"
          r="1"
        />
        <circle
          cx="16"
          cy="12"
          r="1"
        />
        <circle
          cx="8"
          cy="12"
          r="1"
        />
      </svg>
    </button>

    <div
      v-if="isOpen"
      class="chat-window"
    >
      <div class="chat-header">
        <div class="chat-header-info">
          <h2>Let's Chat!</h2>
          <div class="chat-status">
            <span class="status-dot" />
            <span class="status-text">We'll reply as soon as we can</span>
          </div>
        </div>
        <button
          class="close-button"
          aria-label="Close chat"
          @click="toggleChat"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line
              x1="18"
              y1="6"
              x2="6"
              y2="18"
            />
            <line
              x1="6"
              y1="6"
              x2="18"
              y2="18"
            />
          </svg>
        </button>
      </div>

      <!-- Chat messages -->
      <div
        ref="messagesContainer"
        class="chat-messages"
      >
        <div
          v-for="(message, index) in messages"
          :key="index" 
          :class="['message', message.sender === 'user' ? 'user-message' : 'agent-message']"
        >
          <div
            class="message-content"
            v-text="message.text"
          />
          <div class="message-time">
            {{ message.time }}
          </div>
        </div>
      </div>

      <!-- Loading Spinner -->
      <div
        v-if="loading"
        class="loading-typing"
      >
        <span>Thinking...</span>
      </div>

      <!-- Chat input -->
      <div class="chat-input">
        <input 
          v-model="newMessage" 
          type="text" 
          placeholder="Write your message..." 
          @keyup.enter="sendMessage"
        >
        <div class="chat-controls">
          <button
            class="control-button emoji-button"
            aria-label="Add emoji"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
              />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line
                x1="9"
                y1="9"
                x2="9.01"
                y2="9"
              />
              <line
                x1="15"
                y1="9"
                x2="15.01"
                y2="9"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {marked} from 'marked';

export default {
  name: 'ChatWidget',
  data() {
    return {
      isOpen: false,
      newMessage: '',
      messages: []
    }
  },
  methods: {
    toggleChat() {
      this.isOpen = !this.isOpen;
      if (this.isOpen && this.messages.length === 0) {
        setTimeout(() => {
          this.messages.push({
            text: 'Hello! How can I help you today?',
            sender: 'agent',
            time: this.getCurrentTime()
          });
        }, 1000);
      }
    },
    sendMessage() {
      if (this.newMessage.trim() === '') return;
      
      // Add user message
      this.messages.push({
        text: this.newMessage,
        sender: 'user',
        time: this.getCurrentTime()
      });

      this.loading = true;
      
      const userMessage = this.newMessage;
      this.newMessage = '';
      
      // Scroll to bottom
      this.$nextTick(() => {
        this.scrollToBottom();
      });

      setTimeout(() => {
        this.simulateResponse(userMessage);
      }, 1000 + Math.random() * 2000);
    },
    async simulateResponse(userMessage) {
      let response = "Thank you for your message. Our team will get back to you soon.";
      
      try {
        const data = await axios.post(`.netlify/functions/server/api/chatBot/chat`, { message: userMessage });
        response = data.data.response;
        console.log(response);
      }
      catch (error) {
        console.error("Error:", error);
      }
      finally {
        this.loading = false;
      }
      
      this.messages.push({
        text: marked.parse(response),
        sender: 'agent',
        time: this.getCurrentTime()
      });
      
      // Scroll to bottom after adding new message
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    getCurrentTime() {
      const now = new Date();
      return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },
    scrollToBottom() {
      if (this.$refs.messagesContainer) {
        this.$refs.messagesContainer.scrollTop = this.$refs.messagesContainer.scrollHeight;
      }
    }
  }
}
</script>

<style scoped>
.chat-container {
  display: none !important;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}

.chat-button {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #4285f4;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.chat-button:hover {
  background-color: #3367d6;
  transform: scale(1.05);
}

.chat-button svg {
  width: 28px;
  height: 28px;
}

.chat-window {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 350px;
  height: 550px;
  background-color: var(--bg-primary);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.chat-header {
  padding: 16px;
  background-color: var(--bg-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
}

.chat-header-info h2 {
  margin: 0;
  margin-right: auto;
  align-self: flex-start;
  font-size: 18px;
  color: #333;
  font-weight: 600;
}

.chat-status {
  display: flex;
  align-items: center;
  margin-top: 4px;
}

.status-dot {
  width: 8px;
  height: 8px;
  background-color: #4caf50;
  border-radius: 50%;
  margin-right: 6px;
}

.status-text {
  font-size: 13px;
  color: #666;
}

.close-button {
  background: none;
  justify-items: right;
  border: none;
  cursor: pointer;
  color: #999;
  margin-left: auto;
  padding: 4px;
}

.close-button svg {
  width: 18px;
  height: 18px;
}

.close-button:hover {
  color: #333;
}

.chat-messages {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  background-color: #f0f2f5;
  display: flex;
  flex-direction: column;
}

.message {
  max-width: 80%;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
}

.user-message {
  align-self: flex-end;
}

.agent-message {
  align-self: flex-start;
}

.message-content {
  padding: 10px 14px;
  border-radius: 18px;
  font-size: 14px;
  line-height: 1.4;
  word-wrap: break-word;
}

.user-message .message-content {
  background-color: #4285f4;
  color: white;
  border-bottom-right-radius: 4px;
}

.agent-message .message-content {
  background-color: var(--bg-primary);
  color: #333;
  border-bottom-left-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.message-time {
  font-size: 11px;
  color: #999;
  margin-top: 4px;
  align-self: flex-end;
}

.agent-message .message-time {
  align-self: flex-start;
}

.chat-input {
  padding: 12px 16px;
  background-color: var(--bg-primary);
  display: flex;
  align-items: center;
  border-top: 1px solid #f0f0f0;
}

.chat-input input {
  flex: 1;
  border: none;
  padding: 10px 0;
  font-size: 14px;
  outline: none;
  color: #333;
}

.chat-input input::placeholder {
  color: #aaa;
}

.chat-controls {
  display: flex;
  align-items: center;
}

.control-button {
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 6px;
  margin-left: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.control-button:hover {
  background-color: #f0f0f0;
}

.control-button svg {
  width: 20px;
  height: 20px;
}

.send-button {
  color: #4285f4;
}

.emoji-button {
  color: #666;
}

.loading-typing {
  font-size: 12px;
  color: gray;
  padding: 10px;
  text-align: left;
  font-style: italic;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .chat-window {
    width: 100%;
    height: 100%;
    bottom: 0;
    right: 0;
    border-radius: 0;
  }
  
  .chat-button {
    bottom: 20px;
    right: 20px;
  }
}
</style>
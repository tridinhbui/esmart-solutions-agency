<template>
  <button
    :disabled="disabled"
    :class="['google-btn', sizeClass]"
    @click="$emit('click')"
  >
    <img
      src="https://www.google.com/favicon.ico"
      alt="Google"
      class="google-icon"
    />
    <span v-if="!iconOnly" class="btn-label">
      <slot>Sign in with Google</slot>
    </span>
  </button>
</template>

<script setup>
/* eslint-disable */
import { computed } from "vue";
const props = defineProps({
  disabled: { type: Boolean, default: false },
  variant: { type: String, default: "full" }, // 'full' | 'compact' | 'icon'
});
const iconOnly = computed(() => props.variant === "icon");
const sizeClass = computed(() => {
  if (props.variant === "compact") return "google-btn-compact";
  if (props.variant === "icon") return "google-btn-icon";
  return "google-btn-full";
});
</script>

<style scoped>
/* Base */
.google-btn {
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 2px solid #e2e8f0;
  background: #ffffff;
  color: #1e293b;
  cursor: pointer;
  transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
  border-radius: 12px;
  font-weight: 600;
  white-space: nowrap;
}
.google-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
.google-btn:hover {
  background: #f8fafc;
}
.google-btn:active {
  transform: translateY(1px);
}

/* Size variants */
.google-btn-full {
  width: 100%;
  max-width: 320px;
  padding: 0.85rem 1.25rem;
  font-size: 0.95rem;
}
.google-btn-compact {
  padding: 0.6rem 0.9rem;
  font-size: 0.8rem;
}
.google-btn-icon {
  padding: 0.6rem;
  width: 46px;
  height: 46px;
}

.google-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}
.google-btn-icon .google-icon {
  width: 22px;
  height: 22px;
}

.btn-label {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

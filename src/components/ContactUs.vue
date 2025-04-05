<template>
  <section class="contact-us">
    <h2>{{ $t("contactUs.title") }}</h2>
    <div class="contact-container">
      <div class="contact-card">
        <h3>{{ $t("contactUs.general.title") }}</h3>
        <p>{{ $t("contactUs.general.description") }}</p>
        <v-form ref="form" @submit.prevent="submitForm">
          <v-text-field
            v-model="formData.name"
            :label="$t('contactUs.general.form.name')"
            :rules="[rules.required]"
            required
            variant="outlined"
            class="mb-4"
          ></v-text-field>

          <v-text-field
            v-model="formData.email"
            :label="$t('contactUs.general.form.email')"
            :rules="[rules.required, rules.email]"
            required
            type="email"
            variant="outlined"
            class="mb-4"
          ></v-text-field>

          <v-select
            v-model="formData.inquiryType"
            :items="inquiryOptions"
            :label="$t('contactUs.general.form.option')"
            :rules="[rules.required]"
            required
            variant="outlined"
            class="mb-4"
          ></v-select>

          <v-btn type="submit" color="#0077b6" class="white--text submit-button">
            {{ $t("contactUs.general.form.submit") }}
          </v-btn>
        </v-form>
      </div>
      <div class="contact-card">
        <h3>{{ $t("contactUs.support.title") }}</h3>
        <p>{{ $t("contactUs.support.description") }}</p>
        <v-btn color="#00c853" class="white--text chat-button">
          {{ $t("contactUs.support.button") }}
        </v-btn>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'; // Import ref for Composition API

export default {
  name: "ContactUs",
  setup() {
    // --- State using Composition API ---
    const form = ref(null); // Reference to the v-form component
    const formData = ref({
      name: '',
      email: '',
      inquiryType: null, // Use null for v-select initial value
    });

    // --- Validation Rules ---
    const rules = {
      required: value => !!value || 'This field is required.',
      email: value => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
        return pattern.test(value) || 'Invalid e-mail format.';
      },
    };

    // --- Mock Inquiry Options ---
    // You might fetch these or define them based on your needs
    const inquiryOptions = ref([
      'General Inquiry',
      'Billing Question',
      'Feature Request',
    ]);

    // --- Methods ---
    const submitForm = async () => {
      // Validate the form using the ref
      const { valid } = await form.value.validate();

      if (valid) {
        // Form is valid, proceed with submission logic
        console.log("Form submitted successfully:", formData.value);
        alert("Form submitted!"); // Replace with actual submission (e.g., API call)
        // Optionally reset form: form.value.reset(); formData.value = { name: '', email: '', inquiryType: null };
      } else {
        // Form is invalid, errors are shown automatically by v-text-field
        console.log("Form validation failed.");
      }
    };

    return {
      form, // Expose ref to template
      formData,
      rules,
      inquiryOptions,
      submitForm,
    };
  }
};
</script>

<style>
/* Styles remain largely the same, but adjust margins/padding if needed */
.contact-us {
  background: linear-gradient(135deg, #f3f4f6, #fff);
  color: #1c1c4c;
  padding: 2rem 1rem;
  text-align: center;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.contact-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem; /* Use gap for spacing */
}

.contact-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  flex: 1 1 45%;
  max-width: 45%;
  min-width: 300px; /* Ensure cards don't get too small */
  text-align: left;
}

.contact-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

/* Remove default form styling if needed, rely on Vuetify */
/* .contact-card form { } */

/* Adjust button styling if using v-btn */
.submit-button.v-btn {
  /* Use !important cautiously if needed */
  color: white !important;
}

.chat-button.v-btn {
  color: white !important;
}

/* Minor adjustment for Vuetify input margin */
.mb-4 {
  margin-bottom: 1rem !important; /* Match original spacing */
}


@media (max-width: 768px) {
  .contact-card {
    flex: 1 1 100%;
    max-width: 100%;
  }
}
</style>
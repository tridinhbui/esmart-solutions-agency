<template>
  <section>
    <div class="banner">
      <div class="banner-top">
        <h2 class="banner-title">
          {{ $t("contactUs.title") }}
        </h2>
      </div>
      <div>
        <div class="contact-card">
          <div class="form-section">
            <h3 class="form-title">
              {{ $t("contactUs.general.title") }}
            </h3>
            <p class="form-description">
              {{ $t("contactUs.general.description") }}
            </p>
            <v-form
              ref="form"
              @submit.prevent="submitForm"
            >
              <v-text-field
                v-model="formData.name"
                :label="$t('contactUs.general.form.name')"
                :rules="[rules.required]"
                required
                variant="outlined"
                class="mb-4"
                color="#2375d4"
              />

              <v-text-field
                v-model="formData.email"
                :label="$t('contactUs.general.form.email')"
                :rules="[rules.required, rules.email]"
                required
                type="email"
                variant="outlined"
                class="mb-4"
                color="#2375d4"
              />

              <v-select
                v-model="formData.inquiryType"
                :items="inquiryOptions"
                :label="$t('contactUs.general.form.option')"
                :rules="[rules.required]"
                required
                variant="outlined"
                class="mb-4"
                color="#2375d4"
              />

              <v-btn
                type="submit"
                color="#0077b6"
                class="white--text submit-button"
              >
                {{ $t("contactUs.general.form.submit") }}
              </v-btn>
            </v-form>
          </div>

          <div class="support-section">
            <h3 class="support-title">
              {{ $t("contactUs.support.title") }}
            </h3>
            <p class="support-description">
              {{ $t("contactUs.support.description") }}
            </p>
            <v-btn
              color="#00c853"
              class="white--text chat-button"
            >
              {{ $t("contactUs.support.button") }}
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'; // Import ref for Composition API
import axios from 'axios';


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
        try {
          await axios.post(`.netlify/functions/server/api/email/sendEmail`, {
            email: formData.value.email,
            message: `
               <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
                <div style="max-width: 600px; margin: auto; background: var(--bg-primary); padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                  <h2 style="margin-top: 0; color: #333;">📨 New Contact Form Submission</h2>

                  <table style="width: 100%; font-size: 16px;">
                    <tr>
                      <td style="padding: 8px 0;"><strong>Name:</strong></td>
                      <td style="padding: 8px 0;">${formData.value.name}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0;"><strong>Email:</strong></td>
                      <td style="padding: 8px 0;">${formData.value.email}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0;"><strong>Inquiry Type:</strong></td>
                      <td style="padding: 8px 0;">${formData.value.inquiryType}</td>
                    </tr>
                  </table>

                  <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
                  <p style="margin-top: 30px; font-size: 0.85em; color: #999;">This email was sent from the Esmart contact form.</p>
                </div>
              </div>
            `,
          });
          formData.value = {
            name: '',
            email: '',
            inquiryType: '',
          };

          
        } catch (error) {
          console.error("Error sending email:", error);
        }
        
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

.contact-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
}

.support-section {
  flex: 1;
  min-width: 300px;
  max-width: 300px;
  background: var(--bg-primary);
  padding: 1rem;
  min-height: 40%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
}

.support-title {
  text-align: left;
  font-size: 1.2rem;
  line-height: 1.6;
}

.support-description {
  text-align: left;
  font-size: 0.9rem;
  line-height: 1.8;
}

.form-section {
  flex: 1;
  min-width: 300px;
  max-width: 500px;
  background: var(--bg-primary);
  padding: 1rem;
  min-height: 40%;
}
.form-title {
  text-align: left;
  margin-bottom: 10px;
}

.form-description {
  text-align: left;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.grey-input {
  background-color: #f0f0f0;
}

.contact-card {
  background: var(--bg-primary);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding: 15px;
  position: relative;
  top: -10vh;
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  max-width: 63%;
  min-height: 40%;
  z-index: 2;
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
  background-color: #2375d4 !important;
  width: 100%;
  border-radius: 10px !important;
}

.chat-button.v-btn {
  color: #2375d4 !important;
  background-color: var(--bg-primary) !important;
  border: 1px solid #2375d4 !important;
  width: 100%;
  border-radius: 10px !important;
  margin-top: 10px;
}

.chat-button.v-btn:hover {
  background-color: #2375d4 !important;
  color: white !important;
}

/* Minor adjustment for Vuetify input margin */
.mb-4 {
  margin-bottom: 0.6rem !important; /* Match original spacing */
}

.banner {
  flex: 1 0 auto;
  position: relative;
  background: var(--bg-primary);
  font-family: "Poppins", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
}

.banner-top {
  height: 40vh;
  background: linear-gradient(135deg, #07076c, #71bae2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner-title {
  font-size: 4.0rem;
  font-weight: 600;
  margin-bottom: 0;
  text-align: center;
  display: inline-block;
  width: 100%;
}

@media (max-width: 1024px) {
  .form-section {
    flex: 1 1 100%;
    margin-bottom: 5px;
    gap: 10px;
  }
  .support-section {
    flex: 1 1 100%;
    max-width: 100%;
    margin-top: 5px;
  }
  .support-title {
    text-align: center;
  }
  .support-description {
    text-align: center;
  }
  .contact-card {
    flex-direction: column;
    top: -100px;
  }

  .banner {
    padding-bottom: 0;
  }

  .contact-container {
    padding: 1rem;
  }

}
</style>
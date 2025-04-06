<template>
  <section class="contact-us">
    <!-- Remove the "Our Process" section -->
    <!-- Previously: <h2>{{ $t("contactUs.process.title") }}</h2> and the process-container div -->

    <!-- Keep the Testimonial Quote section -->
    <testimonial-quote />

    <h2>{{ $t("contactUs.contact.title") }}</h2>
    <div class="contact-card">
      <h3>{{ $t("contactUs.general.title") }}</h3>
      <p>{{ $t("contactUs.general.description") }}</p>
      <form>
        <input type="text" :placeholder="$t('contactUs.general.form.name')" />
        <input type="email" :placeholder="$t('contactUs.general.form.email')" />
        <select>
          <option>{{ $t("contactUs.general.form.option") }}</option>
        </select>
        <button type="submit">{{ $t("contactUs.general.form.submit") }}</button>
      </form>
    </div>
    <div class="contact-card">
      <h3>{{ $t("contactUs.support.title") }}</h3>
      <p>{{ $t("contactUs.support.description") }}</p>
      <button class="chat-button">
        {{ $t("contactUs.support.button") }}
      </button>
    </div>
  </section>
</template>

<script>
import TestimonialQuote from "./TestimonialQuote.vue"; // Import the new component

export default {
  name: "ContactUs",
  components: {
    TestimonialQuote, // Register the component
  },
};
</script>

<style scoped>
.contact-us {
  padding: 2rem 1rem;
  text-align: center;
}

/* Remove styles for process-container and process-card since they're no longer used */
.contact-card {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem;
  flex: 1 1 45%;
  max-width: 45%;
  text-align: left;
}

.contact-card form {
  display: flex;
  flex-direction: column;
}

.contact-card input,
.contact-card select {
  margin: 0.5rem 0;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.contact-card button {
  background: #0077b6;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;
}

.contact-card button:hover {
  background: #005f8d;
}

.chat-button {
  background: #0077b6;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.chat-button:hover {
  background: #005f8d;
}

@media (max-width: 768px) {
  .contact-card {
    flex: 1 1 100%;
    max-width: 100%;
  }
}
</style>
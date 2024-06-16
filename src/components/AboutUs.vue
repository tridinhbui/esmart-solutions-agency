<template>
    <section class="about">
      <h2>About Us</h2>
      <p>The members of the ESmart team always prioritize Respect - Efficiency - Professionalism in their work. Therefore, our partners will regularly receive updates, care, and assurance of benefits from even the smallest terms.</p>
      <p>We believe that our E-Boost product presents an opportunity for your esteemed business not only to expand and optimize business operations but also to elevate your brand and contribute to the development of the growing business ecosystem.</p>
    </section>
  </template>
  
  <script>
  export default {
    name: 'AboutUs'
  }
  </script>
  
  <style scoped>
 .about {
  background-color: #1c1c4c;
  color: white;
  padding: 2rem 1rem;
  text-align: center;
  position: relative; /* New for element positioning */
}

.about::after { /* New pseudo-element for background decoration */
  content: "";
  background-image: url("@/assets/about-pattern.png"); /* Replace with your pattern image path */
  background-size: cover;
  background-position: center;
  background-repeat: repeat;
  opacity: 0.2;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1; /* Place behind content */
}

h2 {
  margin-bottom: 1rem;
  font-size: 2rem; /* Increase heading size */
}

p {
  font-size: 16px; /* Adjust paragraph size */
  line-height: 1.5; /* Improve readability with line-height */
  margin-bottom: 2rem;
}

.key-values { /* New element for key values */
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap; /* Allow items to wrap on smaller screens */
  max-width: 800px;
  margin: 0 auto; /* Center element horizontally */
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.1); /* Semi-transparent white background */
  border-radius: 8px; /* Rounded corners */
  animation: key-value-pop 0.5s ease-in-out forwards; /* New animation for key value appearance */
}

@keyframes key-value-pop {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.key-value { /* Styling for individual key-value pairs */
  text-align: center;
  padding: 1rem;
}

.key-value h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.key-value p {
  font-size: 14px;
  color: #ccc;
}

  </style>
  
<template>
  <section class="about">
    <h2>{{ $t("AboutUs.title") }}</h2>
    <p>{{ $t("AboutUs.description1") }}</p>
    <p>{{ $t("AboutUs.description2") }}</p>
    <p>{{ $t("AboutUs.description3") }}</p>
    <img src="@/assets/esmart_end.jpg" :alt="$t('AboutUs.imageAlt')" class="about-image" />
  </section>
</template>

<script>
export default {
  name: "AboutUs",
};
</script>

<style scoped>
.about {
  background-color: #1c1c4c;
  color: white;
  padding: 2rem 1rem;
  text-align: center;
  position: relative;
}

.about::after {
  content: "";
  /* background-image: url("@/assets/about-pattern.png"); */
  background-size: cover;
  background-position: center;
  background-repeat: repeat;
  opacity: 0.2;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

h2 {
  margin-bottom: 1rem;
  font-size: 2rem;
}

p {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 2rem;
}

.key-values {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  animation: key-value-pop 0.5s ease-in-out forwards;
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

.about-image {
  margin-top: 2rem;
  max-width: 80%;
  height: auto;
  border-radius: 8px;
  transition: transform 0.5s ease, filter 0.5s ease;
  filter: brightness(1.2); /* Makes the image brighter */
}

.about-image:hover {
  transform: scale(0.9) translateZ(-10px); /* Makes the image smaller and moves it away */
}

.key-value {
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

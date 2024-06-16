<template>
  <section class="features">
    <h2>Our Achievements</h2>
    <div class="achievements">
      <div class="achievement" v-for="(item, index) in achievements" :key="index">
        <img :src="item.icon" :alt="item.title">
        <div class="number">{{ item.currentValue }}</div>
        <div class="title">{{ item.title }}</div>
        <div class="description">{{ item.description }}</div>
      </div>
    </div>
    <div class="features-container animate-fadeIn">
      <div class="feature">
        <h3>Team Size</h3>
        <p>With a team of over 20+ personnel, ESmart Solutions has reached nearly 1,000,000+ individuals through over 400+ publications since the inception of our communication campaigns.</p>
      </div>
      <div class="feature">
        <h3>Investment</h3>
        <p>ESmart Solutions has also received investment funding and strategic guidance from the Macalester Entrepreneurship and Innovation Fund, based in Saint Paul, Minnesota, USA.</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FeaturesPage',
  data() {
    return {
      achievements: [
        { icon: 'path/to/icon1.png', title: 'Members', value: 35, currentValue: 0, description: '35+' },
        { icon: 'path/to/icon2.png', title: 'Products Sold', value: 100, currentValue: 0, description: '100+' },
        { icon: 'path/to/icon3.png', title: 'Regions', value: 10, currentValue: 0, description: '10+' },
        { icon: 'path/to/icon4.png', title: 'Reach', value: 13000, currentValue: 0, description: '13000+' }
      ]
    };
  },
  mounted() {
    this.achievements.forEach((achievement, index) => {
      this.animateValue(index, achievement.value, 3000);
    });
  },
  methods: {
    animateValue(index, end, duration) {
      let start = this.achievements[index].currentValue;
      let range = end - start;
      let current = start;
      let increment = end > start ? 1 : -1;
      let stepTime = Math.abs(Math.floor(duration / range));
      let timer = setInterval(() => {
        current += increment;
        this.achievements[index].currentValue = current;
        if (current === end) {
          clearInterval(timer);
        }
      }, stepTime);
    }
  }
};
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.features {
  background: linear-gradient(135deg, #fff, #f3f4f6);
  color: #1c1c4c;
  padding: 2rem 1rem;
  text-align: center;
}

.achievements {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.achievement {
  flex: 1 1 20%;
  text-align: center;
}

.achievement img {
  width: 50px;
  height: 50px;
}

.number {
  font-size: 2rem;
  color: #0077b6;
}

.features-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  animation: fadeIn 1.5s ease-in-out;
}

.feature {
  margin: 1rem;
  flex: 1 1 45%;
  max-width: 45%;
  background: #f3f4f6;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.feature h3 {
  margin-bottom: 0.5rem;
  color: #0077b6;
}
</style>

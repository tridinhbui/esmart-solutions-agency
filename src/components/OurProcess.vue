<template>
  <section class="process">
    <h2>Our Process</h2>
    <div class="steps">
      <div class="step" v-for="(step, index) in steps" :key="index">
        <div class="step-number">{{ index + 1 }}</div>
        <div class="icon">
          <font-awesome-icon icon="check" />
        </div>
        <div class="content">
          <h3>{{ step.title }}</h3>
          <p>{{ step.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


export default {
  name: 'ProcessInt',
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      steps: [
        { title: 'Initial Proof', description: 'The initial design concept is put up for review. We discuss what changes/preferences (if any) are required.' },
        { title: 'Project Brief', description: 'The project kicks off with a comprehensive discussion about design and layout.' },
        { title: 'Collaboration', description: 'We work together to create a new design and layout. You directly shape the process.' },
        { title: 'Print Production', description: 'Upon approval, your project goes to print.' },
        { title: 'Delivery', description: 'Your printed pieces are delivered straight to your door.' }
      ]
    }
  }
}
</script>
<style scoped>
.process {
  background-color: #f3f4f6;
  color: #1c1c4c;
  padding: 3rem 1rem;
  text-align: center;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

.process h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.steps {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 0 1rem;
}

.step {
  flex: 1 1 45%;
  background-color: #3222c3; /* Dark purple-blue background */
  color: white;
  margin: 0.5rem;
  padding: 2rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  animation: fadeIn 0.8s ease-in-out;
  position: relative;
  overflow: hidden;
  opacity: 0;
  animation-fill-mode: forwards;
}

.step:nth-child(1) {
  animation-delay: 0s;
}

.step:nth-child(2) {
  animation-delay: 0.2s;
}

.step:nth-child(3) {
  animation-delay: 0.4s;
}

.step:nth-child(4) {
  animation-delay: 0.6s;
}

.step:nth-child(5) {
  animation-delay: 0.8s;
}

.step::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.2), transparent);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  z-index: 1;
}

.step:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.step:hover::before {
  opacity: 1;
}

.step h3 {
  margin-bottom: 0.5rem;
  font-size: 1.4rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 2;
  overflow: hidden;
  white-space: nowrap;
  animation: typing 1s steps(30, end) forwards;
}

.step p {
  margin: 0;
  position: relative;
  z-index: 2;
}

.step-number {
  font-size: 2rem;
  color: #3222c3;
  margin-bottom: 0.5rem;
}

.icon {
  margin-bottom: 1rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}


</style>

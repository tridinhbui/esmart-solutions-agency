<template>
    <div>
      <header class="header">
        <h1>See How Your Business Stacks Up</h1>
        <p>
          Gain insights into your Facebook performance and elevate it with NexGen's social media check-up. Assess your call center's operations and receive tailored recommendations and statistics through a brief questionnaire for an operational analysis.
        </p>
      </header>
      
      <div class="content">
        <div class="card">
          <h2>Social Media Check-Up</h2>
          <p>
            How is your business’ Facebook performing? <strong>Click the button</strong> to see how you stack up and learn how NexGen can take you to the next level!
          </p>
          <button @click="goToSocialMediaCheckup">Click Here</button>
        </div>
        
        <div class="card">
          <h2>Call Center Operational Check-Up and Analysis</h2>
          <p>
            How is your business’ Facebook performing? <strong>Fill out your brief questionnaire</strong> to receive recommendations and statistics on the current state of your contact center!
          </p>
          <button @click="goToCallCenterCheckup">Click Here</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BusinessCheckup',
    methods: {
      goToSocialMediaCheckup() {
        // Logic to navigate to the Social Media Check-Up page
        this.$router.push('/social-media-checkup');
      },
      goToCallCenterCheckup() {
        // Logic to navigate to the Call Center Check-Up page
        this.$router.push('/call-center-checkup');
      }
    }
  };
  </script>

<style scoped>
.header {
  background-color: #d11a2a;
  color: white;
  padding: 2rem;
  text-align: center;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.header p {
  font-size: 1.2rem;
  margin: 0 auto;
  max-width: 600px;
}

.content {
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
  padding: 2rem;
}

.card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  text-align: center;
  width: 45%;
}

.card h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.card p {
  font-size: 1rem;
  margin-bottom: 1.5rem;
}

.card button {
  background-color: #d11a2a;
  border: none;
  border-radius: 5px;
  color: white;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
}

.card button:hover {
  background-color: #b31422;
}
</style>

  
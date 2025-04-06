<template>
    <section class="testimonial-quote">
      <div class="quote-container">
        <p class="quote">“{{ currentQuote.text }}”</p>
        <div class="author">
          <img :src="currentQuote.avatar" :alt="currentQuote.name" class="avatar" />
          <div class="author-info">
            <h3>{{ currentQuote.name }}</h3>
            <p>{{ currentQuote.title }}</p>
          </div>
        </div>
        <div class="dots">
          <span
            v-for="(quote, index) in quotes"
            :key="index"
            class="dot"
            :class="{ active: currentIndex === index }"
            @click="currentIndex = index"
          ></span>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: "TestimonialQuote",
    data() {
      return {
        currentIndex: 0,
        quotes: [
          {
            text: "Wpromote seamlessly executes our entire digital marketing strategy with incredible skill and expertise. We consider the Wpromote team an extension of our company, not just another partner.",
            name: "Dave Gans",
            title: "Director of Digital Marketing & Ecommerce, Klipsch",
            avatar: require("@/assets/testimonial1.jpg"),
          },
          {
            text: "Esmart Solutions transformed our online presence with their innovative strategies. Their team feels like part of our family!",
            name: "Jane Doe",
            title: "Marketing Manager, TechCorp",
            avatar: require("@/assets/testimonial2.jpg"),
          },
          {
            text: "The expertise at Esmart Solutions helped us double our conversion rates in just three months. Truly exceptional!",
            name: "John Smith",
            title: "CEO, Innovate Designs",
            avatar: require("@/assets/testimonial3.jpg"),
          },
        ],
      };
    },
    computed: {
      currentQuote() {
        return this.quotes[this.currentIndex];
      },
    },
    mounted() {
      // Select a random quote on mount
      this.currentIndex = Math.floor(Math.random() * this.quotes.length);
    },
  };
  </script>
  
  <style scoped>
  .testimonial-quote {
    background-color: #1c1c4c; /* Purple background */
    color: white;
    padding: 3rem 1rem;
    text-align: center;
  }
  
  .quote-container {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .quote {
    font-size: 1.5rem;
    line-height: 1.5;
    margin-bottom: 2rem;
    font-style: italic;
  }
  
  .author {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  .author img.avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 1rem;
    object-fit: cover;
  }
  
  .author-info h3 {
    font-size: 1.1rem;
    margin: 0;
    text-transform: uppercase;
  }
  
  .author-info p {
    font-size: 0.9rem;
    color: #ccc;
    margin: 0;
  }
  
  .dots {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
  }
  
  .dot {
    width: 10px;
    height: 10px;
    background-color: #ccc;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .dot.active {
    background-color: white;
  }
  
  @media (max-width: 768px) {
    .quote {
      font-size: 1.2rem;
    }
  
    .author img.avatar {
      width: 40px;
      height: 40px;
    }
  
    .author-info h3 {
      font-size: 1rem;
    }
  
    .author-info p {
      font-size: 0.8rem;
    }
  }
  </style>
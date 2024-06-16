<template>
    <section class="hero">
      <header class="header">
        <nav>
        </nav>
      </header>
      <div class="hero-content animate-slideIn">
        <div class="text-content">
          <h1>ESmart Solutions Agency</h1>
          <p>Specializing in assisting businesses in enhancing their reach and promoting their products to potential customers with optimal cost-effectiveness.</p>
          <div class="buttons">
            <StyledButton>Join Today</StyledButton>
            <StyledButton>Try ESmart Risk Free For 30 Days!</StyledButton>
          </div>
        </div>
        <img src="@/assets/logo.png" alt="ESmart Logo" class="logo">
      </div>
    </section>
  </template>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');
  
  @keyframes slideIn {
    from {
      transform: translateX(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes background-fade {
    from {
      opacity: 0.2;
    }
    to {
      opacity: 0.5;
    }
  }
  
  @keyframes logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
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
  
  .hero {
    background: linear-gradient(135deg, #1c1c4c, #0077b6);
    color: white;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    font-family: 'Poppins', sans-serif;
  }
  
  .hero:after {
    content: "";
    background-image: url("@/assets/bg.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.2;
    filter: blur(5px);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    animation: background-fade 10s ease-in-out infinite;
  }
  
  .header {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 1rem 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
  
  .header nav ul {
    display: flex;
    justify-content: center;
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  .header nav ul li {
    margin: 0 1rem;
    color: white;
    cursor: pointer;
  }
  
  .hero-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1400px;
    padding: 0 2rem;
    box-sizing: border-box;
    animation: slideIn 1.5s ease-in-out;
  }
  
  .text-content {
    max-width: 600px;
    text-align: left;
  }
  
  .text-content h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    overflow: hidden;
    white-space: nowrap;
    animation: typing 3s steps(30, end) forwards;
  }
  
  .text-content p {
    font-size: 1.2rem;
    line-height: 1.5;
    margin-bottom: 2rem;
  }
  
  .logo {
    max-width: 200px;
    animation: logo-spin 3s ease-in-out infinite;
  }
  
  .buttons {
    display: flex;
    flex-wrap: wrap;
    margin-top: 2rem;
  }
  
  .buttons button {
    margin-right: 1rem;
    margin-bottom: 1rem;
  }
  
  @media (max-width: 768px) {
    .hero-content {
      flex-direction: column;
      text-align: center;
    }
  
    .text-content {
      max-width: 100%;
      margin-bottom: 2rem;
    }
  
    .text-content h1 {
      font-size: 2rem;
      animation: none; /* Remove typing animation on smaller screens */
    }
  
    .text-content p {
      font-size: 1rem;
    }
  
    .logo {
      max-width: 50vw;
      margin-bottom: 2rem;
    }
  
    .buttons {
      justify-content: center;
    }
  }
  
  @media (max-width: 480px) {
    .text-content h1 {
      font-size: 1.5rem;
    }
  
    .text-content p {
      font-size: 0.9rem;
    }
  
    .logo {
      max-width: 60vw;
    }
  }
  </style>
  
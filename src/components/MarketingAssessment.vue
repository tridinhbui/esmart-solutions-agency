<template>
    <section class="assessment animate-slideIn">
        <h2>Marketing Assessment</h2>
        <div class="progress-bar-container">
            <div class="progress-bar">
                <div class="progress" :style="{ width: progressPercentage + '%' }"></div>
            </div>
            <p>{{ completedQuestions }} of {{ questions.length }} questions completed</p>
        </div>

        <form @submit.prevent="submitAnswers">
            <div v-for="(question, index) in questions" :key="index" class="question">
                <p class="question-text">{{ question.text }}</p>
                <div>
                    <label>
                        <input type="radio" :name="'question' + index" value="yes" v-model="answers[index]" />
                        Yes
                    </label>
                    <label>
                        <input type="radio" :name="'question' + index" value="no" v-model="answers[index]" />
                        No
                    </label>
                </div>
            </div>
            <button type="submit">Submit</button>
            <p id="alert">Please answer all questions before submitting</p>
        </form>

        <div v-if="report" class="report">
            <h3>Your Score: {{ score }}</h3>
            <h4>Strengths:</h4>
            <ul>
                <li v-for="strength in report.strengths" :key="strength">{{ strength }}</li>
            </ul>
            <h4>Weaknesses:</h4>
            <ul>
                <li v-for="weakness in report.weaknesses" :key="weakness">{{ weakness }}</li>
            </ul>
            <h4>Suggestions:</h4>
            <ul>
                <li v-for="suggestion in report.suggestions" :key="suggestion">{{ suggestion }}</li>
            </ul>
        </div>
    </section>
</template>

<script>
import axios from 'axios';

export default {
    name: 'MarketingAssessment',
    data() {
        return {
            questions: [
                { text: 'Do you run ads?' },
                { text: 'Is your website SEO optimized?' },
                { text: 'Do you use social media for marketing?' },
                { text: 'Do you have a content strategy?' },
                { text: 'Do you use email marketing?' },
                { text: 'Do you have a defined target audience?' },
                { text: 'Do you have a budget for marketing?' },
                { text: 'Do you have a unique selling proposition (USP)?' },
                { text: 'Do you have a competitive analysis?' },
                { text: 'Do you have a customer feedback loop?' },

                // test questions
                // { text: 'Do you have a clear brand identity?' },
                // { text: 'Do you have a clear messaging strategy?' },
                // { text: 'Do you have a clear communication plan?' },
                // { text: 'Do you have a clear product positioning strategy?' },
                // { text: 'Do you have a clear pricing strategy?' },
                // { text: 'Do you have a clear customer support strategy?' },
                // { text: 'Do you have a clear sales strategy?' },
            ],
            answers: [],
            score: null,
            report: null,
        };
    },
    computed: {
        completedQuestions() {
            return this.answers.filter(answer => answer !== undefined).length;
        },
        progressPercentage() {
            return (this.completedQuestions / this.questions.length) * 100;
        },
    },
    methods: {
        async submitAnswers() {
            if (this.answers.length !== this.questions.length) {
                document.getElementById('alert').style.display = 'block';
                setTimeout(() => {
                    document.getElementById('alert').style.display = 'none';
                }, 2000);
                return;
            }
            try {
                const response = await axios.post('http://localhost:3000/api/questionnaire/submit', {
                    answers: this.answers,
                });
                this.score = response.data.score;
                this.report = response.data.report;
            } catch (error) {
                console.error('Error submitting answers:', error);
            }
        },
    },
};
</script>

<style scoped>
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

.animate-slideIn {
  animation: slideIn 1s ease-in-out;
}

.assessment {
    background-color: #f3f4f6;
    color: #1c1c4c;
    padding: 3rem 1rem;
    text-align: center;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
}

.progress-bar-container {
    position: sticky;
    top: 80px;
    z-index: 100;
    background-color: white;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
    margin: 1rem auto;
    max-width: 1000px;
}

.progress-bar {
    background: #e0e0e0;
    border-radius: 8px;
    height: 20px;
    margin-bottom: 1rem;
    overflow: hidden;
}

.progress {
    background: linear-gradient(90deg, #007bff, #0056b3);
    height: 100%;
    border-radius: 8px;
    transition: width 0.3s ease;
}

h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #1c1c4c;
}

.question {
    background: white;
    border-radius: 8px;
    padding: 1rem;
    margin: 1rem auto;
    max-width: 1000px;
    margin-bottom: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.question:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.question-text {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: #333;
}

form {
    margin-top: 2rem;
}

#alert {
    color: red;
    font-size: 1rem;
    display: none;
}

.report {
    background: white;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    margin: 1rem auto;
    max-width: 1000px;
}

.report li {
    list-style: none;
    margin: 0.5rem 0;
    color: #333;
}

.report:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

button {
    background: #007bff;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

button:hover {
    background: #0056b3;
}

@media (max-width: 768px) {
    .progress-bar-container {
        top: 40px;
        margin-bottom: 2rem;
    }

    .question {
        padding: 1rem;
        margin-bottom: 1.5rem;
    }

    button {
        width: 100%;
    }
}
</style>
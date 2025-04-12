const questionsEn = require('../assets/questions-en.json');
const questionsVi = require('../assets/questions-vi.json');

function calculateScore(answers) {
    let score = 0;
    answers.forEach(answer => {
        if (answer === 0) score += 10;
        else if (answer === 1) score += 5;
    });
    return score;
}

function generateReport(answers, locale) {
    const report = {
        strengths: [],
        weaknesses: [],
        suggestions: [],
    };

    const questions = locale === 'en' ? questionsEn : questionsVi;

    questions.forEach((question, index) => {
        const answer = answers[index];
        const matchedAnswer = question.answers[answer];

        if (matchedAnswer.strength) report.strengths.push(matchedAnswer.strength);
        if (matchedAnswer.weakness) report.weaknesses.push(matchedAnswer.weakness);
        if (matchedAnswer.suggestion) report.suggestions.push(matchedAnswer.suggestion);
    });

        return report;
    }

module.exports = { calculateScore, generateReport };
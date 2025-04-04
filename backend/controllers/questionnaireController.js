function calculateScore(answers) {
    let score = 0;
    answers.forEach(answer => {
        if (answer === 'yes') score += 10;
    });
    return score;
}

function generateReport(score) {
    const report = {
        strengths: [],
        weaknesses: [],
        suggestions: [],
    };

    if (score >= 80) {
        report.strengths.push('Excellent marketing strategy.');
        report.weaknesses.push('None');
        report.suggestions.push('Keep up the good work!');
    } else if (score >= 50) {
        report.strengths.push('Good marketing efforts.');
        report.weaknesses.push('Needs improvement in SEO.');
        report.suggestions.push('Focus on improving SEO and content strategy.');
    } else {
        report.strengths.push('Some marketing efforts detected.');
        report.weaknesses.push('Poor marketing performance.');
        report.suggestions.push('Consider investing in social media ads.');
    }

    return report;
}

module.exports = { calculateScore, generateReport };
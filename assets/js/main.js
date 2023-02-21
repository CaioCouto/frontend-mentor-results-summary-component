function returnScoreTypeDivElement(data) {
    const scoreTypeDiv = document.createElement('div');
    const scoreTypeImg = document.createElement('img');
    const scoreTypeText = document.createElement('p');

    scoreTypeDiv.appendChild(scoreTypeImg);
    scoreTypeDiv.appendChild(scoreTypeText);
    scoreTypeImg.src = data.icon.slice(2);
    scoreTypeImg.alt = `${data.icon.split('/').pop()}`;
    scoreTypeText.textContent = data.category;
    scoreTypeText.classList.add(`main-status--${data.category.toLowerCase()}Text`);

    return scoreTypeDiv;
}

function returnScoreDivElement(data) {
    const scoreDiv = document.createElement('div');
    const scoreGottenText = document.createElement('p');
    const scoreTotalText = document.createElement('p');

    scoreDiv.appendChild(scoreGottenText);
    scoreDiv.appendChild(scoreTotalText);
    scoreGottenText.textContent = data.score;
    scoreGottenText.classList.add('main-status--scoreGotten');
    scoreTotalText.textContent = '/ 100';
    scoreTotalText.classList.add('main-status--scoreTotal');

    return scoreDiv;
}

function returnScoreArticleElement() {
    const scoreArticle = document.createElement('article');
    scoreArticle.classList.add('main-status--score');

    return scoreArticle;
}

function insertElementsOnDOM(data) {
    const mainStatus = document.querySelector('.main-status');
    const mainStatusBtn = document.querySelector('.main-status--btn');
    const scoreArticle = returnScoreArticleElement();
    const scoreTypeDiv = returnScoreTypeDivElement(data);
    const scoreDiv = returnScoreDivElement(data);

    scoreArticle.appendChild(scoreTypeDiv);
    scoreArticle.appendChild(scoreDiv);
    mainStatus.insertBefore(scoreArticle, mainStatusBtn);
}

function calculateAverageScore(scores) {
    return Math.floor(scores.reduce((acc, curr) => acc + curr) / scores.length);
}

function setSummaryGottenScoreText(scores) {
    const averageScore = calculateAverageScore(scores);
    document.querySelector('.main-summary--scoreGotten').textContent = averageScore;
}

fetch('data.json')
.then(resp => resp.json())
.then(data => {
    const scores = data.map(d => {
        insertElementsOnDOM(d);
        return d.score;
    });
    setSummaryGottenScoreText(scores);
})
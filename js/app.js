const QUIZ_CONTAINER  = document.getElementById('answers-container');
const QUESTION_TEXT  = document.getElementById('question-text');
const TABLE_ANSWERS = document.getElementById('response-table');
const REPONSE_MESSAGE = document.getElementById('response-message');
const FINAL_SCORE = document.getElementById('final-score');
const SCORE_WRAPPER = document.getElementById('score-container');
const RESET_BTN = document.getElementById('restart-btn');


console.log (FINAL_SCORE)


const DATA = [
    { country: "USA", capital: "Washington, D.C.", cities: ["New York", "Los Angeles", "Chicago", "Washington, D.C."] },
    { country: "Germany", capital: "Berlin", cities: ["Munich", "Berlin", "Hamburg", "Cologne"] },
    { country: "Japan", capital: "Tokyo", cities: ["Osaka", "Kyoto", "Hokkaido", "Tokyo"] },
    { country: "France", capital: "Paris", cities: ["Marseille", "Lyon", "Paris", "Nice"] },
    { country: "India", capital: "New Delhi", cities: ["Mumbai", "New Delhi", "Kolkata", "Bangalore"] },
    { country: "Australia", capital: "Canberra", cities: ["Sydney", "Melbourne", "Brisbane", "Canberra"] },
    { country: "Canada", capital: "Ottawa", cities: ["Toronto", "Vancouver", "Ottawa", "Montreal"] },
    { country: "Russia", capital: "Moscow", cities: ["Saint Petersburg", "Moscow", "Novosibirsk", "Yekaterinburg"] },
];


function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
  

  let usedCountries = [];
  let score = 0 ;
  let scoreGames = 0;



  function selectCounry(){
    const availableCountries = DATA.filter(country => !usedCountries.includes(country.country));

    
    let payIndexRandom = randomInteger(0,availableCountries.length -1 );
    console.log('index', payIndexRandom)

    return availableCountries[payIndexRandom];

  }

 function generateCountry(){ 
    let currentCounry = selectCounry();

    if(!currentCounry){
        return false
    }

    let currentCities = currentCounry.cities

    usedCountries.push(currentCounry.country)

    shuffle(currentCities)

     return { country: currentCounry.country, capital: currentCounry.capital, cities: currentCities };

 }

 function restartGame() {
    usedCountries = [];
     score = 0 ;
     scoreGames = 0;
     SCORE_WRAPPER.classList.add('hidden');

   
     TABLE_ANSWERS.querySelector('tbody').innerHTML = '';
    
    renderQuestions();
}



 function renderQuestions(){ 

    const currentCountry = generateCountry()

    if(currentCountry == false ){
        console.log('ffff')
        SCORE_WRAPPER.classList.remove("hidden");
        QUIZ_CONTAINER.innerHTML = 'GAME OVER';
        FINAL_SCORE.innerHTML = `Score final ${score}/ ${scoreGames}`;
        RESET_BTN.addEventListener('click', function(){
            restartGame();
         })
    } else{
        QUESTION_TEXT.innerHTML = `Which of the following cities is the capital of ${currentCountry.country} ?`
        QUIZ_CONTAINER.innerHTML = '';
        currentCountry.cities.forEach(city=>{
            const btn = document.createElement('button');
            btn.setAttribute('id',`${city}`)
            btn.innerText = city;
            btn.onclick = () => checkAnswer(city, currentCountry.capital, currentCountry.country)
            QUIZ_CONTAINER.append(btn);
        })
    }
  
    
 }

 function checkAnswer(city, capital, country){ 
    let correct
    if(city === capital){
        correct = 'Yes';
        document.getElementById(`${city}`).classList.add('correct')
        REPONSE_MESSAGE.innerHTML = "you answer correctly!"
        REPONSE_MESSAGE.classList.add("textCorrect");
        addReponce(city,country, correct);
        score++

    } else {  correct = 'Non';
        document.getElementById(`${city}`).classList.add('wrong')
        REPONSE_MESSAGE.innerHTML = "You answered incorrectly!";
        REPONSE_MESSAGE.classList.add("textWrong");
        addReponce(city,country, correct)}
        scoreGames++;
   
        setTimeout(() => {
            if( REPONSE_MESSAGE.classList == "textWrong"){
                REPONSE_MESSAGE.classList.remove("textWrong");
            } else { 
                REPONSE_MESSAGE.classList.remove("textCorrect");
            }
            renderQuestions();
            REPONSE_MESSAGE.innerHTML='';
            
        }, 1000); 
 }


 function addReponce(city, country, correct){

    const row = document.createElement('tr');
    row.innerHTML = `<td>${country}</td><td>${city}</td><td>${correct}</td>`;
    TABLE_ANSWERS.querySelector('tbody').append(row);

 }
 renderQuestions();





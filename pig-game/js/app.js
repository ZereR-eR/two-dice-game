new WOW().init();
let score,roundScore,activePlayer,gamePlaying,lastDice;
let scoreZeroSelect = document.getElementById('score-0');
let scoreOneSelect = document.getElementById('score-1');
let currentZeroSelect = document.getElementById('current-0');
let currentOneSelect = document.getElementById('current-1');
let diceSelect =  document.querySelector(".dice");
let x  = window.prompt("What is Player One Name?");
let y  = window.prompt("What is Player Two Name?");
if (x === ""){
    x = "Player One";
}
if (y === ""){
   y = "Player Two";
}
function init(){
    score = [0,0];
    roundScore = 0;
    activePlayer= 0;
    gamePlaying = true;
    document.getElementById("dice-1").style.display = 'none';
    document.getElementById("dice-2").style.display = 'none';
    scoreZeroSelect.textContent = '0';
    scoreOneSelect.textContent = '0';
    currentZeroSelect.textContent = '0';
    currentOneSelect.textContent = '0';
    document.getElementById("name-0").textContent = x;
    document.getElementById("name-1").textContent = y;
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
    diceSelect.classList.remove("animated");
    diceSelect.classList.remove("bounceIn");
    document.querySelector(".alert-text").classList.add("d-none");
    document.querySelector(".player-score").classList.remove("animated");
    document.querySelector(".player-score").classList.remove("bounceIn");
    document.getElementById("name-" +activePlayer).classList.remove("animated","bounceIn");
    document.querySelector(".wrapper").style.display = "block";
    document.getElementById("bob").classList.remove("fireworks");
    document.getElementById("bob").classList.add("normal-bg");
    document.querySelector(".wrapper").classList.add("animated","zoomIn");
    document.querySelector(".winner-show").style.display = "none";
    document.querySelector(".winner-text").classList.add("d-none");
    document.querySelector(".btn-new").classList.add("d-none");
}
init();
function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    currentZeroSelect.textContent = '0';
    currentOneSelect.textContent = '0';
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";

}

document.querySelector(".btn-name").addEventListener("click",function () {
    x = window.prompt("What is Player One Name?");
    y = window.prompt("What is Player Two Name?");
    document.getElementById("name-0").textContent = x;
    document.getElementById("name-1").textContent = y;
});

document.querySelector(".btn-roll").addEventListener("click",function () {
    if(gamePlaying){
        let dice1 = Math.floor(Math.random() *6) + 1;
        let dice2 = Math.floor(Math.random() *6) + 1;
        document.getElementById("alert-box").classList.add("d-none");
        document.getElementById("dice-1").style.display = "block";
        document.getElementById("dice-2").style.display = "block";
        document.getElementById("dice-1").src = 'dice-'+ dice1 + ".png";
        document.getElementById("dice-2").src = 'dice-'+ dice2 + ".png";
        document.getElementById("dice-1").classList.add("animated","wobble");
        document.getElementById("dice-2").classList.add("animated","wobble");
        document.getElementById("alert-box").classList.add("d-none");
        document.querySelector(".wrapper").classList.remove("animated","bounceIn");

        if (dice1+dice2 === 12 && lastDice === 12 ){
            document.getElementById("alert-box").classList.remove("d-none");
            document.getElementById("alert-box").classList.add("animated","zoomIn");
            if (activePlayer === 0){
                document.querySelector(".alert-text").textContent = `နံပတ် ၆ နှစ်လုံး ၂ခါကျသော ကြောင့် အမှတ်အားလုံးဆုံးရှုံးသွားပါပီ,အခု ${y}အလှည့်ပါ`;
            }else {
                document.querySelector(".alert-text").textContent = `နံပတ် ၆ နှစ်လုံး ၂ခါကျသော ကြောင့် အမှတ်အားလုံးဆုံးရှုံးသွားပါပီ,အခု ${x}အလှည့်ပါ`;
            }
            score[activePlayer] = 0;
            document.getElementById("score-"+ activePlayer).textContent = '0';
            nextPlayer();
        }else if (dice1 !== 1 && dice2 !==1){
            roundScore += dice1 + dice2;
            document.querySelector("#current-" + activePlayer).textContent = roundScore ;
        }else {
            document.getElementById("alert-box").classList.remove("d-none");
            document.getElementById("alert-box").classList.add("animated","zoomIn");
            if (activePlayer === 0){
                document.querySelector(".alert-text").textContent = `သင်အံစာနံပတ် ၁ကျ သောကြောင့် ${y.toUpperCase()} အလှည့်ပါ`;
            }else {
                document.querySelector(".alert-text").textContent = `သင်အံစာနံပတ် ၁ကျ သောကြောင့် ${x.toUpperCase()} အလှည့်ပါ`;
            }
            nextPlayer();
        }
        lastDice = dice1+dice2;

    }
});

document.querySelector(".btn-hold").addEventListener("click",function () {
    if (gamePlaying){
        score[activePlayer] += roundScore;
        document.getElementById("alert-box").classList.remove("d-none");
        document.getElementById("alert-box").classList.remove("animated","zoomIn");
        document.getElementById("alert-box").classList.add("animated","zoomIn");
        document.querySelector("#score-"+ activePlayer).classList.toggle("animated");
        document.querySelector("#score-"+ activePlayer).classList.toggle("bounceIn");
        document.getElementById("score-"+ activePlayer).textContent = score[activePlayer];
        let input = document.getElementById("score-input").value;
        let winingScore;
        if (input){
            winingScore = input;
        }else {
            winingScore = 200;
        }

        if (score[activePlayer] >= winingScore){
            if (score[0] >= winingScore){
                document.querySelector(".winner-text").textContent = `${x.toUpperCase()} အနိုင်ရရှိပါသည်`;
            }else {
                document.querySelector(".winner-text").textContent = `${y.toUpperCase()} အနိုင်ရရှိပါသည်`;
            }
            document.getElementById("name-" +activePlayer).textContent = "Winner!";
            document.getElementById("name-" +activePlayer).classList.add("animated","bounceIn");
            document.querySelector(".player-" +activePlayer+"-panel").classList.add("winner");
            document.querySelector(".player-" +activePlayer+"-panel").classList.remove("active");
            document.getElementById("alert-box").classList.add("d-none");
            gamePlaying = false;
            document.getElementById("bob").classList.add("fireworks");
            document.querySelector(".winner-show").style.display = "block";
            document.querySelector(".winner-text").classList.add("animated","zoomIn");
            document.querySelector(".btn-new").classList.add("animated","zoomIn");
            document.querySelector(".winner-text").classList.remove("d-none");
            document.querySelector(".btn-new").classList.remove("d-none");
            document.querySelector(".wrapper").style.display = "none";
        }else {
            if (activePlayer === 0){
                document.querySelector(".alert-text").textContent = `${x.toUpperCase()} မှ ${roundScore} မှတ်သိမ်းလိုက်ပါပီ, ${y.toUpperCase()} အလှည့်ပါ`;
            }else {
                document.querySelector(".alert-text").textContent = `${y.toUpperCase()} မှ ${roundScore} မှတ်သိမ်းလိုက်ပါပီ, ${x.toUpperCase()} အလှည့်ပါ`;
            }
            nextPlayer();
        }
    }
});

document.querySelector("#btn-new").addEventListener('click',init);
document.querySelector("#winner-new").addEventListener('click',init);


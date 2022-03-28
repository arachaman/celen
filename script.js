let guntingPlayer = document.getElementsByClassName('gunting'),
    batuPlayer = document.getElementsByClassName('batu'),
    kertasPlayer = document.getElementsByClassName('kertas'),
    Com = document.getElementsByClassName('handCom'),
    vs = document.getElementById('vs'),
    playerWin = document.getElementById('playerWin'),
    comWin = document.getElementById('comWin'),
    draw = document.getElementById('draw'),
    refresh = document.getElementById('refresh')

guntingPlayer[0].addEventListener("click", function(e) {
    this.classList.add("click");
    let mySuit = new suit("gunting");
    });

batuPlayer[0].addEventListener("click", function() {
    this.classList.add("click");
    let index = Math.floor(Math.random() * 3);  
    Com[index].classList.add('click')
    
    });

kertasPlayer[0].addEventListener("click", function() {
    this.classList.add("click");
    let index = Math.floor(Math.random() * 3); 
    Com[index].classList.add('click') 
    
    });

refresh.addEventListener('click', function() {
    location.reload()
})

// function showEle(e) {
//     console.log(e)
//     e.classList.add('show')
//     e.classList.remove('hide')
// }

// function hideEle(e) {
//     console.log(e)
//     e.classList.add('hide')
//     e.classList.remove('show')
// }

// class suit {
//     constructor(pilihan) {
//       this.pilihan= pilihan;

  
//     }
//     play() {
//       let date = new Date();
//       return date.getFullYear() - this.year;
//     }
//   }
  
//   let mySuit = new suit("gunting");
//   let mySuit = new suit("batu");
//   let mySuit = new suit("kertas");

_defaultState = () => {
    this.resultContainer.classList.remove("draw");
    this.resultContainer.classList.remove("versus-result");
    this.resultText.innerHTML = "VS";
    this.resultContainer.appendChild(this.resultText);
  };

_winResult = () => {
    this.resultContainer.classList.remove("draw");
    this.resultContainer.classList.add("versus-result");
    this.resultText.innerHTML = "PLAYER WIN";
    this.resultContainer.appendChild(this.resultText);
    this.logger("Result : PLAYER Win, great ! :)");
  };

_loseResult = () => {
    this.resultContainer.classList.remove("draw");
    this.resultContainer.classList.add("versus-result");
    this.resultText.innerHTML = "COM WIN";
    this.resultContainer.appendChild(this.resultText);
    this.logger("Result : COM Win, YOU lose :(");
};

_drawResult = () => {
    this.resultContainer.classList.add("versus-result");
    this.resultContainer.classList.add("draw");
    this.resultText.innerHTML = "DRAW";
    this.resultContainer.appendChild(this.resultText);
    this.logger("Result : Draw, GG !");
};

decision = (userChoice, botChoice) => {
if (
    (userChoice === "batu" && botChoice === "batu") ||
    (userChoice === "kertas" && botChoice === "kertas") ||
    (userChoice === "gunting" && botChoice === "gunting")
) {
    return this._drawResult();
} else if (
    (userChoice === "batu" && botChoice === "gunting") ||
    (userChoice === "kertas" && botChoice === "batu") ||
    (userChoice === "gunting" && botChoice === "kertas")
) {
    return this._winResult();
} else if (
    (userChoice === "batu" && botChoice === "kertas") ||
    (userChoice === "kertas" && botChoice === "gunting") ||
    (userChoice === "gunting" && botChoice === "batu")
) {
    return this._loseResult();
}
};


var app = {
    init: function () {
        this.audio = document.createElement("audio")
        this.audio.setAttribute('src', 'sounds/splashS.mp3');
        this.audios = document.createElement("audio")
        this.audios.setAttribute('src', 'sounds/sound.mp3');
        this.gamestart = false;
        this.bloonArray = [];
        this.bindEvents();
        this.score = score.innerText = 0;
        this.chance = chancesspan.innerText = 5;

    },

    bindEvents: function () {
        startbtn.onclick = () => {

            images_container_game_screen.classList.add("hide");
            game_screen.classList.remove("hide");
            game_over.classList.add("hide");
            this.audio.play();
            this.gamestart = true;


        }
        this.startkey = setInterval(() => {


            if (this.gamestart) {

                var bloon = document.createElement("img")
                bloon.setAttribute("src", "images/baloon-" + (Math.floor(Math.random() * 3)) + ".png");
                bloon.setAttribute("class", "bloonset");
                bloon.style.top = '600px';
                bloon.style.left = Math.random() * (appcontaine.offsetWidth - 100) + 'px';
                bloon.onclick = () => {

                    if (!this.gamestart) {
                        return;
                    }

                    bloon.remove();
                    var star = document.createElement("img")
                    star.setAttribute("src", "images/star.png");
                    star.setAttribute("class", "explosion");
                    game_screen.appendChild(star);
                    star.style.top = bloon.style.top;
                    star.style.left = bloon.style.left;

                    bloon.remove();

                    setTimeout(() => {
                        star.remove();
                    }, 100)



                    this.audios.currentTime = 0;
                    this.audios.play();
                    clearInterval(keymovebloon);
                    this.score += 10;
                    document.getElementById("score").innerHTML = this.score;





                }

                game_screen.appendChild(bloon);

                let keymovebloon = setInterval(() => {
                    //  console.log( (parseFloat(bloon.style.top))-1);

                    var bloonmove = (parseFloat(bloon.style.top)) - 1;
                    bloon.style.top = bloonmove + 'px';


                    if ((bloonmove + bloon.offsetHeight) < 0) {
                        this.chance -= 1;
                        chancesspan.innerHTML = this.chance;
                        bloon.remove();
                        clearInterval(keymovebloon);

                    }
                    if (this.chance == 0) {
                        this.gameOver();
                    }


                }, 10)
                this.bloonArray.push(keymovebloon);
            }
        }, 1000 + Math.random() * 2000)





    },



    gameOver: function () {

        this.audio.pause();
        this.gamestart = false;
        this.bloonArray.forEach(element => {
            clearInterval(element);

        });


        clearInterval(this.startkey);

        images_container_game_screen.classList.add("hide");
        game_screen.classList.remove("hide");
        game_over.classList.remove("hide");
    }


}
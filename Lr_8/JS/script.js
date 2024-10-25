const resBtn = document.getElementById("spin");
const playerRes = document.getElementById("playerRes");
const cpuRes = document.getElementById("cpuRes");
const verdict = document.getElementById("verdict");
const overlay = document.getElementById("overlay");
const playerName = document.getElementById("playerName");
let totalDone = 0;
let hitPoints = [3,3];
let overSrc;



while(true){
    const nameTemp = prompt("Введіть ваше ім'я. Від 1 до 12 символів");
    if(nameTemp.trim() !== "" && nameTemp.length <= 12){
        playerName.textContent = nameTemp;
        break;
    }
}

function slotSpin(slots, whoRes, completionCheck){
    let result = 0;
    let delay = 0;
    let totalSpins = 0;

    slots.forEach((slot) => {
        let spinCount = 0;
        const spinInterval = setInterval(() => {
            slot.textContent = Math.floor(Math.random() * 10);
            spinCount++;

            if (spinCount >= 20 + delay) {
                clearInterval(spinInterval);
                const finalNumber = Math.floor(Math.random() * 10);
                slot.textContent = finalNumber;

                slot.classList.add('shake');
                setTimeout(() => {
                    slot.classList.remove('shake');
                }, 300);

                result += finalNumber;
                whoRes.textContent = result;
                delay+=5; 

                totalSpins++;
                if (totalSpins === slots.length){
                    completionCheck();
                }
            }
        }, 70);
    });
}

function whenDone(){
    totalDone++;
    if(totalDone === 2){
        resBtn.disabled = false;
        let player = parseInt(playerRes.textContent);
        let CPU = parseInt(cpuRes.textContent);
        if (player - CPU > 0){
            verdict.textContent = "За гравцем";
            const cpuHearts = Array.from(document.querySelectorAll("#cpuHeart img[src='../IMG/Heart.png']"))
            const cpuLastHeart = cpuHearts.pop();
            cpuLastHeart.src = "../IMG/Empty_Heart.png";
            hitPoints[1]--;
        } else if (player - CPU < 0) {
            verdict.textContent = "Очко комп'ютеру";
            const playerHeart = Array.from(document.querySelectorAll("#playerHeart img[src='../IMG/Heart.png']"))
            const playerLastHeart = playerHeart.pop();
            playerLastHeart.src = "../IMG/Empty_Heart.png";
            hitPoints[0]--;
        } else {
            verdict.textContent = "Нічия";
        }

        if (hitPoints[0] === 0) {
            //alert("Game Over! CPU Wins!");
            overSrc = "../IMG/LScreen.png";
            showOverlay(overSrc);
        } else if (hitPoints[1] === 0) {
            //alert("Game Over! Player Wins!");
            overSrc = "../IMG/WScreen.png";
            showOverlay(overSrc);
        }
    }
}

function showOverlay(overSrc) {
    document.getElementById("overImg").src = overSrc;
    overlay.style.display = "flex";
}

overlay.addEventListener('click', () => {
    hitPoints[0] = 3;
    hitPoints[1] = 3;

    const playerHeartContainer = document.querySelectorAll("#playerHeart img");
    playerHeartContainer.forEach(heart => {
        heart.src = "../IMG/Heart.png";
    });

    const cpuHeartContainer = document.querySelectorAll("#cpuHeart img");
    cpuHeartContainer.forEach(heart => {
        heart.src = "../IMG/Heart.png"; 
    });

    const allSlots = document.querySelectorAll(".slot");
    allSlots.forEach(slot => {
        slot.textContent = 0;
    });

    playerRes.textContent = "Player result";
    cpuRes.textContent = "CPU result";
    verdict.textContent = "Результат...";
    overlay.style.display = "none";
});

resBtn.addEventListener('click', function() {
    resBtn.disabled = true;
    totalDone = 0;

    const slots1 = Array.from(document.querySelectorAll('.stat_container:nth-child(1) .slot'));
    const slots2 = Array.from(document.querySelectorAll('.stat_container:nth-child(3) .slot'));

    slotSpin(slots1, playerRes, whenDone);
    slotSpin(slots2, cpuRes, whenDone);
});
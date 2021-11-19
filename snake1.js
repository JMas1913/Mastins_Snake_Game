const keyboardEvent = (ev) => {
    switch (ev.key) {
    case "ArrowUp":
        console.log("snake moves up"); //tester
        break;
    case "ArrowDown":
        console.log("snake moves down"); //tester
        break;
    case "ArrowLeft":
        console.log("snake moves left"); //tester
        break;
    case "ArrowRight":
        console.log("snake moves right"); //tester
        break;      
    default:
        console.log("wrong key"); //tester
        break;        
    }
    
}
document.addEventListener('keydown', keyboardEvent);


replay => {
    grid.innerHTML = "";
    createBoard();
    startGame();
    popup.style.display = "none";
}  
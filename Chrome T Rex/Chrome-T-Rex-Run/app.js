document.addEventListener('DOMContentLoaded', () =>{
    const dino = document.querySelector('.dino')
    const grid = document.querySelector('.grid')
    const alert = document.getElementById('alert')
    let isJumping = false
    let gravity = 0.9
    let isGameOver =false
    function control(e){
        if(e.keyCode === 32){
            if(!isJumping){
                isJumping=true
                jump()
            }
            
        }
    }
    document.addEventListener('keyup',control)

    let position=0
    function jump(){
        let count =0
        let timerId = setInterval(function(){

            if(count===15){
                clearInterval(timerId)
                let downTimerId = setInterval(function(){
                    if(count===0){
                        clearInterval(downTimerId)
                        isJumping=false
                    }
                    position-=5
                    count--
                    position=position*gravity
                    dino.style.bottom=position+ 'px'
                },20)
                
            }
            position+=30
            count++
            position=position*gravity
            dino.style.bottom=position+'px'
        },20)
    }

    function generateObstracle(){
        let randomTime = Math.random()*4000
        let obstraclePosition =1000
        const obstracle = document.createElement('div')
        if(!isGameOver) obstracle.classList.add('obstracle')
        grid.appendChild(obstracle)
        obstracle.style.left=obstraclePosition + 'px'

        let timerId=setInterval(function() {
            if(obstraclePosition>0 && obstraclePosition < 60 && position <60){
                clearInterval(timerId)
                alert.innerHTML ='Game Over'
                isGameOver=true
                while(grid.firstChild){
                    grid.removeChild(grid.lastChild)
                }
            }
            obstraclePosition-=10
            obstracle.style.left=obstraclePosition+'px'
            
        },20)
        if(!isGameOver) setTimeout(generateObstracle,randomTime)
    }
    generateObstracle()
})
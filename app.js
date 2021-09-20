const city = document.querySelector('.place')
const show = document.querySelector('.Show')
let temper = document.querySelector('.temperature')
let feel = document.querySelector('.feels')
let pre = document.querySelector('.pressure')
let City = document.querySelector('.City')
let locate = document.querySelector('.location')

let textShow = "Here is the weather report of ";

function animate(){

    textShow += city.value

    anime_city = textShow.split("")
    for(let i=0; i< anime_city.length; i++)
    {
        City.innerHTML += "<span>"+anime_city[i]+"</span>"
    }

        //console.log(City)

    let char =0;
    let timer = setInterval(ontick, 50);

    function ontick() {
        const span = City.querySelectorAll('span')[char]
        span.classList.add('fade')
        char++;
        if(char === anime_city.length){
                //complete
            clearInterval(timer);
            timer=null;
            return;
        }       
    }
}

function assign(data){

    console.log(data)

    const {feels_like, pressure, temp} = data.main
        
    temper.textContent = "Temperature : "  + (temp) +" C"
    feel.textContent =  "Feels Like : " + (feels_like) +" C"
    pre.textContent =  "Pressure : " + pressure + " mb"
    console.log(feels_like, pressure, temp)

}

show.addEventListener('click', ()=>{

    animate()

    fetch("https://api.openweathermap.org/data/2.5/weather?q="+city.value+"&appid=df1fc24f8c46979b57132607828583aa&units=metric")
    .then(response => {
        return response.json()
    }).then(data =>{

        assign(data)

    }).catch(err => {
        console.log(err);
    })

})


locate.addEventListener('click', ()=>{

    
    let lat;
    let long;  

    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition( position =>{

            lat  = position.coords.latitude
            long = position.coords.longitude


            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=df1fc24f8c46979b57132607828583aa&units=metric`)
            .then(response => {
                return response.json()
            }).then(data =>{
                
                assign(data);
                city.value = data.name                
                animate();

            }).catch(err => {
                console.log(err);
            })
            
        })
    }
})
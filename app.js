const range = document.querySelector('.range');
const hexColor = document.querySelector('.hexcolor');

let number_tones = 20;
let color = '#fff'

const symboles = ['~','`','!','@','#','$','%','^','&','*','(',')','_','+','-','=',']','[','}','{',"'",';','"',':','.',',','>','<','/','?','}',']','|']

range.addEventListener('input',() => {
    
    number_tones = parseInt(range.value*40/100)
    console.log(range.value , number_tones)
})

hexColor.addEventListener('input' , () => {
    let text = hexColor.value;
    let check = false;

    symboles.forEach(item => {
        if(text.includes(item)){
            check = true;
        }
    })
    
    console.log(check)
    
    if((text.trim().length === 3 || text.trim().length === 6) && check === false){
        color = '#' +  text.trim();
        console.log(color)
    }
})

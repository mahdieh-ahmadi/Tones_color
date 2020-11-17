const range = document.querySelector('.range');
const hexColor = document.querySelector('.hexcolor');

const blockes = document.querySelector('.Tones').children;

console.log(blockes)

let number_tones = 20;
let color = 'fff'

const symboles = ['~','`','!','@','#','$','%','^','&','*','(',')','_','+','-','=',']','[','}','{',"'",';','"',':','.',',','>','<','/','?','}',']','|']

const update = (color , range) => {
    let newcolor = parseInt(color,16);
    let step = parseInt(newcolor/number_tones)
    let colors = newcolor

    for(let i = 0 ; i < range ; i++){
        blockes[i].style.backgroundColor = '#' + colors.toString(16)
        colors = colors - step
    }
    for(let i = range ; i<40 ; i++){
        blockes[i].style.backgroundColor = '#fff'
    }
}

range.addEventListener('input',() => {
    
    number_tones = parseInt(range.value*40/100)
    update(color,number_tones)
})

hexColor.addEventListener('input' , () => {
    let text = hexColor.value;
    let check = false
    symboles.forEach(item => {
        if(text.includes(item)){
            check = true;
        }
    })
    
    if((text.trim().length === 3 || text.trim().length === 6) && check === false){
        color =   text.trim();

        update(color,number_tones)
    }
})



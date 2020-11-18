/////////////////////// elements /////////////////////
const range = document.querySelector('.range');
const hexColor = document.querySelector('.hexcolor');
const hexcode = document.querySelector('.hexcode')
const rgbcode = document.querySelector('.rgbcode')
const cmykcode = document.querySelector('.cmykcode')

const blockes = document.querySelector('.Tones').children;

///////////////////// global variabe //////////////////
let number_tones = 20;
let color = 'ffffff'

const symboles = ['~','`','!','@','#','$','%','^','&','*','(',')','_','+','-','=',']','[','}','{',"'",';','"',':','.',',','>','<','/','?','}',']','|']

///////////////// rgb to cmyk ///////////////////////
const rgb2cmyk = (r,g,b) => {
    var computedC = 0;
    var computedM = 0;
    var computedY = 0;
    var computedK = 0;

    var r = parseInt( (''+r).replace(/\s/g,''),10 ); 
    var g = parseInt( (''+g).replace(/\s/g,''),10 ); 
    var b = parseInt( (''+b).replace(/\s/g,''),10 ); 

    if (r==0 && g==0 && b==0) {
        computedK = 1;
        return [0,0,0,1];
       }
      
       computedC = 1 - (r/255);
       computedM = 1 - (g/255);
       computedY = 1 - (b/255);
      
       var minCMY = Math.min(computedC,
                    Math.min(computedM,computedY));
       computedC = (computedC - minCMY) / (1 - minCMY) ;
       computedM = (computedM - minCMY) / (1 - minCMY) ;
       computedY = (computedY - minCMY) / (1 - minCMY) ;
       computedK = minCMY;
      
       return [computedC,computedM,computedY,computedK];
}

/////////////////hex to hsl ////////////////////////
const hex2hsl = (r,g,b) => {
    r /= 255;
    g /= 255;
    b /= 255;

    let cmin = Math.min(r,g,b)
    let cmax = Math.max(r,g,b)
    let delta = cmax - cmin

    if(delta == 0){
        h=0;
    }else if(cmax == r){
        h=((g-b)/delta)%6
    }else if(cmax == g){
        h = (b-r)/delta + 2
    }else{
        h = (r-g)/delta+4
    }

    h = Math.round(h*60)
    if(h<0){
        h += 360
    }

    l = (cmax+cmin)/2
    s = delta == 0? 0:delta/(1-Math.abs(2*l-1))

    s = +(s*100).toFixed(1)
    l = +(l*100).toFixed(1)

    return [h,s,l]
}



//////////////////// update blocks ///////////////////////
const update = (color , range) => {

    let r = parseInt((color[0]+color[1]),16)
    let g = parseInt((color[2]+color[3]),16)
    let b = parseInt((color[4]+color[5]),16)
    
    let hslcolor = hex2hsl(r,g,b);
    let h = hslcolor[0];
    let s = hslcolor[1];
    let l = hslcolor[2];
    let step = Math.round(l/number_tones)

    for(let i = 0 ; i < range ; i++){
         blockes[i].style.backgroundColor = `hsl(${h},${s}%,${l}%)` 
         l = l-step
    }
    for(let i = range ; i<40 ; i++){
        blockes[i].style.backgroundColor = '#fff'
    }
}

//////////////////// change range //////////////////////////
range.addEventListener('input',() => {
    
    number_tones = parseInt(range.value*40/100)
    update(color,number_tones)
})

////////////////// change color //////////////////////////
hexColor.addEventListener('input' , (event) => {
    let text = hexColor.value;
    let check = false
    
    for(let i = 0 ; i < hexColor.value.length ; i++){
        if(symboles.indexOf(hexColor.value[i]) > 0 ||  isNaN(parseInt(hexColor.value[i],16)) ){
            check = true
        }
    }

    if((text.trim().length === 3 || text.trim().length === 6) && check === false){
        if(text.trim().length === 3){
            color = text.trim()[0]+text.trim()[0]+text.trim()[1]+text.trim()[1]+text.trim()[2]+text.trim()[2]
        }else{
            color =   text.trim();
        }
        
        hexcode.innerHTML = '#' + color
        rgbcode.innerHTML = `rgb(${parseInt((color[0]+color[1]),16)},${parseInt((color[2]+color[3]),16)},${parseInt((color[4]+color[5]),16)})`
        
        let cmyk = rgb2cmyk(parseInt((color[0]+color[1]),16),parseInt((color[2]+color[3]),16),parseInt((color[4]+color[5]),16))
        cmykcode.innerHTML = `cmyk(${Math.round(cmyk[0]*100)}%,${Math.round(cmyk[1]*100)}%,${Math.round(cmyk[2]*100)}%,${Math.round(cmyk[3]*100)}%)`
        update(color,number_tones)
    }
})


update(color,number_tones)



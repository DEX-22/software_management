function getRandomNumber(min = 1,max = 10){
    return Math.floor(Math.random() * (max - min) + min)
}


export default function createCod8Digits(){

    const digits = Array(4).fill(0).map((e,i)=>getRandomNumber())

    return digits.join('')
}

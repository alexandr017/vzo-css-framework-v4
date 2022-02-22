let getCurrentDate = () => {
    let Data = new Date();
    let year = Data.getFullYear();
    let Month = Data.getMonth();
    let month = Month < 10 ? '0' + (Month + 1) : Month + 1;
    let day = Data.getDate();
    return [day, month, year];
}

let wordDeclension = (val, el) => {
    val = Math.abs(val) % 100;
    let sumVal = val % 10;
    if(val > 10 && val < 20){
        return el[2];
    }
    if(sumVal > 1 && sumVal < 5){
        return el[1];
    }
    if(sumVal === 1){
        return el[0];
    }
    return el[2];
}

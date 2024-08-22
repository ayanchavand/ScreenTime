export const toHour = (sec) =>{
    return String(Math.floor(sec / 3600)).padStart(2, '0')
}
export const toMin = (sec) => {
    return String(Math.floor((sec % 3600) / 60)).padStart(2, '0')
}

export const toSec = (sec) => {
    return String(sec % 60).padStart(2, '0')
}
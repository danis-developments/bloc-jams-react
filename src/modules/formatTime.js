function formatTime(time){
  console.log(time);
  if( (typeof parseInt(time)) !== 'number' || time < 0){
    console.log(typeof time);
    console.log(time);
    return "-:--"
  }
  const minutes = Math.round(parseInt(time)/60);
  const seconds = Math.round(parseInt(time)) % 60;
  return `${minutes}:${String(seconds).length === 2 ? seconds : "0" + seconds}`;
}

export default formatTime;
// Base 64 UFT-8 friendly.
// Taken from https://developer.mozilla.org/es/docs/Web/API/WindowBase64/Base64_codificando_y_decodificando
function utf8_to_b64( str ) {
  return window.btoa(unescape(encodeURIComponent( str )));
}

function b64_to_utf8( str ) {
  return decodeURIComponent(escape(window.atob( str )));
}

Stats = {
  stats: function(x){
    const mean = x.reduce((sum, value) => sum + value) /x.length;

    let variance = 0;
    x.forEach(function(x){
      variance += (x-mean)**2;
    });

    variance /= x.length;

    return {mean: mean, variance: variance};
  }
}

function printCSV(x){
  const d = Config.CSVDelim;
  let l = x.curso+d+x.materia+d+x.cuatri+d+x.timestamp;
  Object.keys(x.questions).forEach(i => (!isNaN(Number(i)) && (l+=d+x.questions[i])));
  l += d+utf8_to_b64(x.questions["comments"]);
  return l;
}

let mostraNaTela = document.getElementById("demo");
let inputLatitude = document.getElementById("input-latitude");
let inputLongitude = document.getElementById("input-longitude");
let cidade = document.getElementById("cidade");
let temperatura = document.getElementById("temperatura");
let descricaoDoTempo = document.getElementById("descricao-do-tempo");
const APIKey = "80236209f081d58b139302ec1dd002f2";
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    mostraNaTela.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
    inputLatitude.value = position.coords.latitude;
    inputLongitude.value = position.coords.longitude;
    enviarLocalizacao();
}

function enviarLocalizacao() {
  const latitude = String(inputLatitude.value);
  const longitude = String(inputLongitude.value);
  const promise = axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKey}&lang=pt_br `);

  promise.then(exibirClimaNaTela);
  promise.catch(deuRuim);
}

function exibirClimaNaTela(dados) {
  cidade.innerHTML = dados.data.name;
  const temperaturaEmCelsius = kelvinParaCelsius(dados.data.main.temp)
  temperatura.innerHTML = `${temperaturaEmCelsius} Cº`;
  descricaoDoTempo.innerHTML = dados.data.weather[0].description;
}
function deuRuim(dados) {
  console.log(dados);
}

function kelvinParaCelsius(kevin) {
  const celsius = Math.ceil(kevin - 273);
  return celsius;
}
getLocation();
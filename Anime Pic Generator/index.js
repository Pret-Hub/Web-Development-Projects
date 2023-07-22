const btnEl= document.getElementById("btn");
const animecontainerEl = document.querySelector(".anime-container");
const animeImgEl = document.querySelector(".anime-img");
const animeNameEl = document.querySelector(".anime-name");

btnEl.addEventListener("click", async function(){

  try {
  btnEl.disabled = true;
  btnEl.innerText = "Loading...";
  animeNameEl.innerText = "Updating...";
  animeImgEl.src = "loading.svg";
  const response = await fetch("https://api.catboys.com/img");
  const data = await response.json();
  btnEl.disabled = false;
  btnEl.innerText = "Generate Pic";
  animecontainerEl.style.display = "block";
  animeImgEl.src = data.url;
  animeNameEl.innerText = data.artist;
} 

catch (error) {
  console.log(error);
  btnEl.disabled = false;
  btnEl.innerText = "Generate Pic";
  animeNameEl.innertext = "An error occurred, Please Try Again !!!"
}
})
const btnEl = document.getElementById("btn")
const ErrorEl = document.getElementById("errorMessage")
const galleryEl = document.getElementById("gallery")

async function fetchImage(){

  const inputValue = document.getElementById("input").value

  if(inputValue > 10 || inputValue < 1) {
    ErrorEl.style.display = "block";
    ErrorEl.innerText = "Number should be between 0 and 11";
    return
  }

  imgs = "";

  try { 

    btnEl.style.display = "none";
    const loading = `<img src="spinner.svg"/>`

    galleryEl.innerHTML = loading;

    await fetch(`https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(Math.random() * 1000)}&client_id=5JAS7ig51ZMBBgne6nuyNHNSpIBBhpTH45tignCZUQ0`).then(res => res.json().then(data => {
    if(data){
      data.forEach(pic => {

        imgs += `<img src=${pic.urls.small} alt="not found"/>`;

        galleryEl.style.display = "block";
        galleryEl.innerHTML = imgs;
        btnEl.style.display = "block";
        ErrorEl.style.display = "none";
      });
    }
    })
  );
  }
  catch (error) {
    ErrorEl.style.display = "block";
    ErrorEl.innerText = "Server issue...Try again !!!";
    btnEl.style.display = "block";
    galleryEl.style.display = "none";
  }

}

btnEl.addEventListener("click", fetchImage)
const Btn = document.querySelector(".btn")
const Input = document.getElementById("input")
const copyIcon = document.querySelector(".fa-copy")
const alertContainer = document.querySelector(".alert-container")

//on clicking the generate button, the createPassword func() will run
Btn.addEventListener("click", () => {
  createPassword();
});

//on clicking the copy button, the copyPassword func() will run
copyIcon.addEventListener("click", ()=>{
  copyPassword();

  if(Input.value)             //only when Input has some value, the pop-up will come
  {
  alertContainer.classList.remove("active")

  //doing this to again remove the copied pop-up, after showing for sometime
  setTimeout(()=>{
    alertContainer.classList.add("active")
  }, 2000);
}
});

function createPassword(){

  //list of all characters
  const chars = "0123456789abcdefghijklmnopqrstuvwxtz!@#$%^&*()_+?:{}[]ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  
  const passwordLength = 14

 //setting default value empty
  let password = ""

  //loop from 0 to max length set i.e. 14
  for (let index = 0; index < passwordLength; index++) {
    
/*Math.random() used with Math.floor() can be used to return random integers. Like:- Returns a random integer from 0 to 100:
                            Math.floor(Math.random() * 101);*/
    const randomNo = Math.floor(Math.random() * chars.length)
//The substring() method extracts characters, between two indices (positions), from a string, and returns the substring.
    password += chars.substring(randomNo, randomNo + 1)
   
  }
  Input.value = password;

  alertContainer.innerText = password + " copied!"
}


function copyPassword(){
  Input.select();             //selects all the text in a <textarea>, enough for pc

  //**IMP
  Input.setSelectionRange(0, 9999);   //default code for selecting while in mobile

  //copying to clipboard
  navigator.clipboard.writeText(Input.value)

}
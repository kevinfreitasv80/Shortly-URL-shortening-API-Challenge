const bars = document.getElementById("bars");
const form = document.getElementById("form");
const input = document.getElementById("input");
const empty = document.getElementById("empty");
const link = "https://api.shrtco.de/v2/shorten?url=";
const familyDiv = document.getElementsByClassName("familyDiv")[0];
const articleResponsive = document.getElementById("articleResponsive");

function append(mom, ...childs) {
  childs.forEach(child => {
    mom.appendChild(child);
  });
}

// Verifica se há um link encurtado armazenado no localStorage
var shortLink = localStorage.getItem("shortLink");
var textClient = localStorage.getItem("textClient");
if (shortLink) {
  // Se existir, exibe-o na div
  const div = document.createElement("div");
  const article = document.createElement("article");
  const linkInputUser = document.createElement("p");
  const linkShorten = document.createElement("a");
  const buttonCopy = document.createElement("button");

  linkInputUser.textContent = textClient;
  linkShorten.textContent = shortLink;
  linkShorten.href = shortLink;
  linkShorten.target = "_blank";
  linkShorten.classList.add("links");
  buttonCopy.textContent = "Copy";
  buttonCopy.classList.add("copy");

  append(article, linkShorten, buttonCopy);
  append(div, linkInputUser, article);
  append(familyDiv, div);

  function CopyText() {
    const linkToCopy = linkShorten.href;
    navigator.clipboard.writeText(linkToCopy)
      .then(() => {
        buttonCopy.textContent = "Copied!";
        buttonCopy.style.background = "#3A3053";
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  }

  buttonCopy.addEventListener("click", CopyText);
}

/* Shorten link */
async function short(val) {
    const url = link + val;
    const r = await fetch(url);
    const data = await r.json();
    console.log(data);
    
    const div = document.createElement("div");
    const article = document.createElement("article");
    const linkInputUser = document.createElement("p");
    const linkShorten = document.createElement("a");
    const buttonCopy = document.createElement("button");
    
    linkInputUser.textContent = val;
    linkShorten.textContent = data.result.short_link;
    linkShorten.href = data.result.full_short_link;
    linkShorten.target = "_blank";
    linkShorten.classList.add("links");
    buttonCopy.textContent = "Copy";
    buttonCopy.classList.add("copy");
    
    append(article, linkShorten, buttonCopy);
    append(div, linkInputUser, article);
    append(familyDiv, div);
    
    function CopyText() {
      const linkToCopy = linkShorten.href;
      navigator.clipboard.writeText(linkToCopy)
        .then(() => {
          buttonCopy.textContent = "Copied!";
          buttonCopy.style.background = "#3A3053";
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    }
  
    buttonCopy.addEventListener("click", CopyText);
  
    // Armazena o link encurtado no localStorage
    localStorage.setItem("shortLink", data.result.full_short_link);
    localStorage.setItem("textClient", val);
}

/* submit form */
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const val = input.value;
  if (!(val)) {
    input.style.border = "2px solid red";
    empty.style.display = "block";
    empty.textContent = "Please add a link";
    return false;
  } else {
    input.style.border = "";
    empty.style.display = "";
    empty.textContent = "";
    short(val);
    return true;
  }
});

/* Open or closed the responsive bar */
let OC = false;
window.addEventListener("resize", function() {
  if (window.innerWidth > 700) {
    articleResponsive.style.display = "none";
    OC = false;
  }
});

bars.addEventListener("click", function() {
  if (OC) {
    articleResponsive.style.display = "none";
    this.style.transform = "rotate(0deg)";
    OC = false;
  } else {
    articleResponsive.style.display = "block";
    this.style.transform = "rotate(180deg)";
    OC = true;
  }
});
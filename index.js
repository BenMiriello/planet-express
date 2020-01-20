// URL's
const planetsUrl = `http://localhost:3000/planets`
// DOM selector
const planetsCollection = document.querySelector('#planet-collection')
const body = document.querySelector('body')


// First fetch, to display all planets in there respective boxes
fetch(planetsUrl)
.then(r => r.json())
.then(planetsArray => planetsArray.forEach((planetObj) => {
    turnEachPlanetsToHTML(planetObj)
}))

// creating planet boxes elements
function turnEachPlanetsToHTML(planetObj){
    let div = document.createElement('div')
    div.className = "planet-box"

    let img = document.createElement('img')
    img.className = "planet-image"
    img.src = planetObj.image
    img.alt = "mars"
    
    let p = document.createElement('p')
    p.innerText = planetObj.name

    div.append(img, p)

    planetsCollection.append(div)

    createModalBox(planetObj, div)

}

// modal box creation
function createModalBox(planetObj, div){

     let modalDiv = document.createElement('div')
     modalDiv.id = "myModal"
     modalDiv.className = "modal"
 
     let modalContent = document.createElement('div')
     modalContent.className = "modal-content"
 
     let spanModal = document.createElement('span')
     spanModal.className = "close"
     spanModal.innerText = "x"
 
     let pModal = document.createElement('p')
     pModal.innerText = planetObj.name
 
     modalContent.append(spanModal, pModal)
 
     modalDiv.append(modalContent)
 
     body.appendChild(modalDiv)
 
     // link for modal box example
     // https://www.w3schools.com/howto/howto_css_modals.asp
     div.onclick = function() {
         modalDiv.style.display = "block";
       }
 
     spanModal.onclick = function() {
     modalDiv.style.display = "none";
     }
 
     window.onclick = function(event) {
         if (event.target == modalDiv) {
           modalDiv.style.display = "none";
         }
       }

}
// URL's
const planetsUrl = `http://localhost:3000/planets`
// DOM selector
const planetsCollection = document.querySelector('#planet-collection')
const body = document.querySelector('body')
const planetDivsArray = []
let planetsArray = []

// First fetch, to display all planets in there respective boxes
fetch(planetsUrl)
.then(r => r.json())
.then(planets => {
planets.forEach((planetObj) => {
  planetsArray.push(planetObj)
    turnEachPlanetsToHTML(planetObj)
  })
createBuyModalBox(planetsArray)
})

function turnEachPlanetsToHTML(planetObj){
    let div = document.createElement('div')
    div.className = "planet-box"
    div.dataset.id = `d${planetObj.id}`

    let img = document.createElement('img')
    img.className = "planet-image"
    img.src = planetObj.image
    img.alt = planetObj.name
    img.dataset.id = `i${planetObj.id}`
    
    let p = document.createElement('p')
    p.innerText = planetObj.name
    p.dataset.id = `p${planetObj.id}`

    div.append(img, p)


    planetsCollection.append(div)
    planetDivsArray.push(div)
}

// modal box creation
function createBuyModalBox(planetsArray){
  let divPlanetBoxes = document.querySelectorAll('.planet-box')
  
  // modalDiv is the entire box
  let modalDiv = document.createElement('div')
  modalDiv.id = "buyModal"
  modalDiv.className = "modal"

  //  content inside the box
  let modalContent = document.createElement('div')
  modalContent.className = "modal-content"  

  // creation of the close button of the box
  let spanModal = document.createElement('span')
  spanModal.className = "close"
  spanModal.innerText = "x"

  let originDropDown = document.createElement('select')
  originDropDown.className = "dropDown"
  originDropDown.id = "origin-drop-down"

  let destinationDropDown = document.createElement('select')
  destinationDropDown.className = "dropDown"
  destinationDropDown.id = "destination-drop-down"

  planetsArray.forEach((planet) => 
  {
    let originOption = document.createElement('option')
      originOption.value = planet.id
      originOption.innerText = planet.name
      originDropDown.append(originOption)
    let destinationOption = document.createElement('option')
      destinationOption.value = planet.id
      destinationOption.innerText = planet.name
      destinationDropDown.append(destinationOption)
  })

  //  append closing button to the modal content
  modalContent.append(spanModal, originDropDown, destinationDropDown)

  //  append modal content to the entire box
  modalDiv.append(modalContent)

  //  append to the body of the html page
  body.appendChild(modalDiv)

  spanModal.onclick = function() {
  modalDiv.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modalDiv) {
      modalDiv.style.display = "none";
    }
  }
  
  divPlanetBoxes.forEach(div => {
    div.addEventListener("click", (e) => {
      // debugger
      let spanModal = document.querySelector("#buyModal")
      spanModal.style.display = "block"
      let destinationDropDown = document.querySelector("#destination-drop-down")
      destinationDropDown.value = e.target.dataset.id[1]
    })
  })
}

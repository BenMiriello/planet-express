// URL's
const planetsUrl = `http://localhost:3000/planets`
// DOM selector
const planetsCollection = document.querySelector('#planet-collection')
const body = document.querySelector('body')

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
// console.log(planetsArray)
// creating planet boxes elements
function turnEachPlanetsToHTML(planetObj){
    let div = document.createElement('div')
    div.className = "planet-box"

    let img = document.createElement('img')
    img.className = "planet-image"
    img.src = planetObj.image
    img.alt = planetObj.name
    
    let p = document.createElement('p')
    p.innerText = planetObj.name

    div.append(img, p)

    planetsCollection.append(div)

    // showBuyModal(div)

}

// function showBuyModal(div){

//   // let modalDiv = document.querySelector('.modal')
//   // let spanModal = document.querySelector('.close')
//   // console.log(spanModal)


// }


// modal box creation
function createBuyModalBox(planetsArray){

  let divPlanetBoxes = document.querySelectorAll('.planet-box')
  console.log(divPlanetBoxes)
  
  // modalDiv is the entire box
    let modalDiv = document.createElement('div')
    modalDiv.id = "myModal"
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

    // append drop down option to the dropdown list
    // originDropDown.append(optionDropDown)

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

  // tell each planet box to render buymodal on click
  divPlanetBoxes.forEach((box) => {
    let clickedPlanetName = box.innerText
    destinationDropDown
    box.onclick = function(clickedPlanetName, destinationDropDown) {
      console.log(destinationDropDown)
      debugger
      destinationDropDown.value = clickedPlanetName
      modalDiv.style.display = "block";
    }
  })

}




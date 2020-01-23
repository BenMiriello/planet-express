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

// function renderOriginDestinationDropDowns

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

  let containOriginDestinationDiv = document.createElement('div')
  containOriginDestinationDiv.className = "origin-destination-options"

  let fromToDiv = document.createElement('div')
  fromToDiv.className = "from-to-text"
  
  let originPTag = document.createElement('p')
  originPTag.className = "origin-p-tag"
  originPTag.innerText = "From: "
  
  let destinationPTag = document.createElement('p')
  destinationPTag.className = "destination-p-tag"
  destinationPTag.innerText = "To: "
  
  let originDestinationDropDiv = document.createElement('div')
  originDestinationDropDiv.className = "origin-destination-drop-div"

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
    originOption.className = "origin-option"
    originOption.innerText = planet.name
    originDropDown.append(originOption)
    let destinationOption = document.createElement('option')
    destinationOption.value = planet.id
    destinationOption.className = "destination-option"
    destinationOption.innerText = planet.name
    destinationDropDown.append(destinationOption)
  })
  
  // create flights dropdown
  let flightsDropDown = document.createElement('select')
  flightsDropDown.className = "dropDown"
  flightsDropDown.id = "flights-drop-down"
  
  let buyButton = document.createElement('button')
  buyButton.className = "buy-button"
  buyButton.type = "submit"
  buyButton.innerText = "Purchase Ticket"
  
  // create tickets dropdown
  let numberTicketsDropDown = document.createElement('select')
  numberTicketsDropDown.className = "dropDown"
  numberTicketsDropDown.id = "number-tickets-drop-down"
  
  let ticketsFlightsDiv = document.createElement('div')
  ticketsFlightsDiv.className = "tickets-flight-container"
  
  let flightsPTag = document.createElement('p')
  flightsPTag.className = "tickets-flights-p-tag"
  flightsPTag.innerText = "Flights: "

  let ticketsPTag = document.createElement('p')
  ticketsPTag.className = "tickets-flights-p-tag"
  ticketsPTag.innerText = "Tickets: "

  originDestinationDropDiv.append(originDropDown, destinationDropDown)
  
  fromToDiv.append(originPTag, destinationPTag)
  
  ticketsFlightsDiv.append(flightsPTag, flightsDropDown, ticketsPTag, numberTicketsDropDown)
  
  // append origin and destination to the div
  containOriginDestinationDiv.append(fromToDiv, originDestinationDropDiv)
  
  //  append closing button, origin/destination dropdowns, flights dropdown to the modal content
  modalContent.append(spanModal, containOriginDestinationDiv, ticketsFlightsDiv, buyButton)
  
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
      // destinationDropDown.innerText = e.currentTarget.innerText
      // debugger
    })
  })
  
  containOriginDestinationDiv.addEventListener("change", () => {
    
    // - get planet id from origin drop down
    // - fetch url "localhost3000/planets/origin.id/departing_flights"
    // - fetch (departing_flights url)
    // - response array of flights forEach of them create an <option></option>
    
    // separate this all out as a function and call the function also from other places
    flightsDropDown.innerHTML = ""
    let originId = parseInt(originDropDown.value)
    let destinationId = parseInt(destinationDropDown.value)
    fetch(`http://localhost:3000/planets/${originId}/departing_flights`)
    .then(r => r.json())
    .then(flights => {
      flights.forEach(flight => {
        if (flight.destination_id === destinationId) {
          let departingYear = flight.departure.split("-")[0]
          let departingMonth = flight.departure.split("-")[1]
          let departingDay = flight.departure.split("-")[2].split("T")[0]
          
          let arrivingYear = flight.arrival.split("-")[0]
          let arrivingMonth = flight.arrival.split("-")[1]
          let arrivingDay = flight.arrival.split("-")[2].split("T")[0]
          
          let flightOption = document.createElement('option')
            flightOption.value = flight.id
            flightOption.innerText = `Departing: ${departingMonth}/${departingDay}/${departingYear} | Arriving: ${arrivingMonth}/${arrivingDay}/${arrivingYear}`
          
          flightsDropDown.append(flightOption)

          flightsDropDown.addEventListener("change", () => {
            numberTicketsDropDown.innerHTML = ""
            let remainingTickets = flight.remaining_tickets 
            
            for (let i = 1; i < remainingTickets && i < 21; i++) {
              let numberOption = document.createElement('option')
                numberOption.value = // planet.id
                numberOption.innerText = i // planet.name
                numberTicketsDropDown.append(numberOption)
            }
          })
        }
      })
    })
  })
}

// flight.departure.split("-")
// (3) ["2020", "01", "30T00:00:00.000Z"]
// flight.departure.split("-")[0]
// "2020"
// flight.departure.split("-")[1]
// "01"
// flight.departure.split("-")[3]
// undefined
// flight.departure.split("-")[2]
// "30T00:00:00.000Z"
// flight.departure.split("-")[2].split("T")
// (2) ["30", "00:00:00.000Z"]
// flight.departure.split("-")[2].split("T")[0]
// "30"
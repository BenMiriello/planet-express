// URL's
const planetsUrl = `http://localhost:3000/planets`
// DOM selector
const planetsCollection = document.querySelector('#planet-collection')
const body = document.querySelector('body')
const planetDivsArray = []
const footer = document.querySelector('#footer')
let planetsArray = []
let ticketsArray = []

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

fetch("http://localhost:3000/tickets")
.then(r => r.json())
.then(tickets => {
  console.log(tickets)
  tickets.forEach((ticket) => {
  renderTicketLi(ticket)
})
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
  spanModal.innerHTML = "&times;"

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
  destinationDropDown.innerText = " "
  
  planetsArray.forEach((planet) => 
  {
    let originOption = document.createElement('option')
    originOption.value = planet.id
    originOption.className = "origin-option"
    originOption.innerText = planet.name
    originDropDown.append(originOption)
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
      let spanModal = document.querySelector("#buyModal")
      spanModal.style.display = "block"
      let destinationDropDown = document.querySelector("#destination-drop-down")
      destinationDropDown.value = e.target.dataset.id[1]

      let originDropDown = document.querySelector("#origin-drop-down")
      originDropDown.value = 3
   
      // moved creation of the destination drop down here to get the planet that clicked on. Still a little bug on it though
      let destinationOption = document.createElement('option')
      destinationOption.value = e.currentTarget.dataset.id[1]
      destinationOption.className = "destination-option"
      destinationDropDown.innerHTML = " "
      destinationOption.innerText = e.currentTarget.innerText
      destinationDropDown.append(destinationOption)

      // change footer color to planet color
      footer.className = `footer_${e.target.dataset.id[1]}`

      fillFlightsDropDown(originDropDown, destinationDropDown, flightsDropDown, numberTicketsDropDown)
    })
  })
  
  containOriginDestinationDiv.addEventListener("change", () => {
    fillFlightsDropDown(originDropDown, destinationDropDown, flightsDropDown, numberTicketsDropDown)
  })

  const buyBtn = document.querySelector(".buy-button")
  
  buyBtn.addEventListener("click", (event) => {
    
    let flight_id = parseInt(event.target.parentElement.querySelector('#flights-drop-down').value)
    // debugger

  fetch("http://localhost:3000/tickets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      flight_id ,
      price: 1_000_000
    })
    })
    .then(r => r.json())
    .then(ticket => {
        // let ticketsListUl = document.querySelector('.tickets-list')

        // debugger
        // let ticketsLi = document.createElement('li')
        // ticketsLi.className = "flight-ticket"
        // ticketsLi.innerText = ticket.flight.ship_name
        
        renderTicketLi(ticket)

        modalDiv.style.display = "none";
        // debugger
    })
  })
}

function fillFlightsDropDown(originDropDown, destinationDropDown, flightsDropDown, numberTicketsDropDown){
  flightsDropDown.innerHTML = ""
  let originId = parseInt(originDropDown.value)
  let destinationId = parseInt(destinationDropDown.value)
  fetch(`http://localhost:3000/planets/${originId}/departing_flights`)
  .then(r => r.json())
  .then(flights => {
    flights.forEach(flight => {
      if (flight.destination_id === destinationId) {

        renderFlightsDropDown(flight, flightsDropDown)

        fillnumberTicketsDropDown(numberTicketsDropDown, flight)

        flightsDropDown.addEventListener("change", () => {
          fillnumberTicketsDropDown(numberTicketsDropDown, flight)
        })
      }
    })
  }) 
}

function renderFlightsDropDown(flight, flightsDropDown){
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
}

function renderTicketLi(ticket){
  // problem here is that the .find below returns mercury every time and I don't know why.
  let ticketOrigin = planetsArray.find(planet => planet.id = ticket.flight.origin_id)
  let ticketDestination = planetsArray.find(planet => planet.id = ticket.flight.destination_id)
  let ticketsListUl = document.querySelector('.tickets-list')
  let ticketsLi = document.createElement('li')
  ticketsLi.className = "flight-ticket"
  ticketsLi.innerText = `\nFrom: ${ticketOrigin.name}\nTo: ${ticketDestination.name}\nPrice: ${ticket.price} USD\nDeparting: ${ticket.flight.departure.slice(0,10)}\nArriving: ${ticket.flight.arrival.slice(0,10)}\nDuration: ${ticket.flight.days} days\nFlying on the: ${ticket.flight.ship_name}\n`
  ticketsListUl.prepend(ticketsLi)
  modalDiv = document.querySelector("#buyModal")
  modalDiv.style.display = "none";

  let deleteBtn = document.createElement('button')
  deleteBtn.className = "delete-button"
  deleteBtn.innerHTML = "&times;"

  ticketsLi.append(deleteBtn)
  ticketsListUl.append(ticketsLi)

  deleteBtn.addEventListener("click", (event) => {
    fetch(`http://localhost:3000/tickets/${ticket.id}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(() => {
      event.target.parentElement.remove()
    })
  })
}

function fillnumberTicketsDropDown(numberTicketsDropDown, flight){
  numberTicketsDropDown.innerHTML = ""
  let remainingTickets = flight.remaining_tickets 
  
  for (let i = 1; i < remainingTickets && i < 21; i++) {
    let numberOption = document.createElement('option')
      numberOption.innerText = i // planet.name
      numberTicketsDropDown.append(numberOption)
  }
}
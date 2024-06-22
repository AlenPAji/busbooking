// Create the modal structure
const modal = document.createElement('div');
modal.id = 'addBusModal';
modal.classList.add('popup');
modal.innerHTML = `
  <div class="modal-content">
    <span class="close">&times;</span>
    <h2>Add Bus</h2>
    <form id="addBusForm">
      <div class="form-group">
        <label for="busId">Bus ID:</label>
        <input type="text" id="busId" name="busId" required>
      </div>
      <div class="form-group">
        <label for="busName">Bus Name:</label>
        <input type="text" id="busName" name="busName" required>
      </div>
      <div class="form-group">
        <label for="from">From:</label>
        <input type="text" id="from" name="from" required>
      </div>
      <div class="form-group">
        <label for="to">To:</label>
        <input type="text" id="to" name="to" required>
      </div>
      <div class="form-group">
        <label for="journeyDay">Journey Day:</label>
        <input type="text" id="journeyDay" name="journeyDay" required>
      </div>
      <div class="form-group">
        <label for="departure">Departure:</label>
        <input type="time" id="departure" name="departure" required>
      </div>
      <div class="form-group">
        <label for="seat">Seats:</label>
        <input type="number" id="seat" name="seat" required>
      </div>
      <button type="submit">Add</button>
    </form>
  </div>
`;

// Append the modal to the document body
document.body.appendChild(modal);

// Get the "Add Bus" button
const addBusBtn = document.getElementById('addBusBtn');

// Function to open the modal
function openModal() {
  modal.style.display = 'block';
}

// Function to close the modal
function closeModal() {
  modal.style.display = 'none';
}

// When the user clicks the "Add Bus" button, open the modal
addBusBtn.addEventListener('click', openModal);

// When the user clicks on <span> (x), close the modal
const closeBtn = modal.querySelector('.close');
closeBtn.addEventListener('click', closeModal);

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', function(event) {
  if (event.target === modal) {
    closeModal();
  }
});

// Get the form element
const form = document.querySelector("#addBusForm");

// Function to handle form submission
function handleForm() {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const busData = {
      busId: form.busId.value.trim(),
      busName: form.busName.value.trim(),
      from: form.from.value.trim(),
      to: form.to.value.trim(),
      journeyDay: form.journeyDay.value.trim(),
      departure: form.departure.value,
      seat: form.seat.value
    };

    // Send POST request to the server
    fetch('/admin/buses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(busData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      form.reset(); // Reset the form after successful submission
      closeModal(); // Close the modal after submission
      // Redirect to /admin/buses
      window.location.href = '/admin/buses';
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });
}


// Initialize form handler
handleForm();

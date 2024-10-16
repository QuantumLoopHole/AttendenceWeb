const url = "http://127.0.0.1:5000/GetLoggedIn"



fetch(url)
  .then(response => {
    // Check if the response is ok (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();  // Parse the JSON from the response
  })
  .then(data => {
    // Handle the data from the API
    console.log('Response from API:', data);
    for (let name in data) {
        if (data[name].TimeOut === null) {
            document.getElementById("SighnoutCards").insertAdjacentHTML(
                "beforeend", // Position to insert the HTML
                `
                <div class="card text-center mb-3" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text">Time in: ${ String(data[name].TimeIn).slice(0,2)}:${ String(data[name].TimeIn).slice(2,4)}</p>
                        <a href="#Out=${name}" class="btn btn-primary">Sign Out</a>
                    </div>
                </div>`
            );
        }
    }
  })
  .catch(error => {
    // Handle any errors that occur during the request
    console.error('Error fetching data:', error);
  });


  //LOGOUT script
  $(window).on('hashchange', function() {
    if (window.location.hash.slice(5) == ""){
        return
    }
        const name = window.location.hash.slice(5);  // Extract the name from the hash
        console.log("Attempting to log out:", name);  // Log the name

    // Define the URL for the logout API
    const logoutUrl = `http://127.0.0.1:5000/LogOut?name=${name}`;
    console.log(logoutUrl)
    // Send the API call to log out the user
    fetch(logoutUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Logout response:', data);
        window.location.hash = '';  // Clear the hash
        window.location.href = "index.html"
    })
    .catch(error => {
        console.error('Error logging out:', error);
    });
});
url = localStorage.getItem("Server")
console.log("Server: "+ url)

fetch(url + "/GetLoggedIn")
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Response from API:', data);
    for (let name in data) {
        if (data[name].TimeOut === null) {
            document.getElementById("SighnoutCards").insertAdjacentHTML(
                "beforeend", 
                `
                <div class="col-sm-6 col-md-4 col-lg-3 mb-3"> <!-- Use responsive column classes -->
                    <div class="card text-center SighnoutCard" style="width: 100%;" data-bs-theme="dark"> <!-- Ensure card width is 100% -->
                        <div class="card-body" >
                            <h5 class="card-title">${name}</h5>
                            <p class="card-text">Time in: ${ String(data[name].TimeIn).slice(0,2)}:${ String(data[name].TimeIn).slice(2,4)}</p>
                            <a href="#Out=${name}" class="btn btn-primary signOutButton" data-name="${name}">Sign Out</a>
                        </div>
                    </div>
                </div>`
            );
        }
    }

    // Add click event listeners to sign out buttons
    document.querySelectorAll('.signOutButton').forEach(button => {
        button.addEventListener('click', function(e) {
            const name = this.getAttribute('data-name');
            document.getElementById('signOutName').textContent = name;
            document.getElementById('confirmSignOut').setAttribute('data-name', name);
            var myModal = new bootstrap.Modal(document.getElementById('signOutModal'));
            myModal.show();
        });
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });


// LOGOUT script after confirming sign out
document.getElementById('confirmSignOut').addEventListener('click', function() {
    const name = this.getAttribute('data-name');  // Get the name to log out
    console.log("Attempting to log out:", name);

    const logoutUrl = url + `/LogOut?LogoutName=${name}`;
    console.log(logoutUrl);

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
        window.location.href = "index.html";  // Redirect
    })
    .catch(error => {
        console.error('Error logging out:', error);
    });
});

setTimeout(function() {
    // Your command here
    window.location.href = "./"
}, 300000);  // 5 minutes = 5 * 60 * 1000 milliseconds
    
const url = localStorage.getItem("Server");

function LogIn() {
    const loginname = document.getElementById("NameInput").value.toLowerCase();

    // Input validation
    if (loginname.trim() === "") {
        console.error("Username cannot be empty");
        return;
    }

    console.log(loginname);

    fetch(url + "/LogIn?LoginName=" + encodeURIComponent(loginname))
        .then(response => {
            if (response.status === 210) {
                // Show toast message for status 210
                const toast = new bootstrap.Toast(document.getElementById('myToast'));
                toast.show();
                console.log("Received status 210: No redirection");
                return Promise.reject('Status 210: No redirection');
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();  // Parse the JSON from the response
        })
        .then(data => {
            console.log(data);
            // Redirect to message screen
            window.location.href = './message.html#Welcome ' + encodeURIComponent(loginname);
        })
        .catch(error => {
            // Handle any errors that occur during the request
            console.error('Error fetching data:', error);
        });
}

// Set a timeout to redirect to home after 5 minutes
setTimeout(function() {
    window.location.href = "./";
}, 300000);  // 5 minutes = 5 * 60 * 1000 milliseconds

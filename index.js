if(localStorage.getItem("Server") == null){
    window.location.href = "./initalize.html";
  }

// Retrieve API URL from localStorage
const apiUrl = localStorage.getItem('Server');

// Function to check if the API is active
function checkApiStatus() {
    // Make a request to the API
    fetch(apiUrl + "/Test?payload=test")
        .then(response => {
            if (response.ok) {
                // If the response is OK, the server is up
                document.getElementById("ServerStatus").innerText = "Server is Active";
                            document.getElementById("LoginLogoutButtons").style.display = "block";

            } else {
                // If the response is not OK, server might be down
                document.getElementById("ServerStatus").innerText = "Server is Unreachable";
                document.getElementById("#LoginLogoutButtons").innerHTML = ""
            }
        })
        .catch(error => {
            // If there is an error (e.g., network issue), server is likely down
            document.getElementById("ServerStatus").innerText = "Server is Unreachable";
            console.error("Error checking server status:", error);
            document.getElementById("LoginLogoutButtons").style.display = "none";        });
}
// Call the function to check API status every 30 seconds (30000 milliseconds)
setInterval(checkApiStatus, 10000);
// Call the function to check API status
checkApiStatus();
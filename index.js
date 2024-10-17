url = localStorage.getItem("Server")

if(localStorage.getItem("Server") == null){
    window.location.href = "./initalize.html";
  }



// Date Handeler
today = new Date();
day = today.getDate();
month = today.toLocaleString('default', { month: 'long' }); // Gets month name
year = today.getFullYear();
const hours = today.getHours();
const minutes = today.getMinutes().toString().padStart(2, '0'); // Ensures 2 digits

formattedDate = `${day} ${month} ${year} | ${hours}:${minutes}`;

document.getElementById("Date").innerHTML = formattedDate;



checkApiStatus();

// Function to check if the API is active
function checkApiStatus() {
    // Make a request to the API
    fetch(url + "/Test?payload=test")
        .then(response => {
            if (response.ok) {
                // If the response is OK, the server is up
                document.getElementById("ServerStatus").innerHTML = '<div class="ServerActive">Server is Active</div>';
                document.getElementById("LoginLogoutButtons").style.display = "block";
            } else {
                // If the response is not OK, server might be down
                document.getElementById("ServerStatus").innerHTML = '<div class="spinner-grow spinner-grow-sm" role="status"><span class="visually-hidden">Loading...</span></div>Server is Unreachable';
                document.getElementById("LoginLogoutButtons").innerHTML = ""
            }
        })
        .catch(error => {
            // If there is an error (e.g., network issue), server is likely down
            document.getElementById("ServerStatus").innerHTML = '<div class="spinner-grow spinner-grow-sm" role="status"><span class="visually-hidden">Loading...</span></div> <div class="ServerStatusText">Server is Unreachable</div>';
            console.error("Error checking server status:", error);
            document.getElementById("LoginLogoutButtons").style.display = "none";        });
}

// Call the function to check API status every 30 seconds (30000 milliseconds)
setInterval(checkApiStatus, 3000);
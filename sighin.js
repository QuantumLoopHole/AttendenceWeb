url = "http://127.0.0.1:5000/GetLoggedIn"


function LogIn() {
    loginname = document.getElementById("NameInput").value;

    if(loginname == ""){return}


    console.log(loginname)

    fetch(url + "?LoginName="+loginname)
        .then(response => {
        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();  // Parse the JSON from the response
    })
    .then(data => {
    // Handle the data from the API
    
    })
    .catch(error => {
        // Handle any errors that occur during the request
    console.error('Error fetching data:', error);
  });
}
url = localStorage.getItem("Server")



function LogIn() {
    loginname = document.getElementById("NameInput").value.toLowerCase();

    if(loginname == ""){return}


    console.log(loginname)

    fetch(url + "/LogIn?LoginName="+loginname)
        .then(response => {
          if (response.status === 210) {
          
          }

         if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
         }
          return response.json();  // Parse the JSON from the response
    })
    .then(data => {
      console.log(data)
      //detect code 210
    })
    .catch(error => {
        // Handle any errors that occur during the request
    console.error('Error fetching data:', error);
  });
}


setTimeout(function() {
  // Your command here
  window.location.href = "./"
}, 300000);  // 5 minutes = 5 * 60 * 1000 milliseconds
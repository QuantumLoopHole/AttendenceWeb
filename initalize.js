
function testServer(){
    
    TestUrl = $('#TestServerButton').val()
    $("#ServerTestInputs").text("Testing URL: " + TestUrl + "\n Responce:");

    console.log(TestUrl)
    fetch(TestUrl + "/Test?payload=test")
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Response from API:', data);   
      $("#ServerTestOutputs").text(data);
      $("#ServerTestsSave").html('<button type="button" class="btn btn-outline-success" onclick="SaveAndContinue()">Save & Continue</button>')

      }
 
    )
    .catch(error => {
      console.error('Error fetching data:', error);
      $("#ServerTestOutputs").text(error);
    });
}

function SaveAndContinue(){
    localStorage.setItem("Server", TestUrl);
    window.location.href = "./";

}
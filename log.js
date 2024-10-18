// Get the server URL from localStorage
 url = localStorage.getItem("Server");

fetch(url + "/GetLog")
 .then(response => {
     if (!response.ok) {
         throw new Error('Network response was not ok ' + response.statusText);
     }
     return response.blob();  // Convert the response to a Blob
 })
 .then(blob => {
     const url = window.URL.createObjectURL(blob);  // Create a URL for the Blob
     const a = document.createElement('a');  // Create a temporary anchor element
     a.style.display = 'none';
     a.href = url;
     a.download = 'log.log';  // Set the filename for download
     document.body.appendChild(a);
     a.click();  // Programmatically click the anchor to trigger the download
     window.URL.revokeObjectURL(url);  // Clean up the URL object
 })
 .catch(error => {
     console.error('There was a problem with the fetch operation:', error);
 });
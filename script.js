// Date Handeler
today = new Date();
day = today.getDate();
month = today.toLocaleString('default', { month: 'long' }); // Gets month name
year = today.getFullYear();
const hours = today.getHours();
const minutes = today.getMinutes().toString().padStart(2, '0'); // Ensures 2 digits

formattedDate = `${day} ${month} ${year} | ${hours}:${minutes}`;

document.getElementById("Date").innerHTML = formattedDate;



var prevScrollpos = window.pageYOffset;
var header = document.getElementById("navbar");
var atTop = true;

window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    
    if (currentScrollPos == 0) {
        // You are at the top of the page
        atTop = true;
    } else if (atTop && currentScrollPos > 0) {
        // You are scrolling down from the top
        atTop = false;
    }

    if (atTop) {
        // Show the header when at the top
        header.style.top = "0";
    } else {
        // Hide the header when not at the top
        header.style.top = "-50px";
    }

    prevScrollpos = currentScrollPos;
};


// Select the login icon, dropdown menu, and dropdown toggle
var loginIcon = document.getElementById("login-icon");
var formOpen = document.getElementById("form-open");

var timeoutId; // Variable to hold the timeout ID

// Function to show the dropdown menu
function showDropdown() {
  clearTimeout(timeoutId); // Clear any previous timeout
  formOpen.style.display = "block";
}

// Function to hide the dropdown menu after a delay
function hideDropdown() {
  // Set a timeout to hide the menu after a delay (e.g., 1000 milliseconds or 1 second)
  timeoutId = setTimeout(function() {
    formOpen.style.display = "none";
  }, 1000); // Adjust the delay as needed (in milliseconds)
}

// Add event listeners for mouseover and mouseout
loginIcon.addEventListener("mouseover", showDropdown);
loginIcon.addEventListener("mouseout", hideDropdown);
formOpen.addEventListener("mouseover", showDropdown);
formOpen.addEventListener("mouseout", hideDropdown);

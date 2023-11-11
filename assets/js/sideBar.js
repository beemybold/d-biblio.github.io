$(document).ready(function(){
  $("#myBtn").click(function(){
    $("#demoAcc").slideToggle("slow");
  });

  var sidebarVisible = false;

  $("#openSidebarButton").click(function(event){
    event.preventDefault(); // Prevent the default behavior of the anchor link
    if (sidebarVisible) {
      $("#mySidebar").animate({ width: 'toggle' });
      $("#dark-overlay").fadeOut(); // Hide the dark overlay
      sidebarVisible = false;
    } else {
      $("#mySidebar").animate({ width: 'toggle' });
      $("#dark-overlay").fadeIn(); // Show the dark overlay
      sidebarVisible = true;
    }
  });

  // Handle the homepage link separately
  $("#homepageLink").click(function(event){
    // Handle homepage link click
  });

  // Add a click event handler to the buttons
  $(".category-filter").click(function () {
    // Remove the "active" class from all buttons
    $(".category-filter").removeClass("active");

    // Add the "active" class to the clicked button
    $(this).addClass("active");

    // Get the category name from the <span> element within the clicked button
    var categoryName = $(this).find("span.lobster").text();

    // Set the category name in the <p class="category-name"></p> element
    $(".category-hint").text(categoryName);

    // Check if the screen is small (you can adjust the max-width as needed)
    if (window.innerWidth <= 768) {
      // Close the sidebar when a category is selected on small screens
      $("#mySidebar").animate({ width: 'toggle' });
      $("#dark-overlay").fadeOut(); // Hide the dark overlay
      sidebarVisible = false;
    }
  });

  $("#scrollOpenSidebarButton").click(function(event) {
    event.preventDefault();
    if (sidebarVisible) {
      $("#mySidebar").animate({ width: 'toggle' });
      $("#dark-overlay").fadeOut(); // Hide the dark overlay
      sidebarVisible = false;
    } else {
      $("#mySidebar").animate({ width: 'toggle' });
      $("#dark-overlay").fadeIn(); // Show the dark overlay
      sidebarVisible = true;
    }
  });


  $(document).on("click", function(event) {
    if (!$(event.target).closest("#mySidebar, #openSidebarButton, #scrollOpenSidebarButton").length) {
      // You may need to adjust the conditions here based on your specific setup
      if (sidebarVisible) {
        $("#mySidebar").animate({ width: 'toggle' });
        $("#dark-overlay").fadeOut(); // Hide the dark overlay
        sidebarVisible = false;
      }
    }
  });

  // Add a scroll event to show the new button when users are scrolling
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) { // You can adjust the scroll position to your preference
      $("#scrollOpenSidebarButton").fadeIn();
    } else {
      $("#scrollOpenSidebarButton").fadeOut();
    }
  });
});
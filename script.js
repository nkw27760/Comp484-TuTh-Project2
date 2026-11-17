$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
    
    // Called function to update the name, happiness, and weight of our pet in our HTML
    checkAndUpdatePetInfoInHtml();
  
    // When each button is clicked, it will "call" function for that button (functions are below)
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    $('.rest-button').click(clickedRestButton);

    // The journal button uses .slideToggle() to animate the comments panel between visible and hidden.
    // This lets the user open or collapse the pet's comment history without removing its contents.
    $('.toggle-comments-button').click(function() {
      $('.pet-comments').slideToggle();
    });

    // Close button for achievement
    $('.achievement-close-button').click(closeAchievementPopup);
  

  
    
  })
  
    // Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number)
    var pet_info = {name:"a rock", weight:12, happiness:8, energy:6};
    var actionCount = 0;
  
    function clickedTreatButton() {
      // Increase pet happiness
      pet_info.happiness += 1;
      // Increase pet weight
      pet_info.weight += 1;
      checkAndUpdatePetInfoInHtml();
      addPetComment("It seems your rock has been satiated. For now.");
    }
    
    function clickedPlayButton() {
      // Increase pet happiness
      pet_info.happiness += 1;
      // Decrease pet weight
      pet_info.weight -= 1;
      pet_info.energy -= 1;
      checkAndUpdatePetInfoInHtml();
      wiggleRock();
      addPetComment("You think the rock is having fun, but you can't really tell, seeing as it's a rock.");
    }
    
    function clickedExerciseButton() {
      // Decrease pet happiness
      pet_info.happiness -= 1;
      // Decrease pet weight
      pet_info.weight -= 1;
      pet_info.energy -= 2;
      checkAndUpdatePetInfoInHtml();
      wiggleRock();
      addPetComment("You think your rock may have moved a bit, but it did not.");
    }

    // New action Rest, restores energy and gives the rock a small happiness boost
    function clickedRestButton() {
      pet_info.energy += 2;
      pet_info.happiness += 1;
      checkAndUpdatePetInfoInHtml();
      addPetComment("Your rock seems a bit more energized now despite not having done anything.");
    }

    // Gives the rock a short wobble after clicking Play or Exercise
    function wiggleRock() {
      var $rockImage = $('.pet-image');

      // Remove and re-add the animation class so repeated action restarts the animation
      $rockImage.removeClass('rock-wiggle');
      void $rockImage[0].offsetWidth;
      $rockImage.addClass('rock-wiggle');
    }
  
    function checkAndUpdatePetInfoInHtml() {
      checkWeightAndHappinessBeforeUpdating();  
      updatePetInfoInHtml();
    }
    
    function checkWeightAndHappinessBeforeUpdating() {
      // Keep weight, happiness, and energy at zero or higher
      if (pet_info.weight < 0) {
        pet_info.weight = 0;
      }
      if (pet_info.happiness < 0) {
        pet_info.happiness = 0;
      }
      if (pet_info.energy < 0) {
        pet_info.energy = 0;
      }
    }
    
    // Updates HTML with the current values in pet_info
    function updatePetInfoInHtml() {
      $('.name').text(pet_info['name']);
      $('.weight').text(pet_info['weight']);
      $('.happiness').text(pet_info['happiness']);
      $('.energy').text(pet_info['energy']);
    }

    // Show the latest comment, then log it in the thoughts
    function addPetComment(comment) {
      actionCount += 1;

      // Joke zero-stat messages
      if (pet_info.happiness === 0 && pet_info.energy === 0 && pet_info.weight === 0) {
        comment = "You've managed to fail at taking care of a rock, 'grats.";
      } else if (pet_info.happiness === 0) {
        comment = "The rock has hit rock bottom.";
      } else if (pet_info.energy === 0) {
        comment = "The rock is exhausted from doing nothing.";
      } else if (pet_info.weight === 0) {
        comment = "The rock is now weightless, thus it should no longer physically exist. Yet still, it persists.";
      }
      
      // Awards an ""achievement"" after ten care actions
      if (actionCount === 10) {
        showAchievementPopup();
      }

      $('.pet-notification').text(comment);

      // .append() inserts this new paragraph at the end of the comments container.
      // Older comments stay in the journal, while the newest pet comment appears last
      $('.pet-comments').append('<p class="pet-comment">' + comment + '</p>');
    }

    // Display the ""achievement"" as an in-page popup
    function showAchievementPopup() {
      $('.achievement-overlay').addClass('is-visible').attr('aria-hidden', 'false');
      $('.achievement-close-button').focus();
    }

    // Hide the popup and mark it as hidden for assistive technology
    function closeAchievementPopup() {
      $('.achievement-overlay').removeClass('is-visible').attr('aria-hidden', 'true');
    }
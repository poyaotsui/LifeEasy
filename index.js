// Toggle dark mode on and off
const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
  };
  
  // Add signature to the list
  // Function to add signature to the list, modified to accept a person object
  const addSignature = (person) => {
      const signatureText = `🖊️ ${person.name} from ${person.hometown} supports this.`;
      const signature = document.createElement('p');
      signature.textContent = signatureText;
      const signaturesContainer = document.querySelector('.signatures');
      signaturesContainer.appendChild(signature);
  
      // Call toggleModal with the person argument after adding the signature
      toggleModal(person);
  };
  
  
  // Validate form input
  const validateForm = () => {
    let containsErrors = false;
    const petitionInputs = document.getElementById("sign-petition").elements;
    let person = {
      name: petitionInputs[0].value,
      hometown: petitionInputs[1].value,
      email: petitionInputs[2].value
    };
  
    Object.keys(person).forEach((key, index) => {
      if (person[key].length < 2) {
        petitionInputs[index].classList.add('error');
        containsErrors = true;
      } else {
        petitionInputs[index].classList.remove('error');
      }
    });
  
    if (!containsErrors) {
      addSignature(person);
      Array.from(petitionInputs).forEach(input => input.value = "");
    }
  };
  
  // Handle revealable elements based on their position in the viewport
  const handleReveal = () => {
    const revealableElements = document.querySelectorAll('.revealable');
    const windowHeight = window.innerHeight;
    revealableElements.forEach(element => {
      let top = element.getBoundingClientRect().top;
      element.classList.toggle('active', top < windowHeight - 100);
    });
  };
  
  // Intersection Observer for revealable elements
  const setupScrollAnimations = () => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        entry.target.classList.toggle('active', entry.isIntersecting);
      });
    }, { rootMargin: '0px', threshold: 0.1 });
  
    document.querySelectorAll('.revealable').forEach(el => observer.observe(el));
  };
  
  // Setup event listeners and initializations
  document.addEventListener('DOMContentLoaded', () => {
    const themeButton = document.getElementById("theme-button");
    const signNowButton = document.getElementById('sign-now-button');
    themeButton?.addEventListener("click", toggleDarkMode);
    signNowButton?.addEventListener('click', validateForm);
  
    setupScrollAnimations();  // Setup Intersection Observer for animations
    window.addEventListener('scroll', handleReveal);  // Handle reveal on scroll
  });
  // Function to toggle the modal display
  function toggleModal(person) {
    const modal = document.getElementById('thanks-modal');
    const modalText = document.getElementById('modal-text-container').getElementsByTagName('p')[0];
  
    // Set the text content of the modal to a personalized thank you message
    modalText.textContent = `Thank you so much ${person.name} ${person.hometown} for your support!`;
  
    // Set the display style property of the entire modal to flex to show it
    modal.style.display = 'flex';
  
    // Animate the image within the modal
    const intervalId = setInterval(scaleImage, 500);
  
    // Automatically hide the modal after 3 seconds (3000 milliseconds)
    setTimeout(() => {
      modal.style.display = 'none';
      clearInterval(intervalId); // Stop the animation
    }, 5000);
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    const closeButton = document.getElementById('close-modal-button');
    const modal = document.getElementById('thanks-modal');
  
    // Function to hide the modal
    const closeModal = () => {
      modal.style.display = 'none';
    };
  
    // Add click event listener to the close button
    if (closeButton) {
      closeButton.addEventListener('click', closeModal);
    }
  });
  // Define scaleFactor variable
  let scaleFactor = 1;
  
  // Select the modal image
  const modalImage = document.querySelector('#thanks-modal img');
  
  // Function to scale the image within the modal
  const scaleImage = () => {
    // Toggle scaleFactor between 1 and 0.8
    scaleFactor = (scaleFactor === 1) ? 0.8 : 1;
  
    // Apply the scaleFactor to the image
    modalImage.style.transform = `scale(${scaleFactor})`;
  };
  
  
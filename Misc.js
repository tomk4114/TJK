
// Function to get query string parameters
function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Function to populate form elements
function populateFormFromQueryString() {
  // Get all form elements
  const formElements = document.querySelectorAll('input, select, textarea');

  // Iterate over form elements
  formElements.forEach(element => {
    // Get the element's name
    const elementName = element.name;

    // If the element has a name
    if (elementName) {
      // Get the value from the query string
      const queryValue = getParameterByName(elementName);

      // If a value exists in the query string for the element's name
      if (queryValue) {
        // Set the element's value
        element.value = queryValue;
      }
    }
  });
}
// Call the function to populate the form when the page loads
window.onload = populateFormFromQueryString;

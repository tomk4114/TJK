
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

// Function to set Log_In and Sign_Out
function getStatus() {
	const Mystatus = document.getElementById('HeadLoginView_HeadLoginStatus');
	if (sessionStorage.getItem('loggedin') == 'true') {
		Mystatus.innerHTML = "Sign Out";
		//console.log(" getstatus says Logged In");
	} else {
		Mystatus.innerHTML = "Log In";
		sessionStorage.setItem('loggedin', 'false');
		//console.log("getstatus says Signed Out");
	}
}

function chkStatus() {
	const Mystatus = document.getElementById('HeadLoginView_HeadLoginStatus');
	const htmlContent = Mystatus.innerHTML;
	const loginText = htmlContent.includes("Sign Out");
	//console.log(htmlContent);
	//console.log(sessionStorage.getItem('loggedin'));
	if (sessionStorage.getItem('loggedin') == 'true') {
	Mystatus.innerHTML = "Sign Out";
	//console.log(" getstatus says I'm now signing out");
	sessionStorage.setItem('loggedin', 'false');
	window.location.href = "index.html"; // Redirect to Home
	} else {
		console.log("chkStatus says I'm Signed Out");
		Mystatus.innerHTML = "Log In";
		//console.log("Signed Out");
	}
}		



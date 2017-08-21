var forms,
    inputs;
/* BEGIN - create HTML elements */
/* create error message function */
function createErrorMessage(message) {
	"use strict";
	var div = document.createElement("span");
	div.addClass("input-field__error");
	div.addClass("a-toggle--slide");
	div.addClass("js-error");
	div.appendChild(document.createTextNode(message));
	return div;
}
/* END - create HTML elements */
/* [description] */
function deleteMessage(messages) {
	"use strict";
	if (messages.length > 0) {
		Array.prototype.forEach.call(messages, function (message) {
			message.addClass("is-hidden");
			timer = setInterval(function () {
				message.removeElement();
				clearInterval(timer);
			}, 400);
		});
	}
}
/* [description] */
var replaceValidationUI = function (form) {
	"use strict";
	// Suppress the default bubbles
	form.addEventListener("invalid", function (event) {
		event.preventDefault();
	}, true);
	
	// Support Safari, iOS Safari, and the Android browser—each of which do not prevent
	// form submissions by default
	form.addEventListener("submit", function (event) {
		if (!event.target.checkValidity()) {
			event.preventDefault();
		}
	});
	
	var submitButton = form.querySelector("button:not([type=button]), input[type=submit]");
	
	if (submitButton !== null) {
		submitButton.addEventListener("click", function (event) {

			var invalidFields = form.querySelectorAll(":invalid"),
				errorMessages = form.getElementsByClassName("js-error"),
				failedMessages = form.getElementsByClassName("js-failed"),
				successMessages = form.getElementsByClassName("js-success");

			if (successMessages.length > 0) {
				deleteMessage(successMessages);
			}

			if (errorMessages.length > 0) {
				deleteMessage(errorMessages);
			}

			if (failedMessages.length > 0) {
				deleteMessage(failedMessages);
			}

			if (invalidFields.length > 0) {
				Array.prototype.forEach.call(invalidFields, function (invalidField) {
					if (invalidField.parentElement.hasClass("js-textfield")) {
						invalidField.parentElement.addClass("is-invalid");
						invalidField.parentElement.appendChild(createErrorMessage(invalidField.validationMessage));
					}
				});
			}

			if (invalidFields.length > 0) {
				invalidFields[0].focus();
			}
		});
	}
};
/* [description]  */
var textFieldFocus = function (event) {
	"use strict";
	var field = event.target;
	if (field.parentElement.classList.contains("js-textfield")) {
		field.parentElement.classList.add("is-focused");
	}
};
/* [description] */
var textFieldBlur = function (event) {
	"use strict";
	var field = event.target,
		parent = field.parentElement,
		errorMessages;
	
	if (parent.hasClass("js-textfield")) {
		if (field.value) {
			
			parent.removeClass("is-invalid");
			
			errorMessages = parent.getElementsByClassName("js-error");
			if (errorMessages.length > 0) {
				deleteMessage(errorMessages);
			}
		} else if (field.validity.badInput && !field.validity.valid && parent.hasClass("is-invalid")) {
			parent.addClass("is-dirty");
		}
	}
};
/* [description] */
var textFieldOnChange = function (event) {
	"use strict";
	var field = event.target,
		parent = field.parentElement,
		errorMessages;
	
	if (field.value && !field.activeElement) {
		
		parent.removeClass("is-invalid");
		
		errorMessages = parent.getElementsByClassName("js-error");
		if (errorMessages.length > 0) {
			deleteMessage(errorMessages);
		}
	}
};

// document load
document.addEventListener("DOMContentLoaded", function () {
	"use strict";
	// set form var
	forms = document.querySelectorAll("form");
	inputs = document.getElementsByClassName("js-input");
	//set element event listener
	if (forms.length > 0) {
		Array.prototype.forEach.call(forms, function (form) {
			replaceValidationUI(form);
		});
	}
	if (inputs.length > 0) {
		Array.prototype.forEach.call(inputs, function (input) {
			input.addEventListener("focus", textFieldFocus);
			input.addEventListener("blur", textFieldBlur);
			input.addEventListener("change", textFieldOnChange);
		});
	}
});

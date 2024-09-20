function showInputError(form, element, config) {
  element.classList.add(config.inputErrorClass);
  const errorElement = form.querySelector(`.${element.id}-error`);
  errorElement.classList.add(config.errorClass);
  if (element.validity.patternMismatch) {
      const customError = element.getAttribute('data-error');
      element.setCustomValidity(customError);
      errorElement.textContent = customError;
  } else {
      element.setCustomValidity('');
      errorElement.textContent = element.validationMessage;
  }
};

function hideInputError(form, element, config) {
  const errorElement = form.querySelector(`.${element.id}-error`);
  element.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

function checkInputValidity(form, element, config) {
  if (!element.validity.valid) {
     showInputError(form, element, config);
  } else {
     hideInputError(form, element, config);
  }
};

function setEventListeners(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const buttonElement = form.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((element) => {
      element.addEventListener('input', function () {
          checkInputValidity(form, element, config);
          toggleButtonState(inputList, buttonElement, config);
      });
  });
};

const hasInvalidInput = (inputList) => {                          
  return inputList.some((inputElement) => {                     
  return !inputElement.validity.valid;                            
 })
}; 

const toggleButtonState = (inputList, buttonElement, config) => {        
      if (hasInvalidInput(inputList)) {                     
        buttonElement.disabled = true;                
        buttonElement.classList.add(config.inactiveButtonClass);     
  } else {                                                 
      buttonElement.disabled = false;                
      buttonElement.classList.remove(config.inactiveButtonClass);   
  }
};

export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((elem) => {
      setEventListeners(elem, config);
  });
};

export function clearValidation(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const buttonElement = form.querySelector(config.submitButtonSelector);
  inputList.forEach((element) => {
      hideInputError(form, element, config);
  });
  toggleButtonState(inputList, buttonElement, config);
}
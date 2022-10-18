import throttle from 'lodash.throttle';
// const form = document.querySelector('.feedback-form');
// const textarea = document.querySelector('.feedback-form textarea');

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  emailArea: document.querySelector('input[name="email"]'),
};
const { form, textarea, emailArea } = refs;

const STORAGE_KEY = 'feedback-form-state';

const formData = {};

form.addEventListener('submit', onFormSubmit);

form.addEventListener('input', throttle(onFormInput, 500));

function onFormInput(event) {
  formData[event.target.name] = event.target.value;
  console.log(formData);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function savedTextInput() {
  if (localStorage.getItem(STORAGE_KEY)) {
    const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
    textarea.value = savedMessage.message || '';
    emailArea.value = savedMessage.email || '';
    formData.message = savedMessage.message || '';
    formData.email = savedMessage.email || '';
    // textarea.value = formData.message = savedMessage.message || '';
    // formData.message = formData.email = savedMessage.email || '';
  }
}

function onFormSubmit(event) {
  event.preventDefault();

  // console.log('send form');
  formData.email = '';
  formData.message = '';
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

savedTextInput();

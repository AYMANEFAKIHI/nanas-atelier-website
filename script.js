// script.js

document.addEventListener('DOMContentLoaded', () => {
    const orderTypeSelect = document.getElementById('orderType');
    const artworkTypeContainer = document.getElementById('artworkTypeContainer');
    const artworkTypeSelect = document.getElementById('artworkType');
    const orderForm = document.getElementById('orderForm');
    // const formMessage = document.getElementById('formMessage'); // This div might not be needed for basic Formspree integration
    // const clientNamePlaceholder = document.getElementById('clientNamePlaceholder'); // This text will likely be updated by Formspree's success page

    const referenceImagesInput = document.getElementById('referenceImages');
    const referenceFileNamesDisplay = document.getElementById('referenceFileNames');
    const paymentReceiptInput = document.getElementById('paymentReceipt');
    const paymentReceiptFileNameDisplay = document.getElementById('paymentReceiptFileName');

    // Function to update file names display for file inputs
    const updateFileNamesDisplay = (inputElement, displayElement, defaultText) => {
        if (inputElement.files.length > 0) {
            let names = Array.from(inputElement.files).map(file => file.name).join(', ');
            displayElement.textContent = `Selected: ${names}`;
        } else {
            displayElement.textContent = defaultText;
        }
    };

    // Event listener for Type of Order dropdown
    orderTypeSelect.addEventListener('change', () => {
        if (orderTypeSelect.value === 'digitalArtwork') {
            artworkTypeContainer.classList.remove('hidden');
            artworkTypeSelect.setAttribute('required', 'true');
        } else {
            artworkTypeContainer.classList.add('hidden');
            artworkTypeSelect.removeAttribute('required');
            artworkTypeSelect.value = '';
        }
    });

    // Event listener for Reference Images file input
    referenceImagesInput.addEventListener('change', () => {
        updateFileNamesDisplay(referenceImagesInput, referenceFileNamesDisplay, 'Allowed: JPG, PNG, PDF, up to 5 files.');
    });

    // Event listener for Payment Receipt file input
    paymentReceiptInput.addEventListener('change', () => {
        updateFileNamesDisplay(paymentReceiptInput, paymentReceiptFileNameDisplay, 'JPG / PNG / PDF / Screenshot.');
    });


    // IMPORTANT FOR FORMSPREE:
    // We are removing the custom form submission event listener here.
    // By default, when a form has an 'action' and 'method="POST"', the browser
    // will handle the submission directly. This is how Formspree works best
    // for simple integrations, especially with file uploads.
    // The previous event listener with event.preventDefault() would stop this.
    // If you need custom success messages without redirection,
    // you would use Formspree's AJAX submission. But for initial setup, direct submit is easier.

    // Removed the orderForm.addEventListener('submit', ...) block
    // Any custom success/error messages will typically be handled by Formspree's default
    // redirect or built-in messages after submission.
});


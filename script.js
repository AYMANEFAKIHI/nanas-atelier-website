// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons after DOM is loaded if not already done in HTML
    // lucide.createIcons(); // This is already called in index.html after script.js is loaded

    const orderTypeSelect = document.getElementById('orderType');
    const artworkTypeContainer = document.getElementById('artworkTypeContainer');
    const artworkTypeSelect = document.getElementById('artworkType');
    const orderForm = document.getElementById('orderForm');
    const formMessage = document.getElementById('formMessage');
    const clientNamePlaceholder = document.getElementById('clientNamePlaceholder');
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
    // This controls the visibility and required status of the 'Artwork Type' dropdown
    orderTypeSelect.addEventListener('change', () => {
        if (orderTypeSelect.value === 'digitalArtwork') {
            // If 'Digital Artwork' is selected, show the container and make the dropdown required
            artworkTypeContainer.classList.remove('hidden');
            artworkTypeSelect.setAttribute('required', 'true');
        } else {
            // Otherwise, hide the container, remove required status, and clear its value
            artworkTypeContainer.classList.add('hidden');
            artworkTypeSelect.removeAttribute('required');
            artworkTypeSelect.value = ''; // Clear selection when hidden
        }
    });

    // Event listener for Reference Images file input
    // Updates the text next to the input to show selected file names
    referenceImagesInput.addEventListener('change', () => {
        updateFileNamesDisplay(referenceImagesInput, referenceFileNamesDisplay, 'Allowed: JPG, PNG, PDF, up to 5 files.');
    });

    // Event listener for Payment Receipt file input
    // Updates the text next to the input to show selected file name
    paymentReceiptInput.addEventListener('change', () => {
        updateFileNamesDisplay(paymentReceiptInput, paymentReceiptFileNameDisplay, 'JPG / PNG / PDF / Screenshot.');
    });


    // Event listener for form submission
    orderForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the browser's default form submission (which reloads the page)

        // Basic HTML5 form validation check
        // If the form is not valid (e.g., required fields are empty), display an error message
        if (!orderForm.checkValidity()) {
            formMessage.classList.remove('hidden', 'bg-green-500'); // Ensure hidden and success classes are removed
            formMessage.classList.add('bg-red-500'); // Add error styling
            formMessage.textContent = 'Please fill in all required fields correctly.'; // Set error message
            return; // Stop the function if validation fails
        }

        // --- Frontend Simulation of Form Submission ---
        // IMPORTANT: In a real production application, you would send this form data to a backend server
        // (e.g., using fetch API to your own server, a serverless function, or a third-party form service like Formspree, Netlify Forms, etc.).
        // Directly sending emails from client-side JavaScript is not secure or reliable.
        // For this demonstration, we will only simulate success and log the data to the console.

        const formData = new FormData(orderForm); // Create a FormData object from the form
        const data = {};
        // Iterate over the form data to extract values.
        // Special handling for file inputs to just show file names for demonstration.
        for (const [key, value] of formData.entries()) {
            if (key === 'referenceImages' || key === 'paymentReceipt') {
                // For files, store just the file names for demonstration purposes
                data[key] = Array.from(formData.getAll(key)).map(file => file.name).join(', ');
            } else {
                data[key] = value;
            }
        }

        console.log('Form Data Captured:', data); // Log the captured data to the browser's console

        // Update the client name in the auto-response message section at the bottom of the form
        const clientName = data.fullName || 'Client Name'; // Use the full name from the form, or default
        clientNamePlaceholder.textContent = clientName;

        // Display a simulated successful submission message
        formMessage.classList.remove('hidden', 'bg-red-500'); // Remove hidden and error styling
        formMessage.classList.add('bg-green-500'); // Add success styling
        formMessage.textContent = 'Your order has been submitted successfully! Please check your email for payment instructions.'; // Set success message

        // Optionally, reset the form and hide the message after a short delay
        setTimeout(() => {
            orderForm.reset(); // Resets all form fields to their initial state
            artworkTypeContainer.classList.add('hidden'); // Hide the artwork type dropdown again
            artworkTypeSelect.value = ''; // Clear its value
            formMessage.classList.add('hidden'); // Hide the success/error message
            // Reset file name displays to their default text
            updateFileNamesDisplay(referenceImagesInput, referenceFileNamesDisplay, 'Allowed: JPG, PNG, PDF, up to 5 files.');
            updateFileNamesDisplay(paymentReceiptInput, paymentReceiptFileNameDisplay, 'JPG / PNG / PDF / Screenshot.');
        }, 5000); // The message and form will reset after 5 seconds

        // --- REAL-WORLD BACKEND INTEGRATION EXAMPLE (Conceptual) ---
        /*
        // Uncomment and modify this block if you integrate with a backend.
        try {
            // Replace '/api/submit-order' with your actual backend API endpoint.
            // When sending FormData directly, the 'Content-Type' header is usually set automatically by the browser.
            const response = await fetch('/api/submit-order', {
                method: 'POST',
                body: formData // Send formData directly for file uploads
            });

            if (response.ok) { // Check if the response status is 2xx (success)
                const result = await response.json(); // Parse the JSON response from the server
                console.log('Server response:', result);
                formMessage.classList.remove('hidden', 'bg-red-500');
                formMessage.classList.add('bg-green-500');
                formMessage.textContent = 'Your order has been submitted successfully! Please check your email for payment instructions.';
                // Update client name as before
                const clientName = document.getElementById('fullName').value || 'Client Name';
                clientNamePlaceholder.textContent = clientName;
                orderForm.reset(); // Reset form after successful submission
                artworkTypeContainer.classList.add('hidden');
                artworkTypeSelect.value = '';
                // Reset file name displays
                updateFileNamesDisplay(referenceImagesInput, referenceFileNamesDisplay, 'Allowed: JPG, PNG, PDF, up to 5 files.');
                updateFileNamesDisplay(paymentReceiptInput, paymentReceiptFileNameDisplay, 'JPG / PNG / PDF / Screenshot.');

            } else { // Handle server errors (e.g., 4xx or 5xx status codes)
                const errorData = await response.json(); // Attempt to parse error message from server
                console.error('Server error:', errorData);
                formMessage.classList.remove('hidden', 'bg-green-500');
                formMessage.classList.add('bg-red-500');
                formMessage.textContent = `Error submitting order: ${errorData.message || 'Please try again.'}`;
            }
        } catch (error) { // Handle network errors or other unexpected issues
            console.error('Network or submission error:', error);
            formMessage.classList.remove('hidden', 'bg-green-500');
            formMessage.classList.add('bg-red-500');
            formMessage.textContent = 'An unexpected error occurred. Please try again later.';
        }
        */
    });
});

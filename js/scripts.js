
        document.addEventListener('DOMContentLoaded', function () {
    // Restrict input to numbers only
    document.getElementById('phone').addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, ''); // Remove non-numeric characters
    });

    document.getElementById('nextBtn').addEventListener('click', function () {
        var nomPrenom = document.getElementById('nom_prenom').value.trim();
        var ville = document.getElementById('ville').value.trim();
        var phone = document.getElementById('phone').value.trim();

        // Validation: Ensure the phone number has at least 10 digits
        if (nomPrenom === '' || ville === '' || phone === '') {
            alert('Veuillez remplir tous les champs avant de continuer.');
            return;
        }

        if (phone.length < 10) {
            alert('Veuillez entrer un numéro de téléphone valide avec au moins 10 chiffres.');
            return;
        }

        // If all validations pass, show the choice buttons and hide the next button
        document.getElementById('choiceButtons').style.display = 'block';
        this.style.display = 'none'; // Hide the "Suivante" button
    });

    // Initialize EmailJS
    emailjs.init('dgpLcgRA1GgXDG0-f'); // Use your EmailJS Public Key

    document.getElementById('emailBtn').addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default behavior

        // Get form values
        var nomPrenom = document.getElementById('nom_prenom').value;
        var ville = document.getElementById('ville').value;
        var phone = document.getElementById('phone').value;

        // Send via email using EmailJS
        emailjs.sendForm('service_eq2jipa', 'template_n9qkhod', document.getElementById('orderForm'))
            .then(function (response) {
                // Hide the form
                document.getElementById('orderForm').reset(); // Reset the form

                // Show Bootstrap modal
                var myModal = new bootstrap.Modal(document.getElementById('orderSuccessModal'));
                myModal.show();
            }, function (error) {
                alert('Échec de l’envoi: ' + error.text);
            });
    });

    document.getElementById('whatsappBtn').addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default behavior

        // Get form values
        var nomPrenom = document.getElementById('nom_prenom').value;
        var ville = document.getElementById('ville').value;
        var phone = document.getElementById('phone').value;

        // Format the WhatsApp message with encoding
        var message = `Bonjour, je souhaite commander un Tangram.\n\n Nom: ${nomPrenom}\n Ville: ${ville}\n Téléphone: ${phone}`;
        var encodedMessage = encodeURIComponent(message); // Proper encoding

        // WhatsApp number
        var whatsappNumber = "212661397614"; // Change to your WhatsApp number

        // WhatsApp API URL
        var whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Redirect user to WhatsApp
        window.location.href = whatsappURL;
    });
});


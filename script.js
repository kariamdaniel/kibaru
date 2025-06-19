// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');

            const icon = darkModeToggle.querySelector('i');
            if (body.classList.contains('dark-mode')) {
                icon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('darkMode', 'enabled');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
                localStorage.removeItem('darkMode');
            }
        });

        // Load saved dark mode preference
        if (localStorage.getItem('darkMode') === 'enabled') {
            body.classList.add('dark-mode');
            const icon = darkModeToggle.querySelector('i');
            icon.classList.replace('fa-moon', 'fa-sun');
        }
    }

    // Chat Toggle
    const chatButton = document.getElementById('chatButton');
    const chatContainer = document.getElementById('chat-container');
    const closeChat = document.getElementById('closeChat');

    if (chatButton && chatContainer && closeChat) {
        chatButton.addEventListener('click', () => {
            chatContainer.classList.toggle('open');
        });

        closeChat.addEventListener('click', () => {
            chatContainer.classList.remove('open');
        });
    }

    // Worker Card Click → Show Modal
    const workerCards = document.querySelectorAll('.worker-card');
    const workerModal = document.getElementById('workerModal');
    const closeModalBtn = document.getElementById('closeModal');

    if (workerCards.length > 0 && workerModal && closeModalBtn) {
        workerCards.forEach(card => {
            card.addEventListener('click', () => {
                // Get data from data-* attributes
                const name = card.getAttribute('data-name');
                const service = card.getAttribute('data-service');
                const location = card.getAttribute('data-location');
                const rate = card.querySelector('.font-bold.text-blue-500')?.textContent || 'N/A';

                // Extract availability from the second <p> tag inside card
                const availability = card.querySelectorAll('p')[1]?.textContent || 'Not available';

                // Extract rating from star icon
                const ratingElement = card.querySelector('.fa-star');
                const rating = ratingElement?.parentElement?.nextElementSibling?.textContent.trim() || 'N/A';

                // Populate modal
                document.getElementById('modalWorkerName').textContent = name;
                document.getElementById('modalWorkerService').textContent = service;
                document.getElementById('modalWorkerLocation').textContent = location;
                document.getElementById('modalWorkerAvailability').textContent = availability;
                document.getElementById('modalWorkerRating').textContent = rating + " ★";
                document.getElementById('modalWorkerRate').textContent = rate;

                // Show modal
                workerModal.classList.remove('hidden');
            });
        });

        // Close modal
        closeModalBtn.addEventListener('click', () => {
            workerModal.classList.add('hidden');
        });

        // Optional: Close modal when clicking outside
        workerModal.addEventListener('click', (e) => {
            if (e.target === workerModal) {
                workerModal.classList.add('hidden');
            }
        });
    }
});
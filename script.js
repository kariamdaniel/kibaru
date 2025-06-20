document.addEventListener('DOMContentLoaded', () => {
    // =============
    // Dark Mode Toggle
    // =============
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');

            const icon = darkModeToggle.querySelector('i');
            if (body.classList.contains('dark-mode')) {
                icon?.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('darkMode', 'enabled');
            } else {
                icon?.classList.replace('fa-sun', 'fa-moon');
                localStorage.removeItem('darkMode');
            }
        });

        // Load saved dark mode preference
        if (localStorage.getItem('darkMode') === 'enabled') {
            body.classList.add('dark-mode');
            const icon = darkModeToggle.querySelector('i');
            icon?.classList.replace('fa-moon', 'fa-sun');
        }
    }

    // =============
    // Chat Box Toggle
    // =============
    const chatButton = document.getElementById('chatButton');
    const chatContainer = document.getElementById('chat-container');
    const closeChat = document.getElementById('closeChat');

    if (chatButton && chatContainer && closeChat) {
        // Open chat
        chatButton.addEventListener('click', () => {
            chatContainer.classList.toggle('open');
        });

        // Close chat with close button
        closeChat.addEventListener('click', () => {
            chatContainer.classList.remove('open');
        });

        // ✅ Close chat when clicking outside (inside chat-container)
        chatContainer.addEventListener('click', (e) => {
            if (e.target === chatContainer) {
                chatContainer.classList.remove('open');
            }
        });

        // ✅ Close chat with ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                chatContainer.classList.remove('open');
            }
        });
    }

    // =============
    // Worker Card Modal (Click to Show)
    // =============
    const workerCards = document.querySelectorAll('.worker-card');
    const workerModal = document.getElementById('workerModal');
    const closeModalBtn = document.getElementById('closeModal');

    if (workerCards.length > 0 && workerModal && closeModalBtn) {
        workerCards.forEach(card => {
            card.addEventListener('click', () => {
                // Extract data from data-* attributes
                const name = card.getAttribute('data-name') || 'N/A';
                const service = card.getAttribute('data-service') || 'N/A';
                const location = card.getAttribute('data-location') || 'N/A';
                const rate = card.getAttribute('data-rate') || 'N/A';
                const rating = card.getAttribute('data-rating') || 'N/A';

                // Extract availability from second <p> tag
                const availability = card.querySelectorAll('p')[1]?.textContent.trim() || 'Not available';

                // Populate modal
                document.getElementById('modalWorkerName').textContent = name;
                document.getElementById('modalWorkerService').textContent = service;
                document.getElementById('modalWorkerLocation').textContent = location;
                document.getElementById('modalWorkerAvailability').textContent = availability;
                document.getElementById('modalWorkerRating').textContent = `${rating} ★`;
                document.getElementById('modalWorkerRate').textContent = rate;

                // Show modal
                workerModal.classList.remove('hidden');
            });
        });

        // Close modal on close button
        closeModalBtn.addEventListener('click', () => {
            workerModal.classList.add('hidden');
        });

        // Close modal when clicking outside
        workerModal.addEventListener('click', (e) => {
            if (e.target === workerModal) {
                workerModal.classList.add('hidden');
            }
        });

        // ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                workerModal.classList.add('hidden');
                chatContainer?.classList.remove('open'); // Close chat too if needed
            }
        });
    }

    // =============
    // Hover Effects
    // =============
    const serviceCards = document.querySelectorAll('.service-card');
    const workerCardsHover = document.querySelectorAll('.worker-card');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });

    workerCardsHover.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 20px 30px rgba(0, 0, 0, 0.15)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });
});
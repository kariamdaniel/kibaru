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

        // Load Saved Dark Mode
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

        // Close chat with X
        closeChat.addEventListener('click', (e) => {
            e.stopPropagation();
            chatContainer.classList.remove('open');
        });

        // Close chat on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                chatContainer.classList.remove('open');
            }
        });

        // Click outside to close chat
        chatContainer.addEventListener('click', (e) => {
            if (e.target === chatContainer) {
                chatContainer.classList.remove('open');
            }
        });
    } else {
        console.warn("Chat elements missing:", { chatButton, chatContainer, closeChat });
    }

    // =============
    // Worker Card Modal
    // =============
    const workerModal = document.getElementById('workerModal');
    const closeModalBtn = document.getElementById('closeModal');

    function showWorkerModal(event, element) {
        event.preventDefault();

        const card = element.querySelector(".worker-card");
        const name = card.getAttribute("data-name") || "N/A";
        const service = card.getAttribute("data-service") || "N/A";
        const location = card.getAttribute("data-location") || "N/A";
        const rating = card.getAttribute("data-rating") || "N/A";
        const rate = card.getAttribute("data-rate") || "N/A";

        document.getElementById("modalWorkerName").textContent = name;
        document.getElementById("modalWorkerService").textContent = service;
        document.getElementById("modalWorkerLocation").textContent = location;
        document.getElementById("modalWorkerRating").textContent = `${rating} ★`;
        document.getElementById("modalWorkerRate").textContent = rate;
        document.getElementById("workerModal").classList.remove("hidden");
    }

    if (workerModal && closeModalBtn) {
        // Close modal on X
        closeModalBtn.addEventListener("click", () => {
            workerModal.classList.add("hidden");
        });

        // Close modal on outside click
        workerModal.addEventListener("click", (e) => {
            if (e.target === workerModal) {
                workerModal.classList.add("hidden");
            }
        });

        // ESC key closes modal
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && !workerModal.classList.contains("hidden")) {
                workerModal.classList.add("hidden");
            }
        });
    } else {
        console.warn("Worker modal or close button missing");
    }

    // =============
    // Logout Button
    // =============
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn?.addEventListener("click", () => {
        firebase.auth().signOut().then(() => {
            window.location.href = "login.html"; // Redirect to login after logout
        }).catch((error) => {
            console.error("Logout failed:", error.message);
        });
    });
});
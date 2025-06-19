// worker.js

// Sample worker data (could be loaded from a JSON file later)
const workers = [
    {
        id: "1",
        name: "John Smith",
        service: "Plumber",
        location: "2.3 miles away",
        rating: "4.9",
        rate: "$45/hr",
        image: "https://randomuser.me/api/portraits/men/32.jpg" 
    },
    {
        id: "2",
        name: "Sarah Johnson",
        service: "Cleaner",
        location: "1.7 miles away",
        rating: "4.8",
        rate: "$35/hr",
        image: "https://randomuser.me/api/portraits/women/44.jpg" 
    },
    {
        id: "3",
        name: "Michael Brown",
        service: "Electrician",
        location: "3.1 miles away",
        rating: "5.0",
        rate: "$60/hr",
        image: "https://randomuser.me/api/portraits/men/75.jpg" 
    },
    {
        id: "4",
        name: "Emma Wilson",
        service: "Gardener",
        location: "2.5 miles away",
        rating: "4.7",
        rate: "$40/hr",
        image: "https://randomuser.me/api/portraits/women/68.jpg" 
    }
];

// Get ID from URL
const urlParams = new URLSearchParams(window.location.search);
const workerId = urlParams.get('id');

// Find matching worker
const worker = workers.find(w => w.id === workerId);

// Populate the page
if (worker) {
    document.getElementById('workerName').textContent = worker.name;
    document.getElementById('workerService').textContent = worker.service;
    document.getElementById('workerLocation').textContent = worker.location;
    document.getElementById('workerRate').textContent = worker.rate;
    document.getElementById('workerImage').src = worker.image;

    const ratingText = document.getElementById('workerRating');
    ratingText.textContent = `${worker.rating} ★`;
    ratingText.parentElement.querySelector('.fa-star').parentElement.innerHTML = generateStars(worker.rating);
} else {
    // Worker not found
    document.body.innerHTML = `
        <div class="text-center p-12">
            <h1 class="text-3xl font-bold text-red-500">Worker Not Found</h1>
            <p class="mt-4">The worker you're looking for doesn't exist.</p>
            <a href="index.html" class="mt-4 inline-block text-blue-500 hover:underline">Back to Home</a>
        </div>
    `;
}

// Helper: Generate star icons
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
        '<span class="flex">' +
        `${'<i class="fas fa-star"></i>'.repeat(fullStars)}` +
        `${halfStar ? '<i class="fas fa-star-half-alt"></i>' : ''}` +
        `${'<i class="far fa-star"></i>'.repeat(emptyStars)}` +
        '</span>'
    );
}
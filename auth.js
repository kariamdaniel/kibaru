// Firebase Setup
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// Role-based redirect
function handleRoleRedirect(user) {
    db.collection("users").doc(user.uid).get().then(doc => {
        const role = doc.data().role;
        if (role === "worker") {
            window.location.href = "worker-dashboard.html";
        } else if (role === "household") {
            window.location.href = "household-dashboard.html";
        } else {
            alert("Invalid role. Please try again.");
        }
    });
}

// Login Form
document.getElementById("loginForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            handleRoleRedirect(auth.currentUser);
        })
        .catch(error => {
            alert("Login failed: " + error.message);
        });
});

// Register Form
document.getElementById("registerForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    if (document.getElementById("password").value !== document.getElementById("confirmPassword").value) {
        alert("Passwords do not match!");
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            db.collection("users").doc(userCredential.user.uid).set({
                email: email,
                role: role,
                isVerified: false,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                handleRoleRedirect(userCredential.user);
            });
        })
        .catch(error => {
            alert("Registration failed: " + error.message);
        });
});
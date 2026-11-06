document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();

    const phoneInput = document.getElementById("phoneInput");
    const passwordInput = document.getElementById("passwordInput");
    const submitBtn = document.getElementById("submitBtn");
    const loginForm = document.getElementById("loginForm");
    const togglePasswordBtn = document.getElementById("togglePasswordBtn");
    const roleOptions = document.querySelectorAll(".role-option");

    let selectedRole = "buyer"; // Default role

    // Handle role selection (Buyer, Seller, Transporter)
    roleOptions.forEach(option => {
        option.addEventListener("click", () => {
            roleOptions.forEach(opt => opt.classList.remove("active"));
            option.classList.add("active");
            selectedRole = option.dataset.role;
        });
    });

    // Toggle password visibility
    togglePasswordBtn.addEventListener("click", () => {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePasswordBtn.innerHTML = '<i data-lucide="eye-off"></i>';
        } else {
            passwordInput.type = "password";
            togglePasswordBtn.innerHTML = '<i data-lucide="eye"></i>';
        }
        lucide.createIcons();
    });

    // Only allow numbers in phone input and limit to 10
    phoneInput.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
        checkFormValidity();
    });

    passwordInput.addEventListener("input", () => {
        checkFormValidity();
    });

    function checkFormValidity() {
        if (phoneInput.value.length === 10 && passwordInput.value.length >= 6) {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
        }
    }

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Non-AI generated authentic circular portraits and random profile names
        const randomProfiles = [
            { name: "Vikram Malhotra", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" },
            { name: "Ananya Sharma", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" },
            { name: "Rajesh Patel", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" },
            { name: "Pooja Verma", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" },
            { name: "Arjun Mehta", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80" },
            { name: "Sunita Rao", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80" },
            { name: "Devendra Joshi", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80" },
            { name: "Kavita Reddy", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80" }
        ];

        const chosen = randomProfiles[Math.floor(Math.random() * randomProfiles.length)];

        let profileUrl = "buyerProfile.html";
        let destination = "buyerMarketplace.html";

        if (selectedRole === "seller" || selectedRole === "farmer") {
            profileUrl = "sellerProfile.html";
            destination = "sellerDashboard.html";
        } else if (selectedRole === "transporter") {
            profileUrl = "transporterProfile.html";
            destination = "transporterDashboard.html";
        }

        const userData = {
            isLoggedIn: true,
            name: chosen.name,
            avatar: chosen.avatar,
            role: selectedRole,
            profileUrl: profileUrl
        };

        try {
            localStorage.setItem("khetse_user", JSON.stringify(userData));
        } catch (err) {
            console.warn("Could not save auth state", err);
        }

        window.location.href = destination;
    });
});

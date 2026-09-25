// notification.js - Search Bar (Left) and Day Filter Scroll Menu (Right)

document.addEventListener("DOMContentLoaded", () => {
    // Re-initialize Lucide icons
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }

    // DOM Elements
    const searchInput = document.getElementById("searchNotifications");
    const searchClearBtn = document.getElementById("searchClearBtn");
    const filterTriggerBtn = document.getElementById("filterTriggerBtn");
    const filterScrollMenu = document.getElementById("filterScrollMenu");
    const currentFilterLabel = document.getElementById("currentFilterLabel");
    const menuItems = document.querySelectorAll(".menu-item");
    const notificationCards = document.querySelectorAll(".notification-card");
    const emptyState = document.getElementById("notificationsEmptyState");
    const emptyResetBtn = document.getElementById("emptyResetBtn");
    const markAllReadBtn = document.getElementById("markAllReadBtn");
    const headerUnreadCount = document.getElementById("headerUnreadCount");
    const navNotifBadge = document.querySelector(".bell-icon .badge");

    // Current State
    let currentFilter = "all"; // 'all', 'today', '7', '30', '90', '180', '2026'
    let currentSearchQuery = "";

    // Toggle Dropdown Menu
    function toggleMenu(show) {
        const isOpen = filterScrollMenu.classList.contains("open");
        const nextState = (typeof show === "boolean") ? show : !isOpen;

        if (nextState) {
            filterScrollMenu.classList.add("open");
            filterTriggerBtn.setAttribute("aria-expanded", "true");
        } else {
            filterScrollMenu.classList.remove("open");
            filterTriggerBtn.setAttribute("aria-expanded", "false");
        }
    }

    // Filter Logic
    function applyFilters() {
        let visibleCount = 0;

        notificationCards.forEach(card => {
            const days = parseInt(card.getAttribute("data-days") || "0", 10);
            const year = card.getAttribute("data-year") || "2026";
            const title = (card.querySelector(".notification-title")?.textContent || "").toLowerCase();
            const message = (card.querySelector(".notification-message")?.textContent || "").toLowerCase();

            // 1. Time / Day filter match
            let matchesTime = false;
            if (currentFilter === "all") {
                matchesTime = true;
            } else if (currentFilter === "today") {
                matchesTime = (days === 0);
            } else if (currentFilter === "7") {
                matchesTime = (days <= 7);
            } else if (currentFilter === "30") {
                matchesTime = (days <= 30);
            } else if (currentFilter === "90") {
                matchesTime = (days <= 90);
            } else if (currentFilter === "180") {
                matchesTime = (days <= 180);
            } else if (currentFilter === "2026") {
                matchesTime = (year === "2026");
            }

            // 2. Search query match
            let matchesSearch = true;
            if (currentSearchQuery) {
                matchesSearch = title.includes(currentSearchQuery) || message.includes(currentSearchQuery);
            }

            if (matchesTime && matchesSearch) {
                card.classList.remove("hidden");
                visibleCount++;
            } else {
                card.classList.add("hidden");
            }
        });

        // Toggle Empty State
        if (emptyState) {
            if (visibleCount === 0) {
                emptyState.classList.add("visible");
            } else {
                emptyState.classList.remove("visible");
            }
        }
    }

    // Handle Menu Item Selection
    function selectFilter(filterVal, labelText) {
        currentFilter = filterVal;

        // Update trigger button label and active styling
        if (currentFilterLabel) {
            currentFilterLabel.textContent = labelText;
        }

        if (filterTriggerBtn) {
            if (filterVal !== "all") {
                filterTriggerBtn.classList.add("active-filter");
            } else {
                filterTriggerBtn.classList.remove("active-filter");
            }
        }

        // Update active class on menu items
        menuItems.forEach(item => {
            if (item.getAttribute("data-filter") === filterVal) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });

        // Close menu
        toggleMenu(false);

        // Apply filtering
        applyFilters();
    }

    // Trigger button click
    if (filterTriggerBtn) {
        filterTriggerBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Menu item clicks
    menuItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.stopPropagation();
            const filterVal = item.getAttribute("data-filter");
            const labelText = item.querySelector("span")?.textContent || "Filter";
            selectFilter(filterVal, labelText);
        });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (!e.target.closest("#filterMenuWrapper")) {
            toggleMenu(false);
        }
    });

    // Close menu on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            toggleMenu(false);
        }
    });

    // Search Input Handling
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            currentSearchQuery = e.target.value.trim().toLowerCase();
            if (searchClearBtn) {
                searchClearBtn.style.display = currentSearchQuery.length > 0 ? "inline-flex" : "none";
            }
            applyFilters();
        });
    }

    // Search Clear Button
    if (searchClearBtn) {
        searchClearBtn.addEventListener("click", () => {
            if (searchInput) searchInput.value = "";
            currentSearchQuery = "";
            searchClearBtn.style.display = "none";
            applyFilters();
        });
    }

    // Reset All Filters
    function resetAllFilters() {
        if (searchInput) searchInput.value = "";
        currentSearchQuery = "";
        if (searchClearBtn) searchClearBtn.style.display = "none";
        selectFilter("all", "All Time");
    }

    if (emptyResetBtn) {
        emptyResetBtn.addEventListener("click", resetAllFilters);
    }

    // Update Unread Counters
    function updateUnreadCounters() {
        const unreadCards = document.querySelectorAll(".notification-card.unread");
        const count = unreadCards.length;

        if (headerUnreadCount) {
            headerUnreadCount.textContent = count > 0 ? `${count} unread` : "0 unread";
            if (count === 0) {
                headerUnreadCount.style.background = "#f1f5f9";
                headerUnreadCount.style.color = "#64748b";
                headerUnreadCount.style.borderColor = "#e2e8f0";
            } else {
                headerUnreadCount.style.background = "#eaf7ed";
                headerUnreadCount.style.color = "#2F9E44";
                headerUnreadCount.style.borderColor = "rgba(47, 158, 68, 0.2)";
            }
        }

        if (navNotifBadge) {
            navNotifBadge.textContent = count;
            navNotifBadge.style.display = count > 0 ? "flex" : "none";
        }
    }

    // Mark All As Read
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener("click", () => {
            notificationCards.forEach(card => {
                card.classList.remove("unread");
                const toggleBtn = card.querySelector(".btn-card-read-toggle");
                if (toggleBtn) toggleBtn.textContent = "Mark unread";
            });
            updateUnreadCounters();
        });
    }

    // Individual Card Read / Unread toggle
    document.querySelectorAll(".btn-card-read-toggle").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const card = btn.closest(".notification-card");
            if (!card) return;

            if (card.classList.contains("unread")) {
                card.classList.remove("unread");
                btn.textContent = "Mark unread";
            } else {
                card.classList.add("unread");
                btn.textContent = "Mark as read";
            }
            updateUnreadCounters();
        });
    });

    // Initial setup
    updateUnreadCounters();
    applyFilters();
});

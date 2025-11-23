// Ensure the script runs only after the entire HTML document is fully loaded and parsed.
document.addEventListener('DOMContentLoaded', () => {
    // Get references to the sidebar, toggle button, and NAV BAR
    const menuToggle = document.getElementById('menu-toggle');
    const mobileSidebar = document.getElementById('mobile-sidebar');
    const navBar = document.querySelector('.nav'); // Get the nav element
    
    // NEW: Get references to the SVG icons
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-icon');

    // Only proceed if the necessary elements are found
    if (!menuToggle || !mobileSidebar || !hamburgerIcon || !closeIcon || !navBar) {
        console.error("Critical elements for sidebar toggle or nav bar not found.");
        return;
    }

    /**
     * Toggles the 'open' class on the sidebar to slide it in/out,
     * and updates the icon between hamburger and close.
     */
    function toggleSidebar() {
        // Only proceed if the sidebar is *not* currently animating (optional safeguard)
        // mobileSidebar.classList.toggle('open');
        
        // Use an explicit check to make closing logic clearer
        const isOpening = !mobileSidebar.classList.contains('open');

        if (isOpening) {
            mobileSidebar.classList.add('open');
            // Sidebar open: Show close icon, hide hamburger
            hamburgerIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
            // FIX: Prevent scrolling on the body when the sidebar is open
            document.body.style.overflow = 'hidden'; 
        } else {
            mobileSidebar.classList.remove('open');
            // Sidebar closed: Show hamburger icon, hide close
            hamburgerIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
            // FIX: Restore scrolling when the sidebar is closed
            document.body.style.overflow = ''; 
        }
    }
    
    // NEW FUNCTION: Explicitly closes the sidebar
    function closeSidebar() {
        if (mobileSidebar.classList.contains('open')) {
            toggleSidebar();
        }
    }

    // Event listener for the toggle button to open/close the sidebar
    menuToggle.addEventListener('click', (event) => {
        // Stop the click from bubbling up to the document listener below
        event.stopPropagation(); 
        toggleSidebar();
    });

    // Optional: Close sidebar when a link inside is clicked (simulates navigation)
    const mobileLinks = mobileSidebar.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Close the sidebar after a link is clicked
            closeSidebar();
        });
    });

    // =========================================================
    // NEW LOGIC: Close sidebar on outside click
    // =========================================================
    document.addEventListener('click', (event) => {
        // 1. Check if the sidebar is currently open
        if (!mobileSidebar.classList.contains('open')) {
            return; // Exit if not open
        }

        // 2. Check if the click target is inside the sidebar or the toggle button
        const isClickInsideSidebar = mobileSidebar.contains(event.target);
        // We explicitly check for the toggle element as well, 
        // even though the menuToggle's listener uses stopPropagation(), 
        // this is a safe fallback.
        const isClickOnToggle = menuToggle.contains(event.target);

        // 3. If the click is neither inside the sidebar nor on the toggle, close it
        if (!isClickInsideSidebar && !isClickOnToggle) {
            closeSidebar();
        }
    });

    /* =========================================================
       LOGIC: Scroll-Up-to-Show Navigation Bar
       ========================================================= */

    let lastScrollY = window.scrollY;
    // Set a threshold for when to start tracking scroll direction
    const scrollThreshold = 200; 

    /**
     * Handles the scroll event to show the nav bar when scrolling up,
     * and hide it when scrolling down (if past the threshold).
     */
    function handleScroll() {
        // FIX: If the sidebar is open, do nothing to prevent flicker/conflict
        if (mobileSidebar.classList.contains('open')) {
            return; 
        }

        // Current vertical scroll position
        const currentScrollY = window.scrollY;

        // 1. Scrolling Down (current position is greater than last position)
        if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
            // User is scrolling down AND is past the initial threshold
            // Hide the nav bar
            navBar.classList.remove('show-nav');
        } 
        // 2. Scrolling Up (current position is less than last position)
        else if (currentScrollY < lastScrollY) {
            // User is scrolling up
            // Show the nav bar
            navBar.classList.add('show-nav');
        }
        
        // 3. User is at the very top of the page (below the threshold)
        if (currentScrollY <= scrollThreshold) {
            // Keep the nav visible at the top, regardless of direction
            navBar.classList.add('show-nav');
        }

        // Update the last scroll position for the next check
        lastScrollY = currentScrollY;
    }

    // Attach the scroll handler to the window scroll event
    window.addEventListener('scroll', handleScroll);
    
    // Initial call to ensure the nav is visible when the page first loads
    if (window.scrollY <= scrollThreshold) {
        navBar.classList.add('show-nav');
    }
});
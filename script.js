// Ensure the script runs only after the entire HTML document is fully loaded and parsed.
document.addEventListener('DOMContentLoaded', () => {
    // Get references to the sidebar and toggle button using their IDs
    const menuToggle = document.getElementById('menu-toggle');
    const mobileSidebar = document.getElementById('mobile-sidebar');
    
    // NEW: Get references to the SVG icons
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-icon');

    // Only proceed if the necessary elements are found
    if (!menuToggle || !mobileSidebar || !hamburgerIcon || !closeIcon) {
        console.error("Critical elements for sidebar toggle not found.");
        return;
    }

    /**
     * Toggles the 'open' class on the sidebar to slide it in/out,
     * and updates the icon between hamburger and close.
     */
    function toggleSidebar() {
        mobileSidebar.classList.toggle('open');
        
        // Check if the sidebar is open and swap the SVG icon visibility
        if (mobileSidebar.classList.contains('open')) {
            // Sidebar open: Show close icon, hide hamburger
            hamburgerIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
        } else {
            // Sidebar closed: Show hamburger icon, hide close
            hamburgerIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }
    }

    // Event listener for the toggle button to open/close the sidebar
    menuToggle.addEventListener('click', toggleSidebar);

    // Optional: Close sidebar when a link inside is clicked (simulates navigation)
    // This improves the user experience on mobile.
    const mobileLinks = mobileSidebar.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Only close if it's currently open
            if (mobileSidebar.classList.contains('open')) {
                toggleSidebar(); 
            }
        });
    });
});
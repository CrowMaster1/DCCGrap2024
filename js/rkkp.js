// Media switcher

document.addEventListener('DOMContentLoaded', function () {
    // Attach event listener to document to handle all clicks
    document.addEventListener('click', function (event) {
        let clickedItem = event.target.closest('.dropdown-item.switch-btn');
        if (!clickedItem) return;

        event.preventDefault(); // Prevent the default anchor behavior

        // Finding the closest media container to the clicked item
        const mediaSection = clickedItem.closest('.media');
        if (!mediaSection) return;

        // Dropdown menu and toggle handling specific to the closest media container
        const dropdownMenu = clickedItem.closest('.dropdown-menu');
        const dropdownToggle = dropdownMenu.previousElementSibling;
        dropdownToggle.innerHTML = clickedItem.innerHTML; // Update the button text

        // Activate the clicked item and deactivate others within the same dropdown menu
        const items = Array.from(dropdownMenu.querySelectorAll('.dropdown-item'));
        items.forEach(item => {
            item.classList.remove('active');
        });
        clickedItem.classList.add('active');

        // Hide all media objects in the current media container and show the selected one
        const allContents = mediaSection.querySelectorAll('.media-object');
        allContents.forEach(content => {
            content.classList.add('hidden');
            content.classList.remove('show');
        });

        // Find the corresponding media object
        let index = items.indexOf(clickedItem);
        if (index > -1 && index < allContents.length) {
            allContents[index].classList.remove('hidden');
            allContents[index].classList.add('show');
        }
    });
});






// Media Sticky
document.addEventListener('DOMContentLoaded', function () {
    const fastlasButtons = document.querySelectorAll('.media-sticky-btn');

    fastlasButtons.forEach(button => {
        button.addEventListener('click', function () {
            const mediaDiv = this.closest('section').querySelector('.media');
            const mediaDescDivs = this.closest('section').querySelectorAll('.media-description');
            const section = this.closest('section');

            // Toggle sticky class on media div and hidden class on description
            mediaDiv.classList.toggle('media-sticky');
            mediaDescDivs.forEach(desc => desc.classList.toggle('hidden'));
            button.classList.toggle('active');

            // Define checkScroll function to handle the sticky logic
            const checkScroll = () => {
                let sectionBottom = section.getBoundingClientRect().bottom - window.innerHeight + 500;
                let mediaBottom = mediaDiv.getBoundingClientRect().bottom;

                // If the bottom of the section is above the bottom of the viewport or the media bottom is above the viewport (scrolling up past it)
                if (sectionBottom <= 0 || mediaBottom < 0) {
                    mediaDiv.classList.remove('media-sticky');
                    mediaDescDivs.forEach(desc => desc.classList.remove('hidden'));
                    button.classList.remove('active');
                    window.removeEventListener('scroll', checkScroll);
                }
            };

            // Ensure we don't attach multiple listeners
            window.removeEventListener('scroll', checkScroll);

            // If after toggling, the media-sticky class is present, add the listener
            if (mediaDiv.classList.contains('media-sticky')) {
                window.addEventListener('scroll', checkScroll);
            }
        });
    });
});

function copyLink(id) {
    const url = window.location.href.split('#')[0];
    const fullUrl = `${url}#${id}`;

    navigator.clipboard.writeText(fullUrl);
}
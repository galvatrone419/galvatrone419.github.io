document.addEventListener('DOMContentLoaded', function() {
    // Typing animation
    new Typed('.typing', {
        strings: ['Senior Machine Learning Engineer', 'AI Product Developer', 'Cloud & MLOps Specialist'],
        typeSpeed: 70,
        backSpeed: 50,
        loop: true
    });

    // Scroll animations
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});

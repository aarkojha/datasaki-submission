
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.querySelectorAll('.feature-card').forEach((card) => {
    const tl = gsap.timeline({ paused: true });
    
   
    tl.to(card.querySelector('.card'), {
        y: -10,
        scale: 1.02,
        boxShadow: '0 15px 40px rgba(0,200,83,0.15)',
        duration: 0.3
    })
    .to(card.querySelector('.feature-icon'), {
        color: '#1a237e',
        yoyo: true,
        repeat: 1,
        duration: 0.4
    }, '<')
    .fromTo(card.querySelector('.card-title'), 
        { y: 0 },
        { y: -5, duration: 0.2 }, 
    '<+=0.1')
    .fromTo(card.querySelector('.card-text'),
        { opacity: 1 },
        { opacity: 0.8, duration: 0.2 },
    '<');

    card.addEventListener('mouseenter', () => tl.play());
    card.addEventListener('mouseleave', () => tl.reverse());
});

document.querySelectorAll('.feature-card').forEach((card, index) => {
    
    const primaryDark = getComputedStyle(document.documentElement)
        .getPropertyValue('--primary-dark').trim();
    const accentColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent-color').trim();

    const tl = gsap.timeline({ paused: true });
    

    tl.to(card.querySelector('.card'), {
        y: -15,
        scale: 1.02,
        boxShadow: '0 20px 40px rgba(0, 200, 131, 0.2)', 
        duration: 0.4,
        ease: "power2.out"
    })
    
    .to(card.querySelector('.feature-icon'), {
        y: -5,
        scale: 1.1,
        color: primaryDark, 
        duration: 0.3
    }, '<')
    
    .to(card.querySelector('.card-title'), {
        y: -3,
        color: primaryDark, 
        duration: 0.2
    }, '<')
   
    .to(card.querySelector('.card-text'), {
        opacity: 0.9,
        y: 2,
        duration: 0.3
    }, '<');

    
    card.addEventListener('mouseenter', () => {
        gsap.set(card, { zIndex: 999 }); 
        tl.play();
    });
    
    card.addEventListener('mouseleave', () => {
        tl.reverse().then(() => {
            gsap.set(card, { zIndex: 'auto' }); 
        });
    });

   
    gsap.from(card, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: "back.out(1.7)"
    });
});
document.querySelectorAll('.pricing-card').forEach(card => {
    const accentColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent-color').trim();
    const cardElement = card.querySelector('.card');
    let isActive = false;

    card.addEventListener('click', () => {
        document.querySelectorAll('.pricing-card .card').forEach(otherCard => {
            if (otherCard !== cardElement) {
                gsap.to(otherCard, {
                    scale: 1,
                    borderColor: 'transparent',
                    duration: 0.3
                });
            }
        });

        if (!isActive) {
            gsap.to(cardElement, {
                scale: 1.05,
                borderColor: accentColor, 
                boxShadow: '0 10px 30px rgba(0,200,83,0.2)',
                duration: 0.3
            });
            isActive = true;
        } else {
            gsap.to(cardElement, {
                scale: 1,
                borderColor: 'transparent',
                duration: 0.3
            });
            isActive = false;
        }
    });
});
const testimonials = document.querySelectorAll('.testimonial-card');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let current = 0;

function updateTestimonials() {
  testimonials.forEach((card, index) => {
    card.classList.remove('active', 'prev', 'next');
    
    if(index === current) {
      card.classList.add('active');
    } 
    else if(index === (current - 1 + testimonials.length) % testimonials.length) {
      card.classList.add('prev');
    }
    else if(index === (current + 1) % testimonials.length) {
      card.classList.add('next');
    }
  });
}

prevBtn.addEventListener('click', () => {
  current = (current - 1 + testimonials.length) % testimonials.length;
  updateTestimonials();
});

nextBtn.addEventListener('click', () => {
  current = (current + 1) % testimonials.length;
  updateTestimonials();
});

updateTestimonials();

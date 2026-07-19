/**
 * Javascript Functionality for Abeer Fatima Foodstuff Trading Website
 * Includes: Sticky Nav, Mobile menu, Scroll Progress, Scroll Spy, 
 * Number Counter animation, Dynamic Products Catalog, Modals, Forms and Toast alerts.
 */

const init = () => {

    // ==========================================
    // 1. Sticky Navigation & Scroll Progress Bar
    // ==========================================
    const header = document.querySelector('.main-header');
    const scrollProgress = document.getElementById('scroll-progress');

    const handleScroll = () => {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;

        // Sticky Header effect
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Scroll Progress Bar percentage
        if (docHeight > 0 && scrollProgress) {
            const scrolledPercent = (scrollY / docHeight) * 100;
            scrollProgress.style.width = `${scrolledPercent}%`;
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // ==========================================
    // 2. Mobile Drawer Navigation Toggle
    // ==========================================
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');
    const drawerClose = document.querySelector('.drawer-close');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    const toggleDrawer = (open) => {
        if (open) {
            mobileDrawer.classList.add('open');
            drawerOverlay.classList.add('active');
            mobileToggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        } else {
            mobileDrawer.classList.remove('open');
            drawerOverlay.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = 'auto';
        }
    };

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => toggleDrawer(true));
    }

    if (drawerClose) {
        drawerClose.addEventListener('click', () => toggleDrawer(false));
    }

    if (drawerOverlay) {
        drawerOverlay.addEventListener('click', () => toggleDrawer(false));
    }

    drawerLinks.forEach(link => {
        link.addEventListener('click', () => toggleDrawer(false));
    });

    // ==========================================
    // 3. Scroll Spy Navigation Highlight
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const scrollSpy = () => {
        const currentScrollY = window.scrollY + 120; // offset header height

        sections.forEach(currentSection => {
            const sectionHeight = currentSection.offsetHeight;
            const sectionTop = currentSection.offsetTop;
            const sectionId = currentSection.getAttribute('id');

            if (currentScrollY > sectionTop && currentScrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', scrollSpy);

    // ==========================================
    // 3.5. Hero Parallax & Particles (3D Effect)
    // ==========================================
    const heroSection = document.getElementById('home');
    const heroCardStack = document.querySelector('.hero-card-stack');
    const floatingItems = document.querySelectorAll('.floating-item');

    // Generate particles
    const particlesOverlay = document.getElementById('particles-overlay');
    if (particlesOverlay) {
        for (let i = 0; i < 20; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            const size = Math.random() * 15 + 5;
            p.style.width = `${size}px`;
            p.style.height = `${size}px`;
            p.style.left = `${Math.random() * 100}%`;
            p.style.top = `${Math.random() * 100}%`;
            p.style.animationDuration = `${Math.random() * 10 + 10}s`;
            p.style.animationDelay = `${Math.random() * 5}s`;
            particlesOverlay.appendChild(p);
        }
    }

    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5);
            const yPos = (clientY / window.innerHeight - 0.5);

            // Rotate card stack
            if (heroCardStack) {
                heroCardStack.style.transform = `rotateY(${xPos * 20}deg) rotateX(${-yPos * 20}deg) translateZ(50px)`;
            }

            // Move floating background items (inverse parallax)
            floatingItems.forEach((item, index) => {
                const speed = (index + 1) * 20;
                item.style.transform = `translate(${xPos * speed}px, ${yPos * speed}px) translateZ(${speed}px)`;
            });
        });

        heroSection.addEventListener('mouseleave', () => {
            if (heroCardStack) {
                heroCardStack.style.transform = `rotateY(-10deg) rotateX(5deg) translateZ(0)`;
            }
            floatingItems.forEach(item => {
                item.style.transform = `translate(0, 0) translateZ(0)`;
            });
        });
    }

    // ==========================================
    // 4. Scroll Reveal Animations (Intersection Observer)
    // ==========================================
    const revealElements = document.querySelectorAll('.scroll-reveal');

    if ('IntersectionObserver' in window) {
        window.revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => window.revealObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('reveal-active'));
    }

    // ==========================================
    // 5. Stat Counter Increment Animation
    // ==========================================
    const statNums = document.querySelectorAll('.stat-num');

    const animateCounters = () => {
        statNums.forEach(counter => {
            const target = +counter.getAttribute('data-val');
            const duration = 2000;
            const stepTime = Math.max(Math.floor(duration / target), 15);
            let current = 0;

            const increment = setInterval(() => {
                if (target < 50) {
                    current += 1;
                } else if (target < 500) {
                    current += 2;
                } else {
                    current += 25;
                }

                if (current >= target) {
                    counter.innerText = target;
                    clearInterval(increment);
                } else {
                    counter.innerText = current;
                }
            }, stepTime);
        });
    };

    const homeSection = document.getElementById('home');
    if (homeSection && 'IntersectionObserver' in window) {
        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        statsObserver.observe(homeSection);
    } else {
        animateCounters();
    }

    // ==========================================
    // 6. Dynamic Products Database & Rendering
    //    With Load More Pagination (12 per page)
    // ==========================================
    const imageList = [
        'kitkat.jpg',
        'knoppers.jpg',
        'laughing_cow.jpg',
        'nescafe_3in1.jpg',
        'oreo_os.jpg',
        'toblerone.jpg',
        'vivident_blue.jpg',
        'vivident_green.jpg',
        'red_bull.png',
        'coca_cola.png',
        'monster_energy.png',
        'bounty-1744067_1280.jpg',
        'candy-bar-1735650_640.jpg',
        '-QuVHMsybqJtuAV-uSbA483fJTeOR7GzSqCJE35a5vDPkuMUatD4s964BLgn6yuqeeD3N9-54hM1FSIHv0GsNiUNqi_SUw4cker67_6aws77U3XUrPr7HIbbf1YrAMAgmg5i0YBtgo-uSKOgFAC-WZspePNY2gnW0CSx2zzfbismUZ7SVykGAFubo37rab58.jpg',
        '240_F_361840290_dSQ5kgbSTrF2BCZtj6my8z5YZOroFOqi.jpg',
        'bl-NC8mftpL74XE89PNSCY1cPwSUPcd8AnmnlGp4N92MTDR_CHiqSODU-MjgYbakN7ejzBhqMBm_SQvSkwf1VxUCuG2peTjBJnyZDgscKn5YSr-yaXHROrz7l1a9-jnlijNQP-uLkpHehNMXte20Vxu7Zm7Pj3RZUMDyMx7oi4Ritoj2JsM-UxEWq0uSJN92.jpg',
        'download.webp',
        'gettyimages-2151427784-612x612.jpg',
        'jNQzuvzd1j8OuN0poRHGfxvIgFCJVuS_rO7uZlGoDOaCBABpS5bcQVaS1r3sxvWAAx0aCtr3YtPacBIpWysvFtISoEJvqV0jZqv2Q9ZW-2rHmO2aPmPZYH3n3IMn8AmpbkHbC3oLKpBqwPhkeMKgyyy05tlc9E2LEsPGz2zOzIQZRTk7Ggdgi6XKrvUIlnQD.jpg',
        'PHOTO-2026-07-16-21-59-41 (1).jpg',
        'PHOTO-2026-07-16-21-59-41 (2).jpg',
        'PHOTO-2026-07-16-21-59-41.jpg',
        'PHOTO-2026-07-16-21-59-42 (1).jpg',
        'PHOTO-2026-07-16-21-59-42 (2).jpg',
        'PHOTO-2026-07-16-21-59-42.jpg',
        'PHOTO-2026-07-16-21-59-43 (1).jpg',
        'PHOTO-2026-07-16-21-59-43 (2).jpg',
        'PHOTO-2026-07-16-21-59-43.jpg',
        'PHOTO-2026-07-16-21-59-44 (1).jpg',
        'PHOTO-2026-07-16-21-59-44 (2).jpg',
        'PHOTO-2026-07-16-21-59-44 (3).jpg',
        'PHOTO-2026-07-16-21-59-44.jpg',
        'PHOTO-2026-07-16-21-59-45 (1).jpg',
        'PHOTO-2026-07-16-21-59-45 (2).jpg',
        'PHOTO-2026-07-16-21-59-45.jpg',
        'PHOTO-2026-07-16-21-59-46 (1).jpg',
        'PHOTO-2026-07-16-21-59-46 (2).jpg',
        'PHOTO-2026-07-16-21-59-46 (3).jpg',
        'PHOTO-2026-07-16-21-59-46.jpg',
        'PHOTO-2026-07-16-21-59-47 (1).jpg',
        'PHOTO-2026-07-16-21-59-47 (2).jpg',
        'PHOTO-2026-07-16-21-59-47.jpg',
        'PHOTO-2026-07-16-21-59-48 (1).jpg',
        'PHOTO-2026-07-16-21-59-48 (2).jpg',
        'PHOTO-2026-07-16-21-59-48.jpg',
        'PHOTO-2026-07-16-21-59-49 (1).jpg',
        'PHOTO-2026-07-16-21-59-49 (2).jpg',
        'PHOTO-2026-07-16-21-59-49.jpg',
        'PHOTO-2026-07-16-21-59-50 (2).jpg',
        'PHOTO-2026-07-16-21-59-51 (1).jpg',
        'PHOTO-2026-07-16-21-59-53 (2).jpg',
        'PHOTO-2026-07-16-21-59-54 (1).jpg',
        'PHOTO-2026-07-16-21-59-54 (2).jpg',
        'PHOTO-2026-07-16-21-59-54 (3).jpg',
        'PHOTO-2026-07-16-21-59-54.jpg',
        'PHOTO-2026-07-16-21-59-55 (1).jpg',
        'PHOTO-2026-07-16-21-59-55 (2).jpg',
        'PHOTO-2026-07-16-21-59-55.jpg',
        'PHOTO-2026-07-16-21-59-56 (1).jpg',
        'PHOTO-2026-07-16-21-59-56 (2).jpg',
        'PHOTO-2026-07-16-21-59-56 (3).jpg',
        'PHOTO-2026-07-16-21-59-56.jpg',
        'PHOTO-2026-07-16-21-59-57 (1).jpg',
        'PHOTO-2026-07-16-21-59-57 (2).jpg',
        'PHOTO-2026-07-16-21-59-57.jpg'
    ];

    const PRODUCTS_PER_PAGE = 12;
    let currentVisibleCount = 0;
    let currentFilter = 'all';

    const getProductDetails = (filename) => {
        const fn = filename.toLowerCase();

        const exactOverrides = {
            'candy-bar-1735650_640.jpg': { category: 'confectionery', brand: 'Mars', name: 'Twix Caramel Cookie Chocolate Bar' },
            '812cbakn1hl._ac_uf894,1000_ql80_.jpg': { category: 'coffee', brand: 'Nestlé', name: 'Nescafe Gold' },
            '-quvhmsybqjtuav-usba483fjteor7gzsqcje35a5vdpkumuatd4s964blgn6yuqeed3n9-54hm1fsihv0gsniunqi_suw4cker67_6aws77u3xurpr7hibbf1yramagmg5i0ybtgo-uskogfac-wzspepny2gnw0csx2zzfbismuz7svykgafubo37rab58.jpg': { category: 'beverages', brand: 'Cellucor', name: 'C4 Energy drink' },
            '240_f_361840290_dsq5kgbstrf2bcztj6my8z5yzorofoqi.jpg': { category: 'confectionery', brand: 'Nestlé', name: 'KitKat' },
            'bl-nc8mftpl74xe89pnscy1cpwsupcd8anmnlgp4n92mtdr_chiqsodu-mjgybakn7ejzbhqmbm_sqvskwf1vxucug2petjbjnyzdgsckn5ysr-yaxhrorz7l1a9-jnlijnqp-ulkphehnmxte20vxu7zm7pj3rzumdymx7oi4ritoj2jsm-uxewq0usjn92.jpg': { category: 'beverages', brand: 'Red Bull', name: 'Red Bull' },
            'download.webp': { category: 'coffee', brand: 'Nestlé', name: 'Nescafe' },
            'gettyimages-2151427784-612x612.jpg': { category: 'confectionery', brand: 'Mars', name: 'Snickers' },
            'jnqzuvzd1j8oun0porhgfxvigfcjvus_ro7uzlgodoacbabps5bcqvas1r3sxvwaax0actr3ytpacbipwysvftisoejvqv0jzqv2q9zw-2rhmo2apmpzyh3n3imn8ampbkhbc3olkpbqwphkemkgyyy05tlc9e2lespgz2zoziqzrtk7ggdgi6xkrvuilnqd.jpg': { category: 'beverages', brand: 'Boom Boom', name: 'Boom Boom Energy Drink' },
            'photo-2026-07-16-21-59-41 (1).jpg': { category: 'confectionery', brand: 'Mars', name: 'Galaxy' },
            'photo-2026-07-16-21-59-41 (2).jpg': { category: 'confectionery', brand: 'Nestlé', name: 'Nestle Quality Street Assorted Milk And Dark' },
            'photo-2026-07-16-21-59-41.jpg': { category: 'confectionery', brand: 'Nestlé', name: 'Nestle Quality Street Tub' },
            'photo-2026-07-16-21-59-42 (1).jpg': { category: 'confectionery', brand: 'Diablo', name: 'Diablo Sugar Free' },
            'photo-2026-07-16-21-59-42 (2).jpg': { category: 'confectionery', brand: 'Diablo', name: 'Diablo Sugar Free' },
            'photo-2026-07-16-21-59-42.jpg': { category: 'confectionery', brand: 'Nestlé', name: 'KitKat' },
            'photo-2026-07-16-21-59-43 (1).jpg': { category: 'beverages', brand: 'Perrier', name: 'Maison Perrier' },
            'photo-2026-07-16-21-59-43 (2).jpg': { category: 'confectionery', brand: 'Nestlé', name: 'Nestle Nesquik Cereal' },
            'photo-2026-07-16-21-59-43.jpg': { category: 'confectionery', brand: 'Oreo', name: 'Oreo O\'s Cocoa Flavoured' },
            'photo-2026-07-16-21-59-44 (1).jpg': { category: 'confectionery', brand: 'Nestlé', name: 'Nestle Lion' },
            'photo-2026-07-16-21-59-44 (2).jpg': { category: 'confectionery', brand: 'Nestlé', name: 'Nesquik Chocolate Breakfast Cereal' },
            'photo-2026-07-16-21-59-44 (3).jpg': { category: 'confectionery', brand: 'Nestlé', name: 'Taste Nesquick Alphabet' },
            'photo-2026-07-16-21-59-44.jpg': { category: 'confectionery', brand: 'Ferrero', name: 'Nutella B-Ready' },
            'photo-2026-07-16-21-59-45 (1).jpg': { category: 'confectionery', brand: 'Regato', name: 'REGATO CREAMY SANDWICH' },
            'photo-2026-07-16-21-59-45 (2).jpg': { category: 'confectionery', brand: 'Kinder', name: 'Kinder Bueno White Bars' },
            'photo-2026-07-16-21-59-45.jpg': { category: 'confectionery', brand: 'Kinder', name: 'Kinder Country Milk Chocolate Bar' },
            'photo-2026-07-16-21-59-46 (2).jpg': { category: 'confectionery', brand: 'Milka', name: 'Milka Alpine Milk Chocolate' },
            'photo-2026-07-16-21-59-46 (3).jpg': { category: 'confectionery', brand: 'Kinder', name: 'Kinder Bueno' },
            'photo-2026-07-16-21-59-46.jpg': { category: 'confectionery', brand: 'Milka', name: 'MILKA COOKIES' },
            'photo-2026-07-16-21-59-47 (1).jpg': { category: 'confectionery', brand: 'Kiri', name: 'kiri' },
            'photo-2026-07-16-21-59-47 (2).jpg': { category: 'confectionery', brand: 'Kiri', name: 'Kiri Cheese' },
            'photo-2026-07-16-21-59-47.jpg': { category: 'confectionery', brand: 'Kiri', name: 'Kiri Fresh Cream And Milk Cheese' },
            'photo-2026-07-16-21-59-48 (1).jpg': { category: 'confectionery', brand: 'Kraft', name: 'Kraft Processed Cheddar Cheese' },
            'photo-2026-07-16-21-59-48 (2).jpg': { category: 'confectionery', brand: 'Kraft', name: 'Kraft Cheddar Cheese Processed' },
            'photo-2026-07-16-21-59-48.jpg': { category: 'confectionery', brand: 'Bel Group', name: 'la vache qui rit cheese' },
            'photo-2026-07-16-21-59-49 (1).jpg': { category: 'confectionery', brand: 'Nestlé', name: 'kitkat' },
            'photo-2026-07-16-21-59-49.jpg': { category: 'coffee', brand: 'Nestlé', name: 'NESCAFÉ® Dolce Gusto®' },
            'photo-2026-07-16-21-59-50 (2).jpg': { category: 'confectionery', brand: 'Mars', name: 'm and m' },
            'photo-2026-07-16-21-59-51 (1).jpg': { category: 'confectionery', brand: 'Regato', name: 'regato' },
            'photo-2026-07-16-21-59-54 (1).jpg': { category: 'confectionery', brand: 'Vivident', name: 'Vivident 360 Watermelon Gum 33 gr' },
            'photo-2026-07-16-21-59-54 (2).jpg': { category: 'confectionery', brand: 'Ferrero', name: 'Nutella Hazelnut Spread With Cocoa' },
            'photo-2026-07-16-21-59-54 (3).jpg': { category: 'confectionery', brand: 'Vivident', name: 'VIVIDENT XYLIT 45 GUM W MINT 67G' },
            'photo-2026-07-16-21-59-54.jpg': { category: 'confectionery', brand: 'Vivident', name: 'Vivident Active Mint Gum 33 gr' },
            'photo-2026-07-16-21-59-55 (1).jpg': { category: 'confectionery', brand: 'Vivident', name: 'Vendita VIVIDENT XYLIT CUBE ICE BLUE | Farmacia Online | Farmaself' },
            'photo-2026-07-16-21-59-55 (2).jpg': { category: 'confectionery', brand: 'Vivident', name: 'Vivident 360 Mint Gum 33 gr' },
            'photo-2026-07-16-21-59-55.jpg': { category: 'confectionery', brand: 'Vivident', name: 'Vivident' },
            'photo-2026-07-16-21-59-56 (1).jpg': { category: 'confectionery', brand: 'Vivident', name: 'Vivident Fresh Blast Ice Mint-Menthol' },
            'photo-2026-07-16-21-59-56 (2).jpg': { category: 'confectionery', brand: 'Vivident', name: 'Vivident Extra Mint Gum 66 gr' },
            'photo-2026-07-16-21-59-56 (3).jpg': { category: 'confectionery', brand: 'Protein Bar', name: 'Protein Bar Lo Carb 20g protein' },
            'photo-2026-07-16-21-59-56.jpg': { category: 'confectionery', brand: 'Vivident', name: 'Vivident Storming Raspberry Flavored' },
            'photo-2026-07-16-21-59-57 (1).jpg': { category: 'confectionery', brand: 'Vivident', name: 'Vivident Storming Strawberry Gum' },
            'photo-2026-07-16-21-59-57 (2).jpg': { category: 'confectionery', brand: 'Vivident', name: 'Vivident Storming Watermelon Chewing Gum' },
            'photo-2026-07-16-21-59-57.jpg': { category: 'confectionery', brand: 'Vivident', name: 'Vivident 45-Min Gum Long-Lasting' }
        };

        if (exactOverrides[fn]) {
            return exactOverrides[fn];
        }

        let brand = 'Abeer Fatima';
        let name = 'Wholesale Confectionery';
        let category = 'confectionery';

        // 1. Coffee Category
        if (fn.includes('nescafe') || fn.includes('coffee') || fn.includes('3in1') || fn.includes('gold')) {
            category = 'coffee';
            if (fn.includes('gold')) {
                brand = 'Nestlé';
                name = 'Nescafe Gold Jar';
            } else if (fn.includes('3in1')) {
                brand = 'Nestlé';
                name = 'Nescafe Original 3-in-1';
            } else {
                brand = 'Nestlé';
                name = 'Premium Coffee';
            }
        }
        // 2. Beverages Category
        else if (fn.includes('red_bull') || fn.includes('coca_cola') || fn.includes('monster_energy')) {
            category = 'beverages';
            if (fn.includes('red_bull')) {
                brand = 'Red Bull';
                name = 'Red Bull Energy Drink';
            } else if (fn.includes('coca_cola')) {
                brand = 'Coca-Cola';
                name = 'Coca-Cola Original Taste';
            } else if (fn.includes('monster_energy')) {
                brand = 'Monster';
                name = 'Monster Energy Drink';
            }
        }
        // 3. Confectionery Category (Wafers, Chocolates, Chewing Gums, and leftover Grocery)
        else {
            category = 'confectionery';
            if (fn.includes('kitkat')) {
                brand = 'Nestlé';
                name = 'KitKat Milk Chocolate';
            } else if (fn.includes('toblerone')) {
                brand = 'Mondelēz';
                name = 'Toblerone Chocolate';
            } else if (fn.includes('knoppers')) {
                brand = 'Storck';
                name = 'Knoppers Wafer';
            } else if (fn.includes('vivident')) {
                brand = 'Vivident';
                name = fn.includes('blue') ? 'Vivident Peppermint' : 'Vivident Spearmint';
            } else if (fn.includes('bounty')) {
                brand = 'Mars Wrigley';
                name = 'Bounty Chocolate Bar';
            } else if (fn.includes('candy') || fn.includes('snickers')) {
                brand = 'Mars / Snickers';
                name = 'Wholesale Candy Pack';
            } else if (fn.includes('oreo')) {
                brand = 'Post / Oreo';
                name = "Oreo O's Cereal";
            } else if (fn.includes('cow') || fn.includes('cheese') || fn.includes('laughing')) {
                brand = 'Bel Group';
                name = 'Laughing Cow Cheese';
            } else if (fn.includes('812cbak')) {
                brand = 'Anchor / Kraft';
                name = 'Wholesale Butter Block';
            } else if (fn.includes('photo')) {
                const indexStr = filename.replace(/\D/g, '');
                const idx = parseInt(indexStr) || 0;

                const brands = ['Nestlé', 'Mondelēz', 'Ferrero Rocher', 'Mars Wrigley', 'Cadbury', 'Storck', 'Perfetti Van Melle', 'Bel Group', 'Unilever', 'Anchor'];
                brand = brands[idx % brands.length];

                const names = [
                    'Premium Chocolate Wafers',
                    'Hazelnut Spread Cream',
                    'Imported Biscuit Box',
                    'Crispy Wafer Squares',
                    'Chewy Caramel Bar',
                    'Fruity Gum Box',
                    'Assorted Cookies Carton',
                    'Consolidated Confectionery',
                    'Double Choco Cookies',
                    'Dairy Cream Spread'
                ];
                name = names[idx % names.length];
            } else {
                brand = 'Abeer Fatima';
                name = 'Wholesale Confectionery';
            }
        }

        return { brand, name, category };
    };

    // Build a single product card element
    const createProductCard = (filename, idx, animate = false, staggerIdx = 0) => {
        const { brand, name, category } = getProductDetails(filename);

        const card = document.createElement('article');
        card.className = 'product-card';
        card.setAttribute('data-category', category);
        card.id = `prod-dyn-${idx}`;

        if (animate) {
            card.style.opacity = '0';
            card.classList.add('card-animate-in');
            card.style.animationDelay = `${staggerIdx * 0.08}s`;
        }

        card.innerHTML = `
            <div class="card-shine"></div>
            <div class="product-img-wrapper">
                <img src="assets/${filename}" alt="${name}" class="product-img" loading="lazy">
                <div class="product-overlay">
                    <div class="product-overlay-content">
                        <div class="overlay-actions">
                            <button class="btn btn-secondary btn-sm open-inquiry-btn" data-product="${name}">
                                <i class="fa-solid fa-circle-info"></i> Inquire
                            </button>
                            <a href="https://wa.me/971586724436?text=Hi!+I+am+interested+in+buying+${encodeURIComponent(name)}+in+bulk.+Please+send+pricing." target="_blank" class="btn btn-whatsapp btn-sm">
                                <i class="fa-brands fa-whatsapp"></i> Chat
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="product-info-bottom">
                <span class="product-brand">${brand}</span>
                <h3 class="product-title-bottom">${name}</h3>
            </div>
        `;

        // Bind inquiry modal
        const inquiryBtn = card.querySelector('.open-inquiry-btn');
        if (inquiryBtn) {
            inquiryBtn.addEventListener('click', () => {
                toggleModal(true, inquiryBtn.getAttribute('data-product'));
            });
        }

        // 3D Mouse-tracking tilt effect
        setupCardTilt(card);

        return card;
    };

    // Update Load More button visibility
    const updateLoadMoreBtn = () => {
        const loadMoreWrapper = document.getElementById('load-more-wrapper');
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (!loadMoreWrapper || !loadMoreBtn) return;

        // Get the filtered list
        const filteredList = currentFilter === 'all'
            ? imageList
            : imageList.filter((f, i) => getProductDetails(f).category === currentFilter);

        if (currentVisibleCount >= filteredList.length) {
            loadMoreWrapper.style.display = 'none';
        } else {
            loadMoreWrapper.style.display = 'block';
            const remaining = filteredList.length - currentVisibleCount;
            loadMoreBtn.innerHTML = `<i class="fa-solid fa-arrow-rotate-right load-icon"></i> Load More Products (${remaining} left)`;
        }
    };

    // Render initial batch of products
    const renderProducts = () => {
        const grid = document.getElementById('dynamic-products-grid');
        if (!grid) return;

        grid.innerHTML = '';
        currentVisibleCount = 0;

        const filteredList = currentFilter === 'all'
            ? imageList
            : imageList.filter(f => getProductDetails(f).category === currentFilter);

        const batch = filteredList.slice(0, PRODUCTS_PER_PAGE);
        batch.forEach((filename, staggerIdx) => {
            const originalIdx = imageList.indexOf(filename);
            const card = createProductCard(filename, originalIdx, true, staggerIdx);
            grid.appendChild(card);
        });

        currentVisibleCount = batch.length;
        updateLoadMoreBtn();
    };

    // Load More — append next batch
    const loadMoreProducts = () => {
        const grid = document.getElementById('dynamic-products-grid');
        if (!grid) return;

        const filteredList = currentFilter === 'all'
            ? imageList
            : imageList.filter(f => getProductDetails(f).category === currentFilter);

        const nextBatch = filteredList.slice(currentVisibleCount, currentVisibleCount + PRODUCTS_PER_PAGE);

        nextBatch.forEach((filename, staggerIdx) => {
            const originalIdx = imageList.indexOf(filename);
            const card = createProductCard(filename, originalIdx, true, staggerIdx);
            grid.appendChild(card);
        });

        currentVisibleCount += nextBatch.length;
        updateLoadMoreBtn();
    };

    // Render initially
    renderProducts();

    // Load More button click
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreProducts);
    }

    // ==========================================
    // 7. Product Filter Logic (works with pagination)
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            currentFilter = btn.getAttribute('data-filter');
            renderProducts(); // Re-render from scratch with new filter
        });
    });

    // ==========================================
    // 7b. 3D Mouse-Tracking Tilt Effect
    // ==========================================
    function setupCardTilt(card) {
        const maxTilt = 8; // degrees

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = ((x - centerX) / centerX) * maxTilt;
            const rotateX = ((centerY - y) / centerY) * maxTilt;

            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;

            // Update shine position
            const shine = card.querySelector('.card-shine');
            if (shine) {
                const percX = ((x / rect.width) * 100).toFixed(1);
                const percY = ((y / rect.height) * 100).toFixed(1);
                shine.style.setProperty('--mouse-x', `${percX}%`);
                shine.style.setProperty('--mouse-y', `${percY}%`);
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s ease, border-color 0.4s ease';
            setTimeout(() => {
                card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s ease, border-color 0.4s ease';
            }, 600);
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'box-shadow 0.5s ease, border-color 0.4s ease';
        });
    }

    // ==========================================
    // 8. Inquiry Dialog Modals
    // ==========================================
    const modal = document.getElementById('inquiry-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalCloseBtn = document.querySelector('.modal-close');
    const modalProductName = document.getElementById('modal-product-name');
    const modalHiddenInput = document.getElementById('modal-hidden-product');

    const toggleModal = (open, product = '') => {
        if (open) {
            modalProductName.innerText = product;
            modalHiddenInput.value = product;
            modal.classList.add('open');
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            modal.classList.remove('open');
            modalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => toggleModal(false));
    }
    if (modalOverlay) {
        modalOverlay.addEventListener('click', () => toggleModal(false));
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            toggleModal(false);
        }
    });

    // ==========================================
    // 9. B2B Toast Notification System
    // ==========================================
    const toast = document.getElementById('toast-notification');
    const toastTitle = document.getElementById('toast-title');
    const toastText = document.getElementById('toast-text');
    const toastClose = document.querySelector('.toast-close');
    let toastTimeout;

    const showToast = (title, message, isSuccess = true) => {
        clearTimeout(toastTimeout);
        toastTitle.innerText = title;
        toastText.innerText = message;

        const icon = toast.querySelector('.toast-icon');
        if (isSuccess) {
            icon.className = 'fa-solid fa-circle-check toast-icon';
            icon.style.color = 'var(--accent)';
        } else {
            icon.className = 'fa-solid fa-circle-xmark toast-icon';
            icon.style.color = '#ff4d4d';
        }

        toast.classList.add('show');

        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
    };

    if (toastClose) {
        toastClose.addEventListener('click', () => {
            toast.classList.remove('show');
        });
    }

    // ==========================================
    // 10. Form Submission Handlers (Demo B2B)
    // ==========================================
    const inquiryForm = document.getElementById('wholesale-inquiry-form');
    const modalInquiryForm = document.getElementById('modal-inquiry-form');

    const submitFormHandler = (e, formElement, isModal = false) => {
        e.preventDefault();

        const submitBtn = formElement.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processing Quote...';

        // Extract form data
        const formData = new FormData(formElement);
        let bodyContent = "<h3>New Wholesale Inquiry</h3><br/>";
        for (let [key, value] of formData.entries()) {
            bodyContent += `<strong>${key.replace(/_/g, ' ').toUpperCase()}</strong>: ${value}<br/>`;
        }

        const emailParams = {
            name: formData.get("name") || "N/A",
            email: formData.get("email") || "N/A",
            phone: formData.get("phone") || "N/A",
            company: formData.get("company") || "N/A",
            product_interest: formData.get("product_interest") || formData.get("product_name") || "N/A",
            message: formData.get("message") || formData.get("volume") || "N/A"
        };

        emailjs.send("service_q2zjq9c", "template_tjdk2ld", emailParams)
            .then(function() {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                formElement.reset();
                if (isModal) {
                    toggleModal(false);
                }
                showToast(
                    'Quote Inquiry Received',
                    'Thank you! We will contact you shortly.',
                    true
                );
            }, function(error) {
                console.error("EmailJS Error:", error);
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                showToast(
                    'Error Sending Inquiry',
                    'There was a problem processing your request. Please check your internet connection.',
                    false
                );
                console.error("EmailJS Exception:", err);
            });
    };

    if (inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => submitFormHandler(e, inquiryForm, false));
    }

    if (modalInquiryForm) {
        modalInquiryForm.addEventListener('submit', (e) => submitFormHandler(e, modalInquiryForm, true));
    }

};

// Bulletproof readiness execution to prevent DOMContentLoaded race conditions
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

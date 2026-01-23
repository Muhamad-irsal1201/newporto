  AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
        
        // Tilt Effect for Cards
        document.querySelectorAll('.glass-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateY = (x - centerX) / 25;
                const rotateX = (centerY - y) / 25;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
        
        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Form Submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
        
        // Parallax Effect
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const polymorphs = document.querySelectorAll('.polymorph');
            
            polymorphs.forEach((poly, index) => {
                const speed = 0.1 + (index * 0.05);
                poly.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
            });
            
            // Update active nav link
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrolled >= (sectionTop - 150)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === `#${current}`) {
                    link.style.color = 'var(--primary-cyan)';
                }
            });
        });
        
        // Animate Skill Bars on Scroll
        const skillBars = document.querySelectorAll('.skill-progress');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 300);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => observer.observe(bar));
        
        // Create Simple 3D Scene for Hero
        function init3DBackground() {
            try {
                const canvas = document.createElement('canvas');
                canvas.style.position = 'fixed';
                canvas.style.top = '0';
                canvas.style.left = '0';
                canvas.style.width = '100%';
                canvas.style.height = '100%';
                canvas.style.zIndex = '-2';
                canvas.style.opacity = '0.1';
                document.body.appendChild(canvas);
                
                const scene = new THREE.Scene();
                const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
                const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
                
                renderer.setSize(window.innerWidth, window.innerHeight);
                
                // Create floating geometry
                const geometry = new THREE.IcosahedronGeometry(1, 0);
                const material = new THREE.MeshPhongMaterial({
                    color: 0x00f2fe,
                    emissive: 0x0066ff,
                    shininess: 100,
                    transparent: true,
                    opacity: 0.3
                });
                
                const shapes = [];
                for (let i = 0; i < 10; i++) {
                    const shape = new THREE.Mesh(geometry, material.clone());
                    shape.position.set(
                        (Math.random() - 0.5) * 20,
                        (Math.random() - 0.5) * 20,
                        (Math.random() - 0.5) * 20
                    );
                    shape.scale.setScalar(Math.random() * 0.5 + 0.3);
                    scene.add(shape);
                    shapes.push(shape);
                }
                
                // Add lights
                const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
                scene.add(ambientLight);
                
                const directionalLight = new THREE.DirectionalLight(0x00ffff, 0.5);
                directionalLight.position.set(5, 5, 5);
                scene.add(directionalLight);
                
                camera.position.z = 5;
                
                // Animation loop
                function animate() {
                    requestAnimationFrame(animate);
                    
                    shapes.forEach((shape, i) => {
                        shape.rotation.x += 0.005;
                        shape.rotation.y += 0.003;
                        shape.position.y += Math.sin(Date.now() * 0.001 + i) * 0.01;
                    });
                    
                    renderer.render(scene, camera);
                }
                
                animate();
                
                // Handle resize
                window.addEventListener('resize', () => {
                    camera.aspect = window.innerWidth / window.innerHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(window.innerWidth, window.innerHeight);
                });
            } catch (e) {
                console.log('3D background not supported');
            }
        }
        
        // Initialize on load
        window.addEventListener('load', () => {
            init3DBackground();
        });
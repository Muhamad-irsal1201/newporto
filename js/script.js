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

        let rotateY = (x - centerX) / 40;
        let rotateX = (centerY - y) / 40;

        rotateX = Math.max(-6, Math.min(6, rotateX));
        rotateY = Math.max(-6, Math.min(6, rotateY));

        card.style.transform =
          `perspective(1000px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)
           translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform =
          'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
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

        // themes mode
        const toggle = document.getElementById("themeToggle");
        const body = document.body;

        toggle.addEventListener("click", (e) => {
            e.preventDefault();
            body.classList.toggle("light");
            body.classList.toggle("dark");
        });

        // language
       /* ================================
   TRANSLATION (i18n)
================================ */

const translations = {
  en: {
    hero: {
      title: "Building Digital Experiences That Inspire & Transform",
      desc: "I'm Muhamad Irsal, a passionate Developer specializing in modern web technologies, 3D graphics, and interactive experiences that push boundaries."
    },

    about: {
      title: "About Me",
      subtitle: "Crafting digital solutions with passion and precision"
    },

    skills: {
      title: "Technical Expertise",
      subtitle: "Mastering the tools and technologies that power modern digital experiences"
    },

    projects: {
      title: "Featured Projects",
      subtitle: "Showcasing innovative solutions that blend creativity with technology"
    },

    experience: {
      title: "Experience & Education",
      subtitle: "My journey through technology and education",
      e1: {
        role: "IT Mentor & Educator",
        company: "Wowlab Japan",
        date: "2025 - Present",
        desc: "Guiding Japanese students in IT career development and technical skills."
      },
      e2: {
        role: "Full Stack Developer",
        company: "Freelance & Contract",
        date: "2023 - Present",
        desc: "Developing web applications and digital solutions for various clients."
      },
      e3: {
        role: "Bachelor's in Information Technology",
        company: "University Graduate",
        date: "2021 - 2025",
        desc: "Specialized in web technologies and software development."
      }
    },

    contact: {
      title: "Get In Touch",
      subtitle: "Let's create something amazing together"
    },

    footer: {
      desc: "Creating exceptional digital experiences through innovative web development and creative design solutions."
    }
  },

  id: {
    hero: {
      title: "Membangun Pengalaman Digital yang Menginspirasi & Berdampak",
      desc: "Saya Muhamad Irsal, seorang Developer yang berfokus pada teknologi web modern, grafis 3D, dan pengalaman interaktif."
    },

    about: {
      title: "Tentang Saya",
      subtitle: "Menciptakan solusi digital dengan semangat dan presisi"
    },

    skills: {
      title: "Keahlian Teknis",
      subtitle: "Menguasai teknologi yang mendukung pengalaman digital modern"
    },

    projects: {
      title: "Proyek Unggulan",
      subtitle: "Menampilkan solusi inovatif yang menggabungkan kreativitas dan teknologi"
    },

    experience: {
      title: "Pengalaman & Pendidikan",
      subtitle: "Perjalanan saya di dunia teknologi dan pendidikan",
      e1: {
        role: "Mentor & Edukator IT",
        company: "Wowlab Jepang",
        date: "2025 - Sekarang",
        desc: "Membimbing siswa Jepang dalam pengembangan karier IT dan keterampilan teknis."
      },
      e2: {
        role: "Full Stack Developer",
        company: "Freelance & Kontrak",
        date: "2023 - Sekarang",
        desc: "Mengembangkan aplikasi web dan solusi digital untuk berbagai klien."
      },
      e3: {
        role: "Sarjana Teknologi Informasi",
        company: "Lulusan Universitas",
        date: "2021 - 2025",
        desc: "Berfokus pada teknologi web dan pengembangan perangkat lunak."
      }
    },

    contact: {
      title: "Hubungi Saya",
      subtitle: "Mari ciptakan sesuatu yang luar biasa bersama"
    },

    footer: {
      desc: "Menciptakan pengalaman digital berkualitas melalui pengembangan web inovatif dan desain kreatif."
    }
  },

  jp: {
    hero: {
      title: "人々を感動させ、変革するデジタル体験を構築",
      desc: "私はムハマド・イルサル。最新のWeb技術、3Dグラフィックス、インタラクティブ体験を専門とする開発者です。"
    },

    about: {
      title: "自己紹介",
      subtitle: "情熱と正確さでデジタルソリューションを構築"
    },

    skills: {
      title: "技術スキル",
      subtitle: "現代のデジタル体験を支える技術を習得"
    },

    projects: {
      title: "主なプロジェクト",
      subtitle: "創造性と技術を融合した革新的なソリューション"
    },

    experience: {
      title: "経験・学歴",
      subtitle: "テクノロジーと教育における私の歩み",
      e1: {
        role: "ITメンター・教育者",
        company: "Wowlab Japan",
        date: "2025年〜現在",
        desc: "日本人学生にITキャリアと技術スキルを指導。"
      },
      e2: {
        role: "フルスタック開発者",
        company: "フリーランス・契約",
        date: "2023年〜現在",
        desc: "様々なクライアント向けにWebアプリケーションを開発。"
      },
      e3: {
        role: "情報技術学士",
        company: "大学卒業",
        date: "2021年〜2025年",
        desc: "Web技術とソフトウェア開発を専攻。"
      }
    },

    contact: {
      title: "お問い合わせ",
      subtitle: "一緒に素晴らしいものを作りましょう"
    },

    footer: {
      desc: "革新的なWeb開発とクリエイティブなデザインで卓越したデジタル体験を創造。"
    }
  }
};

/* ================================
   APPLY TRANSLATION
================================ */

function setLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const keys = el.dataset.i18n.split(".");
    let text = translations[lang];

    keys.forEach(k => {
      if (text) text = text[k];
    });

    if (text) el.innerText = text;
  });

  localStorage.setItem("lang", lang);
}

/* ================================
   LANGUAGE BUTTON EVENT
================================ */

document.querySelectorAll(".lang-switcher button").forEach(btn => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.lang;
    setLanguage(lang);
  });
});

/* ================================
   INIT DEFAULT LANGUAGE
================================ */

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "id";
  setLanguage(savedLang);
});


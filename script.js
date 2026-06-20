/**
 * ================================================================
 * DAIANE RIVEIRO — Landing Page Premium
 * JavaScript Vanilla (ES6+)
 * Features: Loader, Custom Cursor, Scroll Reveal, DISC Interativo,
 *           Validação de Formulário, Contagem animada, Partículas,
 *           Menu Mobile, Scroll Progress, Back to Top.
 * ================================================================
 */
document.addEventListener('DOMContentLoaded', () => {

    // --- 0. Page Loader ---
    const pageLoader = document.getElementById('pageLoader');
    if (pageLoader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                pageLoader.classList.add('hidden');
            }, 1600);
        });
        // Fallback caso o load não dispare em tempo
        setTimeout(() => {
            pageLoader.classList.add('hidden');
        }, 3000);
    }

    // --- 1. Custom Cursor (Desktop Only) ---
    const cursor = document.getElementById('customCursor');
    const cursorDot = document.getElementById('customCursorDot');

    if (cursor && cursorDot && window.matchMedia('(pointer: fine)').matches) {
        cursor.style.display = 'block';
        cursorDot.style.display = 'block';

        let cursorX = 0, cursorY = 0;
        let dotX = 0, dotY = 0;

        document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
            cursorDot.style.left = cursorX + 'px';
            cursorDot.style.top = cursorY + 'px';
        });

        function animateCursor() {
            dotX += (cursorX - dotX) * 0.15;
            dotY += (cursorY - dotY) * 0.15;
            cursor.style.left = dotX + 'px';
            cursor.style.top = dotY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Grow cursor on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .disc-btn, .matrix-quad, input, select, textarea');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.borderColor = 'rgba(242, 161, 198, 0.7)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.borderColor = 'rgba(242, 161, 198, 0.4)';
            });
        });
    }

    // --- 2. Menu Mobile Toggle ---
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            navToggle.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });
    }

    // Fechar menu mobile ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link, .nav-btn');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    });

    // --- 3. Header Scroll Effect & Progress Bar ---
    const header = document.getElementById('siteHeader');
    const scrollProgress = document.getElementById('scrollProgress');
    const backToTop = document.getElementById('backToTop');

    function handleScroll() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        // Header style
        if (header) {
            header.classList.toggle('scrolled', scrollTop > 60);
        }

        // Progress bar
        if (scrollProgress) {
            scrollProgress.style.width = scrollPercent + '%';
        }

        // Back to top button
        if (backToTop) {
            backToTop.classList.toggle('visible', scrollTop > 500);
        }

        // Active nav link highlight
        updateActiveNavLink();
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Back to top click
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 4. Active Nav Link Highlight ---
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNavLink() {
        const scrollY = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // --- 5. Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('[data-reveal]');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, parseInt(delay));
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 6. Seletor Interativo DISC ---
    const discButtons = document.querySelectorAll('.disc-btn');
    const matrixQuads = document.querySelectorAll('.matrix-quad');
    const discTitle = document.getElementById('discTitle');
    const discText = document.getElementById('discText');
    const discTip = document.getElementById('discTip');
    const discIcon = document.getElementById('discIcon');

    const discData = {
        d: {
            title: "Dominância (Resultados e Ação)",
            text: "Pessoas com perfil Dominante são focadas em resultados, competitivas e motivadas por desafios. Em vendas, são diretas e decididas. Sob estresse, tendem a ficar impacientes. Compreender o perfil D ajuda a acelerar negociações objetivas.",
            tip: "Seja objetivo, vá direto ao ponto, foque em números, resultados e dê autonomia de escolha.",
            icon: "fa-solid fa-bolt"
        },
        i: {
            title: "Influência (Comunicação e Conexão)",
            text: "Profissionais Influentes são altamente comunicativos, entusiastas e persuasivos. São movidos por reconhecimento social e cooperação. Em vendas, criam conexões imediatas, mas podem perder o foco nos detalhes operacionais.",
            tip: "Valorize suas ideias, crie um clima amigável, conte histórias e evite ser excessivamente formal ou detalhista.",
            icon: "fa-solid fa-comments"
        },
        s: {
            title: "Estabilidade (Consistência e Empatia)",
            text: "Pessoas Estáveis são pacientes, leais, persistentes e ótimas ouvintes. Buscam segurança e ambientes previsíveis. Em vendas, preferem processos estruturados e baseados em confiança. Sob estresse, resistem a mudanças bruscas.",
            tip: "Não pressione por decisões rápidas, demonstre segurança, apresente garantias e construa uma relação de confiança de longo prazo.",
            icon: "fa-solid fa-handshake"
        },
        c: {
            title: "Conformidade (Precisão e Qualidade)",
            text: "Perfis Conformes são analíticos, disciplinados, detalhistas e focados em regras e qualidade. Valorizam a precisão técnica. Em vendas, exigem dados consistentes antes de decidir e sob estresse podem se tornar excessivamente críticos.",
            tip: "Forneça fatos concretos, detalhes técnicos organizados, dados estatísticos e dê tempo para que analisem os termos.",
            icon: "fa-solid fa-chart-bar"
        }
    };

    function updateDiscView(profile) {
        const data = discData[profile];
        if (!data) return;

        // Atualizar textos com transição suave
        const contentBox = document.getElementById('discContent');
        if (contentBox) {
            contentBox.style.opacity = '0';
            contentBox.style.transform = 'translateY(10px)';

            setTimeout(() => {
                if (discTitle) discTitle.textContent = data.title;
                if (discText) discText.textContent = data.text;
                if (discTip) discTip.textContent = data.tip;
                if (discIcon) discIcon.innerHTML = `<i class="${data.icon}"></i>`;

                contentBox.style.opacity = '1';
                contentBox.style.transform = 'translateY(0)';
            }, 200);
        }

        // Atualizar botões
        discButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-disc') === profile);
        });

        // Atualizar quadrantes da matriz
        matrixQuads.forEach(quad => {
            quad.classList.toggle('active', quad.getAttribute('data-disc') === profile);
        });
    }

    discButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            updateDiscView(btn.getAttribute('data-disc'));
        });
    });

    matrixQuads.forEach(quad => {
        quad.addEventListener('click', () => {
            updateDiscView(quad.getAttribute('data-disc'));
        });
    });

    // --- 7. Animação de Contagem dos Números ---
    const stats = document.querySelectorAll('.stat-number');

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();

        function updateCount(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out cubic)
            const eased = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.round(eased * target);

            if (target === 98) {
                el.textContent = currentValue + '%';
            } else if (target === 1500) {
                if (currentValue >= 1000) {
                    el.textContent = (currentValue / 1000).toFixed(1) + 'k+';
                } else {
                    el.textContent = currentValue;
                }
            } else if (target === 50) {
                el.textContent = currentValue + '+';
            } else {
                el.textContent = currentValue;
            }

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                // Valor final
                if (target === 98) el.textContent = '98%';
                else if (target === 1500) el.textContent = '1.5k+';
                else if (target === 50) el.textContent = '50+';
            }
        }

        requestAnimationFrame(updateCount);
    }

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => statsObserver.observe(stat));

    // --- 8. Validação de Formulário Premium ---
    const form = document.getElementById('contactForm');
    const successAlert = document.getElementById('formSuccess');

    if (form) {
        // Máscara de telefone
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 11) value = value.slice(0, 11);

                if (value.length > 6) {
                    value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
                } else if (value.length > 2) {
                    value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
                } else if (value.length > 0) {
                    value = `(${value}`;
                }
                e.target.value = value;
            });
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;

            // Campos
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const phoneFormInput = document.getElementById('phone');
            const serviceSelect = document.getElementById('service');

            // Validar Nome
            if (!nameInput || nameInput.value.trim().length < 3) {
                if (nameInput) nameInput.parentElement.classList.add('invalid');
                isValid = false;
            } else {
                nameInput.parentElement.classList.remove('invalid');
            }

            // Validar E-mail
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput || !emailRegex.test(emailInput.value.trim())) {
                if (emailInput) emailInput.parentElement.classList.add('invalid');
                isValid = false;
            } else {
                emailInput.parentElement.classList.remove('invalid');
            }

            // Validar Telefone
            if (phoneFormInput) {
                const cleanPhone = phoneFormInput.value.replace(/\D/g, '');
                if (cleanPhone.length < 10 || cleanPhone.length > 11) {
                    phoneFormInput.parentElement.classList.add('invalid');
                    isValid = false;
                } else {
                    phoneFormInput.parentElement.classList.remove('invalid');
                }
            }

            // Validar Serviço
            if (!serviceSelect || serviceSelect.value === '') {
                if (serviceSelect) serviceSelect.parentElement.classList.add('invalid');
                isValid = false;
            } else {
                serviceSelect.parentElement.classList.remove('invalid');
            }

            // Se tudo estiver OK, simular envio
            if (isValid) {
                const submitBtn = document.getElementById('submitBtn');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    const btnText = submitBtn.querySelector('span');
                    const btnLoader = submitBtn.querySelector('.btn-loader');
                    if (btnText) btnText.textContent = 'Enviando...';
                    if (btnLoader) btnLoader.style.display = 'block';
                }

                // Simula requisição de 2s
                setTimeout(() => {
                    form.style.display = 'none';
                    if (successAlert) successAlert.style.display = 'flex';
                }, 2000);
            }
        });

        // Limpar mensagens de erro ao digitar/interagir
        form.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('input', () => {
                if (input.value.trim() !== '') {
                    input.parentElement.classList.remove('invalid');
                }
            });
            input.addEventListener('change', () => {
                if (input.value !== '') {
                    input.parentElement.classList.remove('invalid');
                }
            });
        });
    }

    // --- 9. Hero Particles Canvas ---
    const canvas = document.getElementById('heroParticles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;

        function resizeCanvas() {
            const hero = document.getElementById('inicio');
            if (hero) {
                canvas.width = hero.offsetWidth;
                canvas.height = hero.offsetHeight;
            }
        }

        function createParticles() {
            particles = [];
            const count = Math.min(Math.floor(canvas.width * canvas.height / 25000), 50);

            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 2 + 0.5,
                    speedX: (Math.random() - 0.5) * 0.3,
                    speedY: (Math.random() - 0.5) * 0.3,
                    opacity: Math.random() * 0.3 + 0.1,
                    pulseSpeed: Math.random() * 0.02 + 0.005,
                    pulsePhase: Math.random() * Math.PI * 2
                });
            }
        }

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.x += p.speedX;
                p.y += p.speedY;
                p.pulsePhase += p.pulseSpeed;

                // Wrap around edges
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                const currentOpacity = p.opacity + Math.sin(p.pulsePhase) * 0.1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(242, 161, 198, ${Math.max(0, currentOpacity)})`;
                ctx.fill();
            });

            // Draw connections
            particles.forEach((p1, i) => {
                particles.slice(i + 1).forEach(p2 => {
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(242, 161, 198, ${0.03 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });

            animationId = requestAnimationFrame(drawParticles);
        }

        resizeCanvas();
        createParticles();
        drawParticles();

        window.addEventListener('resize', () => {
            resizeCanvas();
            createParticles();
        });

        // Pause particles when not visible
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!animationId) drawParticles();
                } else {
                    if (animationId) {
                        cancelAnimationFrame(animationId);
                        animationId = null;
                    }
                }
            });
        }, { threshold: 0.1 });

        const heroSection = document.getElementById('inicio');
        if (heroSection) heroObserver.observe(heroSection);
    }

    // --- 10. Smooth Scroll para Anchors ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 80;
                const elementPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 11. Stat Bars Animation ---
    const statBars = document.querySelectorAll('.stat-bar-fill');
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.style.getPropertyValue('--fill-width');
                barObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statBars.forEach(bar => {
        bar.style.width = '0';
        barObserver.observe(bar);
    });

    // --- 12. Cursos e Treinamentos Online LMS Lógica ---

    // A. Alternância de abas (Individual vs Corporativo)
    const courseTabButtons = document.querySelectorAll('.tab-nav-btn');
    const courseTabPanes = document.querySelectorAll('.tab-pane');

    courseTabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');

            courseTabButtons.forEach(b => b.classList.remove('active'));
            courseTabPanes.forEach(pane => pane.classList.remove('active'));

            btn.classList.add('active');
            const targetPane = document.getElementById(`tab-${tabId}`);
            if (targetPane) targetPane.classList.add('active');
        });
    });

    // B. Simulação de Perfis de Acesso
    const profileButtons = document.querySelectorAll('.profile-badge-btn');
    const profilePermissaoMsg = document.getElementById('profilePermissaoMsg');

    const profileRules = {
        owner: "<strong>Perfil Ativo: Owner.</strong> Acesso total às configurações globais da plataforma, relatórios financeiros e faturamento de vendas corporativas.",
        admin: "<strong>Perfil Ativo: Admin.</strong> Gestão e moderação de cursos, módulos, quizzes e liberação de acesso manual a alunos.",
        manager: "<strong>Perfil Ativo: Manager.</strong> Acesso ao painel corporativo, gerenciamento de licenças adquiridas e visualização de notas de funcionários.",
        leader: "<strong>Perfil Ativo: Leader.</strong> Acesso a relatórios de engajamento do time e trilhas específicas recomendadas para a sua equipe.",
        user: "<strong>Perfil Ativo: User (Aluno).</strong> Visualização dos cursos matriculados, assistir vídeo-aulas, responder quizzes e baixar certificados."
    };

    profileButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const profile = btn.getAttribute('data-profile');
            profileButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (profilePermissaoMsg && profileRules[profile]) {
                profilePermissaoMsg.style.opacity = '0';
                setTimeout(() => {
                    profilePermissaoMsg.innerHTML = profileRules[profile];
                    profilePermissaoMsg.style.opacity = '1';
                }, 150);
            }
        });
    });

    // C. Calculadora de Licenças Corporativas
    const corpCourseSelect = document.getElementById('corpCourseSelect');
    const corpLicensesCount = document.getElementById('corpLicensesCount');
    const licensesValueDisplay = document.getElementById('licensesValueDisplay');
    const licensesDiscountInfo = document.getElementById('licensesDiscountInfo');
    const unitPriceDisplay = document.getElementById('unitPriceDisplay');
    const unitPriceDiscountedDisplay = document.getElementById('unitPriceDiscountedDisplay');
    const corpTotalPriceDisplay = document.getElementById('corpTotalPriceDisplay');

    function calculateCorporatePricing() {
        if (!corpCourseSelect || !corpLicensesCount) return;

        const basePrice = parseFloat(corpCourseSelect.value);
        const qty = parseInt(corpLicensesCount.value);

        if (licensesValueDisplay) {
            licensesValueDisplay.textContent = `${qty} colaboradores`;
        }

        // Definir percentual de desconto progressivo
        let discountPercent = 0;
        if (qty >= 10 && qty < 25) {
            discountPercent = 0.10; // 10%
        } else if (qty >= 25 && qty < 50) {
            discountPercent = 0.15; // 15%
        } else if (qty >= 50 && qty < 100) {
            discountPercent = 0.20; // 20%
        } else if (qty >= 100) {
            discountPercent = 0.30; // 30%
        }

        const discountText = discountPercent > 0 ? `Desconto Aplicado: ${(discountPercent * 100)}% de desconto` : 'Sem desconto aplicado (mínimo de 10 licenças para desconto)';
        if (licensesDiscountInfo) {
            licensesDiscountInfo.textContent = discountText;
            licensesDiscountInfo.style.color = discountPercent > 0 ? '#25D366' : 'var(--color-text-muted)';
        }

        const discountedUnitPrice = basePrice * (1 - discountPercent);
        const totalPrice = discountedUnitPrice * qty;

        if (unitPriceDisplay) {
            unitPriceDisplay.textContent = `R$ ${basePrice.toFixed(2).replace('.', ',')}`;
        }
        if (unitPriceDiscountedDisplay) {
            unitPriceDiscountedDisplay.textContent = `R$ ${discountedUnitPrice.toFixed(2).replace('.', ',')}`;
        }
        if (corpTotalPriceDisplay) {
            corpTotalPriceDisplay.textContent = `R$ ${totalPrice.toFixed(2).replace('.', ',')}`;
        }
    }

    if (corpLicensesCount) {
        corpLicensesCount.addEventListener('input', calculateCorporatePricing);
    }
    if (corpCourseSelect) {
        corpCourseSelect.addEventListener('change', calculateCorporatePricing);
    }

    // Inicializar cálculos
    calculateCorporatePricing();

    // D. Sistema de Aromas (Simulador de indicação e recompensas)
    const aromasBalance = document.getElementById('aromasBalance');
    const simulateReferralClickBtn = document.getElementById('simulateReferralClickBtn');
    const copyReferralLinkBtn = document.getElementById('copyReferralLinkBtn');
    const referralLinkInput = document.getElementById('referralLinkInput');
    const copySuccessMsg = document.getElementById('copySuccessMsg');
    const redeemButtons = document.querySelectorAll('.redeem-reward-btn');
    const rewardMessageBox = document.getElementById('rewardMessageBox');

    let userAromas = 5; // Saldo inicial simulado

    function updateAromasDisplay() {
        if (aromasBalance) aromasBalance.textContent = userAromas;
    }

    if (simulateReferralClickBtn) {
        simulateReferralClickBtn.addEventListener('click', () => {
            userAromas += 1;
            updateAromasDisplay();
            
            // Efeito visual temporário
            const balanceBox = document.querySelector('.aromas-balance-box');
            if (balanceBox) {
                balanceBox.style.transform = 'scale(1.1)';
                setTimeout(() => { balanceBox.style.transform = 'scale(1)'; }, 200);
            }
        });
    }

    if (copyReferralLinkBtn && referralLinkInput && copySuccessMsg) {
        copyReferralLinkBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(referralLinkInput.value).then(() => {
                copySuccessMsg.style.display = 'block';
                setTimeout(() => { copySuccessMsg.style.display = 'none'; }, 3000);
            });
        });
    }

    redeemButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const cost = parseInt(btn.getAttribute('data-cost'));
            const discount = btn.getAttribute('data-discount');

            if (userAromas >= cost) {
                userAromas -= cost;
                updateAromasDisplay();

                // Gerar código de cupom dinâmico
                const code = `AROMA-${discount === 'free' ? 'FREE' : discount + 'OFF'}-${Math.floor(1000 + Math.random() * 9000)}`;

                if (rewardMessageBox) {
                    rewardMessageBox.className = 'reward-message-box success';
                    rewardMessageBox.innerHTML = `<i class="fa-solid fa-circle-check"></i> Resgatado! Use o cupom <strong>${code}</strong> no checkout para obter o desconto.`;
                }
            } else {
                if (rewardMessageBox) {
                    rewardMessageBox.className = 'reward-message-box error';
                    rewardMessageBox.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Saldo insuficiente! Você precisa de pelo menos ${cost} Aromas para este resgate.`;
                }
            }
        });
    });

    // E. Lógica do Checkout Modal
    const checkoutModal = document.getElementById('checkoutModal');
    const closeCheckoutBtn = document.getElementById('closeCheckoutBtn');
    const checkoutItemType = document.getElementById('checkoutItemType');
    const checkoutItemTitle = document.getElementById('checkoutItemTitle');
    const checkoutBasePrice = document.getElementById('checkoutBasePrice');
    const checkoutDiscountRow = document.getElementById('checkoutDiscountRow');
    const checkoutDiscountValue = document.getElementById('checkoutDiscountValue');
    const checkoutTotalPrice = document.getElementById('checkoutTotalPrice');
    const applyCouponBtn = document.getElementById('applyCouponBtn');
    const checkoutCoupon = document.getElementById('checkoutCoupon');
    const couponFeedback = document.getElementById('couponFeedback');
    const billingForm = document.getElementById('checkoutForm');
    const checkoutSuccessState = document.getElementById('checkoutSuccessState');
    const checkoutSubmitBtn = document.getElementById('checkoutSubmitBtn');

    let currentItemPrice = 0;
    let currentDiscount = 0;

    function openCheckoutModal(title, price, type) {
        if (!checkoutModal) return;

        checkoutItemTitle.textContent = title;
        currentItemPrice = parseFloat(price);
        currentDiscount = 0;

        checkoutItemType.textContent = type === 'corporate' ? 'Plano Corporativo (Licenças)' : 'Curso Individual';
        checkoutBasePrice.textContent = `R$ ${currentItemPrice.toFixed(2).replace('.', ',')}`;
        
        if (checkoutDiscountRow) checkoutDiscountRow.style.display = 'none';
        if (couponFeedback) couponFeedback.textContent = '';
        if (checkoutCoupon) checkoutCoupon.value = '';
        
        updateCheckoutTotal();

        // Restaurar estado do formulário
        if (billingForm) billingForm.style.display = 'block';
        if (checkoutSuccessState) checkoutSuccessState.style.display = 'none';
        if (checkoutSubmitBtn) checkoutSubmitBtn.disabled = false;

        checkoutModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    window.closeCheckoutModal = function() {
        if (checkoutModal) checkoutModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (closeCheckoutBtn) {
        closeCheckoutBtn.addEventListener('click', closeCheckoutModal);
    }

    function updateCheckoutTotal() {
        const finalPrice = Math.max(0, currentItemPrice - currentDiscount);
        if (checkoutTotalPrice) {
            checkoutTotalPrice.textContent = `R$ ${finalPrice.toFixed(2).replace('.', ',')}`;
        }
    }

    // Compras individuais via botões de curso
    const buyIndividualButtons = document.querySelectorAll('.buy-course-btn');
    buyIndividualButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const title = btn.getAttribute('data-course-title');
            const price = btn.getAttribute('data-course-price');
            openCheckoutModal(title, price, 'individual');
        });
    });

    // Compra corporativa via botão da calculadora
    const buyCorporateBtn = document.getElementById('buyCorporateBtn');
    if (buyCorporateBtn) {
        buyCorporateBtn.addEventListener('click', () => {
            const courseOption = corpCourseSelect.options[corpCourseSelect.selectedIndex];
            const courseTitle = `Plano: ${courseOption.getAttribute('data-title')} (${corpLicensesCount.value} Licenças)`;
            
            // Preço total da calculadora corporativa
            const totalPrice = parseFloat(corpTotalPriceDisplay.textContent.replace('R$ ', '').replace('.', '').replace(',', '.'));
            openCheckoutModal(courseTitle, totalPrice, 'corporate');
        });
    }

    // Validar cupons
    if (applyCouponBtn) {
        applyCouponBtn.addEventListener('click', () => {
            const code = checkoutCoupon.value.trim().toUpperCase();

            if (code === '') {
                couponFeedback.className = 'coupon-feedback error';
                couponFeedback.textContent = 'Insira um cupom.';
                return;
            }

            // Simular cupons e vales de resgate de Aromas
            if (code === 'AROMA10' || code.includes('AROMA-30OFF')) {
                currentDiscount = 30.00;
                couponFeedback.className = 'coupon-feedback success';
                couponFeedback.textContent = 'Cupom de R$ 30,00 aplicado com sucesso!';
            } else if (code.includes('AROMA-50OFF')) {
                currentDiscount = 50.00;
                couponFeedback.className = 'coupon-feedback success';
                couponFeedback.textContent = 'Cupom de R$ 50,00 aplicado com sucesso!';
            } else if (code.includes('AROMA-FREE') || code === 'DAIANE100') {
                currentDiscount = currentItemPrice;
                couponFeedback.className = 'coupon-feedback success';
                couponFeedback.textContent = 'Curso 100% Gratuito aplicado!';
            } else {
                // Cupom padrão de 10%
                currentDiscount = currentItemPrice * 0.10;
                couponFeedback.className = 'coupon-feedback success';
                couponFeedback.textContent = 'Cupom de 10% de desconto aplicado!';
            }

            if (checkoutDiscountRow) {
                checkoutDiscountRow.style.display = 'flex';
                checkoutDiscountValue.textContent = `- R$ ${currentDiscount.toFixed(2).replace('.', ',')}`;
            }

            updateCheckoutTotal();
        });
    }

    // Finalizar Checkout Simulado
    window.finalizeCheckoutSim = function() {
        if (checkoutSubmitBtn) {
            checkoutSubmitBtn.disabled = true;
            const spanText = checkoutSubmitBtn.querySelector('span');
            if (spanText) spanText.textContent = 'Processando...';

            setTimeout(() => {
                if (billingForm) billingForm.style.display = 'none';
                if (checkoutSuccessState) checkoutSuccessState.style.display = 'block';

                // Se for compra individual bem-sucedida, dar bônus de Aromas
                userAromas += 5;
                updateAromasDisplay();
            }, 1500);
        }
    }
});

// F. Sistema Interativo de Homologação da Cliente Daiane Ribeiro
const homologacaoStatus = {
    'venda-individual': false,
    'venda-corporativa': false,
    'sistema-aromas': false,
    'perfis-acesso': false
};

window.homologarItem = function(itemId, isApproved) {
    const statusBadge = document.getElementById(`status-${itemId}`);
    if (!statusBadge) return;

    if (isApproved) {
        statusBadge.className = 'status-badge status-approved';
        statusBadge.textContent = 'Aprovado';
        homologacaoStatus[itemId] = true;
    } else {
        statusBadge.className = 'status-badge status-rejected';
        statusBadge.textContent = 'Reprovado';
        homologacaoStatus[itemId] = false;
    }

    // Atualizar progresso de homologação
    const totalItems = Object.keys(homologacaoStatus).length;
    const approvedCount = Object.values(homologacaoStatus).filter(val => val === true).length;
    
    const progressFill = document.getElementById('homologacaoProgressFill');
    const approvedCountText = document.getElementById('homologacaoApprovedCount');

    if (progressFill) {
        const percent = (approvedCount / totalItems) * 100;
        progressFill.style.width = `${percent}%`;
    }

    if (approvedCountText) {
        approvedCountText.textContent = approvedCount;
    }
}


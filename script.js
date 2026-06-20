document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Menu Mobile Toggle ---
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !expanded);
            navMenu.classList.toggle('open');
            
            // Troca o ícone do botão hambúrguer
            const icon = navToggle.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('open')) {
                    icon.className = 'fa-solid fa-xmark';
                } else {
                    icon.className = 'fa-solid fa-bars';
                }
            }
        });
    }

    // Fechar menu mobile ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link, .nav-btn');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                const icon = navToggle.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            }
        });
    });

    // --- 2. Scroll Ativo no Header ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (header) {
            if (window.scrollY > 50) {
                header.style.padding = '10px 0';
                header.style.background = 'rgba(13, 12, 15, 0.95)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
            } else {
                header.style.padding = '0';
                header.style.background = 'rgba(13, 12, 15, 0.7)';
                header.style.boxShadow = 'none';
            }
        }
    });

    // --- 3. Seletor Interativo DISC ---
    const discButtons = document.querySelectorAll('.disc-btn');
    const matrixQuads = document.querySelectorAll('.matrix-quad');
    const discTitle = document.getElementById('discTitle');
    const discText = document.getElementById('discText');
    const discTip = document.getElementById('discTip');

    const discData = {
        d: {
            title: "Dominância (Resultados e Ação)",
            text: "Pessoas com perfil Dominante são focadas em resultados, competitivas e motivadas por desafios. Em vendas, são diretas e decididas. Sob estresse, tendem a ficar impacientes. Compreender o perfil D ajuda a acelerar negociações objetivas.",
            tip: "Seja objetivo, vá direto ao ponto, foque em números, resultados e dê autonomia de escolha."
        },
        i: {
            title: "Influência (Comunicação e Conexão)",
            text: "Profissionais Influentes são altamente comunicativos, entusiastas e persuasivos. São movidos por reconhecimento social e cooperação. Em vendas, criam conexões imediatas, mas podem perder o foco nos detalhes operacionais.",
            tip: "Valorize suas ideias, crie um clima amigável, conte histórias e evite ser excessivamente formal ou detalhista."
        },
        s: {
            title: "Estabilidade (Consistência e Empatia)",
            text: "Pessoas Estáveis são pacientes, leais, persistentes e ótimas ouvintes. Buscam segurança e ambientes previsíveis. Em vendas, preferem processos estruturados e baseados em confiança. Sob estresse, resistem a mudanças bruscas.",
            tip: "Não pressione por decisões rápidas, demonstre segurança, apresente garantias e construa uma relação de confiança de longo prazo."
        },
        c: {
            title: "Conformidade (Precisão e Qualidade)",
            text: "Perfis Conformes são analíticos, disciplinados, detalhistas e focados em regras e qualidade. Valorizam a precisão técnica. Em vendas, exigem dados consistentes antes de decidir e sob estresse podem se tornar excessivamente críticos.",
            tip: "Forneça fatos concretos, detalhes técnicos organizados, dados estatísticos e dê tempo para que analisem os termos."
        }
    };

    function updateDiscView(profile) {
        const data = discData[profile];
        if (!data) return;

        // Atualizar textos
        if (discTitle) discTitle.textContent = data.title;
        if (discText) discText.textContent = data.text;
        if (discTip) discTip.textContent = data.tip;

        // Atualizar botões
        discButtons.forEach(btn => {
            if (btn.getAttribute('data-disc') === profile) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Atualizar quadrantes da matriz
        matrixQuads.forEach(quad => {
            if (quad.getAttribute('data-disc') === profile) {
                quad.classList.add('active');
            } else {
                quad.classList.remove('active');
            }
        });
    }

    discButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const profile = btn.getAttribute('data-disc');
            updateDiscView(profile);
        });
    });

    matrixQuads.forEach(quad => {
        quad.addEventListener('click', () => {
            const profile = quad.getAttribute('data-disc');
            updateDiscView(profile);
        });
    });

    // --- 4. Animação de Contagem dos Números ---
    const stats = document.querySelectorAll('.stat-number');
    const animationSpeed = 200;

    const startCounter = (el) => {
        const target = +el.getAttribute('data-target');
        const count = +el.innerText.replace(/[^0-9]/g, '');
        
        // Se for o 011, exibimos formatado
        if (target === 11) {
            el.innerText = '011';
            return;
        }

        const inc = target / animationSpeed;

        if (count < target) {
            const nextVal = Math.ceil(count + inc);
            if (target === 98) {
                el.innerText = nextVal + '%';
            } else if (target === 1500) {
                el.innerText = (nextVal / 1000).toFixed(1) + 'k+';
            } else {
                el.innerText = nextVal;
            }
            setTimeout(() => startCounter(el), 1);
        } else {
            if (target === 98) el.innerText = target + '%';
            if (target === 1500) el.innerText = '1.5k+';
        }
    };

    // Disparar contador quando entrar no scroll da viewport
    const observerOptions = {
        threshold: 0.5
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => statsObserver.observe(stat));

    // --- 5. Validação de Formulário Premium ---
    const form = document.getElementById('contactForm');
    const successAlert = document.getElementById('formSuccess');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            
            // Campos
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const phoneInput = document.getElementById('phone');
            const serviceSelect = document.getElementById('service');

            // Regex simples de e-mail e telefone
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

            // Validar Nome
            if (nameInput.value.trim() === '') {
                nameInput.parentElement.classList.add('invalid');
                isValid = false;
            } else {
                nameInput.parentElement.classList.remove('invalid');
            }

            // Validar E-mail
            if (!emailRegex.test(emailInput.value.trim())) {
                emailInput.parentElement.classList.add('invalid');
                isValid = false;
            } else {
                emailInput.parentElement.classList.remove('invalid');
            }

            // Validar Telefone
            // Remove espaços e traços para conferência flexível
            const cleanPhone = phoneInput.value.replace(/\s+/g, '').replace(/-/g, '').replace(/\(/g, '').replace(/\)/g, '');
            if (cleanPhone.length < 10 || cleanPhone.length > 11) {
                phoneInput.parentElement.classList.add('invalid');
                isValid = false;
            } else {
                phoneInput.parentElement.classList.remove('invalid');
            }

            // Validar Serviço
            if (serviceSelect.value === '') {
                serviceSelect.parentElement.classList.add('invalid');
                isValid = false;
            } else {
                serviceSelect.parentElement.classList.remove('invalid');
            }

            // Se tudo estiver OK, simular envio
            if (isValid) {
                const submitBtn = document.getElementById('submitBtn');
                submitBtn.disabled = true;
                submitBtn.querySelector('span').innerText = 'Enviando...';

                // Simula requisição de 1.5s
                setTimeout(() => {
                    form.style.display = 'none';
                    successAlert.style.display = 'flex';
                }, 1500);
            }
        });

        // Limpar mensagens de erro ao digitar/interagir
        form.querySelectorAll('input, select').forEach(input => {
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
});

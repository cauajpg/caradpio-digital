// =========================================================
// === ESTRUTURA DE DADOS DO MENU (COM CAMINHOS CORRIGIDOS) =
// =========================================================

const menuData = [
    {
        id: 'frango',
        category: 'caldos',
        name: 'Caldo de Frango (500ml)',
        price: 'R$ 28,50',
        desc: 'Sabor de casa em cada colherada! Um caldo leve e nutritivo, preparado com peito de frango desfiado, batata batida cremosa, mandioquinha cremosa, cenoura ralada e temperos selecionados. Ideal para quem busca aconchego e saúde!',
        // Caminho corrigido
        image: 'src/images/CALDO_FRANGO.avif' 
    },
    {
        id: 'verde',
        category: 'caldos',
        name: 'Caldo Verde (500ml)',
        price: 'R$ 28,50',
        desc: 'Delicioso caldo verde preparado com batata cremosa, linguiça calabresa frita, bacon crocante e temperos naturais selecionados. Perfeito para aquecer no friozinho!',
        // Caminho corrigido
        image: 'src/images/CALDO_VERDE.avif' 
    },
    {
        id: 'kenga',
        category: 'caldos',
        name: 'Caldo de Kenga (500ml)',
        price: 'R$ 29,80',
        desc: 'O queridinho das noites frias! Feito com frango desfiado, legumes, milho verde, bacon frito, calabresa e temperinhos especiais. Vai um caldinho de kenga aí?',
        // Caminho corrigido
        image: 'src/images/CALDO_KENGA.jpeg' 
    },
    {
        id: 'feijao',
        category: 'caldos',
        name: 'Caldo de Feijão (500ml)',
        price: 'R$ 27,00',
        desc: 'Saboroso caldo de feijão batido, preparado com linguiça calabresa frita, bacon crocante e temperos naturais bem selecionados.',
        // Caminho corrigido
        image: 'src/images/CALDO_FEIJAO.avif' 
    },
    {
        id: 'vazio-1',
        category: 'marmitas',
        name: 'Marmita da Casa (Em Breve)',
        price: 'R$ 35,00',
        desc: 'Aguarde nosso lançamento de marmitas saudáveis e saborosas. Em breve no seu delivery!',
        // Caminho corrigido
        image: 'src/images/MARMITA_DEFAULT.avif' 
    },
];

// =========================================================
// === FUNÇÕES DE RENDERIZAÇÃO E LÓGICA (RESTANTE DO CÓDIGO) =
// =========================================================

const modalOverlay = document.getElementById('modal-overlay');
const toggleButton = document.getElementById('theme-toggle');
const html = document.documentElement;

// FUNÇÃO 1: TEMA (DARK/LIGHT) com Acessibilidade
function toggleTheme() {
    const isDarkMode = !html.classList.contains('light-mode');
    
    if (isDarkMode) {
        html.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
        toggleButton.setAttribute('aria-label', 'Alternar para o tema escuro (Lua)');
    } else {
        html.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
        toggleButton.setAttribute('aria-label', 'Alternar para o tema claro (Sol)');
    }
}

// FUNÇÃO 2: APLICAR TEMA SALVO AO CARREGAR
function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
        html.classList.add('light-mode');
        toggleButton.setAttribute('aria-label', 'Alternar para o tema escuro (Lua)');
    } else {
        html.classList.remove('light-mode');
        toggleButton.setAttribute('aria-label', 'Alternar para o tema claro (Sol)');
    }
}

// FUNÇÃO 3: RENDERIZA OS ITENS A PARTIR DO menuData
function renderMenu() {
    const menuContent = document.getElementById('menu-content');
    const categoryMenu = document.getElementById('category-menu');
    
    // Obtém categorias únicas
    const categories = [...new Set(menuData.map(item => item.category))];
    
    // Renderiza botões de categoria
    categoryMenu.innerHTML = categories.map((cat, index) => {
        const catName = cat.charAt(0).toUpperCase() + cat.slice(1);
        return `<button class="category-button ${index === 0 ? 'active' : ''}" data-category="${cat}">${catName}</button>`;
    }).join('');

    // Renderiza seções e itens
    menuContent.innerHTML = categories.map((cat, index) => {
        const items = menuData.filter(item => item.category === cat);
        const catName = cat.charAt(0).toUpperCase() + cat.slice(1);
        
        return `
            <section class="menu-section ${index === 0 ? 'active' : ''}" id="${cat}-section">
                <h2 class="section-title">Nossos ${catName}</h2>
                <section class="items" id="items-${cat}">
                    ${items.map(item => `
                        <article class="card" data-id="${item.id}" onclick="expandCard(this)">
                            <div class="thumb" style="background-image:url('${item.image}')"></div>
                            <div class="meta">
                                <div class="item-header">
                                    <h3 class="name">${item.name}</h3>
                                    <p class="price">${item.price}</p>
                                </div>
                                <p class="desc">${item.desc}</p>
                            </div>
                        </article>
                    `).join('')}
                </section>
            </section>
        `;
    }).join('');

    // Adiciona evento aos botões de categoria
    categoryMenu.querySelectorAll('.category-button').forEach(button => {
        button.addEventListener('click', (e) => {
            showCategory(e.currentTarget.dataset.category);
            categoryMenu.querySelectorAll('.category-button').forEach(btn => btn.classList.remove('active'));
            e.currentTarget.classList.add('active');
        });
    });
}

// FUNÇÃO 4: TROCA DE CATEGORIA
function showCategory(categoryId) {
    const sections = document.querySelectorAll('.menu-section');
    const targetSection = document.getElementById(categoryId + '-section');

    sections.forEach(sec => {
        sec.style.opacity = '0'; 
        sec.classList.remove('active');
    });
    
    setTimeout(() => {
        sections.forEach(sec => sec.style.display = 'none');
        if (targetSection) {
            targetSection.style.display = 'block';
            targetSection.classList.add('active');
            void targetSection.offsetHeight; 
            targetSection.style.opacity = '1';
        }
    }, 300);
}

// FUNÇÃO 5: EXPANDIR CARD (MODAL)
function expandCard(cardElement) {
    const itemId = cardElement.getAttribute('data-id');
    const item = menuData.find(i => i.id === itemId);

    if (!item) return;

    const expandedCardHTML = `
        <article class="card expanded">
            <div class="thumb" style="background-image:url('${item.image}')"></div>
            <div class="meta">
                <div class="item-header">
                    <h3 class="name">${item.name}</h3>
                    <p class="price">${item.price}</p>
                </div>
                <p class="desc">${item.desc}</p>
            </div>
            <span class="close-btn" id="modal-close-btn">&times;</span>
        </article>
    `;

    modalOverlay.innerHTML = expandedCardHTML;
    modalOverlay.classList.add('active');
    document.body.classList.add('modal-open');
    
    document.getElementById('modal-close-btn').addEventListener('click', closeCard);
}

function closeCard() {
    modalOverlay.classList.remove('active');
    document.body.classList.remove('modal-open');
    setTimeout(() => modalOverlay.innerHTML = '', 400); 
}

modalOverlay.addEventListener('click', (e) => {
    if (e.target.id === 'modal-overlay') {
        closeCard();
    }
});

// FUNÇÃO 6: CARROSSEL
function setupCarousel(carouselId, dotsId, interval = 5000) {
    const carousel = document.getElementById(carouselId);
    const slides = Array.from(carousel.querySelectorAll('.slide'));
    const dotsWrap = document.getElementById(dotsId);
    let idx = 0;
    let autoSlideInterval;

    slides.forEach((slide, i) => {
        slide.style.position = 'absolute';
        slide.style.top = '0';
        slide.style.left = '0';
        slide.style.width = '100%';
        slide.style.height = '100%';
        slide.style.zIndex = i === 0 ? 1 : 0; 
        slide.style.opacity = i === 0 ? 1 : 0;
    });

    slides.forEach((s, i) => {
        const d = document.createElement('div');
        d.className = 'dot' + (i === 0 ? ' active' : '');
        d.addEventListener('click', () => {
            idx = i;
            update();
            resetInterval();
        });
        dotsWrap.appendChild(d);
    });

    function update() {
        slides.forEach((slide, i) => {
            if (i === idx) {
                slide.style.opacity = 1;
                slide.style.zIndex = 1; 
            } else {
                slide.style.opacity = 0;
                slide.style.zIndex = 0; 
            }
        });
        
        dotsWrap.querySelectorAll('.dot').forEach((dot, i) => 
            dot.classList.toggle('active', i === idx)
        );
    }

    function startInterval() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            idx = (idx + 1) % slides.length;
            update();
        }, interval);
    }

    function resetInterval() {
        startInterval();
    }

    startInterval();
}

// FUNÇÃO 7: QR CODE
function setupQRCode(elementId) {
    const ifoodUrl = "https://www.ifood.com.br/delivery/santana-de-parnaiba-sp/caldos-da-dona-cely-e-marmitex-parque-santana/0b15ed4f-c261-48ff-8e62-7b4a6ca60d7c"; 
    if (document.getElementById(elementId)) {
        // Lembre-se que 'QRCode' é global (importado no index.html)
        new QRCode(document.getElementById(elementId), {
            text: ifoodUrl, 
            width: 128,
            height: 128
        });
    }
}

// =========================================================
// === INICIALIZAÇÃO =======================================
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
    applySavedTheme(); 
    renderMenu();
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    setupCarousel('carousel', 'dots', 5000);
    setupQRCode('qrcode');
});
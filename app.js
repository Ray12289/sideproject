// ==========================================
// 潮流鞋子商品數據庫 (16 Items)
// ==========================================
const SNEAKERS_DATA = [
  {
    id: 1,
    name: 'KICKS_NEON "Cyber Gaze V1"',
    brand: 'CYBER_EDGE',
    price: 6200,
    sizes: [8, 9, 10, 11],
    image: 'assets/images/sneaker_1.png',
    tags: ['hot'],
    featured: true
  },
  {
    id: 2,
    name: 'KICKS_NEON "Grid Runner X"',
    brand: 'CYBER_EDGE',
    price: 4500,
    sizes: [7, 8, 9, 10, 12],
    image: 'assets/images/sneaker_2.png',
    tags: ['limited'],
    featured: false
  },
  {
    id: 3,
    name: 'KICKS_NEON "Glitch Phantom"',
    brand: 'CYBER_EDGE',
    price: 7800,
    sizes: [8, 9, 10, 11, 12],
    image: 'assets/images/sneaker_3.png',
    tags: ['limited', 'hot'],
    featured: true
  },
  {
    id: 4,
    name: 'KICKS_NEON "Pulse Strap WP"',
    brand: 'CYBER_EDGE',
    price: 5300,
    sizes: [7, 8, 9, 10, 11],
    image: 'assets/images/sneaker_4.png',
    tags: ['hot'],
    featured: false
  },
  {
    id: 5,
    name: 'KICKS_NEON "Future Knit Prime"',
    brand: 'NEON_STREET',
    price: 9600,
    sizes: [8, 9, 10, 11, 12],
    image: 'assets/images/sneaker_5.png',
    tags: ['limited', 'hot'],
    featured: true
  },
  {
    id: 6,
    name: 'KICKS_NEON "Holo Boost Evo"',
    brand: 'NEON_STREET',
    price: 5800,
    sizes: [7, 8, 9, 10, 11],
    image: 'assets/images/sneaker_6.png',
    tags: ['hot'],
    featured: false
  },
  {
    id: 7,
    name: 'KICKS_NEON "Rain Matrix Low"',
    brand: 'NEON_STREET',
    price: 4900,
    sizes: [8, 9, 10],
    image: 'assets/images/sneaker_7.png',
    tags: [],
    featured: false
  },
  {
    id: 8,
    name: 'KICKS_NEON "Street High LED"',
    brand: 'NEON_STREET',
    price: 5200,
    sizes: [9, 10, 11, 12],
    image: 'assets/images/sneaker_8.png',
    tags: ['limited'],
    featured: false
  },
  {
    id: 9,
    name: 'KICKS_NEON "Neon Tech 9000"',
    brand: 'HOLO_SYNTH',
    price: 6500,
    sizes: [8, 9, 10, 11],
    image: 'assets/images/sneaker_9.png',
    tags: ['hot'],
    featured: true
  },
  {
    id: 10,
    name: 'KICKS_NEON "Orange Forge Tech"',
    brand: 'HOLO_SYNTH',
    price: 6800,
    sizes: [7, 8, 9, 10, 11, 12],
    image: 'assets/images/sneaker_10.png',
    tags: ['limited', 'hot'],
    featured: true
  },
  {
    id: 11,
    name: 'KICKS_NEON "Retro Volt OG"',
    brand: 'HOLO_SYNTH',
    price: 4200,
    sizes: [7, 8, 9, 10],
    image: 'assets/images/sneaker_11.png',
    tags: [],
    featured: false
  },
  {
    id: 12,
    name: 'KICKS_NEON "Obsidian Wave-Rider"',
    brand: 'HOLO_SYNTH',
    price: 5900,
    sizes: [8, 9, 10, 11, 12],
    image: 'assets/images/sneaker_12.png',
    tags: ['hot'],
    featured: false
  },
  {
    id: 13,
    name: 'KICKS_NEON "Void TPU RS"',
    brand: 'VOID_TECH',
    price: 4800,
    sizes: [7, 8, 9, 10, 11],
    image: 'assets/images/sneaker_13.png',
    tags: ['hot'],
    featured: false
  },
  {
    id: 14,
    name: 'KICKS_NEON "Lime Alley Rider"',
    brand: 'VOID_TECH',
    price: 3900,
    sizes: [8, 9, 10],
    image: 'assets/images/sneaker_14.png',
    tags: [],
    featured: false
  },
  {
    id: 15,
    name: 'KICKS_NEON "Matrix Green Cell"',
    brand: 'VOID_TECH',
    price: 4600,
    sizes: [9, 10, 11],
    image: 'assets/images/sneaker_15.png',
    tags: ['hot'],
    featured: false
  },
  {
    id: 16,
    name: 'KICKS_NEON "Glow Suede Classic"',
    brand: 'VOID_TECH',
    price: 3500,
    sizes: [7, 8, 9, 10, 11, 12],
    image: 'assets/images/sneaker_16.png',
    tags: ['limited'],
    featured: false
  }
];

// ==========================================
// 全局狀態
// ==========================================
let cart = JSON.parse(localStorage.getItem('kicks_neon_cart')) || [];
let activeFilters = {
  brands: [],
  size: null,
  maxPrice: 10000,
  sortBy: 'featured'
};

// ==========================================
// 頁面初始化
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initCartDrawer();
  updateCartUI(); // Restore cart on load
  initActiveNavLink(); // Highlight active menu link

  // Simple router based on window.location.pathname
  const path = window.location.pathname.toLowerCase();
  if (path.includes('about.html')) {
    // About page specific initialization
  } else if (path.includes('releases.html')) {
    initReleaseCalendar();
  } else if (path.includes('shop.html')) {
    initFilters();
    renderProducts();
  } else if (path.includes('contact.html')) {
    initContactForm();
  } else {
    // Assume homepage (index.html or root '/')
    initHeroSlider();
  }
});

// Dynamic navigation highlighting based on active path
function initActiveNavLink() {
  const path = window.location.pathname.toLowerCase();
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href').toLowerCase();
    
    if (path.includes('about.html') && href.includes('about.html')) {
      link.classList.add('active');
    } else if (path.includes('releases.html') && href.includes('releases.html')) {
      link.classList.add('active');
    } else if (path.includes('shop.html') && href.includes('shop.html')) {
      link.classList.add('active');
    } else if (path.includes('contact.html') && href.includes('contact.html')) {
      link.classList.add('active');
    } else if ((path.includes('index.html') || path.endsWith('/')) && (href.includes('index.html') || href === '#home' || href === '/')) {
      link.classList.add('active');
    }
  });
}

// ==========================================
// 行動裝置主選單 Toggle
// ==========================================
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav a');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      menuToggle.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuToggle.classList.remove('active');
      });
    });
  }
}

// ==========================================
// HERO SLIDER 輪播圖邏輯
// ==========================================
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dotsContainer = document.querySelector('.slider-dots');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  let currentSlide = 0;
  let slideInterval;

  if (slides.length === 0) return;

  // 動態建立指示點 (dots)
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.slider-dot');

  function updateSlides() {
    slides.forEach((slide, index) => {
      if (index === currentSlide) {
        slide.classList.add('active');
        dots[index].classList.add('active');
      } else {
        slide.classList.remove('active');
        dots[index].classList.remove('active');
      }
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlides();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlides();
  }

  function goToSlide(index) {
    currentSlide = index;
    updateSlides();
    resetInterval();
  }

  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });

  slideInterval = setInterval(nextSlide, 5000);
}

// ==========================================
// 發售日曆倒數計時
// ==========================================
function initReleaseCalendar() {
  // 設定3個發售款式的倒數目標時間 (天)
  const countdowns = [
    { id: 'cd-1', hours: 76 },  // 3天多
    { id: 'cd-2', hours: 128 }, // 5天多
    { id: 'cd-3', hours: 38 }   // 1天多
  ];

  countdowns.forEach(cd => {
    const container = document.getElementById(cd.id);
    if (!container) return;

    // 計算目標毫秒數 (以當前時間起算)
    const targetTime = new Date().getTime() + cd.hours * 60 * 60 * 1000;

    function updateTimer() {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        container.innerHTML = `<span style="grid-column: 1/-1; color: var(--accent-green);">發售中 AVAILABLE NOW</span>`;
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      // 更新 DOM
      container.querySelector('.days').innerText = String(days).padStart(2, '0');
      container.querySelector('.hours').innerText = String(hours).padStart(2, '0');
      container.querySelector('.minutes').innerText = String(minutes).padStart(2, '0');
      container.querySelector('.seconds').innerText = String(seconds).padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);
  });
}

// ==========================================
// 篩選與排序邏輯
// ==========================================
function initFilters() {
  // 品牌篩選 (複選)
  const brandInputs = document.querySelectorAll('.brand-filter');
  brandInputs.forEach(input => {
    input.addEventListener('change', () => {
      if (input.checked) {
        activeFilters.brands.push(input.value);
      } else {
        activeFilters.brands = activeFilters.brands.filter(b => b !== input.value);
      }
      renderProducts();
    });
  });

  // 尺寸篩選 (單選)
  const sizeBtns = document.querySelectorAll('.size-btn');
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const sizeVal = parseInt(btn.dataset.size);
      
      if (activeFilters.size === sizeVal) {
        // 重複點擊取消選擇
        activeFilters.size = null;
        btn.classList.remove('active');
      } else {
        sizeBtns.forEach(b => b.classList.remove('active'));
        activeFilters.size = sizeVal;
        btn.classList.add('active');
      }
      renderProducts();
    });
  });

  // 價格滑動條
  const priceSlider = document.getElementById('price-slider');
  const priceValueDisplay = document.getElementById('price-val');
  if (priceSlider && priceValueDisplay) {
    priceSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      priceValueDisplay.textContent = `NT$${val.toLocaleString()}`;
      activeFilters.maxPrice = val;
      renderProducts();
    });
  }

  // 重設篩選器
  const resetBtn = document.querySelector('.btn-reset-filter');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      // 重置狀態
      activeFilters.brands = [];
      activeFilters.size = null;
      activeFilters.maxPrice = 10000;
      activeFilters.sortBy = 'featured';

      // 重置 DOM
      brandInputs.forEach(input => input.checked = false);
      sizeBtns.forEach(btn => btn.classList.remove('active'));
      if (priceSlider) {
        priceSlider.value = 10000;
        priceValueDisplay.textContent = 'NT$10,000';
      }
      const sortSelect = document.getElementById('sort-select');
      if (sortSelect) sortSelect.value = 'featured';

      renderProducts();
      showToast('篩選條件已重置 Reset Completed', false);
    });
  }

  // 商品排序
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      activeFilters.sortBy = e.target.value;
      renderProducts();
    });
  }
}

// ==========================================
// 商品渲染核心引擎
// ==========================================
function renderProducts() {
  const grid = document.getElementById('products-grid');
  const totalCount = document.getElementById('total-count');
  if (!grid) return;

  // 1. 執行過濾
  let filtered = SNEAKERS_DATA.filter(item => {
    // 品牌過濾
    if (activeFilters.brands.length > 0 && !activeFilters.brands.includes(item.brand)) {
      return false;
    }
    // 尺寸過濾
    if (activeFilters.size && !item.sizes.includes(activeFilters.size)) {
      return false;
    }
    // 價格過濾
    if (item.price > activeFilters.maxPrice) {
      return false;
    }
    return true;
  });

  // 2. 執行排序
  if (activeFilters.sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (activeFilters.sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (activeFilters.sortBy === 'featured') {
    filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  // 更新顯示總數
  if (totalCount) {
    totalCount.textContent = filtered.length;
  }

  // 3. 生成 HTML
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">⚡</div>
        <p class="empty-state-text">查無符合篩選條件的潮流鞋款。</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(item => {
    // 產生標籤 HTML
    let tagsHtml = '';
    if (item.tags.includes('limited')) {
      tagsHtml += `<span class="product-tag limited">LIMITED</span>`;
    }
    if (item.tags.includes('hot')) {
      tagsHtml += `<span class="product-tag hot">HOT</span>`;
    }

    return `
      <div class="product-card" data-id="${item.id}">
        <div class="product-img-wrapper">
          ${tagsHtml ? `<div class="product-tags">${tagsHtml}</div>` : ''}
          <div class="original-seal">
            <img src="assets/images/logo.png" alt="KICKS_NEON Original Seal">
          </div>
          <img class="product-img" src="${item.image}" alt="${item.name}" loading="lazy">
        </div>
        <div class="product-info">
          <div class="product-brand">${item.brand}</div>
          <h3 class="product-name">${item.name}</h3>
          <div class="product-meta">
            <span class="product-price">NT$${item.price.toLocaleString()}</span>
            <button class="product-buy-btn" onclick="addToCart(${item.id})" aria-label="Add to cart">
              +
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ==========================================
// 購物車功能與抽屜控制
// ==========================================
function initCartDrawer() {
  const cartIcon = document.getElementById('cart-icon-btn');
  const closeBtn = document.getElementById('cart-close-btn');
  const overlay = document.getElementById('cart-overlay');
  const drawer = document.getElementById('cart-drawer');

  if (cartIcon && drawer && overlay) {
    // 打開購物車
    cartIcon.addEventListener('click', () => {
      drawer.classList.add('open');
      overlay.classList.add('open');
    });

    // 關閉購物車
    const closeDrawer = () => {
      drawer.classList.remove('open');
      overlay.classList.remove('open');
    };

    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);
  }
}

function addToCart(productId) {
  const item = SNEAKERS_DATA.find(s => s.id === productId);
  if (!item) return;

  // 推入購物車資料庫
  cart.push(item);
  updateCartUI();

  // 依單雙數商品展示不同的 Cyber 霓虹通知主題 (綠色或橘色)
  const isOrangeTheme = productId % 2 === 0;
  showToast(`已成功加入購物車: ${item.name}`, isOrangeTheme);

  // 動態滑出購物車抽屜
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  if (drawer && overlay) {
    drawer.classList.add('open');
    overlay.classList.add('open');
  }
}

window.removeFromCart = function(index) {
  const removedItem = cart[index];
  cart.splice(index, 1);
  updateCartUI();
  if (removedItem) {
    showToast(`已從購物車移除: ${removedItem.name}`, true);
  }
};

function updateCartUI() {
  // Save cart state to localStorage
  localStorage.setItem('kicks_neon_cart', JSON.stringify(cart));

  // 更新購物車數量角標
  const cartCounts = document.querySelectorAll('.cart-count');
  cartCounts.forEach(el => {
    el.textContent = cart.length;
    el.style.display = cart.length === 0 ? 'none' : 'block';
  });

  const cartList = document.getElementById('cart-items-list');
  const cartTotal = document.getElementById('cart-total');

  if (!cartList || !cartTotal) return;

  if (cart.length === 0) {
    cartList.innerHTML = `<div class="cart-empty-msg">購物車目前是空的 EMPTY CART</div>`;
    cartTotal.textContent = 'NT$0';
    return;
  }

  // 渲染購物車商品清單
  cartList.innerHTML = cart.map((item, index) => {
    return `
      <div class="cart-item">
        <div class="cart-item-img-wrapper">
          <img class="cart-item-img" src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-info">
          <span class="cart-item-brand">${item.brand}</span>
          <span class="cart-item-name">${item.name}</span>
          <span class="cart-item-price">NT$${item.price.toLocaleString()}</span>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${index})" aria-label="Remove item">
          ✕
        </button>
      </div>
    `;
  }).join('');

  // 計算總計金額
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = `NT$${total.toLocaleString()}`;
}

// 結帳按鈕模擬
window.checkout = function() {
  if (cart.length === 0) {
    showToast('購物車為空，無法進行結帳！', true);
    return;
  }
  alert(`⚡ [KICKS_NEON SYSTEM ALERT]\n結帳功能已完成模擬！將為您結帳 ${cart.length} 件商品，總金額為：NT$${cart.reduce((sum, item) => sum + item.price, 0).toLocaleString()}。\n感謝您體驗潮流鞋子電商系統！`);
  cart = [];
  updateCartUI();
  
  // 關閉購物車抽屜
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  if (drawer && overlay) {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
  }
};

// ==========================================
// NEON TOAST 訊息提示
// ==========================================
function showToast(message, isOrangeTheme = false) {
  let container = document.getElementById('toast-container');
  
  // 若容器不存在則動態生成
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.classList.add('toast');
  if (isOrangeTheme) {
    toast.classList.add('orange-theme');
  }
  
  toast.innerHTML = `
    <span>⚡</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // 4 秒後自動從 DOM 移除
  setTimeout(() => {
    toast.remove();
  }, 4000);
}

// ==========================================
// 聯絡我們表單送出模擬
// ==========================================
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cf-name').value;
      const email = document.getElementById('cf-email').value;
      const message = document.getElementById('cf-message').value;

      if (!name || !email || !message) {
        showToast('請填寫所有必要欄位 Please fill in all fields', true);
        return;
      }

      showToast(`訊息已傳送！感謝您 ${name}`, false);
      form.reset();
    });
  }
}

/* ============================================================
   BEUShareBox – app.js
   Mini Social Media Product Sharing Platform
   localStorage persistence | No frameworks
   ============================================================ */

// ── Constants ───────────────────────────────────────────────
const STORAGE_KEY = 'beusharebox_products';

// Category emoji map for default images
const CAT_EMOJI = {
  'Elektronik': '💻',
  'Giyim':      '👕',
  'Kitap':      '📚',
  'Gıda':       '🍔',
  'Spor':       '⚽',
  'Diğer':      '📦',
};

// Default placeholder colours per category (used for svg fallback)
const CAT_COLOR = {
  'Elektronik': '#7c6dfa',
  'Giyim':      '#a78bfa',
  'Kitap':      '#22d3a5',
  'Gıda':       '#fb923c',
  'Spor':       '#38bdf8',
  'Diğer':      '#9ba3bd',
};

// Seed data shown on first launch
const SEED_PRODUCTS = [
  {
    id: 'seed-1',
    title: 'Apple MacBook Air M2',
    desc: 'Ultra ince tasarım, M2 çipi ile müthiş performans. Pil ömrü 18 saate kadar uzuyor. Mükemmel bir öğrenci laptopu.',
    price: 42999,
    category: 'Elektronik',
    imageUrl: 'https://images.unsplash.com/photo-1611186871525-1e36bc0e6d0e?w=600&q=80',
    author: 'Ahmet Y.',
    likes: 24,
    likedByUser: false,
    comments: [
      { id: 'c1', author: 'Mehmet K.', text: 'Harika bir laptop, kesinlikle tavsiye ederim!', time: '23 Şubat 14:20' },
    ],
    createdAt: Date.now() - 86400000 * 3,
  },
  {
    id: 'seed-2',
    title: 'Nike Air Max 270',
    desc: 'Günlük kullanım için mükemmel spor ayakkabı. Air yastıklama teknolojisi ile her adımda konfor hissediyorsunuz.',
    price: 3499,
    category: 'Spor',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    author: 'Zeynep A.',
    likes: 18,
    likedByUser: false,
    comments: [],
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'seed-3',
    title: 'Dune – Frank Herbert',
    desc: 'Bilim kurgunun baş yapıtı. Arrakis gezegeninde geçen derin bir evrenin hikayesi. Mutlaka okunmalı!',
    price: 149,
    category: 'Kitap',
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80',
    author: 'Can M.',
    likes: 31,
    likedByUser: false,
    comments: [
      { id: 'c2', author: 'Ayşe B.', text: 'Bu kitap hayatımı değiştirdi. Herkese öneriyorum.', time: '22 Şubat 09:10' },
      { id: 'c3', author: 'Oğuz S.', text: 'Film de güzeldi ama kitabın yanına yaklaşamaz.', time: '22 Şubat 11:45' },
    ],
    createdAt: Date.now() - 86400000 * 1,
  },
  {
    id: 'seed-4',
    title: 'Sony WH-1000XM5 Kulaklık',
    desc: 'Sektörün en iyi gürültü engelleme teknolojisi. 30 saat pil ömrü. Uzak çalışanlar için ideal.',
    price: 12999,
    category: 'Elektronik',
    imageUrl: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80',
    author: 'Elif T.',
    likes: 45,
    likedByUser: false,
    comments: [],
    createdAt: Date.now() - 3600000 * 5,
  },
  {
    id: 'seed-5',
    title: 'Oversize Keten Gömlek',
    desc: 'Yaz sezonuna özel, %100 doğal keten kumaş. Nefes alabilir yapısı ile sıcak havalarda rahatlık sağlar.',
    price: 549,
    category: 'Giyim',
    imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80',
    author: 'Selin K.',
    likes: 12,
    likedByUser: false,
    comments: [],
    createdAt: Date.now() - 3600000 * 2,
  },
  {
    id: 'seed-6',
    title: 'Ev Yapımı Baklava (1 kg)',
    desc: 'Geleneksel Antep usulü, fıstıklı baklava. Tereyağı ve ince yufka kullanılarak özenle hazırlandı.',
    price: 320,
    category: 'Gıda',
    imageUrl: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=600&q=80',
    author: 'Hatice N.',
    likes: 58,
    likedByUser: false,
    comments: [
      { id: 'c4', author: 'Burak D.', text: 'Muhteşem lezzet! Sipariş verdim, çok memnunum.', time: '23 Şubat 13:00' },
    ],
    createdAt: Date.now() - 1800000,
  },
];

// ── State ────────────────────────────────────────────────────
let state = {
  products:        [],
  activeCategory:  'all',
  searchQuery:     '',
  detailProductId: null,
};

// ── localStorage Helpers ─────────────────────────────────────
function saveProducts() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.products));
  } catch (e) {
    console.error('localStorage save failed', e);
  }
}

function loadProducts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) { /* ignore */ }
  return null;
}

// ── Utility ──────────────────────────────────────────────────
function generateId() {
  return 'p-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7);
}

function formatPrice(price) {
  return Number(price).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 });
}

function formatDate(ts) {
  return new Date(ts).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });
}

function timeAgo(ts) {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1)  return 'az önce';
  if (m < 60) return `${m} dk önce`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} saat önce`;
  const d = Math.floor(h / 24);
  return `${d} gün önce`;
}

// Generate an SVG placeholder image DataURL
function placeholderDataUrl(category) {
  const emoji = CAT_EMOJI[category] || '📦';
  const color = CAT_COLOR[category] || '#5a6280';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
    <rect width="600" height="400" fill="#1a1e2a"/>
    <text x="300" y="200" font-size="80" text-anchor="middle" dominant-baseline="central">${emoji}</text>
    <rect x="0" y="370" width="600" height="30" fill="${color}" opacity="0.6"/>
  </svg>`;
  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}

// ── Toast ────────────────────────────────────────────────────
function showToast(msg, type = 'info') {
  const icons = { success: '✅', error: '❌', info: '💡' };
  const container = document.getElementById('toastContainer');
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span>${icons[type]}</span><span>${msg}</span>`;
  container.appendChild(el);
  setTimeout(() => {
    el.classList.add('fade-out');
    el.addEventListener('animationend', () => el.remove());
  }, 3000);
}

// ── Filtering Logic ──────────────────────────────────────────
function getFilteredProducts() {
  let list = [...state.products].sort((a, b) => b.createdAt - a.createdAt);

  if (state.activeCategory !== 'all') {
    list = list.filter(p => p.category === state.activeCategory);
  }

  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    list = list.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.desc.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q)
    );
  }

  return list;
}

// ── Render: Product Grid ─────────────────────────────────────
function renderGrid() {
  const grid      = document.getElementById('productGrid');
  const empty     = document.getElementById('emptyState');
  const resultInfo = document.getElementById('resultInfo');
  const filtered  = getFilteredProducts();

  if (filtered.length === 0) {
    grid.innerHTML = '';
    empty.style.display = 'flex';
    empty.style.flexDirection = 'column';
    empty.style.alignItems = 'center';
    resultInfo.textContent = '';
    return;
  }

  empty.style.display = 'none';

  const total = state.products.length;
  if (state.searchQuery || state.activeCategory !== 'all') {
    resultInfo.textContent = `${filtered.length} / ${total} ürün gösteriliyor`;
  } else {
    resultInfo.textContent = `${total} ürün`;
  }

  grid.innerHTML = filtered.map(p => createCardHTML(p)).join('');

  // Attach card events
  grid.querySelectorAll('.card-like-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      toggleLike(btn.dataset.id);
    });
  });
  grid.querySelectorAll('.card-delete-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      deleteProduct(btn.dataset.id);
    });
  });
  grid.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => openDetailModal(card.dataset.id));
  });
}

function createCardHTML(p) {
  const imgSrc = p.imageUrl || placeholderDataUrl(p.category);
  const likedClass = p.likedByUser ? 'liked' : '';
  const heart = p.likedByUser ? '❤️' : '🤍';
  return `
    <div class="product-card" data-id="${p.id}">
      <div class="card-img-wrap">
        <img class="card-img" src="${imgSrc}" alt="${escHtml(p.title)}" loading="lazy"
             onerror="this.src='${placeholderDataUrl(p.category)}'" />
        <div class="card-category-badge">${escHtml(p.category)}</div>
      </div>
      <div class="card-body">
        <div class="card-title">${escHtml(p.title)}</div>
        <div class="card-desc">${escHtml(p.desc)}</div>
        <div class="card-price">${formatPrice(p.price)}</div>
        <div class="card-meta">👤 ${escHtml(p.author)} &nbsp;·&nbsp; ${timeAgo(p.createdAt)}</div>
      </div>
      <div class="card-footer">
        <button class="card-like-btn ${likedClass}" data-id="${p.id}">
          <span class="like-icon">${heart}</span>
          <span>${p.likes}</span>
        </button>
        <span class="card-comment-count">💬 ${p.comments.length}</span>
        <button class="card-delete-btn" data-id="${p.id}" title="Sil">🗑️</button>
      </div>
    </div>
  `;
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Actions ──────────────────────────────────────────────────

// Like / Unlike
function toggleLike(id) {
  const p = state.products.find(x => x.id === id);
  if (!p) return;
  p.likedByUser = !p.likedByUser;
  p.likes += p.likedByUser ? 1 : -1;
  saveProducts();
  renderGrid();

  // If detail modal is open for this product, refresh it
  if (state.detailProductId === id) updateDetailLike(p);
}

// Delete
function deleteProduct(id) {
  if (!confirm('Bu ürünü silmek istediğinize emin misiniz?')) return;
  state.products = state.products.filter(x => x.id !== id);
  saveProducts();

  if (state.detailProductId === id) closeDetailModal();

  renderGrid();
  showToast('Ürün silindi.', 'info');
}

// Add Product
function addProduct(data) {
  const newProduct = {
    id:          generateId(),
    title:       data.title,
    desc:        data.desc,
    price:       parseFloat(data.price),
    category:    data.category,
    imageUrl:    data.imageUrl || '',
    author:      data.author,
    likes:       0,
    likedByUser: false,
    comments:    [],
    createdAt:   Date.now(),
  };
  state.products.unshift(newProduct);
  saveProducts();
  renderGrid();
  showToast(`"${data.title}" paylaşıldı! 🎉`, 'success');
}

// ── Detail Modal ─────────────────────────────────────────────
function openDetailModal(id) {
  const p = state.products.find(x => x.id === id);
  if (!p) return;
  state.detailProductId = id;

  const imgSrc = p.imageUrl || placeholderDataUrl(p.category);
  document.getElementById('detailTitle').textContent   = p.title;
  document.getElementById('detailImage').src           = imgSrc;
  document.getElementById('detailImage').onerror       = function() { this.src = placeholderDataUrl(p.category); };
  document.getElementById('detailCategory').textContent = p.category;
  document.getElementById('detailDesc').textContent    = p.desc;
  document.getElementById('detailPrice').textContent   = formatPrice(p.price);
  document.getElementById('detailMeta').textContent    = `👤 ${p.author}  ·  ${formatDate(p.createdAt)}`;

  updateDetailLike(p);
  renderComments(p);

  document.getElementById('detailModalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDetailModal() {
  state.detailProductId = null;
  document.getElementById('detailModalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function updateDetailLike(p) {
  const btn = document.getElementById('detailLikeBtn');
  btn.className = 'btn-like detail-like-btn' + (p.likedByUser ? ' liked' : '');
  btn.querySelector('.like-icon').textContent  = p.likedByUser ? '❤️' : '🤍';
  btn.querySelector('.like-count').textContent = p.likes;
}

function renderComments(p) {
  const list = document.getElementById('commentsList');
  document.getElementById('commentCount').textContent = p.comments.length;

  if (p.comments.length === 0) {
    list.innerHTML = '<div class="no-comments">Henüz yorum yok. İlk yorumu sen yap! 💬</div>';
    return;
  }

  list.innerHTML = [...p.comments].reverse().map(c => `
    <div class="comment-item">
      <div class="comment-author">👤 ${escHtml(c.author)}</div>
      <div class="comment-text">${escHtml(c.text)}</div>
      <div class="comment-time">${c.time}</div>
    </div>
  `).join('');
}

function addComment(productId, author, text) {
  const p = state.products.find(x => x.id === productId);
  if (!p) return;

  const comment = {
    id:     'cmt-' + Date.now(),
    author: author.trim(),
    text:   text.trim(),
    time:   formatDate(Date.now()),
  };
  p.comments.push(comment);
  saveProducts();
  renderComments(p);
  renderGrid();
  showToast('Yorumunuz eklendi! 💬', 'success');
}

// ── Add Modal ─────────────────────────────────────────────────
function openAddModal() {
  document.getElementById('addModalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('inputTitle').focus();
}

function closeAddModal() {
  document.getElementById('addModalOverlay').classList.remove('open');
  document.body.style.overflow = '';
  document.getElementById('addProductForm').reset();
  clearFormErrors();
}

function clearFormErrors() {
  document.querySelectorAll('.form-error').forEach(el => el.textContent = '');
  document.querySelectorAll('.form-group input, .form-group textarea, .form-group select')
    .forEach(el => el.classList.remove('error'));
}

function validateAddForm() {
  clearFormErrors();
  let valid = true;

  const setError = (inputId, errId, msg) => {
    const input = document.getElementById(inputId);
    const err   = document.getElementById(errId);
    input.classList.add('error');
    err.textContent = msg;
    valid = false;
  };

  const title  = document.getElementById('inputTitle').value.trim();
  const desc   = document.getElementById('inputDesc').value.trim();
  const price  = document.getElementById('inputPrice').value.trim();
  const cat    = document.getElementById('inputCategory').value;
  const author = document.getElementById('inputAuthor').value.trim();

  if (!title)              setError('inputTitle',    'errTitle',  'Ürün adı zorunludur.');
  if (!desc)               setError('inputDesc',     'errDesc',   'Açıklama zorunludur.');
  if (!price || price < 0) setError('inputPrice',    'errPrice',  'Geçerli bir fiyat girin.');
  if (!cat)                setError('inputCategory', 'errCat',    'Kategori seçiniz.');
  if (!author)             setError('inputAuthor',   'errAuthor', 'Adınızı girin.');

  return valid;
}

// ── Category & Search ────────────────────────────────────────
function setupCategoryPills() {
  document.getElementById('categoryPills').addEventListener('click', e => {
    const pill = e.target.closest('.pill');
    if (!pill) return;
    document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    state.activeCategory = pill.dataset.cat;
    renderGrid();
  });
}

function setupSearch() {
  const input = document.getElementById('searchInput');
  const clear = document.getElementById('clearSearch');

  input.addEventListener('input', () => {
    state.searchQuery = input.value.trim();
    clear.classList.toggle('visible', state.searchQuery.length > 0);
    renderGrid();
  });

  clear.addEventListener('click', () => {
    input.value      = '';
    state.searchQuery = '';
    clear.classList.remove('visible');
    input.focus();
    renderGrid();
  });
}

// ── Event Wiring ─────────────────────────────────────────────
function setupEvents() {
  // Open / close Add Modal
  document.getElementById('openAddModal').addEventListener('click', openAddModal);
  document.getElementById('closeAddModal').addEventListener('click', closeAddModal);
  document.getElementById('cancelAddModal').addEventListener('click', closeAddModal);
  document.getElementById('addModalOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('addModalOverlay')) closeAddModal();
  });

  // Submit Add Product Form
  document.getElementById('addProductForm').addEventListener('submit', e => {
    e.preventDefault();
    if (!validateAddForm()) return;
    addProduct({
      title:    document.getElementById('inputTitle').value.trim(),
      desc:     document.getElementById('inputDesc').value.trim(),
      price:    document.getElementById('inputPrice').value,
      category: document.getElementById('inputCategory').value,
      imageUrl: document.getElementById('inputImage').value.trim(),
      author:   document.getElementById('inputAuthor').value.trim(),
    });
    closeAddModal();
  });

  // Detail Modal close
  document.getElementById('closeDetailModal').addEventListener('click', closeDetailModal);
  document.getElementById('detailModalOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('detailModalOverlay')) closeDetailModal();
  });

  // Detail Like
  document.getElementById('detailLikeBtn').addEventListener('click', () => {
    if (state.detailProductId) toggleLike(state.detailProductId);
  });

  // Detail Delete
  document.getElementById('detailDeleteBtn').addEventListener('click', () => {
    if (state.detailProductId) deleteProduct(state.detailProductId);
  });

  // Add Comment
  document.getElementById('submitComment').addEventListener('click', () => {
    const author = document.getElementById('commentAuthor').value.trim();
    const text   = document.getElementById('commentText').value.trim();
    if (!author || !text) {
      showToast('Lütfen adınızı ve yorumunuzu girin.', 'error');
      return;
    }
    addComment(state.detailProductId, author, text);
    document.getElementById('commentAuthor').value = '';
    document.getElementById('commentText').value   = '';
  });

  // Close modals with Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeAddModal();
      closeDetailModal();
    }
  });

  setupCategoryPills();
  setupSearch();
}

// ── Boot ─────────────────────────────────────────────────────
function init() {
  const saved = loadProducts();
  state.products = saved !== null ? saved : [...SEED_PRODUCTS];
  if (!saved) saveProducts(); // persist seed data

  setupEvents();
  renderGrid();
}

document.addEventListener('DOMContentLoaded', init);

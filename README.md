# 📦 BEUShareBox

<div align="center">

![BEUShareBox Banner](https://img.shields.io/badge/BEU-ShareBox-7c6dfa?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHRleHQgeT0iMjAiIGZvbnQtc2l6ZT0iMjAiPvCfk6Y8L3RleHQ+PC9zdmc+)

**Bitlis Eren Üniversitesi Mini Ürün Paylaşım Platformu**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![localStorage](https://img.shields.io/badge/localStorage-Persistence-22d3a5?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

> Hiçbir framework, hiçbir backend, hiçbir kurulum gerektirmeyen saf HTML/CSS/JS ile geliştirilmiş sosyal ürün paylaşım platformu.

</div>

---

## ✨ Özellikler

| Özellik | Açıklama |
|---|---|
| 📦 **Ürün Ekle** | Başlık, açıklama, fiyat, kategori ve görsel URL ile ürün paylaş |
| ❤️ **Beğeni Sistemi** | Ürünleri beğen / beğeniyi geri al — nabız animasyonu ile |
| 💬 **Yorum Yap** | Her ürüne yorum bırak, yorumlar gerçek zamanlı güncellenir |
| 🔍 **Anlık Arama** | Başlık, açıklama ve kullanıcı genelinde gerçek zamanlı arama |
| 🏷️ **Kategori Filtresi** | Elektronik, Giyim, Kitap, Gıda, Spor, Diğer kategorilere göre filtrele |
| 🗑️ **Ürün Sil** | Kart üzerinden ya da detay modaldan ürün sil |
| 💾 **localStorage** | Tüm veriler tarayıcınızda kalıcı olarak saklanır |
| 🌱 **Örnek Veriler** | İlk açılışta 6 gerçekçi örnek ürün otomatik yüklenir |

---

## 🚀 Kurulum & Başlatma

Bu proje **sıfır bağımlılık** ile çalışır. Kurulum gerekmez.

```bash
# Repoyu klonla
git clone https://github.com/cagri/BEUShareBox.git

# Klasöre gir
cd BEUShareBox

# index.html'i tarayıcıda aç — HAZIR!
```

Alternatif olarak `index.html` dosyasına **çift tıklayın**, herhangi bir modern tarayıcıda doğrudan çalışır.

---

## 📁 Proje Yapısı

```
BEUShareBox/
├── index.html      # Ana sayfa yapısı ve modaller
├── style.css       # Premium koyu tema, animasyonlar, responsive tasarım
├── app.js          # Tüm iş mantığı + localStorage yönetimi
└── README.md       # Bu dosya
```

---

## 🎨 Tasarım Sistemi

- **Tema:** Koyu (Dark) mod
- **Tipografi:** Inter (Google Fonts)
- **Kart efekti:** Glassmorphism + hover animasyonları
- **Renk paleti:** Mor accent (`#7c6dfa`), yeşil fiyat (`#22d3a5`), kırmızı beğeni (`#f87171`)
- **Responsive:** Mobil, tablet ve masaüstü destekli grid layout

---

## 📦 Veri Modeli

Her ürün aşağıdaki alanları içerir:

```js
{
  id:          "p-1234567890",      // Benzersiz ID
  title:       "Ürün Adı",
  desc:        "Açıklama...",
  price:       999,                  // ₺ cinsinden
  category:    "Elektronik",
  imageUrl:    "https://...",        // Opsiyonel
  author:      "Paylaşan Adı",
  likes:       0,
  likedByUser: false,
  comments:    [
    { id, author, text, time }
  ],
  createdAt:   1700000000000         // UNIX timestamp
}
```

---

## 🛠️ Teknik Detaylar

- **Veri Kalıcılığı:** `localStorage` API — her değişiklikte otomatik kayıt
- **Arama:** Debounce olmaksızın gerçek zamanlı, büyük/küçük harf duyarsız
- **Ürün Görseli:** URL yoksa SVG tabanlı otomatik placeholder üretimi
- **Form Validasyonu:** Native HTML5 + JS ile client-side doğrulama
- **Bildirimler:** Yerleşik toast sistemi (başarı / hata / bilgi)

---

## 📸 Ekran Görüntüleri

> Uygulamayı açıp aşağıdaki özellikleri deneyin:

- **Ana Sayfa** → 6 ürün kartı, arama çubuğu, kategori pilleri
- **Ürün Detayı** → Karta tıklayın → detaylı görünüm + yorum formu
- **Ürün Ekleme** → "Ürün Ekle" butonuna tıklayın → modal form

---

## 👤 Geliştirici

**Çağrı Ünlü**  
Bitlis Eren Üniversitesi  
📧 by.liselicimbom@gmail.com

---

<div align="center">

⭐ Beğendiyseniz yıldız atmayı unutmayın!

</div>

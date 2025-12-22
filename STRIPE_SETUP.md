# Stripe Payment Integration - Setup Guide

## ✅ Tamamlanan İşlemler

1. **Stripe Elements** entegrasyonu yapıldı
2. **Payment Modal** component'i oluşturuldu
3. **Netlify Functions** backend'i kuruldu
4. **Customer + Payment Method** sistemi hazır

## 🔧 Yapmanız Gerekenler

### 1. Stripe API Keys

Stripe Dashboard'dan API anahtarlarınızı alın:
- [Stripe Dashboard](https://dashboard.stripe.com/apikeys)

### 2. Netlify Environment Variables

Netlify Dashboard → Site Settings → Environment Variables'a gidin ve ekleyin:

```
STRIPE_SECRET_KEY=sk_live_... (veya sk_test_...)
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_... (veya pk_test_...)
```

> ⚠️ **ÖNEMLİ**: 
> - `STRIPE_SECRET_KEY` → Backend için (VITE_ prefix YOK)
> - `VITE_STRIPE_PUBLISHABLE_KEY` → Frontend için (VITE_ prefix VAR)

### 3. Deploy

```bash
git add .
git commit -m "feat: add Stripe Elements payment integration"
git push
```

Netlify otomatik deploy edecek.

---

## 📋 Nasıl Çalışıyor?

### Kullanıcı Akışı:

1. Kullanıcı `/testpage` sayfasında plan seçer (1-Week, 4-Week, 12-Week)
2. "GET MY PLAN" butonuna tıklar
3. **Payment Modal** açılır
4. Email, isim ve kart bilgilerini girer
5. "Pay" butonuna tıklar

### Backend İşlemleri:

1. **Stripe Customer** oluşturulur (veya mevcut müşteri bulunur)
2. **Payment Method** müşteriye bağlanır
3. **Default payment method** olarak ayarlanır
4. **Payment Intent** oluşturulur ve onaylanır (`off_session: true`)
5. Kart bilgileri Stripe'da güvenle saklanır

### Sonradan Ödeme Çekme:

Müşteri bilgileri Stripe'da saklandığı için, istediğiniz zaman:

```javascript
// Stripe Dashboard'dan veya API ile
stripe.paymentIntents.create({
  amount: 1999, // $19.99
  currency: 'usd',
  customer: 'cus_xxxxx', // Kaydedilen customer ID
  off_session: true,
  confirm: true,
})
```

---

## 🔒 Güvenlik

- ✅ Kart bilgileri hiçbir zaman sizin sunucunuza gelmez
- ✅ Stripe Elements iframe kullanır (PCI DSS compliant)
- ✅ Payment Method güvenle Stripe'da saklanır
- ✅ `off_session: true` ile sonradan ödeme çekebilirsiniz

---

## 🧪 Test

### Test Kartları:

```
Başarılı: 4242 4242 4242 4242
3D Secure: 4000 0027 6000 3184
Reddedilir: 4000 0000 0000 0002

CVV: Herhangi 3 rakam
Tarih: Gelecekte herhangi bir tarih
```

### Test Modu:

1. `sk_test_...` ve `pk_test_...` anahtarlarını kullanın
2. Test kartlarıyla ödeme yapın
3. [Stripe Dashboard](https://dashboard.stripe.com/test/payments) → Payments'ta görün

---

## 📊 Müşteri Yönetimi

### Stripe Dashboard'da:

- **Customers** → Tüm müşterileri görün
- **Payment Methods** → Kaydedilen kartları görün
- **Payments** → Ödeme geçmişini görün

### Sonradan Ödeme Çekmek İçin:

1. Stripe Dashboard → Customers
2. Müşteriyi bulun
3. "Charge customer" butonuna tıklayın
4. Tutarı girin ve onaylayın

---

## 🎯 Özellikler

✅ Kart bilgileri sayfadan ayrılmadan alınır  
✅ Müşteri Stripe'da kaydedilir  
✅ Payment method default olarak ayarlanır  
✅ `off_session: true` ile sonradan ödeme çekebilirsiniz  
✅ 3D Secure desteği  
✅ Meta Pixel tracking entegre  
✅ Responsive tasarım  
✅ Loading states  
✅ Error handling  

---

## 🐛 Sorun Giderme

### "Stripe configuration missing" hatası:
- `VITE_STRIPE_PUBLISHABLE_KEY` environment variable'ını ekleyin
- Netlify'da yeni deployment tetikleyin

### Payment başarısız oluyor:
- `STRIPE_SECRET_KEY` doğru mu kontrol edin
- Stripe Dashboard'da "Logs" bölümüne bakın
- Browser console'da hata mesajlarını kontrol edin

### Modal açılmıyor:
- Browser console'da hata var mı kontrol edin
- `@stripe/stripe-js` package yüklü mü kontrol edin

---

## 📞 Destek

Herhangi bir sorun olursa:
1. Browser console'u kontrol edin
2. Netlify Functions logs'u kontrol edin
3. Stripe Dashboard → Logs bölümüne bakın

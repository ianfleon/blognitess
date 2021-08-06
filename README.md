# Blognitess
Blognite Static Site

## Mengambil data web
Taruh attribute ```data-web``` pada sebuah element, kemudian diikuti dengan penanda #{}# berisi data sesuai dengan yang ada di ```konfigurasi.json```

- ```nama_web``` : nama website
- ```base_url``` : alamat utama website

**Contoh:**
```html
<a href="#{base_url}#" data-web>#{nama_web}#</a>
```

## Menampilkan daftar postingan
Buat sebuah element untuk pembungkus, nantinya akan menampung daftar element post. Kemudian beri attribute ```data-blog="wrap-post"```

**Contoh:**
```html
<div class="container" data-blog="wrap-post"></div>
```

Setelah itu buat sebuah element yang nanti berisi data dari setiap post, beri juga attribute seperti ini ```data-blog="item-post"```

**Contoh:**
```html
<!-- Pembungkus -->
<div class="container" data-blog="wrap-post">
    <!-- Item -->
    <div class="card" data-blog="item-post"></div>
</div>
```

Untuk mengambil informasi dari setiap item dari daftar postingan, beri attribute ```data-blog``` dan diikuti penanda #{}# yang berisi kata kunci.

**Contoh:**
```html
<!-- Pembungkus -->
<div class="container" data-blog="wrap-post">
    <!-- Item -->
    <div class="card" data-blog="item-post">
        <h2 data-blog>#{judul}#</h2>
    </div>
</div>
```
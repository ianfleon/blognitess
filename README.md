# Blognitess
Blognite Static Site (Versi 1.7845).

Sebuah kerangka sederhana untuk membuat "Web Statis". Kerangka ini menggunakan "Markdown" untuk kontennya.

# Menggunakan Blognitess
Cukup dengan memanggil file utamanya:
```html
<!-- Versi Asli (Develop)  -->
<script src="maincore/blognitess.js"></script>

<!-- Versi Minify -->
<script src="maincore/blognitess.min.js"></script>
```
taruh sebelum tag ```</body>```

# Menjalankan Blognitess Di Lokal Server
Bisa dengan menggunakan ```Live Server``` pada ekstensi VSCode atau Brackets.

# Hosting Website
Untuk saat ini, saya merekomendasikan ```Github Pages``` karena mudah dan bisa dikostumisasi (nama domain).

# Penanda Blognitess
```#{}#```

Contoh: ```#{base_url}#``` (tidak boleh ada space/spasi)

# Struktur Folder Utama
- ```_default``` : berisi template/penulisan standar (boleh dihapus)*
- ```datapost``` : berisi file ```page.json``` dan folder ```list```
- ```list``` : berisi file yang berisi nama-nama dari file postingan
- ```maincore``` : berisi file inti sistem
- ```postingan``` : berisi file postingan (konten) berupa file markdown

# File Utama
- ```konfigurasi.json``` : file konfigurasi website
- ```index.html``` : sebagai file yang akan menampilkan ```daftar post```
- ```post.html``` : sebagai file yang akan menampilkan ```detail postingan```
- ```404.html``` : file yang akan ditampikan ketika halaman/data tidak ditemukan

# Membuat Postingan/Konten Baru
Buka folder ```postingan``` dan buat sebuah file baru dengan ekstensi ```.md```.
Penulisan nama file menggunakan tanda ```-``` sebagai pemisah. Tidak boleh menggunakan ```space```.

Contoh: ```halo-dunia.md```
```md
+--
judul : "HUT REPUBLIK INDONESIA"
deskripsi : "Hari Kemerdekaan Indonesia"
waktu : "17 Agustus 2021"
+--

Halo Dunia!

```

# Mempublikasi Postingan
Buka folder ```datapost/list``` kemudian buat sebuah file JSON. Misal: ```halamansatu.json```.
```json
{
    "postingan" : [
        {"url" : "halo-dunia"}
    ]
}
```

Jika ingin menambah postingan lain, tambahkan objek baru dengan katakunci/index ```url``` dan diisi dengan nama file
(tanpa ekstensi).

Anggap saja ini adalah satu halaman. Jika ingin membuat halaman lain, silahkan tambahkan file baru dengan nama sesuai
selera.

Setelah itu, buka ```page.json``` di folder ```datapost``` kemudian isi nama file yang sudah dibuat.
```json
{
    "page" : [
        "halamansatu"
    ]
}
```

## Mengambil Data Konfigurasi Web
Taruh attribute ```--data-web``` di element, dan beri nilai pada penanda sesuai dengan yang ada pada file
```konfigurasi.json```

Contoh: ```<title --data-web>#{nama_web}#</title>```

## Mengambil Dafar Postingan
Beri attribute ```--daftar-post``` pada element yang ingin dilooping sebagai item.

**Contoh Kode:**
```html
<div class="kontener" --daftar-post>
    <!-- Diikuti Pembungkus Dari Penanda -->
</div>
```

Kemudian buat sebuah wrapper (pembungkus) dari post. Nantinya diberi penanda sesuai data yang ingin diambil.

**Contoh Kode:**
```html
<div class="pembungkus-post" --data-post>
    <a href="post.html?/#{url}#">#{judul}#</a>
    <div class="konten">
        #{deskripsi}#
        <br>
        <time>#{waktu}#</time>
    </div>
</div>
```

Jadinya :
```html
<div class="kontener" --daftar-post>
    <div class="pembungkus-post" --data-post>
        <a href="post.html?/#{url}#">#{judul}#</a>
        <div class="konten">
            #{deskripsi}#
            <br>
            <time>#{waktu}#</time>
        </div>
    </div>
</div>
```

> Penanda diatas berdasarkan meta-data pada file postingan (MD).

## Menampilkan Isi Post
URL Default: ```post.html?/``` + ```nama-file-postingan```

Silahkan atur file html di ```konfigurasi.json``` yang akan digunakan untuk menampikan isi postingan.

Default: ```file_post_html: post.html``` (jika dikosongkan juga sama).
Silahkan dimodifikasi seperti ```file_post_html: artikel.html``` dan lain-lain.

Nilai Penanda Pada Postingan:
- ```judul``` : Judul dari Postingan (Sesuai pada file MD)
- ```deskripsi``` : Deskripsi dari Postingan (Sesuai pada file MD)
- ```waktu``` : Waktu postingan dibuat/diupload (Sesuai pada file MD)
- ```isi``` : Isi dari Postingan (Sesuai pada file MD)

**Contoh Kode:**
```html
<div class="konten" --data-post>
    <h2>#{judul}#</h2>
    <p>#{waktu}#</p>
    #{isi}#
</div>
```

## Pagination
URL Default: ```index.html?=``` + ```halaman```

Untuk mengambil data (angka) page/halaman, beri attribute ```--data-page```.
- ```sekarang```
- ```sebelum```
- ```setelah```

**Contoh Kode:**
```html
<nav class="pagination" --data-page>
    <a href="index.html?=#{sebelum}#">Sebelum</a>
    <a href="index.html?=#{setelah}#">Setelah</a>
</nav>
```

# Catatan
Silahkan gunakan, kontribusi, cakar bongkar, dan lain-lain. Lakukanlah dengan senang hati.

# Thanks to
- Markdown Parser Default By : [https://codepen.io/kvendrik/pen/Gmefv](https://codepen.io/kvendrik/pen/Gmefv) (Versi Lana)
- Markdown-it : [https://github.com/markdown-it/markdown-it](https://github.com/markdown-it/markdown-it) (Versi Baru)

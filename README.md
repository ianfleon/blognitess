# Blognitess
Blognite Static Site

Sebuah kerangka sederhana untuk membuat "Web Statis". Kerangka ini menggunakan "Markdown" untuk kontennya.

# Penanda Blognitess
```#{}#```

Contoh: ```#{base_url}#``` (tidak boleh ada space/spasi)

# Struktur Folder Utama
- ```_default``` : berisi sebuah file markdown sebagai template postingan
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

Jika ingin menambah postingan lain, tambahkan objek baru dengan katakunci/index ```url``` dan diisi dengan nama file (tanpa ekstensi).

Anggap saja ini adalah satu halaman. Jika ingin membuat halaman lain, silahkan tambahkan file baru dengan nama sesuai selera.

Setelah itu, buka ```page.json``` di folder ```datapost``` kemudian isi nama file yang sudah dibuat.
```json
{
    "page" : [
        "halamansatu"
    ]
}
```

## Mengambil Data Konfigurasi Web
Taruh attribute ```--data-web``` di element, dan beri nilai pada penanda sesuai dengan yang ada pada file ```konfigurasi.json```

Contoh: ```<title --data-web>#{nama_web}#</title>```

## Menambil Dafar Postingan
Beri attribute ```--daftar-post``` pada element yang ingin dilooping sebagai item.

**Contoh Kode:**
```html
<div class="column is-four-fifth" --daftar-post>

</div>
```

Kemudian buat sebuah wrapper (pembungkus) dari post. Nantinya diberi penanda sesuai data yang ingin diambil.

**Contoh Kode:**
```html
<div class="card" --data-post>
    <div class="card-content">
        <div class="media">
            <div class="media-content">
                <a href="post.html?/#{url}#" class="title is-4">#{judul}#</a>
                <p class="subtitle is-6">#{penulis}#</p>
            </div>
        </div>
        <div class="content">
            #{deskripsi}#
            <a href="#">#css</a> <a href="#">#responsive</a>
            <br>
            <time datetime="2016-1-1">#{waktu}#</time>
        </div>
    </div>
</div>
```

## Menampilkan Isi Post
URL Default: ```post.html?/``` + ```nama-file-postingan```

Silahkan atur file html di ```konfigurasi.json``` yang akan digunakan untuk menampikan isi postingan.

Default: ```file_post_html: post.html``` (jika dikosongkan juga sama).
Silahkan dimodifikasi seperti ```file_post_html: artikel.html``` dan lain-lain.

**Contoh Kode:**
```html
<!-- Kontener -->
<div class="container mt-5">
    <div class="columns is-multiline">
        <div class="column is-four-fifth">
            <div class="card">
                <div class="card-content">
                    <div class="content" --data-post>
                        <h2 class="title is-4">#{judul}#</h2>
                        <p>#{waktu}#</p>
                        #{isi}#
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
<!-- End Kontener -->
```

## Pagination
URL Default: ```index.html?=``` + ```halaman```

Untuk mengambil data (angka) page/halaman, beri attribute ```--data-page```.
- ```sekarang```
- ```sebelum```
- ```setelah```

**Contoh Kode:**
```html
<nav class="pagination mt-5" role="navigation" aria-label="pagination" --data-page>
    <a class="pagination-previous" href="index.html?=#{sebelum}#">Sebelum</a>
    <a class="pagination-next" href="index.html?=#{setelah}#">Next page</a>
</nav>
```

# Isu Terkini
Parsing Markdown belum mendukung penulisan tag:
- List
- Pre/Code

# Thanks
Markdown Parser Default By : [https://codepen.io/kvendrik/pen/Gmefv](https://codepen.io/kvendrik/pen/Gmefv)
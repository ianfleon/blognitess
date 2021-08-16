# Blognitess
Blognite Static Site

## Menambil Dafar Postingan
Beri attribute ```--daftar-post``` pada element yang ingin dilooping sebagai item. Misalnya:

```html
<div class="column is-four-fifth" --daftar-post>

</div>
```

Kemudian buat sebuah wrapper (pembungkus) dari post :

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

Markdown Parser Default By : [https://codepen.io/kvendrik/pen/Gmefv](https://codepen.io/kvendrik/pen/Gmefv)
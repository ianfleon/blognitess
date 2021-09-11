/* Cek file dalam folder */
function _CHECK_FILE_EXISTS(url) {
    const http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status;
}

function _ERROR_MEN(pesan = "", bagian = "") {
    const El_HTML = document.querySelector('html');
    El_HTML.innerHTML = "";
    const El_PESAN = document.createElement('p');
    const El_BAGIAN = document.createElement('p');
    const El_Text_PESAN = document.createTextNode("Error: " + pesan);
    const El_Text_BAGIAN = document.createTextNode("Cek: " + bagian);
    El_PESAN.append(El_Text_PESAN);
    El_PESAN.style.color = "red";
    El_BAGIAN.append(El_Text_BAGIAN);
    El_BAGIAN.style.color = "green";
    El_HTML.appendChild(El_PESAN);
    El_HTML.appendChild(El_BAGIAN);
    return false;
}

/* Load File JSON */
function _LOAD_FILE(file, fungsi, respon = 'json', item = null) {

    if (respon == 'json') {
        fetch(file)
            .then(response => response.json())
            .then(data => {
                if (item != null) {
                    fungsi(data[item]);
                } else {
                    fungsi(data);
                }
            });
    } else if (respon = 'text') {
        fetch(file)
            .then(response => response.text())
            .then(data => {
                if (item != null) {
                    fungsi(data[item]);
                } else {
                    fungsi(data);
                }
            });
    }

}

/* Manipulasi Element secara keseluruhan (dipilih) */
function _RE_OUTER(elemen, nilai) {

    // menyimpan data trigger
    let my = {};
    let newElemen = elemen.match(/#{(.*?)}#{1}/g);

    if (newElemen === null) {
        _ERROR_MEN("Waduh, ada yang error nih! Coba cek penulisan tandanya.", elemen);
    }

    newElemen.forEach(n => {
        my[n] = n.replace(/#{(.*?)}#{1}/g, '$1');
    });

    const keys = Object.keys(my); // mengambil index objek menjadi array

    for (let i = 0; i < keys.length; i++) {

        if (nilai[my[keys[i]]] == undefined) {
            nilai[my[keys[i]]] = '-';
        }

        elemen = elemen.replaceAll(keys[i], nilai[my[keys[i]]]);

    }

    // mengembalikan elemen yang sudah jadi
    return elemen;
}

/* Parse Markdown File */
function _PARSE_MARKDOWN(md) {

    //ul
    //   md = md.replace(/^\s*\n\*/gm, '<ul>\n*');
    //   md = md.replace(/^(\*.+)\s*\n([^\*])/gm, '$1\n</ul>\n\n$2');
    //   md = md.replace(/^\*(.+)/gm, '<li>$1</li>');

    md = md.replace(/\n\s*(\*|\-)\s*([^\n]*)/g, '\n<ul><li>$2</li></ul>');

    //ol
    md = md.replace(/^\s*\n\d\./gm, '<ol>\n1.');
    md = md.replace(/^(\d\..+)\s*\n([^\d\.])/gm, '$1\n</ol>\n\n$2');
    md = md.replace(/^\d\.(.+)/gm, '<li>$1</li>');

    //blockquote
    md = md.replace(/^\>(.+)/gm, '<blockquote>$1</blockquote>');

    //h
    md = md.replace(/[\#]{6}(.+)/g, '<h6>$1</h6>');
    md = md.replace(/[\#]{5}(.+)/g, '<h5>$1</h5>');
    md = md.replace(/[\#]{4}(.+)/g, '<h4>$1</h4>');
    md = md.replace(/[\#]{3}(.+)/g, '<h3>$1</h3>');
    md = md.replace(/[\#]{2}(.+)/g, '<h2>$1</h2>');
    md = md.replace(/[\#]{1}(.+)/g, '<h1>$1</h1>');

    //alt h
    md = md.replace(/^(.+)\n\=+/gm, '<h1>$1</h1>');
    md = md.replace(/^(.+)\n\-+/gm, '<h2>$1</h2>');

    //images
    md = md.replace(/\!\[([^\]]+)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1" />');

    //links
    md = md.replace(/[\[]{1}([^\]]+)[\]]{1}[\(]{1}([^\)\"]+)(\"(.+)\")?[\)]{1}/g, '<a href="$2" title="$4">$1</a>');

    //font styles
    md = md.replace(/[\*\_]{2}([^\*\_]+)[\*\_]{2}/g, '<b>$1</b>');
    md = md.replace(/[\*\_]{1}([^\*\_]+)[\*\_]{1}/g, '<i>$1</i>');
    md = md.replace(/[\~]{2}([^\~]+)[\~]{2}/g, '<del>$1</del>');

    //pre
    md = md.replace(/^\s*\n\`\`\`(([^\s]+))?/gm, '<pre class="$2">');
    md = md.replace(/^\`\`\`\s*\n/gm, '</pre>\n\n');

    //code
    md = md.replace(/[\`]{1}([^\`]+)[\`]{1}/g, '<code>$1</code>');

    //p
    md = md.replace(/^\s*(\n)?(.+)/gm, function (m) {
        return /\<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(m) ? m : '<p>' + m + '</p>';
    });

    //strip p from pre
    md = md.replace(/(\<pre.+\>)\s*\n\<p\>(.+)\<\/p\>/gm, '$1$2');

    return md;

}

function _LOAD_CONFIG(config) {
    const EL_CONFIG = document.querySelectorAll('[--data-web]');
    EL_CONFIG.forEach(function (EL) {
        EL.outerHTML = _RE_OUTER(EL.outerHTML, config)
    });
}

function _SHOW_POST(data) {
    let isi = document.querySelectorAll('[--data-post]');
    isi.forEach(i => {
        i.outerHTML = _RE_OUTER(i.outerHTML, _REBUILD_POST(data));
    });
}

function _CHECK_FILE_POST_HTML() {
    _LOAD_FILE('konfigurasi.json', _GET_FILE_POST_HTML);
}

function _GET_FILE_POST_HTML(config) {

    if (config.file_post_html === undefined || config.file_post_html === '') {
        config.file_post_html = 'post.html';
    }

    let file_sekarang = window.location.href.split()[0].split('/');
    file_sekarang = file_sekarang[file_sekarang.length - 1];

    if (file_sekarang === config.file_post_html || file_sekarang != 'index.html') {
        _GET_POSTINGAN();
    }

    // Handling URL pada post
    const CURRENTURL = window.location.href.split('/');
    if (CURRENTURL[CURRENTURL.length - 1].includes('post.html')) {
        if (CURRENTURL[CURRENTURL.length - 1].includes(config.file_post_html + '?/') == false) {
            __REDIRECT('index.html');
        }
    }

}

function __REDIRECT(url) {
    window.location.replace(url);
}

/* Load File */
function _GET_POSTINGAN() {

    /* Mengambil URL */
    let fileurl = window.location.href;
    fileurl = fileurl.split('?/');

    /* Jika add URL untuk get  file */
    if (fileurl.length > 1) {

        let fmd = fileurl[fileurl.length - 1];

        if (_CHECK_FILE_EXISTS('postingan/' + fmd + '.md') == 200) {
            _LOAD_FILE('postingan/' + fmd + '.md', _SHOW_POST, 'text');
        } else {
            window.location.replace('404.html');
        }

    }
}

/* Mengambil Detail Meta Post */
function _REBUILD_POST(data) {

    // meta data dari post
    const meta = data.match(/[\+--\_]{2}([^\\_]+)[\+--\_]{2}/g);
    const info = meta[0].match(/[^\r\n]+/g);
    info.pop();
    info.shift();

    let dm = {};

    info.forEach(function (i) {

        let d = i.split(' : ');

        if (d[1] == undefined) {
            console.log("Perhatikan penulisan meta pada file markdown.");
        }

        dm[d[0]] = d[1].trim().replaceAll('"', '');

    });

    // dm.isi = data.replace(meta, '');
    // console.log(dm);

    const isi = data.replace(meta[0], '');
    dm.isi = _PARSE_MARKDOWN(isi);
    // console.log(dm.isi);


    return dm;

}

let $totalfile = 0;
let $hasilfile = [];

function _CHECK_FILE_PAGES(data) {

    data.totalpage = data.page.length; // set totalpage

    const f = 'datapost/list/' + data.page[_CHECK_PAGE() - 1] + '.json';

    if (_CHECK_FILE_EXISTS(f) == 200) {
        _LOAD_FILE(f, _GET_FILE_MD, 'json', 'postingan');
    } else {
        _ERROR_MEN('File "page.json" di folder "datapost" tidak sesuai dengan nama file di folder "datapost/list"', "datapost/list | page.json");
    }
}

/* List post */
function _SET_LIST_POST(data) {

    const Item_Post = document.querySelector('[--daftar-post]');

    if (Item_Post == null) {
        return false;
    }

    for (let i = 0; i < data.length - 1; i++) {
        Item_Post.parentElement.appendChild(Item_Post.cloneNode(true));
    }

    const All_Item_Post = document.querySelectorAll('[--daftar-post]');

    All_Item_Post.forEach(function (aip, index) {
        const Pendanda_Ku = aip.querySelectorAll('[--data-post]');
        Pendanda_Ku.forEach(function (pk) {
            pk.outerHTML = _RE_OUTER(pk.outerHTML, data[index]);
        });
    });

}

// Testing --
function _GET_FILE_MD(urls) {

    _CEK_FILE_POSTINGAN(urls.length); // kirim total file postingan

    urls.forEach((my) => {

        fetch('postingan/' + my.url + '.md').then(hasil => hasil.text()).then(function (data) {
            _GET_META_MD(data, my.url);
        });

    });
}

// Testing -- get meta markdown
function _GET_META_MD(data, myurl) {

    // meta data dari post
    const meta = data.match(/[\+--\_]{2}([^\\_]+)[\+--\_]{2}/g);

    if (meta === null) {
        _ERROR_MEN("Nama file postingan tidak sama dengan yang ada di datapost/list", "datapost/list | postingan");
        return false;
    }

    const info = meta[0].match(/[^\r\n]+/g);
    info.pop();
    info.shift();

    let dm = {};

    info.forEach(function (i) {

        let d = i.split(' : ');

        if (d[1] == undefined) {
            console.log("Perhatikan penulisan meta pada file markdown.");
        }

        dm[d[0]] = d[1].trim().replaceAll('"', '');

    });

    dm.url = myurl; // kumpulan url
    $hasilfile.push(dm);

}

function _CEK_FILE_POSTINGAN(totalfile) {

    // console.log("fungsi: _CEK_FILE_POSTINGAN");

    const CHECK_FILES = setInterval(() => {
        if (totalfile === $hasilfile.length) {
            clearInterval(CHECK_FILES);
            _SET_LIST_POST($hasilfile);
        } else if (totalfile === null) {
            clearInterval(CHECK_FILES);
        }

    }, 100);

}

/* Cek URL ? Ada parameter atau tidak */
function _CHECK_PAGE() {

    const url = window.location.href;

    let p;
    if (url.search('index.html') != null) {
        // console.log("Ada nih!");
        p = url.split('?=');
        if (p.length > 1) {
            if (p[1] != '') {
                return p[1];
            } else {
                return 1;
            }
        } else {
            return 1;
        }
    }

}

function _RUN_PAGE(page) {
    _LOAD_FILE('datapost/page.json', _CHECK_FILE_PAGES);
}

function _GET_PAGE(data) {

    const PAGE = {};
    PAGE.total = data.page.length;
    PAGE.sekarang = _CHECK_PAGE();
    PAGE.setelah = parseInt(_CHECK_PAGE()) + 1;
    PAGE.sebelum = parseInt(_CHECK_PAGE()) - 1;

    if (parseInt(_CHECK_PAGE()) == PAGE.total) {
        PAGE.setelah = PAGE.total;
    }

    if (parseInt(_CHECK_PAGE()) == 1) {
        PAGE.sebelum = 1;
    }

    const Tanda_Page = document.querySelectorAll("[--data-page]");

    Tanda_Page.forEach(t => {
        t.outerHTML = _RE_OUTER(t.outerHTML, PAGE);
    });

}

/* Fungsi Pertama */
_LOAD_FILE('konfigurasi.json', _LOAD_CONFIG);
window.onload = _RUN_PAGE();
_CHECK_FILE_POST_HTML();
_LOAD_FILE('datapost/page.json', _GET_PAGE);
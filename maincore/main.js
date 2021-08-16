let $totalfile = 0;
let $hasilfile = [];

function _CHECK_FILE_PAGES(data) {
    data.totalpage = data.page.length; // set totalpage
    const f = 'datapost/list/' + data.page[_CHECK_PAGE()-1] + '.json';
    if (_CHECK_FILE_EXISTS(f) == 200) {
        _LOAD_FILE(f, _GET_FILE_MD, 'json', 'postingan');
    } else {
        window.location.replace('404.html');
    }
}

/* List post */
function _SET_LIST_POST(data) {

    const Item_Post = document.querySelector('[--daftar-post]');
    
    for (let i = 0; i < data.length - 1; i++) {
        Item_Post.parentElement.appendChild(Item_Post.cloneNode(true));
    }

    const All_Item_Post = document.querySelectorAll('[--daftar-post]');

    All_Item_Post.forEach(function(aip, index) {
        const Pendanda_Ku = aip.querySelectorAll('[--data-post]');
        Pendanda_Ku.forEach(function(pk) {
            pk.outerHTML = _RE_OUTER(pk.outerHTML, data[index]);
        });
    });

}

// Testing --
function _GET_FILE_MD(urls) {

    _CEK_FILE_POSTINGAN(urls.length); // kirim total file postingan

    urls.forEach((my)=> {

        const KODE_CEK = _CHECK_FILE_EXISTS('postingan/' + my.url + '.md');

        if (KODE_CEK == 404) {
            console.error("File tidak ada dengan URL di list");
            _CEK_FILE_POSTINGAN(null);
        } else if (KODE_CEK == 200) {
            // console.log("file ada");
            fetch('postingan/' + my.url + '.md').then(hasil => hasil.text()).then(function(data) {
                _GET_META_MD(data, my.url);
            });
        }

    });
}

// Testing -- get meta markdown
function _GET_META_MD(data, myurl) {

    // meta data dari post
    const meta = data.match(/[\---\_]{2}([^\\_]+)[\---\_]{2}/g);

    if (meta === null) {
        console.error("BLOGNITESS ERROR: Cek URL di datapost/list");
        document.querySelector('html').innerHTML = '';
        return false;
    }

    const info = meta[0].match(/[^\r\n]+/g);
    info.pop();
    info.shift();

    let dm = {};

    info.forEach(function(i) {

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

    // console.log(totalfile);

    const CHECK_FILES = setInterval(() => {
        if (totalfile === $hasilfile.length) {
            clearInterval(CHECK_FILES);
            _SET_LIST_POST($hasilfile);
        } else if(totalfile === null) {
            clearInterval(CHECK_FILES);
            // document.body.innerHTML = "Tolong cek datapost/list";
        }

    }, 100);

}

/* Cek URL ? Ada parameter atau tidak */
function _CHECK_PAGE() {

    const url = window.location.href;

    let p;
    if (url.search('index.html') != null) {
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

/* Fungsi Pertama */
window.onload = _RUN_PAGE();
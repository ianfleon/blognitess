console.log("maincore/main");

const body = document.querySelector('body');

function cek_file_page(data) {

    // console.log(data);

    data.totalpage = data.page.length; // set totalpage

    const f = 'datapost/list/' + data.page[cek_page()-1] + '.json';

    if (cek_file(f) == 200) {
        embed_page(f);
    } else {
        window.location.replace('404.html');
    }

}

/* Menggabungkan data dari list/*json ke HTML */
function embed_page(file) {
    // console.log(file);
    fetch(file)
        .then(response => response.json())
        .then(data => {
            list_post(data.postingan);
        });
}

/* Cek URL ? Ada parameter atau tidak */
function cek_page() {

    const url = window.location.href;
    // console.log(url.match('index.html'));
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

/* List post */
function list_post(data) {

    // console.log(data);
    
    const wrapList = document.querySelector('[data-blog=wrap-post]');
    const wrapPost = document.querySelector('[data-blog=item-post]');

    for (let j=0; j<data.length-1; j++) {
        let card = wrapPost.cloneNode(true);
        wrapList.appendChild(card);
    }

    let judulTag = document.querySelectorAll('[data-blog');

    for (let i=0; i<data.length; i++) {
        // judulTag[i].outerHTML = re_outer_html(judulTag[i].outerHTML, data[0]);
        judulTag[i].outerHTML = re_outer(judulTag[i].outerHTML, data[0]);
    }

}

function run_page(page) {
    const p = cek_page();
    load_json('datapost/page.json', cek_file_page);
}

run_page();
console.log("maincore/page");

function set_num_page(data) {

    const no = data.page.length;

    let page = {
        "sekarang" : 1,
        "sebelum" : 1,
        "setelah" : 2
    };

    let url = window.location.href.split('?=');

    if (url.length > 1) {

        page.sekarang = parseInt(url[1]);
        if (parseInt(url[1]) > 1) {
            page.sebelum = (parseInt(url[1]) - 1);
        }

        if (page.sekarang != no) {
            page.setelah = (parseInt(url[1]) + 1);
        } else {
            // console.log("Data page sekarang sama!");
            page.setelah = no;
        }

    }

    const el_page = document.querySelectorAll('[data-page]');

    el_page.forEach(e => {
        e.outerHTML = re_outer(e.outerHTML, page);
    });
    
}

load_json('datapost/page.json', set_num_page);
function _SHOW_POST(data) {
    let isi = document.querySelectorAll('[--data-post]');
    isi.forEach(i => {
        i.outerHTML = _RE_OUTER(i.outerHTML, _REBUILD_POST(data));
    });
}

/* Load File */
window.onload = function() {

    /* Mengambil URL */
    let fileurl = window.location.href;
    fileurl = fileurl.split('?/');

    /* Jika add URL untuk get file */
    if (fileurl.length > 1) {

        let fmd = fileurl[fileurl.length - 1];

        if (_CHECK_FILE_EXISTS('postingan/' + fmd + '.md') == 200) {
            _LOAD_FILE('postingan/' + fmd + '.md', _SHOW_POST, 'text');
        } else {
            window.location.replace('404.html');
        }
        
    } else {
        window.location.replace('index.html')
    }

}

/* Mengambil Detail Meta Post */
function _REBUILD_POST(data) {

    // meta data dari post
    const meta = data.match(/[\---\_]{2}([^\\_]+)[\---\_]{2}/g);
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

    // dm.isi = data.replace(meta, '');
    // console.log(dm);

    const isi = data.replace(meta[0], '');
    dm.isi = _PARSE_MARKDOWN(isi);
    // console.log(dm.isi);


    return dm;

}
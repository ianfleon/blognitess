/* 
Blognitess Alpha
Ngeblog dengan cara yang sederhana.
*/

const body = document.querySelector('body');

/* Parse Markdown File */
function parse_markdown(md) {
    //ul
    md = md.replace(/^\s*\n\*/gm, "<ul>\n*");
    md = md.replace(/^(\*.+)\s*\n([^\*])/gm, "$1\n</ul>\n\n$2");
    md = md.replace(/^\*(.+)/gm, "<li>$1</li>");

    //ol
    md = md.replace(/^\s*\n\d\./gm, "<ol>\n1.");
    md = md.replace(/^(\d\..+)\s*\n([^\d\.])/gm, "$1\n</ol>\n\n$2");
    md = md.replace(/^\d\.(.+)/gm, "<li>$1</li>");

    //blockquote
    md = md.replace(/^\>(.+)/gm, "<blockquote>$1</blockquote>");

    //h
    md = md.replace(/[\#]{6}(.+)/g, "<h6>$1</h6>");
    md = md.replace(/[\#]{5}(.+)/g, "<h5>$1</h5>");
    md = md.replace(/[\#]{4}(.+)/g, "<h4>$1</h4>");
    md = md.replace(/[\#]{3}(.+)/g, "<h3>$1</h3>");
    md = md.replace(/[\#]{2}(.+)/g, "<h2>$1</h2>");
    md = md.replace(/[\#]{1}(.+)/g, "<h1>$1</h1>");

    //alt h
    md = md.replace(/^(.+)\n\=+/gm, "<h1>$1</h1>");
    md = md.replace(/^(.+)\n\-+/gm, "<h2>$1</h2>");

    //images
    md = md.replace(/\!\[([^\]]+)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1" />');

    //links
    md = md.replace(
        /[\[]{1}([^\]]+)[\]]{1}[\(]{1}([^\)\"]+)(\"(.+)\")?[\)]{1}/g,
        '<a href="$2" title="$4">$1</a>'
    );

    //font styles
    md = md.replace(/[\*\_]{2}([^\*\_]+)[\*\_]{2}/g, "<b>$1</b>");
    md = md.replace(/[\*\_]{1}([^\*\_]+)[\*\_]{1}/g, "<i>$1</i>");
    md = md.replace(/[\~]{2}([^\~]+)[\~]{2}/g, "<del>$1</del>");

    //pre
    md = md.replace(/^\s*\n\`\`\`(([^\s]+))?/gm, '<pre class="$2">');
    md = md.replace(/^\`\`\`\s*\n/gm, "</pre>\n\n");

    //code
    md = md.replace(/[\`]{1}([^\`]+)[\`]{1}/g, "<code>$1</code>");

    //p
    md = md.replace(/^\s*(\n)?(.+)/gm, function (m) {
        return /\<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(m)
            ? m
            : "<p>" + m + "</p>";
    });

    //strip p from pre
    md = md.replace(/(\<pre.+\>)\s*\n\<p\>(.+)\<\/p\>/gm, "$1$2");

    return md;
}

/* Baca file Markdown */
function baca_md(file) {
    fetch(file)
    .then(response => response.text())
    .then(data => {
        let isi = document.querySelector('[data-post=isi]');
        isi.innerHTML = parse_markdown(rebuild_post(data));
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

        if (cek_file('postingan/' + fmd + '.md') == 200) {
            baca_md('postingan/' + fmd + '.md');
        } else {
            window.location.replace('404.html');
        }
        
    } else {
        window.location.replace('index.html')
    }

}

/* Mengambil Detail Meta Post */
function rebuild_post(data) {

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

    // document.querySelector('title').innerHTML = dm.judul;
    document.querySelector('[data-post=judul]').innerHTML = dm.judul;
    document.querySelector('[data-post=waktu]').innerHTML = dm.waktu;

    
    // return new isi post
    data = data.replace(meta, '');
    return data;

}
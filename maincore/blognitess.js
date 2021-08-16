/* Cek file dalam folder */
function _CHECK_FILE_EXISTS(url) {
    const http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status;
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
        // console.error("Element tidak berisi pendanda : " + elemen);
        document.body.innerHTML = "<p style='color: red'>Waduh, ada yang error nih. Mohon cek penulisan tandanya.</p>" + elemen.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
        return false;
    }

    newElemen.forEach(n => {
        my[n] = n.replace(/#{(.*?)}#{1}/g, '$1');
    });

    const keys = Object.keys(my); // mengambil index objek menjadi array

    for (let i=0; i<keys.length; i++) {
        
        if (nilai[my[keys[i]]] == undefined) {
            nilai[my[keys[i]]] = '-';
        }
        
        elemen = elemen.replaceAll(keys[i], nilai[my[keys[i]]]);

    }

    // mengembalikan elemen yang sudah jadi
    return elemen;
}

/* Parse Markdown File */
function _PARSE_MARKDOWN(md){
  
  //ul
//   md = md.replace(/^\s*\n\*/gm, '<ul>\n*');
//   md = md.replace(/^(\*.+)\s*\n([^\*])/gm, '$1\n</ul>\n\n$2');
//   md = md.replace(/^\*(.+)/gm, '<li>$1</li>');
  
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
  md = md.replace(/^\s*(\n)?(.+)/gm, function(m){
    return  /\<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(m) ? m : '<p>'+m+'</p>';
  });
  
  //strip p from pre
  md = md.replace(/(\<pre.+\>)\s*\n\<p\>(.+)\<\/p\>/gm, '$1$2');
  
  return md;
  
}

function _LOAD_CONFIG(config) {
    const EL_CONFIG = document.querySelectorAll('[--data-web]');
    EL_CONFIG.forEach(function(EL) {
        EL.outerHTML = _RE_OUTER(EL.outerHTML, config)
    });
}

_LOAD_FILE('konfigurasi.json', _LOAD_CONFIG);
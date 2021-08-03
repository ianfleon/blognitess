/* Cek file dalam folder */
function cek_file(url) {
    const http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status;
}

/* Load File JSON */
function load_json(file, fungsi) {
    
    // console.log("load_json() ..");
    
    fetch(file)
        .then(response => response.json())
        .then(data => {
            fungsi(data);
        });
}

/* Manipulasi Element secara keseluruhan (dipilih) */
function re_outer(elemen, nilai) {

    // menyimpan data trigger
    let my = {};
    let newElemen = elemen.match(/#{(.*?)}#{1}/g);

    // console.log(newElemen);

    newElemen.forEach(n => {
        my[n] = n.replace(/#{(.*?)}#{1}/g, '$1');
    });

    const keys = Object.keys(my); // mengambil index objek menjadi array

    for (let i=0; i<keys.length; i++) {
        elemen = elemen.replaceAll(keys[i], nilai[my[keys[i]]]);
    }

    // mengembalikan elemen yang sudah jadi
    return elemen;
}
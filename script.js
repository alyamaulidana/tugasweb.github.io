function ambilData() {
    axios
        .get("http://localhost:3001/siswa")
        .then((response) => {
            let wadah = "";
            let siswa = response.data;

            if (siswa.length > 0) {
                for (let i = 0; i < siswa.length; i++) {
                    wadah += `
                    <tr>
                        <td id="clmNo">${[i + 1]}</td>
                        <td id="clmNim">${siswa[i].nomorabsen}</td>
                        <td id="clmNama">${siswa[i].nama}</td>
                        <td id="clmProdi">${siswa[i].prodi}</td>
                        
                        <td id="clmAction">
                            <button id="btnEdit" onclick="editData(
                                '${siswa[i].nomorabsen}',
                                '${siswa[i].nama}',
                                '${siswa[i].prodi}'
                            )">Edit</button>
                            
                            <button id="btnHapus" onclick="hapusData('${siswa[i].id}')">Hapus</button>
                        </td>
                    </tr>
                    `;
                }
            } else {
                wadah += `
                    <tr>
                        <td colspan="5" id="clmKosong">Data tidak ditemukan</td>
                    </tr>
                `;
            }
            document.getElementById("hasil").innerHTML = wadah;
        })
        .catch((error) => {
            let wadah = `
                <tr>
                    <td colspan="5" id="clmError">${error.message}</td>
                </tr>
            `;
            document.getElementById("hasil").innerHTML = wadah;
        });
}

// Jalankan function
ambilData();

function simpanData() {
    let nomorabsenText = document.getElementById("nomorabsen").value;
    let namaText = document.getElementById("nama").value;
    let prodiText = document.getElementById("prodi").value; // Perbaiki di sini

    if (nomorabsenText === "" || namaText === "" || prodiText === "") {
        Swal.fire("Data belum lengkap !");
    } else {
        axios.post("http://localhost:3001/siswa", {
            id: nomorabsenText,
            nama: namaText,
            prodi: prodiText,
        })
        .then(() => {
            alert("Penyimpanan data sukses");
            ambilData(); // Memperbarui tampilan tabel setelah menyimpan data
            resetForm(); // Reset form setelah menyimpan data
        })
        .catch((error) => {
            console.error("Ada kesalahan:", error);
        });
    }
}

function editData(nomorabsen, nama, prodi) {
    document.getElementById("nim").value = nomorabsen;
    document.getElementById("nama").value = nama;
    document.getElementById("prodi").value = prodi;

    document.getElementById("btnsimpan").innerText = "Update";
    document.getElementById("btnsimpan").setAttribute("onclick", `updateData('${id}')`); // Perbaiki di sini
}

function updateData(id) {
    let nomorabsenText = document.getElementById("nomorabsen").value;
    let namaText = document.getElementById("nama").value;
    let prodiText = document.getElementById("prodi").value;

    Swal.fire({
        title:  "Ubah data?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonColor: "OK",
    }).then((result) => {
        if (result.isConfirmed) {
            axios.patch(`https://localhost:3001/siswa/${id}`, {
                id: nomorabsenText,
                nama: namaText,
                prodi: prodiText,
            });
        }
    })

    axios.put(`http://localhost:3001/siswa/${id}`, { // Perbaiki di sini
        id: nomorabsenText,
        nama: namaText,
        prodi: prodiText,
    })
    .then(() => {
        alert("Update data sukses");
        ambilData(); // Memperbarui tampilan tabel setelah update
        resetForm(); // Reset form setelah update
    })
    .catch((error) => {
        console.error("Ada kesalahan:", error);
    });
}

function resetForm() {
    document.getElementById("nomorabsen").value = "";
    document.getElementById("nama").value = "";
    document.getElementById("prodi").value = "";
    document.getElementById("btnsimpan").innerText = "Simpan";
    document.getElementById("btnsimpan").setAttribute("onclick", "simpanData()");
}

function hapusData(id) {
    axios.delete(`http://localhost:3001/siswa/${id}`) // Perbaiki di sini
    .then(() => {
        alert("Data berhasil dihapus");
        ambilData(); // Memperbarui tampilan tabel setelah menghapus data
    })
    .catch((error) => {
        console.error("Ada kesalahan:", error);
    });
}
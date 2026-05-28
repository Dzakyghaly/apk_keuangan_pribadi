const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbwxWqcZrNzhyf0wQw3DyYxvcBaYZZKO8CapigfQGDjORSHfRUsWWSDHrkk3zlg0SdjI/exec";

let saldo = 0;

function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

function simpanData() {
  const keterangan = document.getElementById("keterangan").value;
  const jumlah = parseInt(document.getElementById("jumlah").value);
  const jenis = document.getElementById("jenis").value;
  if (!keterangan || !jumlah) {
    alert("Isi semua data!");
    return;
  }

  if (jenis === "Pemasukan") {
    saldo += jumlah;
  } else {
    saldo -= jumlah;
  }

  document.getElementById("totalSaldo").innerText = formatRupiah(saldo);

  const li = document.createElement("li");
  li.innerHTML = `
        <strong>${jenis}</strong><br>
        ${keterangan}<br>
        ${formatRupiah(jumlah)}
    `;
  document.getElementById("transaksiList").prepend(li);

  fetch(WEB_APP_URL, {
    method: "POST",
    body: JSON.stringify({
      keterangan: keterangan,
      jumlah: jumlah,
      jenis: jenis,
    }),
  })
    .then((res) => res.text())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    });
  document.getElementById("keterangan").value = "";
  document.getElementById("jumlah").value = "";
}

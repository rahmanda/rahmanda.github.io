---
title: Bagaimana Cara Mengelola Struktur Folder di Projek JS dengan Efektif
summary: Struktur folder mungkin terlihat sepele. Tetapi kalau dilakukan dengan benar, kamu bisa mendapatkan banyak manfaat. Pada artikel ini, saya akan menjelaskan pentingnya mempunyai struktur yang baik dan bagaimana cara mencapainya.
slug: bagaimana-cara-mengelola-struktur-folder-di-projek-js-dengan-efektif
published_date: 2020-07-04
language: id
type: blog
translations:
  en: /blog/en/how-to-manage-your-folder-structure-in-js-project-effectively
---

> Saya ngerti, ini adalah topik yang sulit. Tapi saya pikir ini penting untuk didiskusikan.

Setiap orang memiliki cara pandang yang berbeda dalam hal mengelola sebuah struktur folder, dan ini terjadi karena banyak faktor seperti pemilihan bahasa pemrograman, framework yang kita gunakan, konsep, best practices, preferensi kita masing-masing dsb dsb dsb. Itulah mengapa tidak ada yang namanya 'satu struktur folder untuk semua situasi'.

Meskipun terlihat sepele, saya pikir kita perlu memikirkan dengan lebih hati-hati bagaimana cara kita menstrukturisasi folder dalam sebuah projek. Dengan begitu, kita bisa mendapatkan manfaat dari struktur folder yang baik.

## Manfaat memiliki struktur folder yang baik

Folder itu bukanlah kode yang bisa memiliki konsep abstraksi. Namun, folder masih merupakan bagian dari struktur kode kita karena setiap saat kita membuat sebuah folder, tanpa kita sadari kita telah menciptakan sebuah layer abstraksi yang baru.

Saat kita berbicara mengenai abstraksi pada pemrograman, pengertian secara umumnya adalah kita membuat sebuah interface yang lebih sederhana yang menyembunyikan kompleksitas dari sebuah proses kerja. Saat kita membuat folder, kita 'menyembunyikan' beberapa file ke dalam sebuah folder, dan nama dari folder tsb. menjadi sebuah 'interface' yang kita ekspos ke luar. Orang lain tidak akan tahu apa saja yang ada di dalam folder sebelum mereka membuka foldernya dan melihat isinya.

Abstraksi adalah bentuk dari komunikasi antar engineer, dan karena folder itu adalah abstraksi, folder menjadi sebuah bentuk komunikasi juga. Abstraksi yang baik adalah yang tidak membuat kita perlu menghabiskan waktu yang banyak untuk memulai menggunakannya, dan sebuah struktur folder yang baik adalah yang tidak membuat kita perlu menghabiskan waktu yang banyak untuk mengerti garis besar dari sebuah projek. Tentu saja, hal ini tergantung kepada ukuran dari projeknya sendiri. Semakin besar suatu projek, semakin mudah untuk membuat kita bingung dibandingkan dengan projek yang lebih kecil. Meskipun begitu, ini tidak berarti bahwa semua projek yang kecil itu lebih mudah untuk dimengerti dibandingkan projek yang besar. Pada beberapa kasus, saya merasa kesulitan untuk memahami beberapa struktur folder dari projek yang seharusnya sederhana.

Oleh karena itu, secara umum struktur folder memainkan peran yang penting dalam membangun komunikasi pertama dengan engineer. Saat kita membuat sebuah komunikasi yang baik di awal, orang akan dapat menghemat banyak waktu untuk memahami projek kita dan memulai ngoding.

## Rule of thumbs

Seperti yang telah saya sebutkan sebelumnya, ada beberapa faktor yang memengaruhi bentuk struktur folder kita. Oleh sebab itu, tidak ada petunjuk yang jelas bagaimana membuat struktur yang terbaik untuk segala macam situasi. Struktur folder yang terbaik adalah yang nyaman untuk digunakan bagi kamu, tim kamu dan keseluruhan projek saat ini. Apabila struktur folder kamu hanya menghambat pekerjaan kamu, mungkin ada yang salah dengan strukturnya.

Untuk membantu kamu mengelola struktur folder dengan efektif, saya telah membuat beberapa rule of thumbs yang saya himpun dari pengalaman saya selama ini. Jangan khawatir, tips ini bisa digunakan untuk kalian yang baru memulai projek dari nol atau dengan projek yang sudah ada.

### Pertahankan struktur folder serata mungkin

Apabila kamu sedang mengeksplorasi sebuah direktori yang sangat dalam, rasanya seperti sedang menggali tambang. Kamu perlu membuka beberapa folder sampai kamu menemukan 'emas', yaitu file kode yang kamu cari. Dan kalau kamu ingin mengeksplorasi folder lain yang posisinya di bagian lain dalam directory tree, kamu perlu balik lagi ke parent folder dari posisi kamu sekarang sampai kamu menemukan titik awal yang bisa menjadi jalur masuk ke folder itu. Itulah mengapa sangat sulit untuk bernavigasi di dalam struktur folder yang memiliki direktori yang dalam dibandingkan dengan struktur folder yang lebih sederhana.

Kamu mungkin beragumen bahwa dengan editor yang bagus, kita dapat dengan mudah bernavigasi dalam projek dengan fitur yang sudah tersedia, dan saya setuju dengan itu. Saya pikir mayoritas programmer jaman sekarang sudah menggunakan fitur itu secara intensif pada pekerjaan harian mereka. Tapi, fitur semacam ini hanya berguna apabila kita sudah tahu apa yang mau dicari. Kalau kita masih mempelajari projeknya, saya yakin kita bakalan 'menggali' folder projeknya. Oleh karena itu, ingat bahwa setiap kita menambah folder baru, kita juga mempersulit orang lain untuk bernavigasi di dalam projek kita.

Selain urusan navigasi, suatu struktur folder yang dalam juga tidak enak untuk digunakan di dalam kode kita. Biasanya kita membagi kode ke dalam modul-modul, dan modul yang berbeda bisa disimpan ke dalam folder yang berbeda juga tergantung kepada kategori yang kita buat. Apabila kita mau mengimpor sebuah modul yang lokasinya jauh di dalam struktur direktori kita, kita perlu menulis referensi yang panjang untuk modul tsb.

Untuk meratakan suatu struktur folder, kita dapat mengikuti pendekatan pada contoh di bawah ini.

Anggap saja kita mempunyai sebuah folder yang memiliki kedalaman direktori sampai dua level.

```
helpers/
- number/
-- format.js
-- parse.js
- time/
-- diff.js
-- format.js
- string/
-- parse.js
-- format.js
-- sanitize.js
- object/
-- transform.js
```

Setiap folder pada folder `helpers` mempunyai tidak lebih dari tiga file. Jadi lebih baik disatukan saja semua file dalam folder yang sama menjadi satu file seperti ini.

```
helpers/
- number.js
- time.js
- string.js
- object.js
```

Dengan begini, kita telah mengurangi kompleksitas struktur dari dua level kedalaman direktori menjadi satu saja. Saat kita sudah tahu tipe dari sebuah fungsi helper, sekarang kita hanya perlu melihat satu file saja tanpa membuka beberapa file.

Atau mungkin kode kamu gede banget yang bakal jadi jelek kalau kita gabungkan menjadi satu file. Dalam kasus seperti ini, kita bisa melakukan hal seperti ini.

```
helpers/
- number.js
- time-diff.js
- time-format.js
- string.js
- object.js
```

Karena helper `time` dianggap besar, kita bisa memecahnya ke dalam dua file dan menambahkan akhiran pada setiap nama file. Dengan cara ini, kita bisa menjaga struktur agar tetap flat dan jelas fungsinya. Perhatikan bahwa meskipun kita telah memecah helper `time`, pola ini tidak perlu diikuti oleh modul lainnya, khususnya apabila ukuran helper-nya kecil.

### Buat folder hanya pada saat diperlukan saja

Saya sering menemukan beberapa kasus dimana orang membuat folder dengan hanya satu file atau bahkan tidak ada file sama sekali. Hal ini terjadi karena satu dari tiga alasan berikut ini.

 1. Ikut-ikutan struktur projek orang lain
 2. Hasil dari menggunakan bootstrapper
 3. Menyisakan tempat untuk keperluan nanti

Jangan salah, kamu boleh kok meng-copas struktur orang lain atau menggunakan bootstrapper apapun yang kamu suka. Hanya saja, kamu perlu tahu kalau sebenarnya kamu mempunyai kontrol penuh terhadap struktur folder yang kamu punya. Jadi, kalau kamu menemukan folder yang kosong atau hanya terdiri dari satu file untuk sekian lama, sebaiknya dihapus saja. Kamu bisa menambahkannya lagi nanti saat kamu sudah memerlukannya.

Mungkin menyisakan tempat itu adalah hal yang sangat problematik dalam mengelola struktur folder, terutama saat kita baru memulai membuat projek. Kita cenderung membuat folder baru meskipun kita tidak yakin apakah nanti akan benar-benar digunakan atau tidak. Dan mungkin hal ini terjadi karena kita terpengaruh oleh struktur projek lain. Saya pikir akan jauh lebih simpel kalau kita tetap mengikuti requirement saat ini dan tidak membuat asumsi.

Saya ingin menceritakan satu kasus yang sering terjadi dalam pekerjaan saya. Di bawah ini adalah bentuk tipikal project berbasis komponen yang kamu mungkin sudah familiar.

```
app/
- components/
- pages/
- App.vue
- index.js
```

Semua folder disini memiliki struktur dan penamaan yang jelas. Tidak hanya kita bisa menebak dengan cepat apa saja file yang ada di dalamnya, kita juga dapat membayangkan secara kasar apa saja librari yang digunakan pada projek ini. Apabila kita melihat strukturnya, di sana terdapat folder `pages` yang kemungkinan besar memiliki beberapa file di dalamnya. Dengan demikian, kita dapat berasumsi bahwa projek ini memiliki beberapa halaman dan menggunakan librari router. Namun saat kita membuka folder-nya, ternyata file-nya hanya ada satu.

```
app/
- components/
- pages/
-- Landing.vue
- App.vue
- index.js
```

Struktur ini tiba-tiba menjadi membingungkan karena kita tidak berekspektasi bahwa di folder `pages` hanya ada satu file. Saat saya berada dalam situasi seperti ini, saya biasanya membuka file `index.js` untuk mengecek apakah projek ini menggunakan router atau tidak. Apabila tidak, penggunaan folder `pages` menjadi kurang tepat (dan apabila benar menggunakan router, kenapa??). Untuk memperbaiki strukturnya, kita dapat memilih antara menaruh file `Landing.vue` ke dalam folder `component` atau menggabungkannya ke file `App.vue`.

Seperti yang sudah kita lihat, kita dapat memengaruhi persepsi orang lain saat mereka mempelajari projek kita dengan membuat sebuah folder. Oleh karena itu, hindari membuat folder kalau tidak dibutuhkan.

### Lakukan penamaan folder yang benar

Saya percaya bahwa tidak ada satu orang pun yang sengaja ingin membuat bingung orang lain dengan nama folder yang kurang sesuai. Namun, hal ini tetap dapat terjadi karena membuat sebuah nama itu tidak mudah.

Sejujurnya, saya tidak dapat memberikan tips yang jelas untuk penamaan sebuah folder, tetapi saya selalu mengikuti tips ini setiap saya ingin memberikan nama pada apapun yang berhubungan dengan kode.

> Nama harus merepresentasikan fungsionalitas dari kodenya

yang dalam hal ini, kita dapat bilang bahwa nama folder harus merepresentasikan fungsionalitas dari file di dalamnya secara umum.

Struktur folder yang rata itu bisa menjadi tidak berguna apabila kita tidak melakukan penamaan yang benar pada folder. Oleh karena itu, tolong berikan nama yang benar pada folder kalian.

### Kalau tidak 'spark joy', restruktur secepatnya

Merestrukturisasi folder mungkin merupakan salah satu pekerjaan yang menakutkan untuk engineer, terutama kalau projeknya sudah menjadi sangat kompleks. Banyak error yang bisa muncul saat kita membuat perubahan terhadap struktur folder karena itu dapat secara otomatis mengubah beberapa referensi module yang kita miliki. Karena resikonya cukup tinggi, banyak engineer yang cenderung enggan melakukan refactoring dan restrukturisasi.

Kalau kita mempunyai struktur folder yang rata, pada projek yang relatif besar pun restrukturisasi akan lebih mudah karena kita mempunyai banyak ruangan untuk memindahkan banyak hal (dan dengan alasan itulah rule of thumbs yang pertama diciptakan). Namun apabila kita bekerja dengan struktur yang kompleks di projek yang ukurannya kurang lebih sama dan melibatkan beberapa kontributor lain, rencana yang cermat dan komunikasi yang jelas dengan teman satu tim sangat diperlukan untuk menjaga agar konflik kode kita sedikit saat melakukan restrukturisasi. Meskipun demikian, kita tidak bisa meninggalkan masalahnya begitu saja hanya karena prosesnya bisa menjadi agak merepotkan.

Waktu yang terbaik untuk melakukan restrukturisasi adalah saat kamu merasa tidak nyaman dengan projek kamu. Kamu tidak perlu menyimpan struktur ini lebih lama lagi karena ukuran projek akan terus berkembang. Dan seiring berjalannya waktu, projekmu akan menjadi lebih sulit lagi untuk direstrukturisasi.

Sebisa mungkin, lakukan restrukturisasi foldermu secepatnya sebelum itu memengaruhi kinerja kalian secara negatif. Apabila hal itu membutuhkan perubahan yang besar, kamu tidak perlu melakukan perombakan total terhadap struktur folder kamu dalam satu waktu. Kamu bisa membuat rencana untuk memecahnya ke dalam beberapa tahapan sehingga pekerjaan teman kamu tidak akan terlalu terganggu dan proses restrukturisasi bisa tetap berjalan. Selain itu, kita bisa lebih mudah untuk melakukan revert apabila terdapat kesalahan pada perubahan yang kamu lakukan.

Dengan intuisi engineer kamu, kamu dapat merasakan sesuatu apabila ada hal yang salah dalam struktur projek yang kamu miliki. Dan saat waktunya telah tiba, kamu harus mempertimbangkan untuk melakukan restrukturisasi folder secepat mungkin.

## Kesimpulan

Sebuah struktur folder dalam suatu projek dapat mempunyai efek positif dan negatif terhadap pekerjaan kita tergantung kepada bagaimana kita mengelolanya. Ada empat rule of thumbs yang dapat kita ikuti untuk mengelola struktur folder secara efektif:

1. Pertahankan struktur folder serata mungkin
2. Buat folder hanya pada saat diperlukan saja
3. Lakukan penamaan folder yang benar
4. Kalau tidak 'spark joy', restruktur secepatnya

Singkatnya, apabila kamu baru memulai mengerjakan suatu projek, pertahankan struktur folder yang rata sehingga kamu bisa mempunyai banyak ruangan untuk membentuk projek kamu nanti. Apabila kamu sedang bekerja pada sebuah projek yang sudah ada dan kamu mempunyai masalah dengan strukturnya, jangan ragu untuk melakukan restrukturisasi secepat mungkin.

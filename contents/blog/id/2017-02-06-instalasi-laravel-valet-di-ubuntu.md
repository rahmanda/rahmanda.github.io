---
title: Instalasi Laravel Valet di Ubuntu
slug: instalasi-laravel-valet-di-ubuntu
published_date: 2017-02-06
language: id
type: blog
---

> _Valet is yet another local environment setup for you who want to stop worrying about another tech stack outside of nginx and php_

Setelah mengeluarkan Homestead, akhir-akhir ini Laravel mengeluarkan produk baru bernama [Valet](https://github.com/laravel/valet). Kegunaannya kurang lebih sama, _menyediakan lingkungan pengembangan web berbasis PHP dengan mudah_. Bedanya, instalasi dan penggunaan Valet jauh lebih mudah dibandingkan Homestead. _So_, kali ini saya akan menjelaskan tentang instalasi Valet di Ubuntu.

## Prasyarat Instalasi

Sebelum melakukan instalasi Valet, pastikan kamu telah menginstal program di bawah ini:

1. _Dependencies_: `sudo apt-get install libnss3-tools jq xsel`
2. PHP >= 5.6
3. Ekstensi PHP wajib: `sudo apt-get install php*-cli php*-curl php*-mbstring php*-mcrypt php*-xml php*-zip` (ganti tanda bintang (*) dengan versi PHP yang kamu instal)
4. Ekstensi PHP opsional apabila perlu pakai DB: `php*-sqlite3 php*-mysql php*-pgsql` (tidak perlu diinstal semuanya)
5. [Composer](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-composer-on-ubuntu-14-04)

## Masih Pakai Ubuntu 14.04?

Apabila versi Ubuntu kamu 14.04, kamu perlu menambahkan `ppa` agar dapat menginstal PHP versi > 5.5. Buka terminal kamu, lalu jalankan perintah di bawah ini untuk menambahkan `ppa`.

```
sudo add-apt-repository ppa:ondrej/php
```

Setelah itu, jalankan perintah di bawah ini untuk menginstal PHP,

```
sudo apt-get install php7.0-fpm
```

dan jalankan perintah di bawah ini untuk menginstal ekstensi yang diperlukan.

```
sudo apt-get install php7.0-cli php7.0-curl php7.0-mbstring php7.0-mcrypt php7.0-xml php7.0-zip
```

## Instalasi Valet

Pada terminal kamu, jalankan perintah di bawah ini.

```
composer global require cpriego/valet-linux
```

Saat dijalankan, kamu mungkin akan melihat pesan bahwa nginx belum terinstal di komputer kamu. Jangan stop proses atau menutup terminalnya, karena pada saat itu (meskipun tidak menampilkan informasi progres apapun) Valet sedang melakukan instalasi nginx secara otomatis.

Setelah proses instalasi Valet selesai, buat sebuah direktori untuk menampung semua projek PHP kamu, misal `mkdir ~/projects`. Masuk ke direktori tersebut via `cd ~/projects`, lalu jalankan `valet park` untuk menandai direktori yang dapat diakses oleh Valet. Buat projek Laravel `laravel new testing` di dalam direktori `projects`, setelah itu buka url `http://testing.dev` di browser. Apabila browser menampilkan halaman _sample_ Laravel, berarti instalasi Valet kamu berhasil, yey!

## Menggunakan Framework Selain Laravel di Valet

Selain Laravel, Valet juga bisa digunakan untuk _framework_ lain seperti Lumen, Symphony, Zend dan Wordpress. Cara penggunaannya sama, kamu hanya perlu menginstal _framework_ tersebut di direktori yang telah kamu tandai menggunakan `valet park`. Setelah itu kamu dapat mengaksesnya seperti biasa via `http://nama-folder-projek.dev`. Daftar lengkap _framework_ yang sudah didukung oleh Valet bisa dilihat di [sini](https://github.com/laravel/valet/tree/master/cli/drivers).

---

Komputer kamu tidak kuat untuk menjalankan Homestead? Jangan sedih lagi karena sekarang sudah ada Valet. Memang fiturnya tidak akan selengkap Homestead, tetapi kalau kamu memang belum perlu menggunakan fitur-fitur yang _advance_, Valet dapat memenuhi kebutuhan _ngoding_ PHP kamu sehari-hari.

## Ekstra - Driver Codeigniter

Codeigniter saat ini belum ada _driver_-nya di Valet, tetapi sebenarnya kamu bisa menambahkan sendiri _driver_-nya di Valet. Buat _file_ `CodeIgniterValetDriver.php` di dalam direktori `~/.valet/Drivers`. Setelah itu tambahkan kode di bawah ini pada _file_ tersebut,

> Codeigniter yang telah dites berhasil dengan kode ini adalah Codeigniter versi 3

```
<?php

class CodeIgniterValetDriver extends ValetDriver
{
    /**
     * Determine if the driver serves the request.
     *
     * @param  string  $sitePath
     * @param  string  $siteName
     * @param  string  $uri
     * @return bool
     */
    public function serves($sitePath, $siteName, $uri)
    {
        return file_exists($sitePath.'/public/index.php');
    }

    /**
     * Determine if the incoming request is for a static file.
     *
     * @param  string  $sitePath
     * @param  string  $siteName
     * @param  string  $uri
     * @return string|false
     */
    public function isStaticFile($sitePath, $siteName, $uri)
    {
        if (file_exists($staticFilePath = $sitePath.'/public/'.$uri)) {
            return $staticFilePath;
        }

        return false;
    }

    /**
     * Get the fully resolved path to the application's front controller.
     *
     * @param  string  $sitePath
     * @param  string  $siteName
     * @param  string  $uri
     * @return string
     */
    public function frontControllerPath($sitePath, $siteName, $uri)
    {
        return $sitePath.'/public/index.php';
    }
}
```

dan jalankan `valet restart`. Setelah itu kamu bisa mengakses projek Codeigniter lewat browser seperti biasa.

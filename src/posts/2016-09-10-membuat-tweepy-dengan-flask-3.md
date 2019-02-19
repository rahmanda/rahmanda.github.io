---
title: Membuat Tweepy dengan Flask - Episode 3
---  

Pada tutorial Flask episode terakhir ini kita akan menambahkan fungsi pencarian sederhana dengan memanfaatkan _query_ `LIKE` terhadap `username`. Apabila kamu baru mengikuti tutorial ini, kamu bisa ikuti dulu tutorial [episode 1](/membuat-tweepy-dengan-flask-1.html) dan [episode 2](/membuat-tweepy-dengan-flask-2.html) terlebih dahulu.  

## Menambahkan Route untuk Pencarian  

Tambahkan _route_ baru untuk fitur pencarian seperti di bawah ini:  

```
@app.route('/search', methods=['GET'])
def search():
  if 'user_id' not in session:
    return redirect(url_for('public_timeline'))
  else:
    return render_template('search.html',
                           results=query_db("select * from users where username like ?",
                                            ['%' + request.args.get('q') + '%']))
```  

Karena _request_-nya bertipe `GET`, untuk mendapatkan parameternya kita harus menggunakan fungsi `request.args.get()`. String 'q' yang dimasukkan pada fungsi tersebut adalah nama dari input yang kita gunakan untuk melakukan pencarian (ada di bagian `nav.html`). Oleh karena itu kita harus mengganti nama inputnya menjadi 'q' seperti ini:  

``` html
...
<input type="text" name="q" placeholder="Cari teman"/>
...
```  

## Membuat Halaman Pencarian

Setelah itu buat _file_ `search.html` pada direktori `templates`, lalu isi dengan kode dibawah ini:  

```
{% extends "layout.html" %}
{% block title %}
Pencarian
{% endblock %}
{% block body %}
{% include "nav.html" %}
<div class="content">
  <div class="tweet-box">
    <form method="POST" action="{{ url_for('add_tweet') }}">
      <textarea name="tweet" placeholder="Apa yang anda pikirkan saat ini?"></textarea>
      <input type="submit" value="Tweet" class="btn btn-tweet" />
    </form>
  </div>
  <div class="timeline">
    <h2 class="title">Hasil Pencarian</h2>
    {% for result in results %}
    <div class="tweet-item">
      <div class="user">
        <a class="fullname" href="{{ url_for('profile', username=result.username) }}">{{ result.fullname }}</a><span class="username">@{{ result.username }}</span>
      </div>
    </div>
    {% endfor %}
  </div>
</div>
{% endblock %}
```  

## Tamat!  

Buka terminal, pergi ke direktori projek tweepy kamu lalu jalankan `python tweepy.py`. Sekarang coba fitur pencariannya dengan memasukkan sebuah `username` (tentu saja kamu harus buat dulu beberapa akun).  

Dengan fitur ini maka selesailah serial tutorial membuat tweepy dengan Flask. Semoga tutorial ini bisa membantu kamu mengenal Flask. Apabila kamu mengalami kesulitan selama mengikuti tutorial ini, jangan sungkan bertanya melalui kolom komentar.   

---
title: Membuat Tweepy dengan Flask - Episode 2
---  

Pada tutorial Flask episode kali ini kita akan menambahkan beberapa fungsi baru seperti lihat profil dan *follow* akun lain. Pertama-tama ada beberapa hal yang harus kita edit dari kode pada episode sebelumnya.  

## Edit Kodingan
Karena kita ingin menambahkan fitur *follow*, *timeline* kita harus bisa menampilkan juga *tweet-tweet* dari akun yang kita *follow*. Edit fungsi *route* `timeline` dan `register` pada `tweepy.py` seperti dibawah ini:  

```  
@app.route('/timeline/')
def timeline():
  if 'user_id' not in session:
    return redirect(url_for('public_timeline'))

  return render_template('timeline.html', tweets=query_db('''
    select tweets.*, users.* from users
    inner join tweets on (tweets.user_id=users.id)
    where users.id in (select user_id from followers where follower_id=?)
    order by tweets.pub_date desc limit ?''',
    [session['user_id'], app.config['PER_PAGE']]), test=query_db('''
    select * from users where username = 'ambercat'
    '''))

...
...

@app.route('/register', methods=['POST'])
def register():
  if 'user_id' in session:
    return redirect(url_for('timeline'))
  error = None
  if request.method == 'POST':
    if not request.form['username']:
      error = 'Please enter your username'
    elif not request.form['fullname']:
      error = 'Please enter your fullname'
    elif not request.form['password']:
      error = 'Please enter your password'
    elif request.form['password'] != request.form['password2']:
      error = 'The two password that you entered didn\'t match'
    elif get_user_id(request.form['username']) is not None:
      error = 'The username is already taken'
    else:
      db = connect_db()
      db.execute('''insert into users (
        username, fullname, password) values (?, ?, ?)''',
        (request.form['username'], request.form['fullname'],
         generate_password_hash(request.form['password'])))
      db.commit()
      user_id = get_user_id(request.form['username'])
      db.execute('insert into followers (user_id, follower_id) values (?, ?)',
        (user_id, user_id))
      db.commit()
      db.close()
      flash('You were successfully registered')
      return redirect(url_for('login'))
```  

Pada kode fungsi `register`, kita harus menyimpan data *follower* pertama, yaitu akun kita sendiri XD. Sehingga pada fungsi *timeline*, kita bisa menampilkan *tweet* kita sendiri dan akun yang kita follow. Setelah dilakukan penambahan, *query* pada fungsi *timeline* menjadi lebih kompleks dari sebelumnya karena melibatkan `INNER JOIN` dengan tabel `tweets`.  

## Menambahkan Route untuk Profil dan Follow  

Masih pada `tweepy.py`, ketik kode di bawah ini setelah fungsi `logout`:  

```  
@app.route('/profile/<username>')
def profile(username):
  if 'user_id' not in session:
    return redirect(url_for('public_timeline'))
  return render_template('timeline.html', tweets=query_db('''
    select * from users inner join tweets on (users.id = tweets.user_id)
    where users.username = ?''',
    [username]), user_data=get_user_data(username),
    followed=is_followed(get_user_id(username), session['user_id']))

@app.route('/follow/<username>')
def follow(username):
  if 'user_id' not in session:
    abort(401)
  db = connect_db()
  db.execute('''insert into followers (user_id, follower_id)
    values (?, ?)''', (get_user_id(username), session['user_id']))
  db.commit()
  db.close()
  flash('You have successfully followed @%s', username)
  return redirect(url_for('profile', username=username))

@app.route('/unfollow/<username>')
def unfollow(username):
  if 'user_id' not in session:
    abort(401)
  db = connect_db()
  db.execute('''delete from followers where user_id = ? and follower_id = ?''',
    (get_user_id(username), session['user_id']))
  db.commit()
  db.close()
  flash('You have successfully unfollowed @%s', username)
  return redirect(url_for('profile', username=username))
```  

Pada fungsi *follow* dan *unfollow* hanya melakukan *query database* saja, sedangkan pada fungsi *profile*, kita melakukan `render_template`. Selanjutnya kita perlu meng-*update template* `timeline`.  

## Update template timeline  

*Update* `timeline.html` di *folder* `templates` sehingga seperti kode di bawah ini:  

``` html  
{% extends "layout.html" %}
{% block title %}
  {% if request.endpoint == 'public_timeline' %}
    Public Timeline
  {% else %}
    My Timeline
  {% endif %}
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
    {% if request.endpoint == 'profile' %}
    <div class="action">
      <div class="profile">
        <div class="fullname">{{ user_data.fullname }}</div>
        <div class="username">@{{ user_data.username }}</div>
      </div>
      {% if 'user_id' in session %}
        {% if session['user_id'] != user_data.id %}
          {% if followed %}
          <a href="{{ url_for('unfollow', username=user_data.username) }}" class="btn btn-unfollow">Unfollow</a>
          {% else %}
          <a href="{{ url_for('follow', username=user_data.username) }}" class="btn btn-follow">
          Follow</a>
          {% endif %}
        {% endif %}
      {% endif %}
    </div>
    {% endif %}
  <div class="timeline">
    <h2 class="title">Timeline</h2>
    {% for tweet in tweets %}
    <div class="tweet-item">
      <div class="user">
        <a class="fullname" href="{{ url_for('profile', username=tweet.username) }}">{{ tweet.fullname }}</a><span class="username">@{{ tweet.username }}</span>
      </div>
      <div class="tweet">{{ tweet.tweet }}</div>
      <div class="pub_date">{{ tweet.pub_date }}</div>
    </div>
    {% endfor %}
  </div>
</div>
{% endblock %}
```  

Kita menambahkan kondisi, apabila `request` berasal dari *route* `profile`, maka *template* akan menampilkan nama dan *username* akun, dan tombol *follow/unfollow*. Setelah itu, *generate database* dan jalankan web dengan perintah `python tweepy.py` di `console` (lihat episode sebelumnya untuk instruksi lengkapnya). Daftarkan dua akun yang berbeda, buat beberapa *tweet* pada akun tersebut, lalu pergi ke halaman profil akun lain dengan memasukkan url `localhost:5000/profil/<username>`. Jangan lupa coba tombol *follow*-nya. Sekarang *tweet-tweet* akun yang kamu *follow* akan tampil pada timeline kamu :).  

## Selanjutnya?  

Pada episode selanjutnya, kita akan menambahkan fitur *search* sehingga kamu tidak perlu susah-susah mengingat *username*-nya. Selain itu kita juga akan melakukan *finishing* tampilan tweepy. Apabila kamu punya pertanyaan seputar tutorial ini, jangan sungkan bertanya melalui kolom komentar. Semoga artikel ini bermanfaat!

[Source code](https://github.com/rahmanda/ambercat-tweepy/tree/part-2).

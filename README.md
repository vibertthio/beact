![logo of beact](./assets/images/bar.png)
# [Beact](https://beact.herokuapp.com/) &middot; [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

> 🎸🎨 DJ / VJ all by yourself in seconds !
- [demo](https://beact.herokuapp.com/) - It's deployed on Heroku, play it now!
- [blog](https://medium.com/@vibertthio/beact-audio-visual-art-in-react-44e9c757e40f) - vibert's words after creating Beact! (only mandarin now, english coming)
- [blog](http://scyablog.blogspot.tw/2017/07/beact.html) - scya597's words after creating Beact! (only mandarin now, english coming)

An audio/visual interactive art piece, and an instrument that everyone play with to become a DJ + VJ.
It's based on the idea of patatap, and using two.js, tone.js as audio and visual library.
It combines sequencer with on concept of patatap.
I have added some my own animation and will do more to replace ones from patatap.


## 0. Table of Contents  
- [Quick Start](#1-quick-start)
- [Run on Local](#2-run-on-local)
- [Development](#3-development)
- [Deploy](#4-deploy)
- [Basic Usage](#5-basic-usage)
- [Advanced Usage](#6-advanced-usage)
- [Credits and Inpirations](#7-credits-and-inspirations)


## 1. Quick Start
1.   open the [demo](https://safe-stream-69256.herokuapp.com/) link.
2.   press space to start/stop.
3.   click any block to trigger drum machine note.
4.   press any alphabet to trigger keyboard note.
5.   up/down to change bpm.
6.   left/right to change sound bank of drum machine.
7.   press 1 ~ 8 for different presets.


## 2. Run on Local
> It's okay to run Beact without server. It will git some error in console irrelevant, though.

First, clone the repo and install dependencies.
Then **Rock'n Roll**, baanngg.

```
git clone https://github.com/vibertthio/beact
npm install
npm run start
```

## 3. Development
> Run Beact with server, giving you **the Force**.

### 3.1 To install mongodb

```
brew install mongo
```


### 3.2 Initial config of mongodb

Create database directory

```
sudo mkdir -p /data/db
```

Find your username

```
whoami
```

Taking ownership to /data/db

```
// assume your username is John
sudo chown -Rv John /data/db
```


### 3.3 To run the database

```
mongod
```

If you don't want to run mongod everytime you need, the following command will automatically start your database while the computer is running:

```
brew services start mongo
```


### 3.4 To develop Beact

```
npm run dev
```

## 4. Deploy
> We are using great Heroku for current deploy.

### 4.1 Clone the repo, install dependencies, and build.

```
git clone https://github.com/vibertthio/beact Beact
cd Beact
npm install
npm run build
```

### 4.2 Delete /public in "Ignore build files" of .gitignore

```
# Ignore build files
public << (delete)
```

### 4.3 Deploy

```
heroku create
heroku addons:create mongolab:sandbox
git push heroku master
heroku open
```

## 5. Basic Usage

### 5.1 Keyboard & Sequencer Pads
1. click on the drum pad to make your own pattern.
2. press space to start/stop.
3. press up/down for bpm changing.
4. left/right to change sound samples.
5. press 1~8 to trigger preset patterns.
6. press a~z to trigger animation and audio just like patatap.

### 5.2 Sidebars
1. Start / Stop
2. Pattern : create a pattern, type in the name, and press add to upload yours to server and store.
3. Chain：chain few patterns into a song.
4. Recorder：record the drum machine pattern and keyboard together into a recording, and upload to server for you to share and replay.


## 6. Advanced Usage

![screenshot](https://github.com/vibertthio/beact/blob/master/assets/images/sc-04.png)

**（以下 data 均指當前 DrumMachine 8x16 格的內容）**

### 6.1 Start/Stop
* **Start** ：依當下模式，循環播放當下的 data / Pattern / ChainElement / Chain。
	* 若在按下 Start 前最後有選取過特定 Pattern，則會播放該 Pattern。
	* 若最後選取的是特定的 Chain Element，則會播放該 Chain Element。
	* 若最後有按下 Play Chain 且沒有 Exit Chain 或是選定任何 Chain Element，則會播放整個 Chain。
	* 若最後有在輸入完 Record Title 的情況下按下 Record，且沒重複按偶數次，則進入錄音模式。
	* 錄音模式中此鍵會被隱藏掉，直到錄音結束後才會出現。
	* 若以上行為皆不滿足，則直接播放當下的 data。

* **Stop** ：將當下播放的 data 停止。
	* 若於 Stop 後重新按 Start，則會再從頭播當下的 data。
	* 錄音的過程中此鍵會被隱藏掉。

### 6.2 Pattern
* ***PatternList*** ：列出當前所有的 Pattern。可透過點選來選擇當下要 Update 的 Pattern。

	* 重複點選 Pattern 時，每次點選都會使該 Pattern 重新播放。
	* Pattern 旁邊的叉叉可以刪除該 Pattern。

* ***Pattern Title input*** ：輸入此次要存取或更新之 Pattern 的 Title。
	* 輸入完後，若點選 Save New Pattern ，會將當下的 data 以新的 Pattern 的形式儲存至資料庫。
	* 若當下已點選特定 Pattern，可點選 Update Pattern 來更改該 Pattern 的名稱及資料。

* **Save New Pattern** ：新增 Pattern。
	* 將當下的 data 以新的 Pattern 的形式儲存至資料庫。須在 Pattern Title input 事先輸入至少一個字母的名稱，否則此鍵無效。

* **Update Pattern** ：更新 Pattern 內容。
	* 若當下有點選特定 Pattern 且有輸入標題，則會將任何該 Pattern 的內容和標題更新。
	* 若當下有點選特定 Pattern 但沒輸入標題，則只更新內容。
	* 若當下沒有選定 Pattern，則此鍵無效。

* **Exit Pattern** ：跳出 Pattern 模式。
	* 若當下有點選特定 Pattern，可跳出 Pattern 模式，也就是進入尚未點選任何 Pattern 的狀態。此舉亦會停止播放並將版面清空。
	* 若當下沒有選定 Pattern，則此鍵無效。

### 6.3 Chain
* ***ChainList*** ：按撥出順序列出當前 Chain 裡頭的所有的 Chain Element。
	* 可透過點選來顯示並選擇當下要 Update 或 Delete 的 Chain Element。此時被點選的 Chain Element 旁會打勾。
	* 若點選最後一行的 + 按鈕，則可透過 Update Chain 將新的 Chain Element 新增至 ChainList 的末端。此時當下沒有任何一個 Chain Element 旁會打勾。

* **Update Chain** ：更新 Chain List。
	* 若當下有點選特定 Chain Element，則會將任何該 Chain Element 的內容更新。
	* 在（1）預設情況、（2）點選 Exit Chain 之後、（3）點選最後一行的 + 按鈕、（4）刪除了任何一個 Chain Element 後等四個情況下，此舉會將當前 data 新增至原本的 Chain 末端。

* **Delete Current Chain Element** ：刪除當下選取的 Chain Element。
	* 若當下有點選特定 Chain Element，則會將該 Chain Element 刪除。
	* 若無選取任何 Chain Element，亦即，則無效。（也就是 Update Chain 功能描述裡會將 data 新增至 Chain 末端的四個情況）

* **Play Chain** ：播放整個 ChainList。
	* 每次按都會將整個 ChainList 從第一個 Chain Element 開始播放。  
	* 若原本處於 Pattern模式，將會跳出 Pattern 模式，

* **Exit Chain** ：跳出
	* 若 ChainList 正在播放，則會停止播放，並將版面清空，且取消選取之前已點選的 Chain Element。
	* 若 ChainList 沒在播放，則此鍵無效。


### 6.4 Recorder
* ***RecordList*** ：列出當前所有的 Record。可透過點選來播放。
	* 播放時，左邊的 sidebar 會被隱藏，在左上角以一個叉叉取代。按下該叉叉將停止播放錄音並清空版面。

* ***Record Title input*** ：輸入此次錄音的 Title。
	* 若無輸入任何 Title，Record 按鈕將無效，並於 console 顯示警告。  
	* 若錄音模式中清除 Title，則在重新輸入前無法儲存錄音。

* **Record** ：錄音鍵。
	* 在 Title 欄位有字的情況下，按下後進入準備錄音模式。此時按 start 會開始錄音。
	* 在 Title 欄位有字的情況下，再按一次 Record 會停止錄音並將錄製的內容儲存至資料庫。錄製的內容為有在播放時撥出的內容（包含 Drum 和鍵盤的紀錄）。
	* 若在錄音模式時清除 Title，則此鍵會暫時無效，並於 console 顯示警告。輸入 Title 後即會恢復點選即停止錄音的效果。


## 7. Credits and Inspirations
  * crazi ass library [tone.js](https://tonejs.github.io/) and [two.js](https://two.js.org/)
  * original idea from amazing [patatap](http://patatap.com/)
  * music samples from amazing [stepkit](http://jxnblk.com/stepkit/)

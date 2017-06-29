# Beact

use react to create audio/visual in a creative way.

[demo](https://safe-stream-69256.herokuapp.com/)

![screenshot](https://github.com/vibertthio/beact/blob/master/assets/images/sc-03.png)

![screenshot](https://github.com/vibertthio/beact/blob/master/assets/images/sc-01.png)

## Quick start
1.   press space to start/stop
2.   click any block to trigger drum machine note
3.   press any alphabet to trigger keyboard note
4.   up/down to change bpm
5.   left/right to change sound bank of drum machine
6.   press 1 ~ 8 for different presets



## Dev mode

### To start and run

First, clone the repo.

```
git clone https://github.com/vibertthio/beact
```

Then install the dependencies:

```
npm install
```


## Server mode

### To install mongodb

```
brew install mongo
```


### Initial config of mongodb

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


### To run the database

```
mongod
```

If you don't want to run mongod everytime you need, the following command will automatically start your database while the computer is running:

```
brew services start mongo
```


### To build the production package

```
npm run build
```


### To run the server

```
npm run server
```

## Deploy to Heroku


Clone the repo

```
git clone https://github.com/vibertthio/beact
```

Install dependencies and build the production package

```
cd Beact
npm install
npm run build
```

Replace package.json by following:

```
{
  "name": "beact",
  "version": "0.0.0",
  "description": "making audio/visual with react and tone.js",
  "main": "''",
  "scripts": {
    "start": "nodemon --exec babel-node server/server.js --ignore public/"
  },
  "author": "Vibert Thio",
  "license": "MIT",
  "dependencies": {
    "@tweenjs/tween.js": "^16.7.0",
    "axios": "^0.16.2",
    "body-parser": "^1.17.2",
    "express": "^4.15.3",
    "keymaster": "^1.6.2",
    "lodash": "^4.17.4",
    "material-ui": "^0.18.3",
    "mongodb": "^2.2.27",
    "mongoose": "^4.10.3",
    "node-sass": "^4.3.0",
    "prop-types": "^15.5.10",
    "react": "15.4.2",
    "react-dom": "15.4.2",
    "react-tap-event-plugin": "^2.0.1",
    "react-window-resize-listener": "^1.1.0",
    "sass-loader": "^6.0.2",
    "tone": "^0.10.0",
    "two.js": "github:vibertthio/two.js#dev",
    "uuid": "^3.0.1",
    "babel-cli": "^6.24.1",
    "babel-loader": "^6.3.2",
    "babel-plugin-transform-class-properties": "^6.22.0",
    "babel-plugin-transform-decorators-legacy": "^1.3.4",
    "babel-plugin-transform-runtime": "^6.22.0",
    "babel-preset-es2015": "6.22.0",
    "babel-preset-react": "^6.23.0",
    "babel-runtime": "^6.22.0",
    "nodemon": "^1.11.0",
    "react-hot-loader": "^3.0.0-beta.6"
  }
}

```

delete /public in "Ignore build files" of .gitignore

```
# Ignore build files
public << (delete)
```

Deploy

```
heroku create
heroku addons:create mongolab:sandbox
git push heroku master
heroku open
```


## 按鈕功能

**（以下 data 均指當前 DrumMachine 8x16 格的內容）**

### Start/Stop
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

### Pattern
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

### Chain
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


### Recorder
* ***RecordList*** ：列出當前所有的 Record。可透過點選來播放。
	* 播放時，左邊的 sidebar 會被隱藏，在左上角以一個叉叉取代。按下該叉叉將停止播放錄音並清空版面。

* ***Record Title input*** ：輸入此次錄音的 Title。
	* 若無輸入任何 Title，Record 按鈕將無效，並於 console 顯示警告。  
	* 若錄音模式中清除 Title，則在重新輸入前無法儲存錄音。

* **Record** ：錄音鍵。
	* 在 Title 欄位有字的情況下，按下後進入準備錄音模式。此時按 start 會開始錄音。
	* 在 Title 欄位有字的情況下，再按一次 Record 會停止錄音並將錄製的內容儲存至資料庫。錄製的內容為有在播放時撥出的內容（包含 Drum 和鍵盤的紀錄）。
	* 若在錄音模式時清除 Title，則此鍵會暫時無效，並於 console 顯示警告。輸入 Title 後即會恢復點選即停止錄音的效果。


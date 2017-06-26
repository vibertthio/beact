# Beact
use react to create audio/visual in a creative way.

## dev mode

### To start and run

First, clone the repo.
```
git clone https://github.com/vibertthio/beact
```

* Then install the dependencies:

```
npm install
```

### To build the production package

```
npm run build
```

## server mode

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

## 按鈕功能

### start/stop
* **start** ：循環播放當下的data。若在按下 start 前最後有選取過特定 Pattern，則會播放該 Pattern。若最後選取的是特定的 Chain Element，則會播放該 Chain Element。若最後有按下 Play Chain 且沒有 Exit Chain，則會播放整個 Chain。若最後有按下 Record 且沒重複按偶數次，則進入錄音模式。若以上行為皆不滿足，則直接播放當下的 data。
* **stop** ：將當下播放的 data 停止。若於 stop 後重新按 start，則會再從頭播當下的data。當進入錄音模式時，stop 將暫時無功能。

### Recorder
* **{RecordList}** ：列出當前所有的 Record。可透過點選來播放。
* **Record** ：按下後進入準備錄音模式，此時按 start 會開始錄音。再按一次 Record 會停止錄音並將錄製的內容儲存至資料庫。錄製的內容為有在播放時撥出的內容。
* **Exit Playing Record** ：若當前正在播放錄音，將停止播放並清空版面。

### Pattern
* **{PatternList}** ：列出當前所有的 Pattern。可透過點選來選擇當下要 Update 或 Delete 的 Pattern。
* **{input tag}** ：可在此輸入欄裡頭輸入任意 Pattern 名，並點選 Save New Pattern 來將當下的 data 以新的 Pattern 的形式儲存至資料庫。若當下已點選特定 Pattern，則亦可點選 Update Pattern 來更改該 Pattern 的名稱。
* **Save New Pattern** ：將當下的 data 以新的 Pattern 的形式儲存至資料庫。須在輸入欄事先輸入至少一個字母的名稱，否則無效。
* **Update Pattern** ：若當下有點選特定 Pattern 且有輸入標題，則會將任何該 Pattern 的內容和標題更新。若沒輸入標題，則只更新內容。
* **Delete Current Pattern** ：若當下有點選特定 Pattern，將從資料庫刪除該 Pattern。若沒選定 Pattern，則無效。
* **Exit Pattern** ：若當下有點選特定 Pattern，可跳出 Pattern 模式，也就是進入尚未點選任何 Pattern 的狀態。此舉亦會停止播放並將版面清空。

### Chain
* **{ChainList}** ：按撥出順序列出當前 Chain 裡頭的所有的 Chain Element。可透過點選來顯示並選擇當下要 Update 或 Delete 的 Chain Element。若點選最後一行的 Update at here in this li 字樣，則可透過 Update Chain 將新的 Chain Element 新增至 ChainList 的末端。
* **Update Chain** ：若當下有點選特定 Chain Element，則會將任何該 Chain Element 的內容更新。在（1）預設情況、（2）點選 Exit Chain 之後（3）點選最後一行的 Update at here in this li 字樣（4）Delete Current Chain Element後等四個情況下，此舉會將當前 data 新增至原本的 Chain 末端。
* **Delete Current Chain Element** ：若當下有點選特定 Chain Element，則會將該 Chain Element 刪除。若無選取，則無效。
* **Play Chain** ：會跳出 Pattern 模式，並將整個 ChainList 按順序從頭開始播放。  
* **Exit Chain** ：若 ChainList 正在播放，則會停止播放，並將版面清空，且取消選取之前已點選的 Chain Element。
---
layout: default
title: mask7
---

# 口罩地圖實作 - 利用 python 自動更新資料

上一次說到 **maskdata.csv** 因為**同源政策**的關係沒有辦法直接抓，因此無法顯示最新的口罩更新資訊，所以我就想說可以利用 python 寫一個爬蟲程式，自動抓取口罩地圖資訊，這樣就可以自動更新資料啦。

還好 python 的爬蟲還滿火的，上網找就一堆範例程式，修修改改後終於能夠抓到資料啦~~~。

程式碼如下。

```py
import csv
import requests
download()

def download():
    CSV_URL = 'http://data.nhi.gov.tw/Datasets/Download.ashx?rid=A21030000I-D50001-001&l=https://data.nhi.gov.tw/resource/mask/maskdata.csv'
    with requests.Session() as s:
        download = s.get(CSV_URL)
        download = download.content.decode('utf-8')
        cr = csv.reader(download.splitlines(), delimiter=',')
        my_list = list(cr)
        with open("maskdata.csv", "w",encoding = 'utf8',newline='',) as fp:
            wr = csv.writer(fp, dialect='excel')
            for line in my_list:
                wr.writerow(line)
```

主要就是利用 `requests` 來取得網路的資料，文本內容的解碼是使用 `utf-8` ，得到資料後再使用 `csv` 去解析文本資料，最後再把資料寫入 **maskdata.csv** 的檔案裡，編碼格式一樣要指定為 `utf-8`，否則在讀取資料時有可能會有亂碼。

可以利用 python 取得資料之後，還是必須要手動執行程式才能下載資料，那跟手動下載不是一樣的意思嗎？

所以我們必須要讓它可以每10分鐘自動更新一次，不用每次都人工執行。

我們只要把程式再加一個 `timer` 就可以了。

```py
import time
while True:
    download()
    time.sleep(10*60) #休息10分鐘
```

可是，這樣我的資料還是放在本地端啊？

沒錯，如果你有自己的伺服器的話，這樣已經可以算是完成了口罩地圖的開發，但是，如果你必須要上傳到網路空間的話，該怎麼辦？

因為我是把網頁放在 **Github Pages** 上面(相信很多人都是)，所以只要再加入一個自動提交到**github**的功能就可以了。

```py
def gitPush():
    now=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    os.system('git init')
    os.system('git add maskdata.csv')
    os.system('git commit -m \"auto update @'+now+'\"')
    os.system('git remote add origin git@github.com:你的帳號/你的專案名稱.git')
    os.system('git push origin master')
    print("Dowloaded at:",now)

import os
from datetime import datetime
```

這邊就是利用 python 操作 `cmd`，自動把下載下來的資料提交到你的**github**上面，然後在 `commit` 時加入更新時間的註解而已。

這樣，我們就完成了一個能自動更新資訊的口罩地圖了。

python 自動更新資料的完整程式碼如下。

```py
def download():
    CSV_URL = 'http://data.nhi.gov.tw/Datasets/Download.ashx?rid=A21030000I-D50001-001&l=https://data.nhi.gov.tw/resource/mask/maskdata.csv'
    with requests.Session() as s:
        download = s.get(CSV_URL)
        download = download.content.decode('utf-8')
        cr = csv.reader(download.splitlines(), delimiter=',')
        my_list = list(cr)
        with open("maskdata.csv", "w",encoding = 'utf8',newline='',) as fp:
            wr = csv.writer(fp, dialect='excel')
            for line in my_list:
                wr.writerow(line)

def gitPush():
    now=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    os.system('git init')
    os.system('git add maskdata.csv')
    os.system('git commit -m \"auto update @'+now+'\"')
    os.system('git remote add origin git@github.com:e87042170/mask-map.git')
    os.system('git push origin master')
    print("Dowloaded at:",now)

import csv
import requests
import os
import time
from datetime import datetime
while True:
    download()
    gitPush()
    time.sleep(10*60)
```

其實，這部分也不一定要用 python 做爬蟲，用 EXCEL VBA 應該也是辦的到，有機會再來試試看。


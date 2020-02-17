---
layout: default
title: mask1
---

# 口罩地圖實作 - Google Map API Key 申請

最近剛好在FB上看到社群發起的口罩地圖前端開發挑戰，覺得蠻有趣的而且也沒做過，就想說來挑戰看看順便學習一下新的東西。

說到地圖第一個想到的就是 google map，但是要怎麼做還真不曉得，google 了一下，google map 有 API 可以使用，看了一下使用說明，要使用 *Google Maps JavaScript API* 呢，要先有 API KEY，所以第一步就是要先申請 API KEY。

# 使用限制

使用 Google API 時要注意，它其實是要錢的，每種 API 的收費不同，按照官網上的說明，Google Maps JavaScript API 每個月給你 $200 元的扣打(免費額度)，每 1,000 次的載入收 $7 元，換算下來約每月 28,000 次的免費載入，對於拿來練習或流量不大的網站來說
，綽綽有餘了。

如果我有那麼多流量就好了，嗚...

# 如何申請 API KEY

要申請 API KEY 呢首先要登入 google 帳號，再到 Google Cloud Platform Console 申請，進去之後我們先新增一個專案，輸入專案名稱之後按建立，就會新增剛建立的專案，點選我們剛建立的專案，它會要我們選擇要啟用的 API，我們選擇 Google Maps JavaScript API。

接著，我們到導覽列點導覽選單，就是左上方臉上永遠三條線的那個按鈕，點下去就會出現一堆清單，我們選 API和服務 > 憑證。

然後在上面有一個旁邊有 + 號的建立憑證按鈕，點下去就會出現4個清單，選第一個 API金鑰，它就會開始建立金鑰。

建立完成它會顯示一個以建立 API 金鑰的對話方塊，上面會有你的 API Key，這時候我們要點限制金鑰，來設定金鑰的使用授權。

這邊看你的使用需求來做設定，設定完成就按儲存，接下來我們就可以開始使用 Google Maps JavaScript API 了。

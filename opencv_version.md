# 如何查詢 OpenCV 版本？

在使用 OpenCV 時，有時候會遇到網路上或者官方的範例有不知名的問題，怎麼試都試不出來，這有可能是因為 OpenCV 版本的問題，因此在查詢問題時，最好能夠確定 OpenCV 的版本，才能夠對症下藥。

但是，要怎麼查詢呢？

這邊提供一個簡單的方法：

1. 在 cmd 底下輸入 `python
2. 然後輸入 `import cv2
3. 然後再輸入 `cv2.__version__

這樣就能夠查詢到 OpenCV 的版本了，你也可以把第 2 ~ 3 的步驟寫到筆記本裡，再另存成 opencv_v.py，這樣下次只要在 cmd 底下輸入 `python opencv_v.py，就可以快速得到 OpenCV 的版本了。

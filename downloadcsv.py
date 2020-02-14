def download():
    import csv
    import requests
    CSV_URL = 'http://data.nhi.gov.tw/Datasets/Download.ashx?rid=A21030000I-D50001-001&l=https://data.nhi.gov.tw/resource/mask/maskdata.csv'
    with requests.Session() as s:
        download = s.get(CSV_URL)
        download = download.content.decode('utf-8')
        cr = csv.reader(download.splitlines(), delimiter=',')
        # cr = csv.reader(download.splitlines(), dialect=csv.excel_tab)
        # print(cr)
        my_list = list(cr)
        # print(my_list)
        with open("maskdata.csv", "w",encoding = 'utf8',newline='',) as fp:
            wr = csv.writer(fp, dialect='excel')
            for line in my_list:
                # print(line[0])
                wr.writerow(line)
import time
from datetime import datetime
while True:
    download()
    print("Dowloaded at:",str(datetime.now()))
    time.sleep(10*60)
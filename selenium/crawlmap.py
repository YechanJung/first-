import os
import json
import time
from time import sleep
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.chrome.options import Options

url = 'https://map.naver.com/v5/search'
chrome_options = Options()
# chrome_options.add_argument('--headless')  # Add any other options you need

chrome_service = ChromeService('/usr/local/bin/chromedriver')

driver = webdriver.Chrome()

driver.get(url)
key_word = 'keyword'  # 검색어

def time_wait(num, code):
    try:
        wait = WebDriverWait(driver, num).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, code)))
    except:
        print(code, '태그를 찾지 못하였습니다.')
        driver.quit()
    return wait

# frame 변경 메소드
def switch_frame(frame):
    driver.switch_to.default_content()  # frame 초기화
    driver.switch_to.frame(frame)  # frame 변경

# 페이지 다운
def page_down(num):
    body = driver.find_element(By.CSS_SELECTOR, 'body')
    body.click()
    for i in range(num):
        body.send_keys(Keys.PAGE_DOWN)

# css를 찾을때 까지 10초 대기
time_wait(10, 'div.input_box > input.input_search')

search = driver.find_element(By.CSS_SELECTOR, 'div.input_box > input.input_search')
search.send_keys(key_word)  # 검색어 입력
search.send_keys(Keys.ENTER)  # 엔터버튼 누르기

sleep(1)

# (2) frame 변경
switch_frame('searchIframe')
page_down(40)
sleep(3)

# 주차장 리스트
shop_list = driver.find_elements(By.XPATH, '//*[@id="_pcmap_list_scroll_container"]/ul/li')
# 페이지 리스트
next_btn = driver.find_elements(By.CSS_SELECTOR, '.zRM9F> a')
# dictionary 생성
shop_dict = {'가게 정보': []}
# 시작시간
start = time.time()
print('[크롤링 시작...]')
# 크롤링 (페이지 리스트 만큼)
# XPath format string for names and types
name_xpath = '//*[@id="_pcmap_list_scroll_container"]/ul/li[{}]/div[1]/a[1]/div/div/span'
type_xpath = '//*[@id="_pcmap_list_scroll_container"]/ul/li[{}]/div[1]/a[1]/div/div/span'

# 크롤링 (페이지 리스트 만큼)
for btn in range(len(next_btn))[1:]:  # next_btn[0] = 이전 페이지 버튼 무시 -> [1]부터 시작
    shop_list = driver.find_elements(By.XPATH, '//*[@id="_pcmap_list_scroll_container"]/ul/li')
    for data in range(len(shop_list)):  # 주차장 리스트 만큼
        print(data)

        sleep(1)
        try:
           
            name_xpath = '//*[@id="_pcmap_list_scroll_container"]/ul/li[{}]/div[1]/a[1]/div/div/span[1]'.format(data + 1)
            shop_name = driver.find_element(By.XPATH, name_xpath).text
            print(shop_name)
            sleep(1)

            dict_temp = {
                'name': shop_name,
            }

            shop_dict['가게 정보'].append(dict_temp)
            print(f'{shop_name} ...완료')

            sleep(1)

        except Exception as e:
            print(e)
            print('ERROR!' * 3)

            
            dict_temp = {
                'name': shop_name,
            }

            shop_dict['가게 정보'].append(dict_temp)
            print(f'{shop_name} ...완료')

            sleep(1)

    if not next_btn[-1].is_enabled():
        break

    if names[-1]:  
        next_btn[-1].click()

        sleep(2)

    else:
        print('페이지 인식 못함')
        break

print('[데이터 수집 완료]\n소요 시간 :', time.time() - start)
driver.quit()  
output_directory = 'data'
output_file_path = os.path.join(output_directory, 'store_data.json')

# Create the directory if it doesn't exist
os.makedirs(output_directory, exist_ok=True)

with open(output_file_path, 'w', encoding='utf-8') as f:
    json.dump(shop_dict, f, indent=4, ensure_ascii=False)



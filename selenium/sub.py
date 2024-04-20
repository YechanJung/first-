import json
import time
from time import sleep
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

# --크롬창을 숨기고 실행-- driver에 options를 추가해주면된다
# options = webdriver.ChromeOptions()
# options.add_argument('headless')

url = 'https://map.naver.com/v5/search'
# driver = webdriver.Chrome()
# WebDriver driver = new ChromeDriver();
driver = webdriver.Chrome('../usr/local/bin/chromedriver')  # 드라이버 경로
# driver = webdriver.Chrome('./chromedriver',chrome_options=options) # 크롬창 숨기기
driver.get(url)
key_word = '파주시 야당동 주차장'  # 검색어

# css 찾을때 까지 10초대기
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

# (1) 검색창 찾기
search = driver.find_element(By.CSS_SELECTOR, 'div.input_box > input.input_search')
search.send_keys(key_word)  # 검색어 입력
search.send_keys(Keys.ENTER)  # 엔터버튼 누르기

sleep(1)

# (2) frame 변경
switch_frame('searchIframe')
page_down(40)
sleep(3)

# 주차장 리스트
parking_list = driver.find_elements(By.CSS_SELECTOR, 'li.VLTHu')
# 페이지 리스트
next_btn = driver.find_elements(By.CSS_SELECTOR, '.zRM9F> a')

# dictionary 생성
parking_dict = {'주차장정보': []}
# 시작시간
start = time.time()
print('[크롤링 시작...]')

# 크롤링 (페이지 리스트 만큼)
for btn in range(len(next_btn))[1:]:  # next_btn[0] = 이전 페이지 버튼 무시 -> [1]부터 시작
    parking_list = driver.find_elements(By.CSS_SELECTOR, 'li.VLTHu')
    names = driver.find_elements(By.CSS_SELECTOR, '.YwYLL')  # (3) 장소명
    types = driver.find_elements(By.CSS_SELECTOR, '.YzBgS')  # (4) 장소 유형

    for data in range(len(parking_list)):  # 주차장 리스트 만큼
        print(data)

        sleep(1)
        try:
            # 지번, 도로명 초기화
            jibun_address = ''
            road_address = ''

            # (3) 주차장명 가져오기
            parking_name = names[data].text
            print(parking_name)

            # (4) 유형
            parking_type = types[data].text
            print(parking_type)

            # (5) 주소 버튼 누르기
            address_buttons = driver.find_elements(By.CSS_SELECTOR, '.Q8Zql > a')
            address_buttons.__getitem__(data).click()

            # 로딩 기다리기
            sleep(1)

            # (6) 주소 눌렀을 때 도로명, 지번 나오는 div
            addr = driver.find_elements(By.CSS_SELECTOR, '.jg1ED > div')

            # 지번만 있는 경우
            if len(addr) == 1 and addr.__getitem__(0).text[0:2] == '지번':
                jibun = addr.__getitem__(0).text
                last_index = jibun.find('복사우\n')    # 복사버튼, 우편번호 제외하기 위함
                jibun_address = jibun[2:last_index]
                print("지번 주소:", jibun_address)

            # 도로명만 있는 경우
            elif len(addr) == 1 and addr.__getitem__(0).text[0:2] == '도로':
                road = addr.__getitem__(0).text
                last_index = road.find('복사우\n')     # 복사버튼, 우편번호 제외하기 위함
                road_address = road[3:last_index]
                print("도로명 주소:", road_address)

            # 도로명, 지번 둘 다 있는 경우
            else:
                # 도로명
                road = addr.__getitem__(0).text
                road_address = road[3:(len(road) - 2)]
                print("도로명 주소:", road_address)

                # 지번
                jibun = addr.__getitem__(1).text
                last_index = jibun.find('복사우\n')    # 복사버튼, 우편번호 제외하기 위함
                jibun_address = jibun[2:last_index]
                print("지번 주소:", jibun_address)

            # dict에 데이터 집어넣기
            dict_temp = {
                'name': parking_name,
                'parking_type': parking_type,
                'road_address': road_address,
                'jibun_address': jibun_address
            }

            parking_dict['주차장정보'].append(dict_temp)
            print(f'{parking_name} ...완료')

            sleep(1)

        except Exception as e:
            print(e)
            print('ERROR!' * 3)

            # dict에 데이터 집어넣기
            dict_temp = {
                'name': parking_name,
                'parking_type': parking_type,
                'road_address': road_address,
                'jibun_address': jibun_address
            }

            parking_dict['주차장정보'].append(dict_temp)
            print(f'{parking_name} ...완료')

            sleep(1)

    # 다음 페이지 버튼 누를 수 없으면 종료
    if not next_btn[-1].is_enabled():
        break

    if names[-1]:  # 마지막 주차장일 경우 다음버튼 클릭
        next_btn[-1].click()

        sleep(2)

    else:
        print('페이지 인식 못함')
        break

print('[데이터 수집 완료]\n소요 시간 :', time.time() - start)
driver.quit()  # 작업이 끝나면 창을 닫는다.

# json 파일로 저장
with open('data/store_data.json', 'w', encoding='utf-8') as f:
    json.dump(parking_dict, f, indent=4, ensure_ascii=False)
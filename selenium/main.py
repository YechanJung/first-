import requests
from bs4 import BeautifulSoup
from selenium import webdriver

driver = webdriver.Chrome('./opt/homebrew/bin/chromedriver')

userInput = input("먹고싶은 메뉴를 선택하세요:")
locationInput = input("지역을 선택하세요:")

url = 'https://map.naver.com/p/search/'+ locationInput + userInput
response = requests.get(url)

if response.status_code == 200:
    html = response.content
    soup = BeautifulSoup(html, "html.parser")
    # divs = soup.find("div", class_="mFg6p")
    # mydivs = soup.findAll("span", {"class": "TYaxT"})
    dict = soup.find('button')
    print(dict)# no_list_soup = BeautifulSoup('<a class="hfpxzc"></a>', 'html.parser')
# Print the text content of each div element
# for div in ds:
        

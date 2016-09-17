#!/usr/bin/env python

from bs4 import BeautifulSoup
import urllib
import json

req = urllib.urlopen('https://www.urbandictionary.com/').read()
soup = BeautifulSoup(req)

today_word = soup.find_all('div', { 'class': 'def-panel' })[0]
word = today_word.find_all('div', { 'class': 'def-header' })[0].find_all('a')[0].text
definition = today_word.find_all('div', { 'class': 'meaning' })[0].text.lstrip('\n')

print(json.dumps({ 'word': word, 'definition': definition }))

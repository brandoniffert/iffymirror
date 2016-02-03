#!/usr/bin/env python

import sys
import urllib
from bs4 import BeautifulSoup

page = urllib.urlopen('http://syracusetrivianight.com/scripts/blog.php?id=14')
soup = BeautifulSoup(page, 'html.parser')

free_answer = soup.find_all('strong')[0].contents[0].encode('utf-8').strip()

sys.stdout.write(free_answer)

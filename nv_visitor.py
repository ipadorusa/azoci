#-*-coding:utf-8
import os,sys
import requests
import xml.etree.ElementTree as ET
import datetime
import telegram
from pytz import timezone

KST = datetime.datetime.now(timezone('Asia/Seoul'))

def getToDay():
	return KST.strftime("%Y%m%d")
def getNowTime():
	return KST.strftime("%Y년%m월%d일 %H시%M분")

def sendMsg(telegram_token, msgText):
	bot 	= telegram.Bot(token = telegram_token)
	cat_id 	= '230883783'
	bot.sendMessage(chat_id = cat_id, text=msgText)


if __name__ == '__main__':
	telegram_token = '1440833575:AAGLLhSpP5weT7U4Ed2pNLt599XtvmT-G0Y'
	try:
		visitor_xtree = getNVisitor()
		for node in visitor_xtree.findall('visitorcnt'):
			if getToDay() == node.get('id'):
				msgText = ("배포됐어요." %(getNowTime()))
				print(msgText)
				sendMsg(telegram_token, msgText)
				break
	except Exception as e:
		print("e:",e)
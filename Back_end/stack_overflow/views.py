from django.shortcuts import render
from django.http import JsonResponse
import json
import urllib.request as urllib
from bs4 import BeautifulSoup
import pprint

pp = pprint.PrettyPrinter(indent=4)
source_directory = '/home/ajith/PycharmProjects/StackOverflow/stack_overflow/docs/'


def docs(request):
    with open(source_directory + 'doctags.json') as docs:
        documents = json.load(docs)
        return JsonResponse({"response": documents})


def topics(request, doc_id):
    with open(source_directory + 'topics.json') as topics:
        doc_topics = json.load(topics)
        topics = []
        for topic in doc_topics:
            if topic["DocTagId"] == doc_id:
                topics.append(topic)
        return JsonResponse({"response": topics})


def examples(request, topic_id):
    with open(source_directory + 'examples.json') as examples:
        topic_examples = json.load(examples)
        examples = []
        for example in topic_examples:
            if example["DocTopicId"] == topic_id:
                examples.append(example)
        return JsonResponse({"response": examples})


def home(request):
    home_page = 'https://www.xda-developers.com/'
    url_request = urllib.Request(home_page,
                                 headers={"User-Agent": "Mozilla/5.0"})
    page = urllib.urlopen(url_request)
    soup = BeautifulSoup(page, 'html.parser')
    home_images = [div.find('img').get('src') for div in soup.find_all('div', attrs={'class', 'thumb_hover'})]
    home_content = [{"head": div.find('h4').get_text(), "content": div.get_text().strip()}
                    for div in soup.find_all('div', attrs={'class', 'item_content'})]
    response = [{"image": img, "content": content, "poster_image": img.replace(img[-13:-4], '810x298_c')} for
                img, content in zip(home_images, home_content) if content["content"] is not None]
    return JsonResponse({"response": response[0:12]})

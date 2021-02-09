import threading
import RPi.GPIO as GPIO
from flask import Flask, request
import time
import datetime

app = Flask(__name__)
PIN = 4
state = False
GPIO.setmode(GPIO.BCM)
GPIO.setup(PIN, GPIO.OUT)

time_on_hour = None
time_on_minute = None
time_off_hour = None
time_off_minute = None

def monitor_time():
    while True:
        now = datetime.datetime.now().time()
        time.sleep(20)
        print(time.now().hour)
        print(time.now().minute)
        print(time_on_hour)
        print(time_on_minute)
        print(time_off_hour)
        print(time_off_minute)
        if time_on_hour < t.hour and time_on_minute < t.minute and time_off_hour > t.hour and time_off_minute > t.minute:
            state = True
            GPIO.output(PIN, GPIO.LOW)
        else:
            state = False
            GPIO.output(PIN, GPIO.HIGH)


@app.route('/voice', methods=['POST'])
def voice():
    words = request.json
    if len(words) < 1:
        return 'ok'
    word = words[-1]
    print(word)
    if 'turn on' == word:
        state = True
        GPIO.output(PIN, GPIO.LOW)
    if 'turn off' == word:
        state = False
        GPIO.output(PIN, GPIO.HIGH)
    return 'ok'


@app.route('/auto', methods=['POST'])
def auto():
    global time_on_hour
    global time_on_minute
    global time_off_hour
    global time_off_minute
    time_on = request.json['on']
    time_on_hour = int(time_on.split(':')[0])
    time_on_minute = int(time_on.split(':')[1])

    time_off = request.json['off']
    time_off_hour = int(time_off.split(':')[0])
    time_off_minute = int(time_off.split(':')[1])

    print(time_on)
    print(time_off)
    t = threading.Thread(target=monitor_time)
    t.start()
    return 'auto'


@app.route('/manual', methods=['GET'])
def manual():
    #GPIO.output(PIN, GPIO.LOW)
    #time.sleep(2)
    #GPIO.output(PIN, GPIO.HIGH)
    global state
    print (state)
    if state:
        GPIO.output(PIN, GPIO.HIGH)
    else:
        GPIO.output(PIN, GPIO.LOW)
    state = not state
    return 'ok'
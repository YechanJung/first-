import os
import time
import socket
import base64
import hmac
import hashlib
import requests
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"], automatic_options=True, supports_credentials=True)
def make_signature(method, basestring, timestamp, access_key, secret_key):
    secret_key = bytes(secret_key, 'UTF-8')
    message = method + " " + basestring + "\n" + timestamp + "\n" + access_key
    message = bytes(message, 'UTF-8')
    signature = base64.b64encode(hmac.new(secret_key, message, digestmod=hashlib.sha256).digest())
    return signature

def requestApi(timestamp, access_key, signature, requestUri):
    headers = {"x-ncp-apigw-timestamp": timestamp, "x-ncp-iam-access-key": access_key, "x-ncp-apigw-signature-v2": signature}
    response = requests.get(requestUri, headers=headers)
    print("status :", response.status_code)
    print("content :", response.content)
    return response.json()

@app.route('/geolocation', methods=['POST'])
def geolocation():
    ip_address = request.remote_addr  # get the client's IP address

    # Signature 생성에 필요한 항목
    method = "POST"
    basestring = f"/geolocation/v2/geoLocation?ip={ip_address}&ext=t&responseFormatType=json"
    timestamp =  str(int(time.time() * 1000))
    access_key = os.getenv('access_key')  # access key id (from portal or sub account)
    secret_key = os.getenv('secret_key')  # secret key (from portal or sub account)
    signature = make_signature(method, basestring, timestamp, access_key, secret_key)

    # GET Request
    hostname = "https://geolocation.apigw.ntruss.com"
    requestUri = hostname + basestring
    api_response = requestApi(timestamp, access_key, signature, requestUri)

    return jsonify({"ip": ip_address, "api_response": api_response})    

if __name__ == "__main__":
    load_dotenv()  # load environment variables from .env file
    app.run(debug=True)
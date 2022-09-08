from tokenize import String
from flask import request,jsonify,make_response,Request
from interface import JData

def get_paras_json(r):
    if isinstance(r,Request):
        rr = r.get_json()
        if rr is None:
            rr = r.get_data()
        return rr

def response_json(data):
    r = None
    if isinstance(data,JData):
        rr = data.encode()
        r = jsonify(rr).get_json()
    else:
        err = JData("資料回傳格式錯誤",rr)
        r = jsonify(err.encode()).get_json()
    return r
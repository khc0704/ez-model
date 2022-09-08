from threading import Lock
from xml.etree.ElementInclude import include
from flask import Flask, request
from flask_cors import CORS
from numpy import broadcast
from interaction import get_paras_json, response_json
from annotation_helper import generate_annotation
from interface import JData
from model import ModelController
from flask_socketio import SocketIO,emit

app = Flask(__name__)
socketio = SocketIO(app,cors_allowed_origins='*')
CORS(app)
thread = None
thread_lock = Lock()

model_container = []

def check_model(modelPath):
    global model_container
    for model in model_container:
        if type(model) is ModelController:
            if modelPath == model.model_path:
                return model


def check_model_index(modelPath):
    global model_container
    for index,model in enumerate(model_container):
        if isinstance(model, ModelController):
            if modelPath == model.model_path:
                return index

def get_all_model():
    global model_container
    model_list = []
    for model in model_container:
        if isinstance(model,ModelController):
            model_list.append(model)
    return model_list if len(model_list) >=1 else False
    
def use_model_check():
    for model in model_container:
        if type(model) is ModelController:
            if model.use == True:
                return model
    for model in model_container:
        if type(model) is ModelController:
            return model
    return False

# @app.route("/lock_status", methods=["GET"])
# def lock_status():
#     try:
#         model.status = False
#     except Exception as e:
#         return response_json(err={"err":str(e)})



@app.route("/generate_annotation", methods=["POST"])
def generate_annotation_api():
    try:
        paras = get_paras_json(request)
        if generate_annotation(paras):
            return response_json(JData("","%s:%s" % ("成功產生檔案可以在以下路徑尋找：", (paras["dest_path"]))))
        else:
            return response_json(JData("未知錯誤，anno文件產生失敗，請重複檢查。",""))
    except Exception as e:
        return response_json(JData(str(e),""))

@app.route("/train", methods=["POST"])
def train():
    try:
        print(model_container)
        paras = get_paras_json(request)

        model = check_model(paras["modelPath"])

        train_call_back = False

        result = "模型不存在或尚未建立。"

        if model:
            train_call_back = model.train()
            result = response_json(JData("模型訓練失敗","")) if not train_call_back else response_json(JData("", train_call_back)) 

        return result

    except Exception as e:
        return response_json(JData(str(e),""))

@app.route("/evaluate", methods=["POST"])
def evaluate():
    try:
        paras = get_paras_json(request)
        result = False
        if paras["modelPath"] and paras["srcPath"]:
            model = check_model(paras["modelPath"])
            if model:
                result = model.evaluate(paras["srcPath"])
        result = response_json(JData("模型訓練失敗")) if not result else response_json(JData("",result)) 
        return result       
    except Exception as e:
        return response_json(JData(str(e),""))

@app.route("/save_model", methods=["POST"])
def save_model():
    try:
        paras = get_paras_json(request)
        result = False
        if paras["modelPath"] and paras["destPath"]:
            model = check_model(paras["modelPath"])
            if model:
                model.save_model(paras["destPath"])
                result = response_json(JData("","成功在"+paras["destPath"]+"儲存模型！"))
                
        return response_json(JData("模型儲存出現錯誤","")) if not result else result
    except Exception as e:
        return response_json(JData(str(e)))

@app.route("/change_status", methods=["POST"])
def change_status():
    try:
        paras = get_paras_json(request)
        result = False
        if paras["modelPath"] and paras["status"]:
            model = check_model(paras["modelPath"])
            if model:
                model.model_status(paras["status"])
                result = response_json(JData("","成功在更改狀態！"))
        return response_json(JData("模型狀態出現錯誤","")) if not result else result
    except Exception as e:
        return response_json(JData(str(e),""))

@app.route("/clean", methods=["POST"])
def clean():
    try:
        paras = get_paras_json(request)
        model = check_model_index(paras["modelPath"])
        
        result = False
        if model is not False:
            del model_container[model]
            print("nomeme---------",model)
            result = JData("",str(paras["modelPath"])+"清除成功")
        return response_json(JData("模型清除失敗。","")) if not result else response_json("", result)
    except Exception as e:
        return response_json(JData(str(e),""))

@app.route("/configuration_api", methods=["POST"])
def configuration_api():
    try:
        global thread
        with thread_lock:
            if thread is None:
                paras = get_paras_json(request)
                result = False
                if (paras["modelPath"] and paras["annotationPath"] and paras["epoch"] and paras["rate"]):
                    model = check_model(paras["modelPath"])
                    add_new = False
                    if not model:
                        model = ModelController(socketio)
                        add_new = True
                    result = model.set_configuration(paras)
                    if add_new and result:
                        model_container.append(model)
                configuration_trigger()
        
            return response_json(JData("err",result)) if not result else response_json(JData("",model.get_configuration()))
    except Exception as e:
        return response_json(JData(str(e),""))


@app.route("/confirm_configuration_api", methods=["POST"])
def confirm_configuration_api():
    try:
        result = dict()
        paras = get_paras_json(request)
        model = check_model(paras["modelPath"])
        if model:
            result["modelPath"] = model.model_path
            result["annotationPath"] = model.anno_path
            result["currentEpoch"] = model.current_epoch
            result["lastOne"] = model.current_epoch
            result["epoch"] = model.target_epoch
            result["rate"] = model.learning_rate
            result["stauts"] = model.status
            result["train_data"] = model.train_data
            result = response_json(JData("", result))
        else:
            result = response_json(JData("無法讀取"+paras["modelPath"]+"的緩存，請重新載入。",""))

        return result

    except Exception as e:
        return response_json(JData(str(e),""))

@app.route("/stop_model",methods=["POST"])
def stop_model():
    paras = get_paras_json(request)
    model = check_model(paras["modelPath"])
    if model:
        model.status = False
        return "true"
    return "false"

@socketio.on('controll_model')
def controll_model(data):
    try:
        model = check_model(data["modelPath"])
        action = data["action_type"]
        if model:
            if action == "train" :
                done = model.start_train()
                if done != False:
                    emit("train_data",done)
            elif action == "stop" :
                done = model.stop_train()
                model.status = False
                emit("model_status",done)
        else:
            emit('fail_status',response_json(JData("操作失敗：沒有該模型","")))
    except Exception as e:
        emit('fail_status',response_json(JData(str(e),"")))

def configuration_trigger():
    model_list = get_all_model()
    model_info_list = []
    if model_list != False:
        for model in model_list: 
            model_info_list.append(model.get_configuration())
    socketio.emit('configuration',response_json(JData("",model_info_list)))

@socketio.on('access_train_data')
def access_train_data(data):
    print("access")
    try: 
        global model_container
        model = check_model(data["modelPath"])
        if model:
            emit('self_data',response_json(JData("",model.train_data)))
            print("finish")
    except Exception as e:
        pass

@socketio.on('access_configuration')
def access_configuration(data):
    try: 
        global thread
        with thread_lock:
            if thread is None:
                configuration_trigger()
    except Exception as e:
        emit('status',response_json(JData(str(e),"")))

@socketio.on('update_configuration')
def update_configutraion(data):
    try:
        print(data)
        global thread
        with thread_lock:
            if thread is None:
                socketio.emit('status',response_json(JData("","loading")))
                global model_container
                index = check_model_index(data["modelPath"])
                model = ModelController(socketio) if index is None else model_container.pop(index)
                done = model.set_configuration(data)
                if done: 
                    model_container.append(model)
                    configuration_trigger()
                socketio.emit('status',response_json(JData("","end")))


    except Exception as e:
        socketio.emit('status',response_json(JData("","end")))
        emit('status',response_json(JData(str(e),"")))


if __name__ == "__main__":
    socketio.run(app)

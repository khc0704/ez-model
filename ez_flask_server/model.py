import os
from socket import socket
import tensorflow as tf
from data_helper import load_data, load_evaluate_data
from interaction import response_json
from interface import JData, ModelData


class ModelController:
    def __init__(self, socketio, model_path=None):
        self.model = None
        self.data = None
        self.model_path = model_path
        self.anno_path = None
        self.current_epoch = 0
        self.learning_rate = 0
        self.status = False
        self.train_data = []
        self.target_epoch = 0
        self.socketio = socketio
        self.use = False
        self.init = False

    def compile_model(self, learning_rate=0.001, override=False):
        if isinstance(self.model, tf.keras.Model) and override:
            self.model.compile(
                optimizer=tf.keras.optimizers.Adam(int(learning_rate)),
                loss=tf.keras.losses.SparseCategoricalCrossentropy(
                    from_logits=True),
                metrics=[tf.keras.metrics.SparseCategoricalAccuracy()],
            )
            self.learning_rate = learning_rate

    def clean_model(self):
        tf.keras.backend.clear_session()

    def get_configuration(self):
        result = dict()
        result["modelPath"] = self.model_path
        result["annoPath"] = self.anno_path
        result["currentEpoch"] = self.current_epoch
        result["rate"] = self.learning_rate
        result["status"] = self.status
        result["epoch"] = self.target_epoch
        return result

    def set_configuration(self, paras):
        if not self.status:
            overrideModel,overrideEpoch, overrideRate, overrideAnno = False, False, False,False
            if dict(paras).get("override") is not None:
                overrideModel = True if "modelPath" in paras[
                    "override"] else False
                overrideAnno = True if "annotationPath" in paras[
                    "override"] else False
                overrideRate = True if "rate" in paras[
                    "override"] else False
                overrideEpoch = True if "epoch" in paras[
                    "override"] else False
            if not self.init:
                self.clean_model()
                overrideModel,overrideEpoch, overrideRate, overrideAnno = True, True, True,True
            
            self.load_model(paras["modelPath"], overrideModel)
            self.load_data(paras["annotationPath"], overrideAnno)
            self.target_epoch = paras["epoch"] if overrideEpoch else self.target_epoch
            self.learning_rate = paras["rate"] if overrideRate else self.learning_rate
            self.init = True
            if self.model_path == None:
                return False
            return True
        return False

    def save_model(self, path):
        if isinstance(self.model, tf.keras.Model):
            self.model.save(path)
            return True
        return False

    def load_model(self, path, override=False):
        if os.path.exists(path) and override:
            self.model = tf.keras.models.load_model(path)
            self.model_path = path

    def load_data(self, path, override=False):
        if os.path.exists(path) and override:
            data = load_data(path, self.get_input_shape(), gray=True)
            if isinstance(data, ModelData):
                print(override)
                self.anno_path = path
                self.data = data
                print(override)

    def start_train(self):
        self.status=True
        print("train1")
        while self.status:
            print("train2")
            self.train()

    def stop_train(self):
        self.status = False
        return response_json(
            JData("", {"model_path": self.model_path, "status": self.status}))

    def train(self):
        if int(self.current_epoch) >= int(self.target_epoch):
            self.status = False
        if self.status:
            
            print("train3")
            if isinstance(self.model, tf.keras.Model) and isinstance(self.data, ModelData):
                history = self.model.fit(self.data.X_train, self.data.Y_train, initial_epoch=int(self.current_epoch),
                                         epochs=int(self.current_epoch+1), validation_data=[self.data.X_test, self.data.Y_test], verbose=1)
                self.train_data.append([str(history.history["val_sparse_categorical_accuracy"][0]), str(
                    history.history["val_loss"][0])])
                self.current_epoch = int(self.current_epoch) + 1
                if int(self.current_epoch) >= int(self.target_epoch):
                    self.stop_train()
                
                print("train4")
                result = response_json(
                    JData("", {"modelPath": self.model_path, "trainData": self.train_data}))
                self.socketio.emit("train_finish",result)
                return result
        return False

    def evaluate(self, path):
        if isinstance(self.model, tf.keras.Model):
            if os.path.exists(path):
                X, Y = load_evaluate_data(
                    path, self.get_input_shape(), gray=True)
                result = dict()
                result["loss"], result["acc"] = self.model.evaluate(X, Y)
                result = response_json(
                    JData("", {"model_path": self.model_path, "evaluate_data": result}))
                self.socketio.emit('evaluate_data', result)

    def predict(self, item):
        if isinstance(self.model, tf.keras.Model):
            return self.model.predict(item)

    def get_input_shape(self):
        if isinstance(self.model, tf.keras.Model):
            input_shape = self.model.get_config(
            )["layers"][0]["config"]["batch_input_shape"]
            input_shape = tuple([input_shape[i]
                                for i in range(1, len(input_shape))])
            return input_shape

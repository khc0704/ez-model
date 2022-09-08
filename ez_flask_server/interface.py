
class Annotation:
    def __init__(self):
        self.X_train = []
        self.X_test = []
        self.Y_train = []
        self.Y_test = []

class MiniAnnotation:
    def __init__(self):
        self.train = []
        self.test = []

class ModelData:
    def __init__(self):
        self.X_train = []
        self.X_test = []
        self.Y_train = []
        self.Y_test = []

class JData:
    def __init__(self,err,result):
        self.err = err
        self.result = result

    def encode(self):
        return {"err":self.err,"result":self.result}
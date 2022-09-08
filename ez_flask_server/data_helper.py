import cv2
import numpy as np
from annotation_helper import read_annotation, read_evaluate_annotation
from interface import ModelData

def load_data(anno_path,input_shape, gray=True):
    data = read_annotation(anno_path)
    model_data = ModelData()
    model_data.X_train = np.array([ convert_data_format(item,input_shape,gray) for item in data.X_train])
    model_data.X_test = np.array([ convert_data_format(item,input_shape,gray) for item in data.X_test])
    model_data.Y_train = np.array([int(item) for item in data.Y_train] )
    model_data.Y_test = np.array([int(item) for item in data.Y_test])

    return model_data

def load_evaluate_data(anno_path,input_shape,gray=True):
    X,Y = read_evaluate_annotation(anno_path)
    x = np.array([ convert_data_format(item,input_shape,gray) for item in X])
    y = np.array([int(item) for item in Y])

    return x,y

def convert_data_format(item,input_shape,gray):
    new_item = cv2.resize(cv2.imread(item),input_shape)
    return cv2.cvtColor(new_item,cv2.COLOR_BGR2GRAY) if gray else new_item
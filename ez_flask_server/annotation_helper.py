import os
import random
from exception import DirectoryAlreadyExists, FileNotExists
from interface import Annotation


def read_annotation(src_path):
    if not os.path.exists(os.path.join(src_path)):
        raise FileNotExists("Anno讀取失敗!來源路徑不存在："+src_path)
    if not os.path.exists(os.path.join(src_path, "train.txt")):
        raise FileNotExists("Anno讀取失敗!來源路徑不存在："+
                            os.path.join(src_path, "train.txt"))
    if not os.path.exists(os.path.join(src_path, "test.txt")):
        raise FileNotExists("Anno讀取失敗!來源路徑不存在："+
                            os.path.join(src_path, "test.txt"))
    data = Annotation()
    with open(os.path.join(src_path, 'train.txt'), 'r') as anno:
        for line in anno.readlines():
            data.X_train.append(line.split(';')[0])
            data.Y_train.append(int(line.split(';')[-1]))
    with open(os.path.join(src_path, 'test.txt'), 'r') as anno:
        for line in anno.readlines():
            data.X_test.append(line.split(';')[0])
            data.Y_test.append(int(line.split(';')[-1]))
    return data

def read_evaluate_annotation(src_path):
    if not os.path.exists(src_path):
        raise FileNotExists("Anno讀取失敗!來源路徑不存在："+src_path)

    X,Y = [],[]
    with open(src_path, 'r') as anno:
        for line in anno.readlines():
            X.append(line.split(';')[0])
            Y.append(int(line.split(';')[-1]))
    return X,Y

def generate_annotation(paras,extensions=["jpg", "png", "jpeg"]):
    src_path = paras["src_path"]
    dest_path = paras["dest_path"]
    split = paras["split"]
    percentage = 20 if paras["percentage"] is None and split else paras["percentage"]
    if os.path.exists(os.path.join(dest_path,"train.txt")):
        raise DirectoryAlreadyExists("Anno產生失敗!目標路徑已存在："+dest_path+"\\train.txt")
    if os.path.exists(os.path.join(dest_path,"test.txt")):
        raise DirectoryAlreadyExists("Anno產生失敗!目標路徑已存在："+dest_path+"\\test.txt")
    if not os.path.exists(src_path):
        raise FileNotExists("Anno產生失敗!來源路徑不存在："+src_path)
    if not os.path.exists(os.path.join(src_path, 'train')) and not split:
        raise FileNotExists("Anno產生失敗!選擇了不切割模式，但來源路徑不存在："+
                            os.path.join(src_path, 'train'))
    if not os.path.exists(os.path.join(src_path, 'test')) and not split:
        raise FileNotExists("Anno產生失敗!選擇了不切割模式，但來源路徑不存在："+
                            os.path.join(src_path, 'test'))
                            
    train, test = read_data_split(
        src_path, percentage, extensions) if split else read_data_no_split(src_path, extensions)
    
    with open(os.path.join(dest_path, "train.txt"), 'w') as anno:
        for item in train:
            anno.write('%s;%s\n' % (item[0], str(item[1])))
    with open(os.path.join(dest_path, "test.txt"), 'w') as anno:
        for item in test:
            anno.write('%s;%s\n' % (item[0], str(item[1])))
    return True


def read_data_split(src_path, percentage, extensions):
    data = []
    for label in os.listdir(src_path):
        label_path = os.path.join(src_path, label)
        if os.path.isdir(label_path):
            for item in os.listdir(label_path):
                item_path = os.path.join(label_path, item)
                if item.lower().split('.')[-1] in extensions and not os.path.isdir(item_path):
                    data.append([item_path, label])
    print("here")
    random.seed(42)
    random.shuffle(data)
    train_num = int(len(data) * (int(percentage)/100))
    train, test = [single for single in data[0:train_num]], [single for single in data[train_num:]]
    return train, test


def read_data_no_split(src_path, extensions):
    train, test = [], []
    for key in ["train", "test"]:
        for label in os.listdir(os.path.join(src_path,key)):
            label_path = os.path.join(src_path, key, label)
            for item in os.listdir(label_path):
                item_path = os.path.join(label_path, item)
                if item.lower().split('.')[-1] in extensions and not os.path.isdir(item_path):
                    train.append([item_path, label]) if key == "train" else test.append(
                        [item_path, label])
    random.seed(42)
    random.shuffle(train)
    random.shuffle(test)
    return train, test

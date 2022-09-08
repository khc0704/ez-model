class DirectoryAlreadyExists(Exception):
    def __init__(self, message):
        super().__init__(message)
    pass

class FileNotExists(Exception):
    def __init__(self, message):
        super().__init__(message)
    pass

class ModelRuntimeBug(Exception):
    def __init__(self, message):
        super().__init__(message)
    pass
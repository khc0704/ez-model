import React from "react"

const preprocessingGuide = {
    name: "Annotation生成器",
    word: () => {
        return (
            <>
                首先，你需要選擇【Data文件夾】，而這個文件夾的子目錄需要以label命名！<br /><br />
                舉例來説，我有一個MNIST手寫數字資料集的文件夾，則裏面的目錄名稱分別為0-9。<br /><br />
                之後，系統會根據你所輸入的【比例】來產生【.anno】文件！<br /><br />
                這意味假設你的【Data文件夾】内容不變，下次只需載入【.anno】檔案即可快速得到相同的資料切割結果。
            </>
        )
    }
}

const modelTrainGuide = {
    name: "Model訓練器",
    word: () => {
        return (
            <>
                首先，你需要選擇【Model檔案】及【Annotation檔案】，後端伺服器後將會根據這個路徑尋找這些檔案！<br /><br />
                簡單來説，我們並沒有真的傳送這些檔案，只是發送【它們的路徑】。<br /><br />
                之後我們可以為模型訓練設定一些簡單的參數，例如：epoch、learningRate等等，<br /><br />
                當Model開始訓練時，伺服器會回傳【每個epoch的結果】，前端解析後會進行結果的展示。<br /><br />
                注意：在訓練的途中，你可以隨時選擇停止模型訓練。
            </>
        )
    }
}

const modelTestGuide = {
    name: "Model預測器",
    word: () => {
        return (
            <>
                首先，你需要選擇【Model檔案】及【要預測的檔案】，後端伺服器後將會根據這個路徑尋找這些檔案！<br /><br />
                簡單來説，我們並沒有真的傳送這些檔案，只是發送它們的路徑。<br /><br />
                後端伺服器會回傳【預測的結果】，前端解析後會用進行結果的展示。<br /><br />
            </>
        )
    }
}

const modelFinetuneGuide = {
    name: "Model微調器",
    word: () => {
        return (
            <>
                首先，你需要選擇【Model檔案】及【微調Data文件夾】，後端伺服器後將會根據這個路徑尋找這些檔案！<br /><br />
                簡單來説，我們並沒有真的傳送這些檔案，只是發送它們的路徑。<br /><br />
                之後我們可以為模型訓練設定一些簡單的參數，例如：epoch、learningRate等等<br /><br />
                當Model開始訓練時，伺服器會回傳【每個epoch的結果】，前端解析後會進行結果的展示。<br /><br />
                注意：在訓練的途中，你可以隨時選擇停止模型訓練。
            </>
        )
    }
}

const modules = [
    preprocessingGuide,
    modelTrainGuide,
    modelTestGuide,
    modelFinetuneGuide
]

const buildAccordionItem = () => {
    return modules.map((item) => {
        return (
            <div className="accordion-item" key={item.name}>
                <h2 className="accordion-header" id="flush-headingThree">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${item.name}-guide-book`} aria-expanded="false" aria-controls={`${item.name}-guide-book`}>
                        {item.name}
                    </button>
                </h2>
                <div id={`${item.name}-guide-book`} className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body">{item.word()}</div>
                </div>
            </div>
        )
    })
}

const GuideBookCard = () => {
    return (
        <div className=" card">
            <div className=" card-body">
                <h3 className=" card-title">
                    ~使用者手冊~
                </h3>
                <div className="accordion accordion-flush" id="accordionFlushExample">
                    {buildAccordionItem()}
                </div>
            </div>
        </div>
    )
}

export default GuideBookCard
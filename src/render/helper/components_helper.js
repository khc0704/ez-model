export const generateList = (data) => {
    return (
        data.map((item) => {
            return (
                <li>
                    {item}
                </li>
            )
        })
    )
}

export const fetchJson = async (url, paras) => {

    const result = { err: {}, result: {} }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(paras)
    }
    await fetch(url, requestOptions)
        .then(
            async (response) => {
                const isJson = response.headers.get('content-type')?.includes('application/json')
                const data = isJson && await response.json()
                result["err"] = data["err"]
                result["result"] = data["result"]
                if (!response.ok) {
                    const err = (data && data.message) || response.status;
                    return Promise.reject(err);
                }
            }
        )
        .catch(
            (err) => {
                result["err"] = err
            }
        )


    if (result["err"] !== ""){
        return { result: result["result"] , err : result["err"] }
    }
    else{

        return { result: result["result"]}

    }

}
class Adapter
{
    static getData(url,id='')
    {
        // console.log('1 url : ' + url)
        url = id == '' ? url : `${url}/${id}`;
        console.log('2 url : ' + url)
        return fetch(url).then(res=>res.json())
    }

    static editData(url,data)
    {
        url = `${url}/${data.id}`;
        console.log('editData : ' + url)
        const options = {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        return fetch(url, options)
        .then(res => res.json())
    }

}
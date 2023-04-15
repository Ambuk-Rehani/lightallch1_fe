import ClickComponent from "./components/ClickComponent";
import {useState, useEffect} from 'react';


function App() {

  const [data, setData] = useState({})
  let [countVal, setCount] = useState('')


  useEffect(() => {
    const fetchData = async() =>{
      const data = await getData()
      setData(data)
      sendCount(data.count)
    }
    fetchData().catch('error')
  },[])

  const getData = async() => {
    const res = await fetch('/profile')
    const data = await res.json()
    return data
  }

  const sendCount = async (countVal) =>{
    const updData = await getData()
    const updArray = {...updData, count:countVal}
    console.log(updArray)
    const res = await fetch('/profile',{
      method:'POST',
      headers:{'Content-type':'application/json'},
      body : JSON.stringify(updArray),
    })

    const data = await res.json()
    setCount(data['count'])

  }

  const onButtonClick = (e) =>{
    e.preventDefault();
    countVal = countVal + 1
    sendCount(countVal)
  }

  return (
    <div>
      <h1>Challenge 1</h1>
      <ClickComponent onButtonClick = {onButtonClick}/>
      <p>{`Count Value is ${countVal}`}</p>
      {data && (
        <div>
          <p>{`Name:${countVal}`}</p>
          <p>{`About:${data.about}`}</p>
        </div>
      )}
    </div>
  );
}

export default App;

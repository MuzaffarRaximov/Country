import React,{useState ,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



export default function App() {
  const[value,setValue]=useState(0);
  const[data,setData]=useState([]);
  
  // Sahifa yangilaganda biri ishlaydigan funksiya
  useEffect(()=>{
    axios.get("https://restcountries.com/v2/name/Uzbekistan")
    .then(response=>setData(response.data[0]))
    .catch(err=>console.log(err))
  },[])


  // search tugmasini bosganda ishlaydigan funksiya
  function getData(){
    if (value.length >0){
      axios.get(`https://restcountries.com/v2/name/${value}`)
    .then(response=>setData(response.data[0]))
    .catch(err=>notifyError())
    }
    else if (value == false){
      notifyEmpty();
    }
  }


  // Form bo'sh bo'lganda ishlaydigan funksiya
 const notifyEmpty=()=>{
    toast.warn("Form to'ldirilishi shart", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }


  // Bazada yo'q bo'lgan malumotni qidirganda ishlaydigan funksiya 
  const notifyError=()=>{
    toast.error("Bunaqa davlat topilmadi", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }


  return (
    <div className='container d-flex flex-xl-row flex-column'>
     <div className="leftBlock col-xl-6 col-12">
      <div className="input-group w-75">
        <input type="text" className='form form-control' placeholder='kiriting'  onKeyPress={(e)=>{e.key=="Enter"? getData(): setValue(e.target.value)}}  onChange={(e)=>setValue(e.target.value)}/>
        <button className='btn btn-primary' onClick={()=>getData()}> search</button>
      </div>
     </div>
     <div className="rightBlock col-xl-6 col-12">
      <div className="card w-75">
        <img src={data.flag} alt="flag" className='card-img-top' />
        <div className="card-body">
          <table className='table'>
            <tbody>
              <tr>
                <th>Nomi </th>
                <td>{data.name}</td>
              </tr>
              <tr>
                <th>Poytaxti</th>
                <td>{data.capital}</td>
              </tr>
              <tr>
                <th>Qitasi </th>
                <td>{data.region}</td>
              </tr>
              <tr>
                <th>Aholisi</th>
                <td>{data.population}</td>
              </tr>
              <tr>
                <th>Yer maydoni</th>
                <td>{data.area} kv</td>
              </tr>
            </tbody>
          </table>
        </div>
      
      </div>
     </div>

     <ToastContainer
position="top-right"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    </div>
  )
}

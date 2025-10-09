import {useNavigate} from "react-router-dom"
import {Chart} from 'react-google-charts'
import data from '../../../backend/data/produtos.json'

//simulando os dados do banco

  export const options={
    isStacked:true,
    height:300,
    legend:{ position:"top", maxLines:3},
    vAxis:{minValue:0}
};

const Dashboard = () => {
  const navigate=useNavigate();

//  FUNÇÃO handleLogout
const handleLogout=()=>{
  localStorage.removeItem("token");
  navigate("/")
}

  


  return (
    <div>
      <h1>Seja Bem-vindo ao Dashboard</h1>
      <button onClick={handleLogout} className=" mt-6 w-[100px] h-[60px] bg-blue-950 text-white rounded-2xl">
        Logout
      </button>

      <Chart
      chartType="AreaChart"
      width="100%"
      height="400px"
      data={data}
      options={options}

      />






    </div>
  )
}

export default Dashboard
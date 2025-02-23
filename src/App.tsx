
import './App.css'
import MainPage from './components/main-page/MainPage'
import Sidebar from './components/Sidebar'
function App() {


  return (
    <>
      <div className="bg-slate-900 h-screen w-screen flex ">
      <Sidebar/>
      <div className="flex-1 p-4 text-white">
        <MainPage/>
      </div>
      </div>
    
    </>
  )
}

export default App


import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
const App =()=>{
  const [progress, setProgress] = useState(0)
  const apiKey="c58f86a94ec941c7a48b7461740d5560"

    return (
      <div>
         <LoadingBar
        color='#f11946'
        height={3}
        progress={progress}
      />
        <Navbar/>
        {/* <News apiKey={apiKey} setProgress={setProgress} pageSize={9} country="in" category="sports"/> */}
        <Router>
      <Routes>
        <Route path="/" element={ <News apiKey={apiKey} setprogress={setProgress} pageSize={9} country="in" category="general"/>}/>
          <Route path="/sports" element={<News apiKey={apiKey} setprogress={setProgress} pageSize={9} country="in" category="sports"/>} />
          <Route path="/business" element={ <News apiKey={apiKey} setprogress={setProgress} pageSize={9} country="in" category="business"/>} />
          <Route path="/entertainment" element={<News apiKey={apiKey} setprogress={setProgress} pageSize={9} country="in" category="entertainment"/>} />
          <Route path="/general" element={<News apiKey={apiKey} setprogress={setProgress} pageSize={9} country="in" category="general"/>} />
          <Route path="/science" element={<News apiKey={apiKey} setprogress={setProgress} pageSize={9} country="in" category="science"/>} />
          <Route path="/health" element={<News apiKey={apiKey} setprogress={setProgress} pageSize={9} country="in" category="health"/>} />
          <Route path="/technology" element={<News apiKey={apiKey} setprogress={setProgress} pageSize={9} country="in" category="technology"/>} />
      </Routes>
    </Router>
    </div>
    )
  }

export default App;




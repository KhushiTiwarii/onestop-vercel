
// // import { Route, Routes } from 'react-router-dom'
// // import './App.css'
// // import Bot from './assets/pages/ChatBot/Bot'
// // import Home from './components/Home'
// // import SideBar from './components/SideBar'
// // import AiScanner from './assets/pages/aiscanner/AiScanner'
// // import DashBoard from './assets/pages/dashboard/DashBoard'

// // function App() {

// //   return (
// //     <>
// //     {/* <div className='bg-black'>
// //       <SideBar/>
// //      <Routes>
// //       <Route path='/' element={<Home/>}/>
// //       <Route path='/dashboard' element={<DashBoard/>}/>
// //       <Route path='/placement-resources' element={<Home/>}/>
// //       <Route path='/interview-prep' element={<Home/>}/>
// //       <Route path='/resume-scanner' element={<AiScanner/>}/>
// //      </Routes>
// //      <Bot/>
// //     </div> */}

    
     
// //     </>
// //   )
// // }

// // export default App



// import React, { useState } from 'react';
// import axios from 'axios';
// // import 'bootstrap/dist/css/bootstrap.min.css';

// const App = () => {
//   const [jobDescription, setJobDescription] = useState('');
//   const [resumeFile, setResumeFile] = useState(null);
//   const [response, setResponse] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [type, setType] = useState('analysis');

//   const handleFileChange = (event) => {
//     setResumeFile(event.target.files[0]);
//   };

//   const handleAnalyze = async () => {
//     if (!resumeFile || !jobDescription) {
//       alert('Please provide both a resume and a job description.');
//       return;
//     }

//     setLoading(true);
//     const formData = new FormData();
//     formData.append('resume', resumeFile);
//     formData.append('jd', jobDescription);
//     formData.append('type', type);

//     try {
//       const res = await axios.post('http://localhost:5000/api/analyze', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       setResponse(res.data.result);
//     } catch (error) {
//       console.error('Error:', error);
//       setResponse('Error fetching data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h1 className="mb-4">Smart ATS</h1>
//       <div className="form-group">
//         <label htmlFor="jobDescription">Job Description</label>
//         <textarea
//           id="jobDescription"
//           className="form-control"
//           placeholder="Paste the Job Description"
//           value={jobDescription}
//           onChange={(e) => setJobDescription(e.target.value)}
//         />
//       </div>
//       <div className="form-group mt-3">
//         <label htmlFor="resume">Upload Resume (PDF)</label>
//         <input type="file" accept="application/pdf" className="form-control" onChange={handleFileChange} />
//       </div>
//       <div className="form-group mt-3">
//         <label htmlFor="analysisType">Analysis Type</label>
//         <select id="analysisType" className="form-control" value={type} onChange={(e) => setType(e.target.value)}>
//           <option value="analysis">Analysis</option>
//           {/* Add more options as needed */}
//         </select>
//       </div>
//       <button onClick={handleAnalyze} className="btn btn-primary mt-3" disabled={loading}>
//         {loading ? 'Analyzing...' : 'Analyze'}
//       </button>
//       <div className="mt-4">
//         <h2>Response</h2>
//         <pre>{response}</pre>
//       </div>
//     </div>
//   );
// };

// export default App;


import { useState } from 'react'
import './App.css'
import Layout from './assets/layout/Layout'

function App() {

  return (
    <Layout/>
  )
}

export default App
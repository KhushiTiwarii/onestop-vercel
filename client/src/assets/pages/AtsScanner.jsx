import React, { useEffect, useState } from 'react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { getDocument } from 'pdfjs-dist/webpack';

const AtsScanner = () => {
  const [jd, setJd] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chat,setChat] = useState(null);

 
  const API_KEY = 'AIzaSyCYHCNK5ruHOlrfgOhbicGofeSQtZTzyq4';
  
  const MODEL_NAME = 'gemini-1.0-pro-001';

  const genAI = new GoogleGenerativeAI(API_KEY);

  const generationConfig = {
    temperature:0.9,
    topK:1,
    topP:1,
    maxOutputTokens:2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  useEffect(()=>{
    const initChat = async () => {
      try {
        const newChat = await genAI
        .getGenerativeModel({ model:MODEL_NAME})
        .startChat({
          generationConfig,
          safetySettings,
        });
        setChat(newChat);

      } catch (error) {
        setError("Failed to initialize chat. Please try again.");
      }
    };
    initChat();
  },[]);

  // const inputPrompt = `
  //   You are a skilled ATS with deep understanding in tech fields. Evaluate the resume based on the given job description. Provide a matching percentage, missing keywords, and profile summary.
  //   resume: {resumeText}
  //   description: {jd}

  //   Response format: {"JD Match":"%","MissingKeywords":[],"Profile Summary":""}
  // `;

  // const inputPrompt1 = `
  //   Act as an experienced HR with tech experience. Evaluate the resume against the job description, highlighting strengths and weaknesses.
  //   resume: {resumeText}
  //   description: {jd}
  // `;

  // const inputPrompt2 = `
  //   As an ATS, review the resume against the job description. Provide a percentage match, missing keywords, and final thoughts.
  //   resume: {resumeText}
  //   description: {jd}
  // `;

  const extractTextFromPDF = async (arrayBuffer) => {
    try {
      const pdf = await getDocument({ data: arrayBuffer }).promise;
      let text = '';

      if (pdf.numPages === 0) {
        throw new Error("The PDF contains no pages.");
      }

      for (let i = 1; i <= pdf.numPages; i++) {
        try {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const strings = content.items.map((item) => item.str);
          text += strings.join(' ') + ' ';
        } catch (pageErr) {
          console.error(`Error retrieving text from page ${i}:`, pageErr);
          continue;
        }
      }

      if (!text.trim()) {
        throw new Error("No text could be extracted from the PDF.");
      }
      console.log(text);
      
      return text;
    } catch (err) {
      console.error("Error extracting text from PDF:", err);
      throw new Error("Error extracting text from PDF.");
    }
  };

  // const getGeminiResponse = async (formattedPrompt) => {
  //   try {
  //     console.log("Sending request to Gemini API...");
  //     const response = await genAI.invoke({
  //       modelName: MODEL_NAME,
  //       prompt: formattedPrompt,
  //       generationConfig,
  //       safetySettings,
  //     });

  //     if (response?.text) {
  //       return response.text;
  //     } else {
  //       throw new Error("No response or unexpected response format from Gemini API.");
  //     }
  //   } catch (err) {
  //     console.error("Error during API call:", err);
  //     setError('Failed to get response from Gemini API.');
  //     throw err;
  //   }
  // };

  // const handleSubmit = async (promptTemplate) => {
  //   if (!resumeText || !jd) {
  //     setError('Please upload a resume and provide a job description.');
  //     return;
  //   }

  //   setLoading(true);
  //   setError(null);
  //   setResult('');

  //   try {
  //     const formattedPrompt = promptTemplate
  //       .replace('{resumeText}', resumeText)
  //       .replace('{jd}', jd);

  //     const response = await getGeminiResponse(formattedPrompt);
  //     setResult(response);
  //   } catch (err) {
  //     setError('Failed to analyze the resume.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async () => {
    try {

      if(chat){
        const inputPrompt = `
    You are a skilled ATS(Application Tracking System) scanner with a deep understanding of any one job role from: Data Science, Full Stack Web Development,Big Data Engineering,DEVOPS,Data Analystand deep ATS functionality.
your task is to review the provided resume against the provided job description for these profiles.
Give me the percentage of match if the resume matches the job description.
First output should come as percentage and then keywords missing and last final thoughts.
Give response in points and highlight the headings in black and bold.
    resume: ${resumeText}
    description: ${jd}
    Don't print Resume and Job Description
    
  `;
        const result = await chat.sendMessage(inputPrompt);
        const result_text=result.response.text();
        console.log(result_text);
        setResult(result_text)
        // return result_text;
      }
    } catch (error) {
      setError("Failed to send message. Please try again.");

    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setLoading(true);
        setError(null);
        const arrayBuffer = await file.arrayBuffer();
        const text = await extractTextFromPDF(arrayBuffer);
        setResumeText(text);
      } catch (err) {
        setError('Error extracting text from PDF.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="resume-scanner flex flex-col w-full px-8">
      <h1 className=' text-4xl font-bold'>Smart ATS</h1>
      <h1 className=" my-7 font-bold text-gray-500">Improve Your Resume ATS</h1>
      <h1 className=" mb-2 text-gray-500">Paste the Job Description</h1>
      <textarea
        value={jd}
        onChange={(e) => setJd(e.target.value)}
        className='w-full h-40 rounded-md focus:outline-none text-xs text-gray-700 p-3 focus:outline-purple-400 focus:outline-1 focus:border-purple-400 bg-gray-100 md:w-1/2 '
      />
      <h1 className='m-2 mt-3 text-gray-500'>Upload Your Resume</h1>
      <input type="file" onChange={handleFileUpload} accept="application/pdf" className='w-full bg-gray-100 border-none rounded-md focus:border-purple-400 focus:outline-none focus:outline-1 md:w-1/2 p-2'/>
      <div>
        <button onClick={handleSubmit} className='text-purple-700 border border-purple-700  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 my-7'>Submit</button>
        {/* <button onClick={() => handleSubmit(inputPrompt1)}>How Can I Improve My Skills?</button>
        <button onClick={() => handleSubmit(inputPrompt2)}>Percentage Match</button> */}
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {result && <div className="result text-gray-600 rounded-md w-full md:w-1/2 border border-gray-300 p-3">
        {result}
        </div>}
    </div>
  );
};

export default AtsScanner;


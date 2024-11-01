import React, { useEffect, useState } from 'react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { getDocument } from 'pdfjs-dist/webpack';
import Sidebar from '../../components/SideBar';
import { MdDescription, MdAttachFile, MdSend } from 'react-icons/md';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Bot from './ChatBot/Bot';

const AtsScanner = () => {
  const [jd, setJd] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chat, setChat] = useState(null);

  const API_KEY = 'AIzaSyA2_m4kLCwqWJGqkuU31QlmYY8dLj39eaA';
  const MODEL_NAME = 'gemini-1.0-pro-001';
  const genAI = new GoogleGenerativeAI(API_KEY);

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
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

  useEffect(() => {
    const initChat = async () => {
      try {
        const newChat = await genAI
          .getGenerativeModel({ model: MODEL_NAME })
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
  }, []);

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

  const handleSubmit = async () => {
    try {
      if (chat) {
        const inputPrompt = `
          You are a skilled ATS(Application Tracking System) scanner with a deep understanding of any one job role from: Data Science, Full Stack Web Development, Big Data Engineering, DEVOPS, Data Analyst and deep ATS functionality.
          Your task is to review the provided resume against the provided job description for these profiles.
          Give me the percentage of match if the resume matches the job description.
          First output should come as percentage and then keywords missing and last final thoughts.
          Give response in points and highlight the headings in black and bold.
          resume: ${resumeText}
          description: ${jd}
          Don't print Resume and Job Description
        `;
        const result = await chat.sendMessage(inputPrompt);
        const result_text = await result.response.text();
        console.log(result_text);
        const parsedResult = parseResult(result_text);
        setResult(parsedResult);
      }
    } catch (error) {
      setError("Failed to send message. Please try again.");
    }
  };

  const parseResult = (text) => {
    const result = {
      percentageMatch: 'N/A',
      missingKeywords: 'N/A',
      finalThoughts: 'N/A',
    };

    const percentageMatch = text.match(/Percentage of Match:\s*([^\n]+)/);
    if (percentageMatch) {
      result.percentageMatch = percentageMatch[1].trim();
    }

    const missingKeywords = text.match(/Keywords Missing:\s*([\s\S]*?)(?=\*\*)/);
    if (missingKeywords) {
      result.missingKeywords = missingKeywords[1].trim() || 'None';
    }

    const finalThoughts = text.match(/Final Thoughts:\s*([\s\S]*)/);
    if (finalThoughts) {
      result.finalThoughts = finalThoughts[1].trim();
    }

    return result;
  };

  const renderTable = () => {
    if (!result) return null;

    return (
      <div className="result-table mt-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-purple-200">
              <th className="border p-2 font-semibold">Aspect</th>
              <th className="border p-2 font-semibold">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2 font-bold">Percentage of Match:</td>
              <td className="border p-2">{result.percentageMatch}</td>
            </tr>
            <tr>
              <td className="border p-2 font-bold">Keywords Missing:</td>
              <td className="border p-2">{result.missingKeywords}</td>
            </tr>
            <tr>
              <td className="border p-2 font-bold">Final Thoughts:</td>
              <td className="border p-2">{result.finalThoughts}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
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
    <div className="flex h-screen bg-gradient-to-r from-blue-50 via-purple-100 to-pink-50">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="resume-scanner flex flex-col w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
          <h1 className='text-3xl font-bold text-center text-purple-800 mb-4'>
            <MdDescription className="inline-block mr-2 text-4xl" /> Smart ATS
          </h1>
          <h2 className="text-xl font-semibold text-center text-gray-600 mb-6">Improve Your Resume ATS</h2>
          
          <label htmlFor="job-description" className="flex items-center text-gray-700 text-sm font-medium mb-2">
            <MdDescription className="text-lg mr-2" /> Paste the Job Description
          </label>
          <textarea
            id="job-description"
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            className='w-full h-40 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 bg-gray-100 p-3 text-gray-700'
            placeholder="Paste the job description here..."
          />
          
          <label htmlFor="resume-upload" className='flex items-center text-gray-700 text-sm font-medium mb-2 mt-4'>
            <MdAttachFile className="text-lg mr-2" /> Upload Your Resume
          </label>
          <input 
            id="resume-upload"
            type="file" 
            onChange={handleFileUpload} 
            accept="application/pdf" 
            className='w-full bg-gray-100 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 p-2'
          />
          
          <div className="flex justify-center mt-6">
            <button 
              onClick={handleSubmit} 
              className='bg-purple-600 text-white font-medium rounded-lg text-sm px-6 py-3 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-150 ease-in-out'
            >
              <MdSend className="inline-block mr-2" /> Submit
            </button>
          </div>
          
          {loading && <p className="text-center text-gray-500 mt-4"><AiOutlineLoading3Quarters className="animate-spin inline-block mr-2" /> Loading...</p>}
          {error && <p className="text-center text-red-500 mt-4">{error}</p>}
          {result && renderTable()}
        </div>
      </div>
<Bot/>
    </div>
  );
};

export default AtsScanner;


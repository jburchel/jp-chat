import React, { useState, useEffect } from 'react';
import './Chat.css';
import joshuaProjectApi from '../../api/joshuaProject';
import geminiApi from '../../api/gemini';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Function to analyze user input and determine which JP API to call
  const analyzeUserInput = (input) => {
    const keywords = {
      peopleGroups: ['people', 'group', 'tribe', 'ethnic', 'unreached'],
      languages: ['language', 'speak', 'linguistic'],
      countries: ['country', 'nation', 'region', 'area']
    };

    const lowercaseInput = input.toLowerCase();
    
    if (keywords.peopleGroups.some(keyword => lowercaseInput.includes(keyword))) {
      return 'peopleGroups';
    } else if (keywords.languages.some(keyword => lowercaseInput.includes(keyword))) {
      return 'languages';
    } else if (keywords.countries.some(keyword => lowercaseInput.includes(keyword))) {
      return 'countries';
    }
    
    return 'peopleGroups'; // default to people groups if no clear match
  };

  // Function to fetch relevant data from Joshua Project
  const fetchJoshuaProjectData = async (queryType, query) => {
    try {
      let data;
      switch (queryType) {
        case 'peopleGroups':
          data = await joshuaProjectApi.getPeopleGroups({ limit: 5, search: query });
          break;
        case 'languages':
          data = await joshuaProjectApi.getLanguages({ limit: 5, search: query });
          break;
        case 'countries':
          data = await joshuaProjectApi.getCountries({ limit: 5, search: query });
          break;
        default:
          throw new Error('Invalid query type');
      }
      return data;
    } catch (error) {
      console.error('Error fetching Joshua Project data:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to chat
    const userMessage = {
      text: input,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // 1. Analyze user input to determine which JP API to call
      const queryType = analyzeUserInput(input);
      
      // 2. Fetch relevant data from Joshua Project
      const jpData = await fetchJoshuaProjectData(queryType, input);
      
      // 3. Generate response using Gemini with JP data as context
      const aiResponse = await geminiApi.generateResponse(input, jpData);
      
      const botMessage = {
        text: aiResponse,
        sender: 'bot',
        timestamp: new Date().toISOString(),
        data: jpData // Store the raw data for potential display/reference
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        text: "I'm sorry, I encountered an error while processing your request. Please try again.",
        sender: 'bot',
        timestamp: new Date().toISOString(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <p>{message.text}</p>
            <small>{new Date(message.timestamp).toLocaleTimeString()}</small>
          </div>
        ))}
        {isLoading && <div className="message bot">...</div>}
      </div>
      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about people groups, languages, or countries..."
          className="chat-input"
        />
        <button type="submit" disabled={isLoading}>Send</button>
      </form>
    </div>
  );
};

export default Chat; 
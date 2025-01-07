import { GoogleGenerativeAI } from "@google/generative-ai";
import config from '../config/config';

const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);

const geminiApi = {
  // Initialize the model
  getModel: () => {
    return genAI.getGenerativeModel({ model: "gemini-pro" });
  },

  // Generate response using Gemini
  generateResponse: async (prompt, context) => {
    try {
      const model = geminiApi.getModel();
      
      // Construct a prompt that includes Joshua Project context
      const fullPrompt = `
        As an AI assistant specialized in missions and global people groups data, 
        please help answer this question using the following Joshua Project data context:
        
        Context:
        ${JSON.stringify(context)}
        
        User Question:
        ${prompt}
        
        Please provide a clear, informative response based on the Joshua Project data.
      `;

      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating Gemini response:', error);
      throw error;
    }
  }
};

export default geminiApi; 
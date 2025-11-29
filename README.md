<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1f7nBGgeWJYC1SBM4Yu2k5s2yhscjtptn

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Create a `.env.local` file in the root directory with your API keys:
   ```
   VITE_GROQ_API_KEY=your_groq_api_key_here
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   - Get Groq API Key: https://console.groq.com/ (for Magic Rephrase feature)
   - Get Gemini API Key: https://aistudio.google.com/app/apikey (for AI Chat Bot)
3. Run the app:
   `npm run dev`

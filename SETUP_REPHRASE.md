# Magic Rephrase Setup Guide

## Issue: Magic Rephrase Feature Not Working

### Quick Fix Steps:

1. **Check if `.env.local` file exists** in the root directory (same folder as `package.json`)

2. **Add Groq API Key** to `.env.local`:
   ```
   VITE_GROQ_API_KEY=your_actual_groq_api_key_here
   ```

3. **Get your Groq API Key:**
   - Go to: https://console.groq.com/
   - Sign up / Log in
   - Navigate to API Keys section
   - Create a new API key
   - Copy the key and paste it in `.env.local`

4. **Restart the dev server:**
   - Stop the current server (Ctrl+C in terminal)
   - Run: `npm run dev`

5. **Test the feature:**
   - Open any chat
   - Type some text (e.g., "bận xíu")
   - Click the **Wand2** icon (✨) in the input field
   - The text should be rephrased automatically

### Troubleshooting:

- **Check Browser Console** (F12) for error messages
- Look for: `🔑 Groq API Key Status` log message
- If you see `❌ Missing`, the API key is not loaded

### Current `.env.local` should contain:
```
GEMINI_API_KEY=your_gemini_key_here
VITE_GROQ_API_KEY=your_groq_api_key_here
```

**Note:** After adding/changing `.env.local`, you MUST restart the dev server for changes to take effect!


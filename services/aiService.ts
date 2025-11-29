// src/services/aiService.ts

type RephraseMode = 'boss' | 'lover';

const SYSTEM_PROMPTS: Record<RephraseMode, string> = {
  boss: `Role: Professional Assistant. Task: Rewrite user input to be formal, polite, and business-appropriate (Vietnamese). No slang. Example: 'tao bận' -> 'Hiện tại em đang vướng chút việc, xin phép phản hồi anh sau ạ.'`,
  lover: `Role: Gen Z Partner. Task: Rewrite user input to be cute, affectionate, using slang like 'xíuu', 'nhaaa', 'iu'. Example: 'bận xíu' -> 'Bé đợi anh xíuuu nha, iu bé ❤️'`
};

// Groq API configuration - Ultra fast inference
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL_NAME = 'llama-3.1-8b-instant'; // Fast and reliable model

/**
 * Rephrases a message using Groq API (Ultra-fast inference)
 * @param text - The original text to rephrase
 * @param mode - The rephrasing mode: 'boss' (formal) or 'lover' (affectionate)
 * @param customPrompt - Optional custom prompt to override the default system prompt
 * @returns The rephrased text, or original text if error occurs
 */
export const rephraseMessage = async (text: string, mode: RephraseMode = 'lover', customPrompt?: string): Promise<string> => {
  if (!text.trim()) {
    return text;
  }

  const GROQ_API_KEY = (import.meta.env as any).VITE_GROQ_API_KEY as string | undefined;
  
  // Debug: Check if API key is loaded
  console.log('🔑 Groq API Key Status:', GROQ_API_KEY ? '✅ Found' : '❌ Missing');
  
  // Check for placeholder or invalid API key
  if (!GROQ_API_KEY || GROQ_API_KEY.trim() === '' || 
      GROQ_API_KEY === 'PLACEHOLDER_API_KEY' || 
      GROQ_API_KEY === 'your_groq_api_key_here' ||
      GROQ_API_KEY.toLowerCase().includes('placeholder')) {
    console.error('❌ VITE_GROQ_API_KEY is not set or is a placeholder');
    console.error('📝 Please add a valid VITE_GROQ_API_KEY to your .env.local file');
    console.error('🔗 Get your API key at: https://console.groq.com/');
    throw new Error('API_KEY_MISSING: VITE_GROQ_API_KEY is not configured or is a placeholder. Please add a valid API key from https://console.groq.com/');
  }
  
  // Check if API key looks valid (Groq keys start with gsk_)
  if (!GROQ_API_KEY.startsWith('gsk_')) {
    console.warn('⚠️ GROQ_API_KEY should start with "gsk_"');
  }

  // Use custom prompt if provided, otherwise use default mode prompt
  const systemPrompt = customPrompt || SYSTEM_PROMPTS[mode];
  const userPrompt = `Rewrite this message: ${text}`;

  try {
    console.log('🚀 Sending request to Groq API...', {
      model: MODEL_NAME,
      mode,
      textLength: text.length
    });
    
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      let errorData: any = {};
      try {
        errorData = await response.json();
      } catch (e) {
        console.error('Failed to parse error response:', e);
      }
      const errorMessage = errorData.error?.message || errorData.message || response.statusText || 'Unknown error';
      console.error('❌ Groq API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      
      // Better error messages for common cases
      if (response.status === 429) {
        throw new Error(`Rate limit exceeded (429): ${errorMessage}. Please wait a moment and try again.`);
      }
      
      throw new Error(`Groq API error (${response.status}): ${errorMessage}`);
    }

    const data = await response.json();
    let rephrasedText = data.choices[0]?.message?.content?.trim();
    
    if (!rephrasedText || rephrasedText.trim() === '') {
      throw new Error('Empty response from API');
    }
    
    // Remove quotation marks if present (start and end)
    rephrasedText = rephrasedText.replace(/^["']|["']$/g, '').trim();
    
    console.log('✅ Rephrase successful:', rephrasedText);
    return rephrasedText;
  } catch (error: any) {
    console.error('❌ Error in rephraseMessage:', error);
    console.error('Error type:', typeof error);
    console.error('Error message:', error?.message);
    console.error('Error stack:', error?.stack);
    
    // Preserve the original error message
    if (error instanceof Error) {
      throw error;
    }
    // Wrap non-Error objects
    throw new Error(String(error));
  }
};


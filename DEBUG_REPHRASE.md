# 🔍 Debug Guide: Magic Rephrase Feature

## ✅ Current Status

Your `.env.local` file has:
- ✅ `GEMINI_API_KEY` - Found
- ✅ `VITE_GROQ_API_KEY` - Found (starts with `gsk_...`)

## ❌ Error You're Seeing

```
❌ Đã có lỗi xảy ra khi viết lại tin nhắn.
Vui lòng kiểm tra kết nối mạng và thử lại.
```

## 🔧 Step-by-Step Debugging

### 1. Check Browser Console (F12)

Open Browser Developer Tools (F12) and check the Console tab. Look for:

- `🔑 Groq API Key Status:` - Should show `✅ Found`
- `✨ Magic Rephrase triggered:` - Confirms button click
- `🚀 Sending request to Groq API...` - Confirms request started
- `❌ Error` messages - Shows actual error

**What to look for:**
- If you see `❌ Missing` → API key not loaded (restart server)
- If you see network errors → Connection issue
- If you see 401/403 → API key invalid
- If you see 429 → Rate limit exceeded

### 2. Common Issues & Solutions

#### Issue A: API Key Not Loading
**Symptoms:** Console shows `❌ Missing`

**Solution:**
1. Check `.env.local` file exists in project root
2. Verify `VITE_GROQ_API_KEY=gsk_...` (no spaces around `=`)
3. **Restart dev server** (Ctrl+C, then `npm run dev`)
4. Hard refresh browser (Ctrl+Shift+R)

#### Issue B: Network Error / CORS
**Symptoms:** Console shows `Failed to fetch` or `NetworkError`

**Possible causes:**
- Internet connection lost
- Firewall/VPN blocking `api.groq.com`
- Browser CORS policy

**Solutions:**
1. Check internet connection
2. Try disabling VPN/Firewall temporarily
3. Try a different browser
4. Check if you can access https://api.groq.com in browser
5. Try incognito/private mode

#### Issue C: API Key Invalid (401/403)
**Symptoms:** Console shows `401 Unauthorized` or `403 Forbidden`

**Solution:**
1. Get a new API key from https://console.groq.com/
2. Update `.env.local` with new key
3. Restart server

#### Issue D: Rate Limit (429)
**Symptoms:** Console shows `429` or `rate limit`

**Solution:**
- Wait a few minutes and try again
- Groq has rate limits on free tier

### 3. Test API Connection

Open Browser Console and run:

```javascript
fetch('https://api.groq.com/openai/v1/models', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY_HERE'
  }
})
.then(r => r.json())
.then(console.log)
.catch(console.error)
```

Replace `YOUR_API_KEY_HERE` with your actual key.

**Expected result:** List of available models
**If error:** Check API key validity

### 4. Verify Server Restart

After changing `.env.local`:
1. ✅ Stop server (Ctrl+C)
2. ✅ Start again (`npm run dev`)
3. ✅ Hard refresh browser (Ctrl+Shift+R)

## 📝 Next Steps

1. **Open Browser Console (F12)**
2. **Click the Wand button again**
3. **Copy all error messages from console**
4. **Share the error details** for further help

## 🆘 Still Not Working?

Check:
- [ ] `.env.local` file exists in project root
- [ ] `VITE_GROQ_API_KEY` starts with `gsk_`
- [ ] Server was restarted after adding API key
- [ ] Browser console shows no errors
- [ ] Internet connection is working
- [ ] Can access https://api.groq.com


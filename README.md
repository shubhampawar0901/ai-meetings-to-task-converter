# AI Meeting Minutes to Task Converter

🤖 Transform meeting transcripts into organized action items automatically with AI-powered task extraction.

## 🎯 What This App Does

Paste a meeting transcript like this:
```
"Aman you take the landing page by 10pm tomorrow. Rajeev you take care of client follow-up by Wednesday. Shreya please review the marketing deck tonight."
```

And get organized tasks like this:
| Task | Assigned To | Due Date/Time | Priority |
|------|-------------|---------------|----------|
| Take the landing page | Aman | 10pm tomorrow | P3 |
| Client follow-up | Rajeev | Wednesday | P3 |
| Review the marketing deck | Shreya | tonight | P3 |

## ✨ Key Features

- 🤖 **AI-Powered**: Uses OpenAI GPT-3.5-turbo to understand meeting language
- 📝 **Multiple Tasks**: Extracts all tasks from one meeting transcript
- 👥 **Smart Assignment**: Identifies who is responsible for each task
- ⏰ **Date Recognition**: Understands "tomorrow 10pm", "Wednesday", "tonight", etc.
- 🎯 **Priority Detection**: Assigns P1-P4 priorities (defaults to P3)
- 🎨 **Beautiful UI**: Modern, responsive interface with color-coded priorities
- ⚡ **Real-time**: Instant task extraction and display

## 🛠 Prerequisites

Before you start, make sure you have:

1. **Node.js** (version 16 or higher)
   - Download from: https://nodejs.org/
   - Check version: `node --version`

2. **MySQL Database**
   - Download from: https://dev.mysql.com/downloads/mysql/
   - Or use XAMPP: https://www.apachefriends.org/

3. **OpenAI API Key**
   - Get one from: https://platform.openai.com/api-keys
   - You'll need this for AI functionality

## 🚀 Quick Start Guide

### Step 1: Clone or Download the Project
```bash
# If you have the project folder, navigate to it
cd ai-meetings-to-task-converter
```

### Step 2: Set Up the Database

1. **Start MySQL** (if using XAMPP, start Apache and MySQL)

2. **Initialize the database**:
   ```bash
   cd backend
   node src/init-db.js
   ```
   
   You should see:
   ```
   ✓ Database created successfully
   ✓ Enhanced task_items table created with performance indexes
   ✓ Database initialization completed successfully!
   ```

### Step 3: Configure Environment Variables

1. **Open** `backend/.env` file
2. **Add your OpenAI API key**:
   ```env
   OPENAI_API_KEY=your_actual_openai_api_key_here
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=natural_language_task_manager
   PORT=3000
   ```

### Step 4: Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ../frontend
npm install
```

### Step 5: Start the Application

**Start Backend (in one terminal):**
```bash
cd backend
npm start
```

You should see:
```
🚀 Enhanced Task Items Server running on port 3000
✓ Task items database connection established successfully
✓ Task items table verified
✅ Database connection verified
```

**Start Frontend (in another terminal):**
```bash
cd frontend
npm run dev
```

You should see:
```
VITE v6.3.5  ready in 607 ms
➜  Local:   http://localhost:5173/
```

### Step 6: Open the App

1. **Open your browser**
2. **Go to**: `http://localhost:5173` (or the port shown in your terminal)
3. **You should see**: "AI Meeting Minutes to Task Converter" interface

## 📖 How to Use

### Basic Usage

1. **Paste your meeting transcript** in the large text area
2. **Click "Extract Tasks from Meeting"**
3. **Watch as AI automatically extracts** all tasks with:
   - Task descriptions
   - Assigned people
   - Deadlines
   - Priorities

### Example Meeting Transcripts to Try

**Example 1:**
```
Aman you take the landing page by 10pm tomorrow. Rajeev you take care of client follow-up by Wednesday. Shreya please review the marketing deck tonight.
```

**Example 2:**
```
John needs to fix the payment bug ASAP P1. Sarah will prepare the quarterly report by Friday. Mike please schedule the client meeting for next week P2.
```

**Example 3:**
```
Lisa you handle the social media campaign by end of week. Tom please update the website content by Thursday 5pm. Alex will coordinate with the design team tonight P1.
```

### Understanding Priorities

- **P1**: Critical/Urgent (Red badge)
- **P2**: High/Important (Orange badge)
- **P3**: Normal (Blue badge) - Default
- **P4**: Low (Gray badge)

## 🧪 Testing the API

You can test the backend API directly using the provided test script:

```bash
# In the ai-meetings-to-task-converter folder
powershell -ExecutionPolicy Bypass -File test-simple.ps1
```

This will test the API with a sample meeting transcript and show the extracted tasks.

## 🔧 Troubleshooting

### Common Issues

**1. "Cannot find module" errors**
```bash
# Make sure you installed dependencies
cd backend && npm install
cd ../frontend && npm install
```

**2. Database connection failed**
- Make sure MySQL is running
- Check your database credentials in `backend/.env`
- Try running the database initialization again: `node src/init-db.js`

**3. OpenAI API errors**
- Make sure your API key is correct in `backend/.env`
- Check if you have credits in your OpenAI account
- Verify the API key has the right permissions

**4. Port already in use**
- If port 3000 is busy, change `PORT=3001` in `backend/.env`
- If port 5173 is busy, Vite will automatically use the next available port

**5. Frontend not connecting to backend**
- Make sure both servers are running
- Check that backend is on port 3000 and frontend can reach it
- Look for CORS errors in browser console

### Getting Help

If you encounter issues:

1. **Check the terminal output** for error messages
2. **Look at browser console** (F12) for frontend errors
3. **Verify all prerequisites** are installed correctly
4. **Make sure both servers are running** simultaneously

## 🎯 Project Structure

```
ai-meetings-to-task-converter/
├── backend/                 # Node.js + Express API
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # API controllers
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic & OpenAI
│   │   ├── index.js        # Main server file
│   │   └── init-db.js      # Database setup
│   ├── .env                # Environment variables
│   └── package.json        # Dependencies
├── frontend/               # React + TypeScript UI
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── api/           # API calls
│   │   ├── types/         # TypeScript types
│   │   └── App.tsx        # Main app component
│   └── package.json       # Dependencies
└── README.md              # This file
```

## 🚀 What's Next?

Once you have the app running, you can:

- **Extract tasks** from your actual meeting transcripts
- **Edit tasks** by clicking on them in the task board
- **Delete tasks** using the delete button
- **Organize your team's action items** efficiently

The app automatically saves all extracted tasks to the database, so you can come back to them later!

## 🔍 Advanced Configuration

### Custom Database Settings

If you want to use different database settings, modify `backend/.env`:

```env
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
PORT=3000
FRONTEND_URL=http://localhost:5173
```

### OpenAI Model Configuration

The app uses GPT-3.5-turbo by default. You can modify the model in `backend/src/services/openaiService.js`:

```javascript
model: "gpt-3.5-turbo",  // or "gpt-4" for better accuracy
```

## 🎨 UI Customization

The app uses Tailwind CSS for styling. You can customize colors and themes in:
- `frontend/tailwind.config.js` - Main theme configuration
- `frontend/src/components/` - Individual component styles

## 📊 API Documentation

### Main Endpoint

**POST** `/api/process-request`
- **Purpose**: Extract tasks from meeting transcript
- **Input**: `{ "text": "your meeting transcript here" }`
- **Output**: `{ "taskItems": [array of extracted tasks] }`

### Task Management Endpoints

- **GET** `/api/task-items` - Get all tasks
- **PUT** `/api/task-items/:id` - Update a task
- **DELETE** `/api/task-items/:id` - Delete a task
- **GET** `/api/health` - Check server health

## 🚀 Deployment

### For Production Use

1. **Set environment to production** in `backend/.env`:
   ```env
   NODE_ENV=production
   ```

2. **Build the frontend**:
   ```bash
   cd frontend
   npm run build
   ```

3. **Use a process manager** like PM2 for the backend:
   ```bash
   npm install -g pm2
   pm2 start backend/src/index.js --name "meeting-converter"
   ```

4. **Set up a reverse proxy** (nginx/Apache) to serve the built frontend and proxy API calls to the backend.

## 🤝 Contributing

Want to improve the app? Here are some ideas:

- **Add more AI models** (Claude, Gemini)
- **Improve date parsing** for different formats
- **Add task categories** or tags
- **Integrate with calendar apps**
- **Add email notifications**
- **Support for different languages**

## 📞 Support

If you need help:

1. **Check this README** first
2. **Look at the troubleshooting section**
3. **Check the terminal output** for error messages
4. **Verify your OpenAI API key** is working
5. **Make sure MySQL is running**

## 🎉 Success Indicators

You know everything is working when:

✅ Backend shows: "🚀 Enhanced Task Items Server running on port 3000"
✅ Frontend shows: "VITE ready" and opens in browser
✅ Database shows: "✓ Task items table verified"
✅ Test script extracts tasks successfully
✅ You can paste meeting transcripts and see extracted tasks

## 📄 License

This project is licensed under the ISC License.

---

**Happy task extracting! 🎯**

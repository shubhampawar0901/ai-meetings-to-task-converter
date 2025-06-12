const OpenAI = require('openai');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

class OpenAIService {
  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    console.log('OpenAI API Key loaded:', apiKey ? 'Yes' : 'No');

    if (!apiKey) {
      console.error('OpenAI API key not found in environment variables');
      throw new Error('OpenAI API key is required');
    }

    this.openai = new OpenAI({
      apiKey: apiKey,
    });
  }

  async parseTasksFromMeetingTranscript(inputText) {
    try {
      const prompt = `
You are a meeting transcript parser AI. Extract ALL tasks from the following meeting transcript and return ONLY a valid JSON array with task objects.

Each task object should have these exact fields:
{
  "taskTitle": "Brief, clear task description (max 100 chars)",
  "assignedTo": "Person who should handle the task",
  "deadlineText": "Extracted date/time or empty string",
  "urgencyLevel": "P1, P2, P3, or P4"
}

Rules:
1. taskTitle: Extract the main action/task that needs to be done. Be concise and actionable.
2. assignedTo:
   - Look for patterns like "[Name] you take...", "[Name] please...", "[Name] will handle..."
   - Extract the person's name who is assigned the task
   - If no clear assignee, use "Unassigned"
3. deadlineText: Extract dates/times like "by 10pm tomorrow", "by Wednesday", "tonight", "by Friday 5pm", etc.
4. urgencyLevel: P1 (critical/urgent), P2 (high/important), P3 (normal), P4 (low). Default to P3 unless specified.

Examples:
Input: "Aman you take the landing page by 10pm tomorrow. Rajeev you take care of client follow-up by Wednesday. Shreya please review the marketing deck tonight."
Output: [
  {"taskTitle": "Take the landing page", "assignedTo": "Aman", "deadlineText": "10pm tomorrow", "urgencyLevel": "P3"},
  {"taskTitle": "Client follow-up", "assignedTo": "Rajeev", "deadlineText": "Wednesday", "urgencyLevel": "P3"},
  {"taskTitle": "Review the marketing deck", "assignedTo": "Shreya", "deadlineText": "tonight", "urgencyLevel": "P3"}
]

Input: "John needs to fix the payment bug ASAP P1. Sarah will prepare the quarterly report by Friday."
Output: [
  {"taskTitle": "Fix the payment bug", "assignedTo": "John", "deadlineText": "ASAP", "urgencyLevel": "P1"},
  {"taskTitle": "Prepare the quarterly report", "assignedTo": "Sarah", "deadlineText": "Friday", "urgencyLevel": "P3"}
]

Now extract ALL tasks from this meeting transcript:
"${inputText}"

Return ONLY the JSON array, no other text:`;

      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.1,
        max_tokens: 800
      });

      const content = response.choices[0].message.content.trim();
      console.log('OpenAI raw response:', content);

      // Parse the JSON response (should be an array)
      const parsedResult = JSON.parse(content);

      // Ensure we have an array
      const tasksArray = Array.isArray(parsedResult) ? parsedResult : [parsedResult];

      // Validate each task in the array
      const validatedResults = tasksArray.map((task, index) => ({
        itemTitle: task.taskTitle || `Task ${index + 1}`,
        assignedTo: task.assignedTo || 'Unassigned',
        deadlineText: task.deadlineText || '',
        urgencyLevel: ['P1', 'P2', 'P3', 'P4'].includes(task.urgencyLevel) ? task.urgencyLevel : 'P3'
      }));

      console.log('OpenAI parsed results:', validatedResults);
      return validatedResults;

    } catch (error) {
      console.error('OpenAI parsing error:', error);

      // Fallback to basic parsing if OpenAI fails - return single task
      return [{
        itemTitle: inputText.length > 100 ? inputText.substring(0, 100) + '...' : inputText,
        assignedTo: 'Unassigned',
        deadlineText: '',
        urgencyLevel: 'P3'
      }];
    }
  }

  // Keep the old method for backward compatibility
  async parseTaskFromText(inputText) {
    const results = await this.parseTasksFromMeetingTranscript(inputText);
    return results[0]; // Return first task for single task compatibility
  }
}

module.exports = new OpenAIService();

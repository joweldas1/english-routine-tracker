export const INITIAL_ROUTINE = [
  {
    id: 'vocab',
    title: 'Morning Vocabulary Sprint',
    description: 'Learn and pronounce 3 new words with example sentences',
    duration: '10 mins',
    category: 'Vocabulary',
    icon: 'BookOpen',
    completed: false,
  },
  {
    id: 'shadowing',
    title: 'Audio Shadowing & Pronunciation',
    description: 'Listen to a native speaker audio clip and mimic intonation',
    duration: '15 mins',
    category: 'Pronunciation',
    icon: 'Volume2',
    completed: false,
  },
  {
    id: 'speaking',
    title: 'Topic Speaking (Voice Recording)',
    description: 'Speak for 2 minutes on today’s daily prompt using microphone',
    duration: '10 mins',
    category: 'Speaking',
    icon: 'Mic',
    completed: false,
  },
  {
    id: 'reading',
    title: 'Short Reading & Comprehension',
    description: 'Read an English article paragraph and note new phrases',
    duration: '15 mins',
    category: 'Reading',
    icon: 'FileText',
    completed: false,
  },
  {
    id: 'journal',
    title: 'Daily Micro-Journal (3 Sentences)',
    description: 'Write 3-5 sentences summarizing what you achieved today',
    duration: '5 mins',
    category: 'Writing',
    icon: 'PenTool',
    completed: false,
  },
  {
    id: 'ai-chat',
    title: 'AI Conversational Session',
    description: 'Practice 10 back-and-forth messages with your AI English Tutor',
    duration: '15 mins',
    category: 'Conversation',
    icon: 'Bot',
    completed: false,
  },
];

export const VOCABULARY_LIST = [
  {
    id: 1,
    word: 'Articulate',
    phonetic: '/ɑːrˈtɪkjuleɪt/',
    bangla: 'স্পষ্ট ও সুন্দরভাবে মনের ভাব প্রকাশ করা',
    meaning: 'Having or showing the ability to speak fluently and coherently',
    example: 'She gave an articulate speech about technology in education.',
    category: 'Communication',
    mastered: false,
  },
  {
    id: 2,
    word: 'Consistency',
    phonetic: '/kənˈsɪstənsi/',
    bangla: 'ধারাবাহিকতা বা নিয়মিত চর্চা',
    meaning: 'Consistent behavior or treatment; firmness of constitution',
    example: 'Consistency is the real key to mastering spoken English.',
    category: 'Mindset',
    mastered: false,
  },
  {
    id: 3,
    word: 'Hesitation',
    phonetic: '/ˌhezɪˈteɪʃn/',
    bangla: 'দ্বিধা বা ইতস্তত করা',
    meaning: 'The act of pausing before doing something, especially through uncertainty',
    example: 'Speak without hesitation; mistakes are just stepping stones.',
    category: 'Speaking',
    mastered: false,
  },
  {
    id: 4,
    word: 'Spontaneous',
    phonetic: '/spɑːnˈteɪniəs/',
    bangla: 'স্বতঃস্ফূর্ত / তাৎক্ষণিক',
    meaning: 'Performed or occurring as a result of a sudden inner impulse',
    example: 'His spontaneous response in English impressed the interviewer.',
    category: 'Fluency',
    mastered: false,
  },
  {
    id: 5,
    word: 'Perspective',
    phonetic: '/pərˈspektɪv/',
    bangla: 'দৃষ্টিকোণ বা দৃষ্টিভঙ্গি',
    meaning: 'A particular attitude toward or way of regarding something',
    example: 'Traveling gives you a whole new perspective on life.',
    category: 'General',
    mastered: false,
  },
  {
    id: 6,
    word: 'Pivotal',
    phonetic: '/ˈpɪvətl/',
    bangla: 'অত্যন্ত গুরুত্বপূর্ণ বা মোড় ঘুরিয়ে দেওয়া',
    meaning: 'Of crucial importance in relation to the development or success of something',
    example: 'This daily routine will play a pivotal role in your fluency.',
    category: 'Academic',
    mastered: false,
  },
];

export const CONVERSATION_SCENARIOS = [
  {
    id: 'interview',
    title: 'Job Interview Simulation',
    level: 'Intermediate - Advanced',
    topic: 'Introducing yourself, describing strengths and previous challenges.',
    promptTemplate: `Hello! Let's practice a real job interview in English. 
You act as an experienced hiring manager for a global software & tech company. 
Ask me one realistic interview question at a time. After I answer:
1. Briefly give me constructive feedback on my grammar, vocabulary, and tone.
2. Suggest a more native, professional way to phrase it.
3. Then ask the next question.
Start by asking me: "Can you briefly introduce yourself and tell me about your background?"`,
    questions: [
      'Tell me about a difficult problem you solved recently.',
      'How do you handle deadlines under tight pressure?',
      'Where do you see yourself professionally in two years?'
    ]
  },
  {
    id: 'cafe-travel',
    title: 'Cafe & Travel Conversations',
    level: 'Beginner - Everyday',
    topic: 'Ordering coffee, asking for directions, hotel check-ins.',
    promptTemplate: `Hey! I want to practice everyday natural English for traveling and cafes. 
Act as a friendly barista at a bustling coffee shop in London. 
Greet me warmly and take my order. Let's roleplay step-by-step. Correct my phrasing gently if needed!`,
    questions: [
      'What kind of coffee/food would you recommend?',
      'Could you tell me how to get to the nearest metro station?',
      'Can I split the bill with my friend?'
    ]
  },
  {
    id: 'opinion-debate',
    title: 'Expressing Opinions & Debating',
    level: 'Advanced',
    topic: 'Discussing AI technology, remote work vs office, and personal habits.',
    promptTemplate: `Let's have a friendly debate in English to build spontaneous speaking skills. 
Pick a topic like "Is Remote Work better than In-Office work?" or "Impact of AI on daily life". 
You state your point of view in 3-4 sentences, then ask for my stance. 
When I reply, challenge my logic politely and suggest richer vocabulary words I could have used.`,
    questions: [
      'Do you think AI tools will replace developers or empower them?',
      'Is social media more harmful or beneficial for students?',
      'What is the most effective habit you developed this year?'
    ]
  },
  {
    id: 'daily-chitchat',
    title: 'Casual Daily Small Talk',
    level: 'All Levels',
    topic: 'Weather, weekend plans, favourite foods, current projects.',
    promptTemplate: `Hi! Let's do a friendly 10-minute English small-talk session. 
Talk to me like a close friend catching up after a busy week. 
Keep replies conversational, ask fun questions, and point out any natural idioms I can use. 
Start by asking: "Hey! How has your week been so far?"`,
    questions: [
      'What are your plans for this coming weekend?',
      'Have you watched any interesting movies or series lately?',
      'What is your favorite comfort food when you are tired?'
    ]
  }
];

export const DAILY_TONGUE_TWISTERS = [
  "She sells seashells by the seashore.",
  "How much wood would a woodchuck chuck if a woodchuck could chuck wood?",
  "Peter Piper picked a peck of pickled peppers.",
  "I scream, you scream, we all scream for ice cream!",
  "A proper copper coffee pot."
];

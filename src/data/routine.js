/**
 * Complete Data Specification for English Routine Tracker (Jowel)
 * Contains the 4-week roadmap, 6 daily tasks, weekend review, 8 interview questions,
 * STAR method template, 5 core rules, and initial tracker state.
 */

export const USER_NAME = "Jowel";

export const DAILY_TASKS = [
  {
    id: "vocab",
    name: "Vocabulary",
    banglaName: "শব্দভাণ্ডার",
    duration: 10, // minutes
    method: "Learn 3-5 new words in context. Write definition and your own original sentence.",
    methodBn: "প্রাসঙ্গিক ৩-৫টি নতুন শব্দ শিখুন। অর্থ বুঝুন ও নিজের বাস্তব বাক্য তৈরি করুন।",
    tools: "Oxford Learner's Dictionary, Cambridge Dictionary, Anki / Flashcards",
    category: "Vocabulary"
  },
  {
    id: "grammar",
    name: "Grammar",
    banglaName: "ব্যাকরণ",
    duration: 15,
    method: "Study this week's grammar focus. Review rules and write 3 original practice sentences.",
    methodBn: "চলতি সপ্তাহের ব্যাকরণ টপিকের নিয়ম পর্যালোচনা করুন এবং ৩টি আসল বাক্য লিখুন।",
    tools: "English Grammar in Use (Raymond Murphy), BBC Learning English",
    category: "Grammar"
  },
  {
    id: "listening",
    name: "Listening",
    banglaName: "লিসেনিং",
    duration: 15,
    method: "Active listening to 1 podcast episode or tech talk. Note new collocations and expressions.",
    methodBn: "সচেতনভাবে ১টি পডকাস্ট বা টেক টক শুনুন। নতুন ফ্রেজ ও এক্সপ্রেশন লিখে রাখুন।",
    tools: "BBC 6 Minute English, Luke's English Podcast, TED Talks",
    category: "Listening"
  },
  {
    id: "shadowing",
    name: "Shadowing",
    banglaName: "শ্যাডোয়িং",
    duration: 15,
    method: "Listen and speak simultaneously with native audio, mimicking tone, speed, and intonation.",
    methodBn: "নেটিভ অডিওর সাথে সাথে হুবহু স্বরভঙ্গি, গতি ও উচ্চারণ নকল করে উচ্চস্বরে বলুন।",
    tools: "YouTube (0.75x - 1x speed), Audio recorder / Phone memo",
    category: "Shadowing"
  },
  {
    id: "speaking",
    name: "Speaking",
    banglaName: "স্পিকিং",
    duration: 15,
    method: "Impromptu speaking for 2-3 minutes on today's interview question or tech topic using STAR.",
    methodBn: "আজকের ইন্টারভিউ প্রশ্ন বা টপিকের ওপর না থেমে ২-৩ মিনিট কথা বলুন ও রেকর্ড করুন।",
    tools: "Phone Voice Recorder / Speech Recognition / AI Conversation",
    category: "Speaking"
  },
  {
    id: "writing",
    name: "Writing",
    banglaName: "রাইটিং",
    duration: 10,
    method: "Micro-journaling: Write 5-8 sentences summarizing today's work, learning, or ideas.",
    methodBn: "আজকের কাজ, চিন্তা ও অভিজ্ঞতার ওপর ৫-৮টি পূর্ণাঙ্গ বাক্য ইংরেজিতে লিখুন।",
    tools: "Daily Error Log, Grammarly / AI Grammar Check",
    category: "Writing"
  }
];

export const TOTAL_DAILY_MINUTES = 80;

export const WEEKEND_ROUTINE = {
  saturday: {
    title: "Saturday Review & Mock Interview",
    banglaTitle: "শনিবার: সাপ্তাহিক রিভিউ ও মক ইন্টারভিউ",
    totalMinutes: 75,
    tasks: [
      {
        id: "sat-error-log",
        title: "Check & Analyze Error Log",
        banglaTitle: "ভুলের লগ (Error Log) পর্যালোচনা",
        duration: 15,
        description: "Review all mistakes logged during the week. Identify repeated grammar rules violated.",
        descriptionBn: "সারা সপ্তাহের জমা হওয়া ভুলগুলো পর্যালোচনা করুন এবং পুনরাবৃত্তি রোধ করুন।"
      },
      {
        id: "sat-vocab-review",
        title: "Vocabulary Revision & Retention",
        banglaTitle: "সাপ্তাহিক শব্দভাণ্ডার রিভিশন",
        duration: 15,
        description: "Review all new words added this week. Practice saying each in a spontaneous sentence.",
        descriptionBn: "এই সপ্তাহে শেখা সব নতুন শব্দের অর্থ রিভিশন দিন ও মুখে বাক্য তৈরি করুন।"
      },
      {
        id: "sat-mock-interview",
        title: "45-Minute Full Mock Interview",
        banglaTitle: "৪৫ মিনিটের মক ইন্টারভিউ অনুশীলন",
        duration: 45,
        description: "Simulate a live client/HR interview: answer 3-4 questions out loud with recording & STAR method.",
        descriptionBn: "৩-৪টি ইন্টারভিউ প্রশ্নের উত্তর উচ্চস্বরে দিন, রেকর্ড করুন এবং STAR স্ট্রাকচার অনুসরণ করুন।"
      }
    ]
  },
  sunday: {
    title: "Sunday Light Listening & Rest",
    banglaTitle: "রবিবার: হালকা লিসেনিং ও মানসিক বিশ্রাম",
    totalMinutes: 30,
    tasks: [
      {
        id: "sun-light-listening",
        title: "Casual English Listening / Movie",
        banglaTitle: "হালকা লিসেনিং / সিনেমা বা সিরিজ",
        duration: 30,
        description: "Watch an English movie, documentary, or listen to a casual podcast with English subtitles.",
        descriptionBn: "কোনো চাপ ছাড়া ইংরেজি সাবটাইটেলসহ সিনেমা বা প্রিয় পডকাস্ট শুনুন।"
      },
      {
        id: "sun-rest",
        title: "Rest & Plan the Upcoming Week",
        banglaTitle: "পরবর্তী সপ্তাহের লক্ষ্য নির্ধারণ",
        duration: 0,
        description: "Recharge your mind and prepare mental focus for the next week's grammar and speaking theme.",
        descriptionBn: "মানসিকভাবে প্রস্তুত হোন এবং নতুন সপ্তাহের টার্গেট দেখে রাখুন।"
      }
    ]
  }
};

export const WEEKS_PLAN = [
  {
    week: 1,
    title: "Week 1: Foundations & Routine Kickoff",
    banglaTitle: "সপ্তাহ ১: ভিত্তি স্থাপন ও দৈনন্দিন রুটিন",
    grammarFocus: "Tenses Mastery (Present Simple, Past Simple & Present Perfect for daily dev work)",
    grammarFocusBn: "টেন্স মাস্টারি: বর্তমান, অতীত ও প্রজেক্টের চলমান কাজ সঠিকভাবে প্রকাশ",
    vocabTheme: "Workplace & Development Workflow (tasks, debugging, deployment, sprint, tickets)",
    vocabThemeBn: "কর্মক্ষেত্র ও ডেভেলপার ওয়ার্কফ্লো (ডিবাগিং, ডিপ্লয়মেন্ট, স্প্রিন্ট, টিকিট)",
    speakingGoal: "Fluently introduce yourself, your tech stack, and your daily routine without hesitation.",
    speakingGoalBn: "দ্বিধাহীনভাবে নিজের ব্যাকগ্রাউন্ড, টেক স্ট্যাক ও কাজের রুটিন স্পষ্ট ইংরেজিতে উপস্থাপন।"
  },
  {
    week: 2,
    title: "Week 2: Client Communication & Politeness",
    banglaTitle: "সপ্তাহ ২: ক্লায়েন্ট কমিউনিকেশন ও মতামত প্রকাশ",
    grammarFocus: "Modal Verbs (Can, Could, Would, Should) & Polite Requests / Questions",
    grammarFocusBn: "মডাল ভার্ব ও বিনম্র ক্লায়েন্ট রিকোয়েস্ট (Could you please, Would it be possible)",
    vocabTheme: "Client Collaboration, Deadlines & Revisions (deliverables, scope, estimate, feedback)",
    vocabThemeBn: "প্রজেক্ট ম্যানেজমেন্ট, ডেডলাইন, রিভিশন, ক্লায়েন্ট ফিডব্যাক ও এস্টিমেট",
    speakingGoal: "Explaining technical constraints and asking clarifying questions with full confidence.",
    speakingGoalBn: "টেকনিক্যাল সীমাবদ্ধতা এবং ক্লায়েন্টের সাথে স্পষ্ট প্রশ্নোত্তরে সাবলীলতা অর্জন।"
  },
  {
    week: 3,
    title: "Week 3: Problem Solving & Technical Storytelling",
    banglaTitle: "সপ্তাহ ৩: সমস্যা সমাধান ও টেকনিক্যাল স্টোরিটেলিং",
    grammarFocus: "Passive Voice & Complex Connectors (Although, In order to, Because of, Whereas)",
    grammarFocusBn: "প্যাসিভ ভয়েস ও জটিল বাক্য সংযোগকারী (Although, Therefore, Due to, In order to)",
    vocabTheme: "Architecture, Optimization & Troubleshooting (bottleneck, refactor, responsiveness, security)",
    vocabThemeBn: "পারফরম্যান্স অপ্টিমাইজেশন, ট্রাবলশুটিং, আর্কিটেকচার ও রেসপনসিভনেস",
    speakingGoal: "Mastering the STAR method for behavioral & technical problem-solving interview questions.",
    speakingGoalBn: "STAR মেথডে অতীত প্রজেক্টের কঠিন বাগ ও সমাধানের সফল গল্প বলা।"
  },
  {
    week: 4,
    title: "Week 4: Professional Polish & Mock Interview",
    banglaTitle: "সপ্তাহ ৪: প্রফেশনাল পারফেকশন ও চূড়ান্ত ইন্টারভিউ",
    grammarFocus: "Conditionals (If-sentences, Second & Third Conditionals) & Professional Idioms",
    grammarFocusBn: "কন্ডিশনাল বাক্য (If sentences) ও প্রফেশনাল বিজনেস ইডিয়মস",
    vocabTheme: "Career Goals, Team Dynamics & Value Proposition (scalability, impact, ownership, strengths)",
    vocabThemeBn: "ক্যারিয়ার গ্রোথ, টিমওয়ার্ক, স্ট্রেন্থস, দুর্বলতা ও দীর্ঘমেয়াদী লক্ষ্য",
    speakingGoal: "Deliver a full 45-minute confident mock interview with spontaneous fluency and clear diction.",
    speakingGoalBn: "সম্পূর্ণ ৪৫ মিনিটের একটি মক ইন্টারভিউতে সাবলীল, প্রাঞ্জল ও আত্মবিশ্বাসী পারফরম্যান্স।"
  }
];

export const CORE_RULES = [
  {
    number: 1,
    title: "Consistency Over Intensity",
    banglaTitle: "তীব্রতার চেয়ে ধারাবাহিকতা গুরুত্বপূর্ণ",
    description: "Practicing 80 minutes every single day is 10x more effective than studying 6 hours only on weekends.",
    descriptionBn: "প্রতিদিন নিয়ম করে ৮০ মিনিট সময় দিন; সপ্তাহের একদিনে ৬ ঘণ্টা পড়ার চেয়ে এটি বহু গুণ বেশি ফলপ্রসূ।"
  },
  {
    number: 2,
    title: "Think Directly in English",
    banglaTitle: "সরাসরি ইংরেজিতে চিন্তা করুন",
    description: "Stop translating word-by-word from Bengali. Train your brain to map thoughts directly to English phrases.",
    descriptionBn: "মাথার মধ্যে বাংলা অনুবাদ করা পরিহার করুন। সাধারণ কথাগুলোও সরাসরি ইংরেজি শব্দে ভাবার অভ্যাস গড়ে তুলুন।"
  },
  {
    number: 3,
    title: "Fluency Precedes Accuracy",
    banglaTitle: "ভুল হোক, তবু দ্বিধাহীন বলুন",
    description: "Do not let the fear of making mistakes freeze your speech. Speak continuously, then record and correct errors.",
    descriptionBn: "ভুল করার ভয় ত্যাগ করুন। কথা বলার সময় অনর্গল বলুন, পরে ভুলগুলো Error Log-এ লিখে সংশোধন করুন।"
  },
  {
    number: 4,
    title: "Active Production (Speak Out Loud)",
    banglaTitle: "মুখ ফুটে উচ্চস্বরে বলুন",
    description: "Passive listening will never make you fluent. Your vocal cords and mouth muscles must pronounce words every day.",
    descriptionBn: "শুধু মনে মনে বা কানে শুনলে মুখের জড়তা কাটবে না। প্রতিদিন মুখ দিয়ে উচ্চস্বরে আওয়াজ করে পড়তে ও বলতে হবে।"
  },
  {
    number: 5,
    title: "Review & Eliminate Repeated Mistakes",
    banglaTitle: "শনিবারের রিভিশনে ভুল দূর করুন",
    description: "Systematically review your Error Log every Saturday so you never make the same grammatical mistake twice.",
    descriptionBn: "প্রতি শনিবার Error Log রিভিশন দিন যাতে একই ব্যাকরণগত ভুল দ্বিতীয়বার আপনার অভ্যাসে না থাকে।"
  }
];

export const INTERVIEW_QUESTIONS = [
  {
    id: 1,
    question: "Can you tell me about yourself and your background as a web developer?",
    banglaTitle: "নিজের পরিচয় ও ডেভেলপার ব্যাকগ্রাউন্ড",
    category: "Introduction",
    suggestedDuration: "2-3 min",
    keyPoints: [
      "Present role & specialization (WordPress, WooCommerce, Front-end React)",
      "Years of hands-on experience and real project delivery",
      "Key accomplishments (fast delivery, responsive clean code)",
      "What drives your passion for building web solutions"
    ],
    starTips: "Highlight your recent achievements and passion for clean, performant web development."
  },
  {
    id: 2,
    question: "What is your typical workflow when starting a new website or web application project?",
    banglaTitle: "নতুন প্রজেক্ট শুরুর স্ট্যান্ডার্ড ওয়ার্কফ্লো",
    category: "Workflow",
    suggestedDuration: "2-3 min",
    keyPoints: [
      "Discovery & requirement breakdown",
      "UI/UX review & architecture planning",
      "Modular development (components, plugins, responsiveness)",
      "Rigorous cross-browser testing & staging deployment",
      "Client feedback iteration & launch"
    ],
    starTips: "Structure chronologically: Discovery -> Planning -> Execution -> Testing -> Delivery."
  },
  {
    id: 3,
    question: "Describe a challenging bug or technical problem you encountered and how you resolved it.",
    banglaTitle: "জটিল বাগ বা টেকনিক্যাল সমস্যা সমাধান (STAR)",
    category: "Problem Solving",
    suggestedDuration: "3 min",
    keyPoints: [
      "Situation: The unexpected issue (e.g., checkout failure, plugin conflict, slow TTFB)",
      "Task: Your exact responsibility and urgency level",
      "Action: Systematic debugging (console logs, disabling conflicts, database optimization)",
      "Result: Solved within hours, speed boosted by 40%, zero data loss"
    ],
    starTips: "Strictly apply Situation, Task, Action, and Result for this answer."
  },
  {
    id: 4,
    question: "How do you handle tight deadlines or multiple conflicting priorities?",
    banglaTitle: "টাইট ডেডলাইন ও কাজের চাপ সামলানোর উপায়",
    category: "Time Management",
    suggestedDuration: "2-3 min",
    keyPoints: [
      "Urgent vs Important prioritization matrix",
      "Transparent client communication as soon as bottlenecks appear",
      "Breaking large milestones into daily micro-deliverables",
      "Focus blocks & eliminating distractions"
    ],
    starTips: "Emphasize proactive communication rather than silent struggle."
  },
  {
    id: 5,
    question: "How do you communicate technical requirements or limitations to non-technical clients?",
    banglaTitle: "নন-টেকনিক্যাল ক্লায়েন্টদের সাথে সহজ কমিউনিকেশন",
    category: "Client Communication",
    suggestedDuration: "2-3 min",
    keyPoints: [
      "Avoiding programming jargon and using simple real-world metaphors",
      "Focusing on business outcomes and user impact",
      "Providing visual mockups, screenshots, or short Loom walkthrough videos",
      "Offering alternative actionable options rather than a plain 'No'"
    ],
    starTips: "Give a concrete example of explaining an API limit or mobile responsiveness trade-off."
  },
  {
    id: 6,
    question: "Tell me about a time you had to learn a new technology or tool quickly. How did you approach it?",
    banglaTitle: "দ্রুত নতুন প্রযুক্তি শেখার দক্ষতা",
    category: "Adaptability",
    suggestedDuration: "2-3 min",
    keyPoints: [
      "The tool/technology required by the project",
      "Reading official documentation over passive video tutorials",
      "Building a minimal working Proof of Concept (POC)",
      "Applying it directly to the production deliverable on schedule"
    ],
    starTips: "Focus on your agility and disciplined self-learning process."
  },
  {
    id: 7,
    question: "What are your key strengths, and what is one area you are actively working to improve?",
    banglaTitle: "ব্যক্তিগত শক্তি এবং উন্নতির জায়গা",
    category: "Self Awareness",
    suggestedDuration: "2-3 min",
    keyPoints: [
      "Strength 1: High reliability and fast troubleshooting capability",
      "Strength 2: Obsession with clean, pixel-perfect responsive layouts",
      "Improvement: Actively enhancing spoken English fluency through daily structured 80-minute practice"
    ],
    starTips: "Frame your spoken English practice as active commitment and disciplined growth."
  },
  {
    id: 8,
    question: "Why do you want to work with international/remote clients, and how do you ensure clear async communication?",
    banglaTitle: "রিমোট টিমওয়ার্ক ও অ্যাসিনক্রোনাস কমিউনিকেশন",
    category: "Remote Work",
    suggestedDuration: "2-3 min",
    keyPoints: [
      "Desire to deliver global quality standards and collaborate with diverse teams",
      "Detailed asynchronous daily status updates (what was done, what is next, any blockers)",
      "Respecting client time zones and punctuality on video calls",
      "Clear documentation in Jira/Trello/GitHub pull requests"
    ],
    starTips: "Demonstrate that you are organized, autonomous, and self-sufficient."
  }
];

export const INITIAL_VOCABULARY = [
  {
    id: 1,
    word: "Articulate",
    meaning: "স্পষ্ট ও সাবলীলভাবে মনের ভাব বা যুক্তি প্রকাশ করা (express ideas clearly)",
    sentence: "I want to articulate my technical solutions clearly during client meetings.",
    date: new Date().toISOString().split('T')[0],
    reviewed: false
  },
  {
    id: 2,
    word: "Bottleneck",
    meaning: "কাজের গতি বা পারফরম্যান্স বাধাগ্রস্ত করার মূল কারণ (a point of congestion or obstruction)",
    sentence: "We identified that the unoptimized database query was the main bottleneck.",
    date: new Date().toISOString().split('T')[0],
    reviewed: true
  },
  {
    id: 3,
    word: "Proactive",
    meaning: "সমস্যা তৈরি হওয়ার আগেই উদ্যোগী হয়ে পদক্ষেপ নেওয়া (taking action in anticipation)",
    sentence: "I take a proactive approach to communication to keep clients informed.",
    date: new Date().toISOString().split('T')[0],
    reviewed: false
  },
  {
    id: 4,
    word: "Refactor",
    meaning: "বাহ্যিক আচরণ পরিবর্তন না করে কোডের অভ্যন্তরীণ মান উন্নত করা (restructure existing code)",
    sentence: "I refactored the legacy component to make it faster and easier to maintain.",
    date: new Date().toISOString().split('T')[0],
    reviewed: true
  }
];

export const INITIAL_ERROR_LOG = [
  {
    id: 1,
    date: new Date().toISOString().split('T')[0],
    week: 1,
    wrongSentence: "Yesterday I have completed the website header.",
    correctSentence: "Yesterday I completed the website header.",
    rule: "Specific past time indicator (Yesterday) takes Simple Past tense, not Present Perfect."
  },
  {
    id: 2,
    date: new Date().toISOString().split('T')[0],
    week: 1,
    wrongSentence: "He don't know how to configure WooCommerce tax.",
    correctSentence: "He doesn't know how to configure WooCommerce tax.",
    rule: "Third person singular subject (He) requires 'does not / doesn't', not 'don't'."
  }
];

export const INITIAL_PROGRESS_TRACKER = [
  {
    week: 1,
    newWords: 20,
    speakingMinutes: 75,
    completedDays: 5,
    repeatedMistakes: 2,
    notes: "Week 1 kickoff went great. Focused on Present and Past tenses."
  },
  {
    week: 2,
    newWords: 0,
    speakingMinutes: 0,
    completedDays: 0,
    repeatedMistakes: 0,
    notes: ""
  },
  {
    week: 3,
    newWords: 0,
    speakingMinutes: 0,
    completedDays: 0,
    repeatedMistakes: 0,
    notes: ""
  },
  {
    week: 4,
    newWords: 0,
    speakingMinutes: 0,
    completedDays: 0,
    repeatedMistakes: 0,
    notes: ""
  }
];

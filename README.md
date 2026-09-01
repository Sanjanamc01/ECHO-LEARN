EchoLearn
An AAC-Based Assistive Learning Platform for Autism and Down Syndrome

EchoLearn is a web-based assistive learning application designed to support children with speech and communication difficulties. The platform combines Augmentative and Alternative Communication (AAC) with pronunciation practice, helping children communicate using symbols while also improving their speech articulation.

Features
🗣️ AAC Communication Board
Symbol-based communication using pictorial tiles.
Allows children to construct sentences.
Text-to-Speech functionality for spoken output.
Child-friendly interface with simple navigation.
🎤 Pronunciation Practice
Allows children to practice words and sentences using speech input.
Evaluates pronunciation at the phoneme level.
Identifies pronunciation difficulties and provides targeted feedback.
Supports repeated practice for improved speech accuracy.
👄 Visual Articulation Guidance
Provides visual guidance for pronunciation.
Demonstrates mouth and lip positioning.
Uses SVG-based animations to make articulation learning interactive and engaging.
📊 Progress Tracking
Tracks pronunciation practice sessions.
Identifies weak phonemes and frequently mispronounced words.
Displays learning progress using interactive charts and analytics.
Tech Stack
Frontend
React.js
JavaScript
HTML5
CSS3
Web Speech API
MediaRecorder API
SVG Animation
Recharts
Backend
Node.js
Express.js
REST APIs
Database
MongoDB
Speech Assessment
Microsoft Azure Pronunciation Assessment API
System Workflow
The child logs into the application.
The child can communicate using the AAC symbol board.
Selected symbols are combined to form a sentence.
The system converts the sentence into speech using Text-to-Speech.
The child can access the pronunciation practice module.
The child's speech is recorded using the device microphone.
The speech is evaluated using Microsoft Azure Pronunciation Assessment.
The system provides pronunciation feedback and articulation guidance.
Practice results are stored for progress tracking.
Parents or caregivers can view the child's progress through analytics.
Key Objectives
Support communication through an AAC-based symbol board.
Provide pronunciation practice for children with speech difficulties.
Analyse speech at the phoneme level.
Provide visual articulation guidance.
Track pronunciation progress over time.
Create an accessible and child-friendly learning environment.
Target Users
Children with Autism Spectrum Disorder (ASD).
Children with Down Syndrome.
Children experiencing speech and communication difficulties.
Parents and caregivers.
Teachers and speech therapists.
Project Structure
EchoLearn/
│
├── client/                 # React Frontend
│   ├── components/
│   ├── pages/
│   └── assets/
│
├── server/                 # Node.js and Express Backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── middleware/
│
└── README.md
Future Enhancements
Support for multiple languages.
Personalized pronunciation exercises.
Advanced AI-based speech analysis.
Gamification and reward-based learning.
Enhanced therapist and parent dashboards.
Mobile application support.
Author

Sanjana M C

License

This project is developed for educational and research purposes.

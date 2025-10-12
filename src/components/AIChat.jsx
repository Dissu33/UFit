import React, { useState, useEffect, useCallback } from 'react';

// Array of health-related prompt messages
const PROMPTS = [
  "Ask me how's your day!",
  "Need a quick fitness tip?",
  "Want to create a diet plan?",
  "Curious about your BMI score?",
  "Let's talk about supplements!",
  "Need motivation for your workout?",
  "Ask me about UFit products!",
];

// Time settings
const POPUP_DELAY_MS = 5000; // 25 seconds
const DISPLAY_DURATION_MS = 6000; // Display for 6 seconds

function AIChat() {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState(PROMPTS[0]);
  const [promptIndex, setPromptIndex] = useState(0);

  // Function to show the prompt
  const showPrompt = useCallback(() => {
    // Cycle to the next message
    const nextIndex = (promptIndex + 1) % PROMPTS.length;
    setMessage(PROMPTS[nextIndex]);
    setPromptIndex(nextIndex);

    // Show the notification bubble
    setIsVisible(true);

    // Hide the notification after DISPLAY_DURATION_MS
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, DISPLAY_DURATION_MS);

    return hideTimer;
  }, [promptIndex]);

  useEffect(() => {
    let intervalTimer;
    let hideTimer;

    // Start the recurring interval
    const startInterval = () => {
      // Clear any existing timer to prevent multiple timers running
      if (intervalTimer) clearInterval(intervalTimer);

      intervalTimer = setInterval(() => {
        // Clear the previous hide timer before showing a new prompt
        if (hideTimer) clearTimeout(hideTimer);
        
        hideTimer = showPrompt();
      }, POPUP_DELAY_MS);
    };

    // Start the main loop
    startInterval();

    // Cleanup function: Clear the interval and any running hide timer when the component unmounts
    return () => {
      if (intervalTimer) clearInterval(intervalTimer);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [showPrompt]); // Dependency on showPrompt ensures the index state is used correctly

  // Functionality for when the user clicks the chat button
  const handleClick = () => {
    // In a real app, this would open the chat window/modal
    console.log("AI Chat button clicked. Opening chat interface...");
    setIsVisible(false); // Hide the prompt once the user interacts
    alert("Chat feature is under development! Ready to assist soon.");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Dynamic Prompt Bubble */}
      {isVisible && (
        <div 
          className="absolute bottom-full right-0 mb-3 p-3 w-max max-w-xs bg-indigo-600 text-white text-sm rounded-xl shadow-lg cursor-pointer transform transition duration-300 ease-in-out hover:scale-[1.05]"
          onClick={handleClick}
        >
          {message}
          <div className="absolute right-3 bottom-[-5px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-indigo-600 transform rotate-180"></div>
        </div>
      )}

      {/* Main AI Chat Icon */}
      <button 
        onClick={handleClick} 
        className={`w-14 h-14 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-xl transition-all duration-300 ease-in-out 
          ${isVisible ? 'ring-4 ring-indigo-300 animate-pulse' : 'hover:bg-indigo-600'}`}
        aria-label="Open AI Chat"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 4v-4z" />
        </svg>
      </button>
    </div>
  );
}

export default AIChat;
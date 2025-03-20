import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bot,
  Send,
  Sparkles,
  User,
  Smile,
  Frown,
  Meh,
  ThumbsUp,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
  emotion?: "happy" | "sad" | "neutral" | "excited" | "confused";
}

interface ChatbotAssistantProps {
  userName?: string;
}

export default function ChatbotAssistant({
  userName = "User",
}: ChatbotAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi there! I'm your Smart Kitchen Robot Assistant. I noticed you have spinach and chicken that will expire soon. Would you like me to suggest some recipes to use these ingredients?",
      sender: "assistant",
      timestamp: new Date(),
      emotion: "excited",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userInput: string): Message => {
    const lowerInput = userInput.toLowerCase();
    let response = "";
    let emotion: Message["emotion"] = "neutral";

    if (
      lowerInput.includes("recipe") ||
      lowerInput.includes("meal") ||
      lowerInput.includes("cook")
    ) {
      response =
        "Based on what's in your pantry, I'd recommend trying a Spinach and Feta Stuffed Chicken Breast! You have all the ingredients needed. I've added the recipe to your meal suggestions. Would you like to see it now?";
      emotion = "excited";
    } else if (
      lowerInput.includes("expiring") ||
      lowerInput.includes("expire")
    ) {
      response =
        "I've been monitoring your pantry! You have spinach and chicken breast that will expire in the next 3 days. I've created a special meal plan to use these ingredients. Would you like to see it?";
      emotion = "confused";
    } else if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
      response = `Hello ${userName}! I'm your kitchen robot assistant. I can help with meal planning, pantry management, and cooking tips. What would you like help with today?`;
      emotion = "happy";
    } else if (lowerInput.includes("thank")) {
      response =
        "You're welcome! I'm always here to help make your kitchen experience more enjoyable. Is there anything else you'd like assistance with?";
      emotion = "happy";
    } else if (
      lowerInput.includes("notification") ||
      lowerInput.includes("alert")
    ) {
      response =
        "I have 3 notifications for you: 1) Spinach expires in 2 days, 2) Chicken breast expires in 3 days, and 3) You're running low on milk. Would you like me to suggest recipes or add these to your shopping list?";
      emotion = "excited";
    } else {
      response =
        "I'm your kitchen robot assistant! I can help with recipes, meal planning, pantry organization, or nutritional information. I also monitor your food expiration dates and suggest ways to reduce waste!";
      emotion = "neutral";
    }

    return {
      id: Date.now().toString(),
      content: response,
      sender: "assistant",
      timestamp: new Date(),
      emotion,
    };
  };

  const getEmotionIcon = (emotion?: Message["emotion"]) => {
    switch (emotion) {
      case "happy":
        return <Smile className="h-5 w-5 text-green-500" />;
      case "sad":
        return <Frown className="h-5 w-5 text-blue-500" />;
      case "excited":
        return <Sparkles className="h-5 w-5 text-purple-500" />;
      case "confused":
        return <Meh className="h-5 w-5 text-amber-500" />;
      default:
        return <Bot className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Card
      className="w-full h-[min(500px,70vh)] flex flex-col bg-white"
      data-chatbot-assistant
    >
      <CardHeader className="border-b pb-3">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-purple-600" />
          Smart Kitchen Robot
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex items-start gap-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}
              >
                <Avatar
                  className={`h-8 w-8 ${message.sender === "user" ? "bg-blue-500" : "bg-purple-500"}`}
                >
                  <AvatarFallback>
                    {message.sender === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      getEmotionIcon(message.emotion)
                    )}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 max-w-[calc(100%-40px)] break-words ${message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"}`}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start gap-2 max-w-[80%]">
                <Avatar className="h-8 w-8 bg-purple-500">
                  <AvatarFallback>
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="rounded-lg px-3 py-2 bg-gray-100 text-gray-800">
                  <span className="inline-block animate-pulse">Typing</span>
                  <span className="inline-block animate-pulse delay-100">
                    .
                  </span>
                  <span className="inline-block animate-pulse delay-200">
                    .
                  </span>
                  <span className="inline-block animate-pulse delay-300">
                    .
                  </span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="border-t p-3">
        <div className="flex w-full items-center gap-2">
          <Input
            placeholder="Ask about recipes, meal ideas, or pantry management..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-grow"
          />
          <Button
            onClick={handleSendMessage}
            size="icon"
            className="h-10 w-10 rounded-full bg-purple-600 hover:bg-purple-700"
            data-send-message
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

"use client";
// import Link from "next/link";
import React, { useState, useRef, useEffect, useContext } from "react";
import { AllContext } from "./all-context";
import Recommend from "../recommend/page";
import { getRecommend } from "../(HyperClovaX)/hyperclova";
import styles from './Filter.module.css';
import Navigation from "../nvaigation";
export default function Filter() {
  const { location } = useContext(AllContext);
  const [assistantMessage, setAssistantMessage] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [showRecommend, setShowRecommend] = useState(false);  
  const [recommend, setRecommend] = useState(null)

  const inputRef = useRef();
  useEffect(() => {
    async function getPrompt(message) {
      try {
        const response = await fetch("http://localhost:5500/filter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message,
            userMessage: userMessage,
            assistantMessage: assistantMessage,
          }),
        });
        const data = await response.json();
        setAssistantMessage(data.assistant);
        // console.log (assistantMessage)
        if(assistantMessage !== "") {
        const recommend = await getRecommend(assistantMessage);
        setRecommend(recommend);
        setShowRecommend(true);}
      } catch (error) {
        console.error(error);
      }
    }
    getPrompt(userMessage);
    
  }, [userMessage]);
  if (showRecommend) {
    
    return <Recommend recommend={recommend} />;
  }

  async function sendMessage() {
    const message = inputRef.current.value.trim();

    //   userMessage메세지 추가
    
    if (message !== "") {
      setUserMessage(message);
      inputRef.current.value = "";
     }
  }

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };
  return (
    <div className={styles.container}>
      <Navigation/>
         <h1 className={styles.title}></h1>
        <div className="chat-body"></div>
        <div className={styles.container}>
          <input
          className={styles.input} 
            type="text"
            placeholder="어떤 음식이 끌리시나요? ex: 매콤한 음식, 아무거나..."
            ref={inputRef}
            onKeyDown={handleKeyDown}
          />
            <button
            className={styles.button}
              onClick={() => {
                sendMessage();
              }}
            >
              전송
            </button>
        </div>
      </div>
  );
}

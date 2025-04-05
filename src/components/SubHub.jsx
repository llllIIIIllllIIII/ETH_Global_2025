import React, { useState } from "react";
import "./SubHub.css";
import { writeContract, waitForTransactionReceipt } from '@wagmi/core';
import { config } from '../../config'; // 你的 wagmi config

const NFT_CONTRACT = '0xYourContractAddress';
const categories = ["AI Tool", "App", "Community"];

const sampleServices = [
  {
    name: "ChatGPT Pro",
    price: "$20/mo",
    category: "AI Tool",
    description: "Access to GPT-4, faster responses, and priority access.",
    img: "https://pbs.twimg.com/profile_images/1885410181409820672/ztsaR0JW_400x400.jpg",
  },
  {
    name: "Claude Pro",
    price: "$20/mo",
    category: "AI Tool",
    description: "Anthropic's conversational AI with high-quality natural language understanding.",
    img: "https://zorgle.co.uk/wp-content/uploads/2024/11/Claude-ai-logo.png",
  },
  {
    name: "Perplexity Pro",
    price: "$20/mo",
    category: "AI Tool",
    description: "AI-powered search engine with citations and real-time browsing.",
    img: "https://pbs.twimg.com/profile_images/1886515713537413120/kj5NsIXW_400x400.jpg",
  },
  {
    name: "Cursor",
    price: "$20/mo",
    category: "AI Tool",
    description: "AI coding assistant built into a collaborative IDE. Supports pair programming.",
    img: "https://pbs.twimg.com/profile_images/1794806483219337216/9vW73mux_400x400.jpg",
  },
  {
    name: "Disney+",
    price: "$7.99/mo",
    category: "App",
    description: "Stream Disney, Marvel, Pixar, Star Wars, and more.",
    img: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg",
  },
  {
    name: "Notion AI",
    price: "$10/mo",
    category: "AI Tool",
    description: "Generate content, summarize notes, and automate tasks.",
    img: "https://pbs.twimg.com/profile_images/1903224093476077568/OCclsw4c_400x400.jpg",
  },
  {
    name: "Figma Plus",
    price: "$15/mo",
    category: "App",
    description: "Advanced prototyping and collaborative tools in Figma.",
    img: "https://pbs.twimg.com/profile_images/1907792113573515265/dyEphxPo_400x400.jpg",
  },
  {
    name: "DeFi Dashboard",
    price: "$12/mo",
    category: "Strategy",
    description: "Track DeFi investments across multiple chains.",
    img: "https://pbs.twimg.com/profile_images/1885410181409820672/ztsaR0JW_400x400.jpg",
  },
  {
    name: "Web3 Discord",
    price: "$5/mo",
    category: "Community",
    description: "Exclusive access to Web3 discussion groups.",
    img: "https://pbs.twimg.com/profile_images/1885410181409820672/ztsaR0JW_400x400.jpg",
  },
  {
    name: "Netflix",
    price: "$20/mo",
    category: "App",
    description: "Unlimited streaming of movies and shows.",
    img: "https://pbs.twimg.com/profile_images/1886652419028955136/rQ9l8-TF_400x400.jpg",
  },
];



export default function SubHub() {
  const [selectedCategory, setSelectedCategory] = useState("AI Tool");
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [subscribedList, setSubscribedList] = useState(["ChatGPT Pro"]);

  const isSubscribed = (serviceName) => subscribedList.includes(serviceName);

  const filtered = sampleServices.filter(
    (s) => s.category === selectedCategory
  );

  const handleSubscribe = async (service) => {
    try {
      const priceEth = parseFloat(service.price.replace(/[^0-9.]/g, ""));
  
      const tx = await writeContract(config, {
        address: NFT_CONTRACT,
        abi: SUB_NFT_ABI,
        functionName: 'subscribe',
        args: [service.name],
        value: parseEther(priceEth.toString()), // 若以 ETH 付款
      });
  
      const receipt = await waitForTransactionReceipt(config, { hash: tx.hash });
  
      if (receipt.status === 'success') {
        alert(`✅ Subscribed to ${service.name}! NFT minted.`);
        // 可觸發 setState 顯示 NFT 卡片 or fetch tokenId
      }
    } catch (err) {
      console.error("❌ Subscription failed:", err);
      alert("❌ Subscription failed or cancelled.");
    }
  };
  
  return (
    <div className="subhub-container">
      <div className="category-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${
              selectedCategory === cat ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="card-grid">
        {filtered.map((service, idx) => (
          <div
            className="card"
            key={idx}
            onClick={() => {
              setSelectedService(service);
              setShowModal(true);
            }}
          >

            <div className="card-img">
              <img className="applogo" src={service.img} alt="Subscription Service" />
            </div>
            <div className="card-name">{service.name}</div>
            <div className="card-price">
              {isSubscribed(service.name) ? "✅ Subscribed" : service.price}
            </div>

          </div>
        ))}
      </div>
      {showModal && selectedService && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>

          <div className="modal" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={() => setShowModal(false)}>×</button>

            <div className="modal-logo">
              <img className="applogo" src={selectedService.img} alt={selectedService.name} />
            </div>

            <h2 className="modal-title">{selectedService.name}</h2>
            <p className="modal-desc">{selectedService.description}</p>

            <div className="modal-footer">
              {isSubscribed(selectedService.name) ? (
                <div className="subscribe-btn subscribed">✅ Subscribed</div>
              ) : (
                <div className="subscribe-btn"  onClick={() => handleSubscribe(selectedService)}>Subscribe {selectedService.price}</div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

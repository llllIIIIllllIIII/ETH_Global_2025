import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import Wallet from "./Wallet";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const goToSettings = () => {
    navigate("/settings");
    setMenuOpen(false); // 收起選單
  };
  const goToProfile = () => {
    navigate("/profile");
    setMenuOpen(false); // 收起選單
  };
  const goToSubscriptionManager = () => {
    navigate("/SubscriptionManager");
    setMenuOpen(false); // 收起選單
  }

  return (
    <header className="header">
      <div className="header-left">
      <h1 className="logo" onClick={() => navigate("/")}>🤖 TokenPass</h1>
      </div>
      <div className="header-right">
        <Wallet />
        <div className="setting-btn" onClick={toggleMenu}>
          ☰
          {menuOpen && (
            <div className="dropdown-menu">
              <div className="menu-item" onClick={goToProfile}>👤 Profile</div>
              <div className="menu-item" onClick={goToSubscriptionManager}>🔧 Manage</div>
              <div className="menu-item" onClick={goToSettings}>⚙️ Settings</div>

            </div>
          )}
        </div>
      </div>
    </header>
  );
}

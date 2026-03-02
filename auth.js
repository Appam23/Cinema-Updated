// auth.js - Handles login/signup modal logic
import { showModal, hideModal } from "./shared.js";

// Simple modal logic for login/signup with persistent login state
const modal = document.getElementById('auth-modal');
const form = document.getElementById('auth-form');
const loginBtn = document.getElementById('login-btn');
const message = document.getElementById('auth-message');
let isSignup = false;

// showModal and hideModal are now imported from shared.js

// Check login state on load
if (localStorage.getItem('cinema_logged_in') === 'true') {
  hideModal(modal);
} else {
  showModal(modal);
}

// Logout button logic

function setupLogoutButton() {
  try {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.onclick = function() {
        localStorage.removeItem('cinema_logged_in');
        showModal(modal);
      };
    }
  } catch (e) {
    // Suppress errors if element is missing
  }
}


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupLogoutButton);
} else {
  setupLogoutButton();
}


if (form) {
  form.onsubmit = function(e) {
    e.preventDefault();
    // Demo: accept any non-empty credentials
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();
    if (user && pass) {
      localStorage.setItem('cinema_logged_in', 'true');
      hideModal(modal);
    } else {
      message.textContent = 'Please enter username and password.';
    }
  };
}

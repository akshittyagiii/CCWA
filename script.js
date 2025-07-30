// ----- All variable references -----
const landingPage = document.getElementById('landingPage');
const loginContainer = document.getElementById('loginContainer');
const signupContainer = document.getElementById('signupContainer');
const chatRedirectContainer = document.getElementById('chatRedirectContainer');
const dashboard = document.getElementById('dashboard');

const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const closeLoginBtn = document.getElementById('closeLoginBtn');
const closeSignupBtn = document.getElementById('closeSignupBtn');

const chatNavBtn = document.getElementById('chatNavBtn');
const launchChatBtn = document.getElementById('launchChatBtn');
const cancelChatBtn = document.getElementById('cancelChatBtn');

const notificationBtn = document.getElementById('notificationBtn');
const notificationDropdown = document.getElementById('notificationDropdown');
const profileBtn = document.getElementById('profileBtn');
const profileDropdown = document.getElementById('profileDropdown');
const notesNavBtn = document.getElementById('notesNavBtn');
const profileViewBtn = document.getElementById('profileViewBtn');
const settingsBtn = document.getElementById('settingsBtn');
const logoutBtn = document.getElementById('logoutBtn');

const messageModal = document.getElementById('messageModal');
const modalMessage = document.getElementById('modalMessage');
const closeModalButton = document.getElementById('closeModalButton');

const cometchatContainer = document.getElementById('cometchatContainer');

let currentFullPageSection = landingPage;

// ----- Modal Logic -----
function showModal(message) {
  modalMessage.textContent = message;
  messageModal.classList.add('show');
}
function hideModal() {
  messageModal.classList.remove('show');
}
closeModalButton.addEventListener('click', hideModal);
messageModal.addEventListener('click', (event) => {
  if (event.target === messageModal) hideModal();
});

// ----- Show/Hide Sections -----
function showSection(targetElement, isModal = false) {
  [loginContainer, signupContainer, chatRedirectContainer].forEach(container => {
    if (container !== targetElement) {
      container.classList.remove('show');
      setTimeout(() => container.classList.add('hidden'), 300);
    }
  });
  if (isModal) {
    if (currentFullPageSection) {
      currentFullPageSection.classList.remove('show');
      setTimeout(() => currentFullPageSection.classList.add('hidden'), 300);
    }
    targetElement.classList.remove('hidden');
    setTimeout(() => targetElement.classList.add('show'), 10);
  } else {
    [loginContainer, signupContainer, chatRedirectContainer].forEach(container => {
      container.classList.remove('show');
      setTimeout(() => container.classList.add('hidden'), 300);
    });
    if (currentFullPageSection && currentFullPageSection !== targetElement) {
      currentFullPageSection.classList.remove('show');
      setTimeout(() => currentFullPageSection.classList.add('hidden'), 300);
    }
    targetElement.classList.remove('hidden');
    targetElement.classList.add('show');
    currentFullPageSection = targetElement;
  }
}
function toggleDropdown(dropdownElement) {
  dropdownElement.classList.toggle('show');
}

// ----- Landing/Auth -----
loginBtn.addEventListener('click', () => showSection(loginContainer, true));
signupBtn.addEventListener('click', () => showSection(signupContainer, true));
closeLoginBtn.addEventListener('click', () => showSection(landingPage));
closeSignupBtn.addEventListener('click', () => showSection(landingPage));

// ----- Login/Signup demo logic -----
loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  showModal('Login successful! Redirecting to dashboard...');
  setTimeout(() => {
    hideModal();
    showSection(dashboard);
  }, 1500);
});
signupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  showModal('Account created successfully! Redirecting to dashboard...');
  setTimeout(() => {
    hideModal();
    showSection(dashboard);
  }, 1500);
});

// ----- Dashboard Navigation -----
chatNavBtn.addEventListener('click', () => {
  showSection(chatRedirectContainer, true);
});
notesNavBtn.addEventListener('click', () => showModal('Notes section coming soon!'));
notificationBtn.addEventListener('click', () => {
  toggleDropdown(notificationDropdown);
  if (profileDropdown.classList.contains('show')) profileDropdown.classList.remove('show');
});
profileBtn.addEventListener('click', () => {
  toggleDropdown(profileDropdown);
  if (notificationDropdown.classList.contains('show')) notificationDropdown.classList.remove('show');
});
document.addEventListener('click', (event) => {
  if (!notificationBtn.contains(event.target) && !notificationDropdown.contains(event.target)) {
    notificationDropdown.classList.remove('show');
  }
  if (!profileBtn.contains(event.target) && !profileDropdown.contains(event.target)) {
    profileDropdown.classList.remove('show');
  }
});

// ----- Chat Launch (CometChat Integration) -----
launchChatBtn.addEventListener('click', () => {
  hideModal();
  chatRedirectContainer.classList.remove('show');
  setTimeout(() => {
    chatRedirectContainer.classList.add('hidden');
    showSection(dashboard, false);
    cometchatContainer.style.display = "flex";
    cometchatContainer.scrollIntoView({ behavior: "smooth" });
    setTimeout(initCometChatWidget, 300);
  }, 300);
});

// Hide CometChat when cancelling
cancelChatBtn.addEventListener('click', () => {
  showSection(dashboard);
});

// ----- Profile Dropdown Actions -----
profileViewBtn.addEventListener('click', () => {
  hideModal();
  showModal('Viewing Profile...');
  profileDropdown.classList.remove('show');
});
settingsBtn.addEventListener('click', () => {
  hideModal();
  showModal('Accessing Settings...');
  profileDropdown.classList.remove('show');
});
logoutBtn.addEventListener('click', () => {
  hideModal();
  showModal('Logging out...');
  profileDropdown.classList.remove('show');
  setTimeout(() => {
    hideModal();
    cometchatContainer.style.display = 'none';
    showSection(landingPage);
  }, 1000);
});

// ----- DOMContentLoaded: Hide All, Show Landing -----
document.addEventListener('DOMContentLoaded', () => {
  [loginContainer, signupContainer, chatRedirectContainer, dashboard].forEach(el => el.classList.add('hidden'));
  landingPage.classList.remove('hidden');
  landingPage.classList.add('show');
  currentFullPageSection = landingPage;
  cometchatContainer.style.display = 'none';
});

// ----- CometChat Widget Integration -----
let cometChatInitialized = false;

function initCometChatWidget() {
  if (cometChatInitialized) return;
  cometChatInitialized = true;

  // Your CometChat credentials -- replace with your own!
  const APP_ID = "2788204a33a76b64";
  const APP_REGION = "IN";
  const AUTH_KEY = "c44863a0e5baecb17faaabc83ba21b9905837b4e";
  const UID = "superhero1";
  const WIDGET_ID = "0646f91b-4237-4d5d-a214-3529a9600628";

  if (!window.CometChatWidget) {
    showModal("CometChat script not loaded.");
    return;
  }

  CometChatWidget.init({
    appID: APP_ID,
    appRegion: APP_REGION,
    authKey: AUTH_KEY
  }).then(() => {
    return CometChatWidget.login({ uid: UID });
  }).then(() => {
    CometChatWidget.launch({
      widgetID: WIDGET_ID,
      target: "#cometchat",
      roundedCorners: "true",
      height: "600px",
      width: "800px",
      defaultID: UID,
      defaultType: 'user'
    });
  }).catch(error => {
    showModal("CometChat error: " + (error.message || error));
  });
}
// In your script.js, add this line:
document.getElementById('notesNavBtn').addEventListener('click', () => {
    window.location.href = 'notes.html'; 
});
// script.js: line 44
document.getElementById('loginBtn').addEventListener('click', () => {
  // some code here
});
const loginButton = document.getElementById('loginBtn');

if (loginButton) { // This check prevents the error
  loginButton.addEventListener('click', () => {
    // some code here
  });
}

// ----- Existing Code -----
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const showSignupLink = document.getElementById('showSignup');
    const showLoginLink = document.getElementById('showLogin');

    // --- NEW CODE to check URL on page load ---
    document.addEventListener('DOMContentLoaded', () => {
        const params = new URLSearchParams(window.location.search);
        const formToShow = params.get('form');

        if (formToShow === 'signup') {
            loginForm.classList.add('hidden');
            signupForm.classList.remove('hidden');
        } else {
            // By default, show the login form
            loginForm.classList.remove('hidden');
            signupForm.classList.add('hidden');
        }
    });
    // --- End of new code ---

    // This is the existing code for toggling when links are clicked
    showSignupLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });
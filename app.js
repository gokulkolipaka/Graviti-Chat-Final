// Always-Available WhatsApp-like Chat Application - NAVIGATION FIXED
class AlwaysAvailableChatApp {
    constructor() {
        this.FORCE_ENABLED = true;
        this.currentUser = null;
        this.currentChat = null;
        this.users = [];
        this.groups = [];
        this.messages = [];
        this.companySettings = {
            name: "TechCorp Inc.",
            logo: null,
            appEnabled: true,
            description: "Always-Available Enterprise Chat"
        };
        
        this.emergencyInit();
    }

    emergencyInit() {
        console.log('🚀 Starting emergency initialization...');
        
        // Force hide all modals and disabled screen
        this.forceHideAllModals();
        this.forceHideDisabledScreen();
        this.forceShowLoginScreen();
        this.clearProblematicStorage();
        this.safeInit();
    }

    forceHideAllModals() {
        const modalIds = ['settingsModal', 'newGroupModal', 'addUserModal', 'disableAppModal', 'appDisabledScreen'];
        modalIds.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'none';
                modal.style.visibility = 'hidden';
                modal.classList.add('hidden');
            }
        });
        
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
            modal.style.visibility = 'hidden';
            modal.classList.add('hidden');
        });
    }

    forceHideDisabledScreen() {
        const disabledScreen = document.getElementById('appDisabledScreen');
        if (disabledScreen) {
            disabledScreen.style.display = 'none';
            disabledScreen.style.visibility = 'hidden';
            disabledScreen.classList.add('hidden');
        }
    }

    forceShowLoginScreen() {
        const loginScreen = document.getElementById('loginScreen');
        const chatApp = document.getElementById('chatApp');
        
        if (loginScreen) {
            loginScreen.style.display = 'flex';
            loginScreen.style.visibility = 'visible';
            loginScreen.classList.remove('hidden');
        }
        
        if (chatApp) {
            chatApp.style.display = 'none';
            chatApp.style.visibility = 'hidden';
            chatApp.classList.add('hidden');
        }
    }

    clearProblematicStorage() {
        try {
            const keysToCheck = ['chatApp_settings', 'chatApp_state'];
            keysToCheck.forEach(key => {
                const stored = localStorage.getItem(key);
                if (stored) {
                    try {
                        const data = JSON.parse(stored);
                        if (data.appEnabled === false || data.disableUntil || data.showModal) {
                            localStorage.removeItem(key);
                        }
                    } catch (e) {
                        localStorage.removeItem(key);
                    }
                }
            });
        } catch (e) {
            console.warn('Error clearing storage:', e);
        }
    }

    safeInit() {
        try {
            this.loadData();
            this.setupEventListeners();
            this.updateCompanyBranding();
            this.startRealTimeUpdates();
            
            setTimeout(() => {
                this.showWelcomeNotification();
            }, 1000);
            
            console.log('✅ Chat app initialized successfully');
        } catch (error) {
            console.error('Error during initialization:', error);
            this.emergencyRecovery();
        }
    }

    emergencyRecovery() {
        console.log('🚨 Running emergency recovery...');
        this.forceHideAllModals();
        this.forceShowLoginScreen();
    }

    loadData() {
        // Default users
        this.users = [
            {id: 1, name: "John Admin", phone: "+1234567890", role: "admin", status: "online", avatar: "👨‍💼", lastSeen: new Date().toISOString()},
            {id: 2, name: "Sarah Manager", phone: "+1234567891", role: "user", status: "online", avatar: "👩‍💼", lastSeen: new Date().toISOString()},
            {id: 3, name: "Mike Developer", phone: "+1234567892", role: "user", status: "away", avatar: "👨‍💻", lastSeen: new Date().toISOString()},
            {id: 4, name: "Lisa Designer", phone: "+1234567893", role: "user", status: "online", avatar: "👩‍🎨", lastSeen: new Date().toISOString()},
            {id: 5, name: "Tom Support", phone: "+1234567894", role: "user", status: "offline", avatar: "👨‍🔧", lastSeen: new Date(Date.now() - 3600000).toISOString()}
        ];

        // Load from storage with fallback
        try {
            const savedUsers = localStorage.getItem('chatApp_users');
            if (savedUsers) this.users = JSON.parse(savedUsers);
        } catch (e) {
            console.warn('Using default users');
        }

        // Default messages
        this.messages = [
            {id: 1, senderId: 2, receiverId: 1, content: "Good morning John! Ready for today's demo? 🌟", timestamp: new Date(Date.now() - 300000).toISOString(), type: "text"},
            {id: 2, senderId: 1, receiverId: 2, content: "Absolutely Sarah! The new features are looking great 👍", timestamp: new Date(Date.now() - 240000).toISOString(), type: "text"},
            {id: 3, senderId: 3, receiverId: 1, content: "Latest build is ready for testing @John Admin", timestamp: new Date(Date.now() - 180000).toISOString(), type: "text"},
            {id: 4, senderId: 4, groupId: 1, content: "Updated the design assets in the shared folder 🎨", timestamp: new Date(Date.now() - 120000).toISOString(), type: "text"},
            {id: 5, senderId: 1, groupId: 1, content: "Excellent work everyone! This release is going to be amazing 🚀", timestamp: new Date(Date.now() - 60000).toISOString(), type: "text"}
        ];

        try {
            const savedMessages = localStorage.getItem('chatApp_messages');
            if (savedMessages) this.messages = JSON.parse(savedMessages);
        } catch (e) {
            console.warn('Using default messages');
        }

        // Default groups
        this.groups = [
            {id: 1, name: "Development Team", members: [1, 3, 4], admin: 1, avatar: "👥", description: "Main development team discussions"},
            {id: 2, name: "Management", members: [1, 2], admin: 1, avatar: "🏢", description: "Management coordination"}
        ];

        try {
            const savedGroups = localStorage.getItem('chatApp_groups');
            if (savedGroups) this.groups = JSON.parse(savedGroups);
        } catch (e) {
            console.warn('Using default groups');
        }

        // Load safe company settings only
        try {
            const savedSettings = localStorage.getItem('chatApp_settings');
            if (savedSettings) {
                const settings = JSON.parse(savedSettings);
                this.companySettings.name = settings.name || this.companySettings.name;
                this.companySettings.logo = settings.logo || this.companySettings.logo;
            }
        } catch (e) {
            console.warn('Using default company settings');
        }
    }

    saveData() {
        try {
            localStorage.setItem('chatApp_users', JSON.stringify(this.users));
            localStorage.setItem('chatApp_messages', JSON.stringify(this.messages));
            localStorage.setItem('chatApp_groups', JSON.stringify(this.groups));
            
            const safeSettings = {
                name: this.companySettings.name,
                logo: this.companySettings.logo,
                appEnabled: true,
                description: this.companySettings.description
            };
            localStorage.setItem('chatApp_settings', JSON.stringify(safeSettings));
        } catch (e) {
            console.warn('Error saving data:', e);
        }
    }

    setupEventListeners() {
        // Login form - FIXED navigation
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        // Logout
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }

        // Settings
        const settingsBtn = document.getElementById('settingsBtn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => this.showSettings());
        }

        // Message handling
        const messageInput = document.getElementById('messageInput');
        if (messageInput) {
            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
            
            messageInput.addEventListener('input', function() {
                this.style.height = 'auto';
                this.style.height = Math.min(this.scrollHeight, 120) + 'px';
            });
        }

        const sendBtn = document.getElementById('sendBtn');
        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.sendMessage());
        }

        // Emoji picker
        const emojiBtn = document.getElementById('emojiBtn');
        if (emojiBtn) {
            emojiBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleEmojiPicker();
            });
        }

        // File upload
        const attachBtn = document.getElementById('attachBtn');
        if (attachBtn) {
            attachBtn.addEventListener('click', () => {
                document.getElementById('fileInput').click();
            });
        }

        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                this.handleFileUpload(e.target.files);
            });
        }

        // Search
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterContacts(e.target.value);
            });
        }

        // Group and user management
        const newGroupBtn = document.getElementById('newGroupBtn');
        if (newGroupBtn) {
            newGroupBtn.addEventListener('click', () => this.showNewGroupModal());
        }

        // Chat info
        const chatInfoBtn = document.getElementById('chatInfoBtn');
        if (chatInfoBtn) {
            chatInfoBtn.addEventListener('click', () => this.toggleChatInfo());
        }

        // Modal handlers
        this.setupModalCloseHandlers();
        this.setupGlobalHandlers();
    }

    setupModalCloseHandlers() {
        // Close buttons
        const closeButtons = [
            {id: 'closeSettings', modal: 'settingsModal'},
            {id: 'closeNewGroup', modal: 'newGroupModal'},
            {id: 'closeAddUser', modal: 'addUserModal'},
            {id: 'closeChatInfo', action: 'hideChatInfo'}
        ];

        closeButtons.forEach(({id, modal, action}) => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (modal) {
                        this.hideModal(modal);
                    } else if (action === 'hideChatInfo') {
                        this.hideChatInfo();
                    }
                });
            }
        });

        // Action buttons
        const saveSettings = document.getElementById('saveSettings');
        if (saveSettings) {
            saveSettings.addEventListener('click', () => this.saveSettings());
        }

        const createGroupBtn = document.getElementById('createGroupBtn');
        if (createGroupBtn) {
            createGroupBtn.addEventListener('click', () => this.createGroup());
        }

        const addUserBtn = document.getElementById('addUserBtn');
        if (addUserBtn) {
            addUserBtn.addEventListener('click', () => this.addUser());
        }

        // Admin controls
        const forceEnableBtn = document.getElementById('forceEnableBtn');
        if (forceEnableBtn) {
            forceEnableBtn.addEventListener('click', () => {
                this.showNotification('Always Enabled', 'App is always enabled in this version', 'success');
            });
        }

        const clearDataBtn = document.getElementById('clearDataBtn');
        if (clearDataBtn) {
            clearDataBtn.addEventListener('click', () => {
                if (confirm('Clear all data and restart fresh?')) {
                    this.clearAllDataAndRestart();
                }
            });
        }
    }

    setupGlobalHandlers() {
        // Emoji picker items
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('emoji-item')) {
                this.insertEmoji(e.target.textContent);
            }
        });

        // Close modals on outside click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.hideModal(e.target.id);
            }
        });

        // Close emoji picker when clicking outside
        document.addEventListener('click', (e) => {
            const emojiPicker = document.getElementById('emojiPicker');
            const emojiButton = document.getElementById('emojiBtn');
            
            if (emojiPicker && emojiButton && !emojiPicker.contains(e.target) && e.target !== emojiButton) {
                emojiPicker.classList.add('hidden');
            }
        });

        // Company logo upload
        const logoInput = document.getElementById('companyLogoInput');
        if (logoInput) {
            logoInput.addEventListener('change', (e) => {
                this.handleLogoUpload(e.target.files[0]);
            });
        }

        // Escape key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    closeAllModals() {
        const modalIds = ['settingsModal', 'newGroupModal', 'addUserModal'];
        modalIds.forEach(modalId => {
            this.hideModal(modalId);
        });
        this.hideChatInfo();
        
        const emojiPicker = document.getElementById('emojiPicker');
        if (emojiPicker) {
            emojiPicker.classList.add('hidden');
        }
    }

    showWelcomeNotification() {
        this.showNotification(
            'Welcome to TechCorp Chat! 🚀', 
            'Always-available enterprise messaging. Use demo accounts to test features.', 
            'success'
        );
    }

    updateCompanyBranding() {
        const elements = ['companyName', 'headerCompanyName', 'welcomeCompanyName'];
        elements.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = this.companySettings.name;
            }
        });

        if (this.companySettings.logo) {
            const logoElements = document.querySelectorAll('.company-icon');
            logoElements.forEach(el => {
                el.innerHTML = `<img src="${this.companySettings.logo}" alt="${this.companySettings.name}" style="max-width: 100%; max-height: 100%; object-fit: contain;">`;
            });
        }
    }

    handleLogin() {
        const phoneNumber = document.getElementById('phoneNumber').value.trim();
        
        if (!phoneNumber) {
            this.showError('Please enter a phone number');
            return;
        }
        
        const user = this.users.find(u => u.phone === phoneNumber);

        if (user) {
            this.currentUser = user;
            
            // FIXED: Proper navigation to chat app
            console.log('✅ Login successful, transitioning to chat app...');
            this.transitionToChatApp();
            
            user.status = 'online';
            user.lastSeen = new Date().toISOString();
            this.saveData();
        } else {
            this.showError('Phone number not found. Try one of the demo accounts below.');
        }
    }

    // FIXED: New method for reliable screen transition
    transitionToChatApp() {
        const loginScreen = document.getElementById('loginScreen');
        const chatApp = document.getElementById('chatApp');
        
        console.log('Transitioning screens...');
        
        // Hide login screen
        if (loginScreen) {
            loginScreen.style.display = 'none';
            loginScreen.style.visibility = 'hidden';
            loginScreen.classList.add('hidden');
            console.log('✅ Login screen hidden');
        }
        
        // Show chat app
        if (chatApp) {
            chatApp.style.display = 'flex';
            chatApp.style.visibility = 'visible';
            chatApp.classList.remove('hidden');
            console.log('✅ Chat app shown');
        }
        
        // Update user info in header
        const userInfo = document.getElementById('userInfo');
        if (userInfo) {
            userInfo.textContent = `${this.currentUser.name} (${this.currentUser.role})`;
        }
        
        // Render contact list
        this.renderContactList();
        
        // Show success notification
        this.showNotification('Login successful! 🎉', `Welcome ${this.currentUser.name}!`, 'success');
        
        console.log('✅ Chat app transition complete');
    }

    logout() {
        if (this.currentUser) {
            this.currentUser.status = 'offline';
            this.currentUser.lastSeen = new Date().toISOString();
            this.saveData();
        }
        
        this.currentUser = null;
        this.currentChat = null;
        
        // Transition back to login screen
        const loginScreen = document.getElementById('loginScreen');
        const chatApp = document.getElementById('chatApp');
        
        if (chatApp) {
            chatApp.style.display = 'none';
            chatApp.style.visibility = 'hidden';
            chatApp.classList.add('hidden');
        }
        
        if (loginScreen) {
            loginScreen.style.display = 'flex';
            loginScreen.style.visibility = 'visible';
            loginScreen.classList.remove('hidden');
        }
        
        document.getElementById('phoneNumber').value = '';
        this.hideError();
        this.closeAllModals();
        this.showNotification('Logged out', 'See you next time! 👋', 'info');
    }

    renderContactList() {
        const chatList = document.getElementById('chatList');
        if (!chatList) return;
        
        chatList.innerHTML = '';

        // Render individual users
        this.users.filter(u => u.id !== this.currentUser.id).forEach(user => {
            const chatItem = this.createChatItem(user, 'user');
            chatList.appendChild(chatItem);
        });

        // Render groups
        this.groups.filter(g => g.members.includes(this.currentUser.id)).forEach(group => {
            const chatItem = this.createChatItem(group, 'group');
            chatList.appendChild(chatItem);
        });
    }

    createChatItem(contact, type) {
        const div = document.createElement('div');
        div.className = 'chat-item';
        div.dataset.contactId = contact.id;
        div.dataset.contactType = type;

        const lastMessage = this.getLastMessage(contact.id, type);
        const unreadCount = this.getUnreadCount(contact.id, type);

        div.innerHTML = `
            <span class="contact-avatar">${contact.avatar}</span>
            <div class="contact-info">
                <div class="contact-name">${contact.name}</div>
                ${type === 'user' ? `<div class="contact-phone">${contact.phone}</div>` : ''}
                ${type === 'user' ? `<span class="contact-status ${contact.status}">${contact.status}</span>` : `<span class="contact-status">${contact.members.length} members</span>`}
                ${lastMessage ? `<div class="last-message">${lastMessage}</div>` : ''}
            </div>
            ${unreadCount > 0 ? `<span class="unread-count">${unreadCount}</span>` : ''}
        `;

        div.addEventListener('click', () => {
            this.openChat(contact, type);
        });

        return div;
    }

    getLastMessage(contactId, type) {
        let relevantMessages = [];
        
        if (type === 'user') {
            relevantMessages = this.messages.filter(m => 
                (m.senderId === contactId && m.receiverId === this.currentUser.id) ||
                (m.senderId === this.currentUser.id && m.receiverId === contactId)
            );
        } else {
            relevantMessages = this.messages.filter(m => m.groupId === contactId);
        }

        if (relevantMessages.length > 0) {
            const lastMsg = relevantMessages[relevantMessages.length - 1];
            return lastMsg.content.length > 30 ? lastMsg.content.substring(0, 30) + '...' : lastMsg.content;
        }
        return null;
    }

    getUnreadCount(contactId, type) {
        return Math.random() < 0.3 ? Math.floor(Math.random() * 3) + 1 : 0;
    }

    openChat(contact, type) {
        this.currentChat = { contact, type };
        
        document.querySelectorAll('.chat-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const clickedItem = document.querySelector(`[data-contact-id="${contact.id}"][data-contact-type="${type}"]`);
        if (clickedItem) {
            clickedItem.classList.add('active');
        }

        document.getElementById('welcomeScreen').classList.add('hidden');
        document.getElementById('chatArea').classList.remove('hidden');

        document.getElementById('chatContactAvatar').textContent = contact.avatar;
        document.getElementById('chatContactName').textContent = contact.name;
        document.getElementById('chatContactStatus').textContent = type === 'user' ? contact.status : `${contact.members.length} members`;

        this.renderMessages();
    }

    renderMessages() {
        const messagesContainer = document.getElementById('messagesContainer');
        if (!messagesContainer || !this.currentChat) return;
        
        messagesContainer.innerHTML = '';

        let relevantMessages = [];
        
        if (this.currentChat.type === 'user') {
            relevantMessages = this.messages.filter(m => 
                (m.senderId === this.currentChat.contact.id && m.receiverId === this.currentUser.id) ||
                (m.senderId === this.currentUser.id && m.receiverId === this.currentChat.contact.id)
            );
        } else {
            relevantMessages = this.messages.filter(m => m.groupId === this.currentChat.contact.id);
        }

        relevantMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        relevantMessages.forEach(message => {
            const messageElement = this.createMessageElement(message);
            messagesContainer.appendChild(messageElement);
        });

        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    createMessageElement(message) {
        const div = document.createElement('div');
        div.className = `message ${message.senderId === this.currentUser.id ? 'sent' : 'received'}`;
        div.dataset.messageId = message.id;

        const sender = this.users.find(u => u.id === message.senderId);
        const time = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        let content = this.processMessageContent(message.content);

        div.innerHTML = `
            <div class="message-bubble">
                ${message.senderId !== this.currentUser.id && this.currentChat.type === 'group' ? 
                    `<div class="message-sender">${sender ? sender.name : 'Unknown'}</div>` : ''}
                <div class="message-content">${content}</div>
                <div class="message-time">${time}</div>
                ${message.senderId === this.currentUser.id || this.currentUser.role === 'admin' ? `
                <div class="message-actions">
                    <button class="message-action-btn delete-message-btn" data-message-id="${message.id}">🗑️</button>
                </div>` : ''}
            </div>
        `;

        const deleteBtn = div.querySelector('.delete-message-btn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                this.deleteMessage(message.id);
            });
        }

        return div;
    }

    processMessageContent(content) {
        const mentionRegex = /@(\w+\s*\w*)/g;
        content = content.replace(mentionRegex, (match, name) => {
            const mentionedUser = this.users.find(u => u.name.toLowerCase().includes(name.toLowerCase()));
            if (mentionedUser && mentionedUser.id === this.currentUser.id) {
                this.showNotification('You were mentioned! 👋', content, 'info');
            }
            return `<span class="mention">${match}</span>`;
        });
        
        content = content.replace(/\n/g, '<br>');
        return content;
    }

    deleteMessage(messageId) {
        if (!confirm('Delete this message?')) return;

        this.messages = this.messages.filter(m => m.id !== messageId);
        this.saveData();
        this.renderMessages();
        this.renderContactList();
        this.showNotification('Message deleted', 'Message removed successfully', 'success');
    }

    sendMessage() {
        const input = document.getElementById('messageInput');
        if (!input || !this.currentChat) return;
        
        const content = input.value.trim();
        if (!content) return;

        const message = {
            id: Date.now() + Math.random(),
            senderId: this.currentUser.id,
            content: content,
            timestamp: new Date().toISOString(),
            type: 'text'
        };

        if (this.currentChat.type === 'user') {
            message.receiverId = this.currentChat.contact.id;
        } else {
            message.groupId = this.currentChat.contact.id;
        }

        this.messages.push(message);
        this.saveData();

        input.value = '';
        input.style.height = 'auto';
        this.renderMessages();
        this.renderContactList();

        this.simulateNotification(content);
    }

    simulateNotification(message) {
        if (Notification.permission === 'granted') {
            setTimeout(() => {
                new Notification(`New message from ${this.currentUser.name}`, {
                    body: message,
                    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><text y=".9em" font-size="90">💬</text></svg>'
                });
            }, 100);
        }
    }

    toggleEmojiPicker() {
        const picker = document.getElementById('emojiPicker');
        if (picker) {
            picker.classList.toggle('hidden');
        }
    }

    insertEmoji(emoji) {
        const input = document.getElementById('messageInput');
        if (!input) return;
        
        const cursorPos = input.selectionStart;
        const textBefore = input.value.substring(0, cursorPos);
        const textAfter = input.value.substring(cursorPos);
        
        input.value = textBefore + emoji + textAfter;
        input.focus();
        input.setSelectionRange(cursorPos + emoji.length, cursorPos + emoji.length);
        
        document.getElementById('emojiPicker').classList.add('hidden');
    }

    handleFileUpload(files) {
        if (!files.length || !this.currentChat) return;

        Array.from(files).forEach(file => {
            if (file.size > 10 * 1024 * 1024) {
                this.showError('File size must be less than 10MB');
                return;
            }

            const message = {
                id: Date.now() + Math.random(),
                senderId: this.currentUser.id,
                content: `📎 ${file.name} (${this.formatFileSize(file.size)})`,
                timestamp: new Date().toISOString(),
                type: 'file'
            };

            if (this.currentChat.type === 'user') {
                message.receiverId = this.currentChat.contact.id;
            } else {
                message.groupId = this.currentChat.contact.id;
            }

            this.messages.push(message);
        });

        this.saveData();
        this.renderMessages();
        this.renderContactList();
        this.showNotification('File uploaded', 'File sent successfully 📎', 'success');
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    filterContacts(searchTerm) {
        const chatItems = document.querySelectorAll('.chat-item');
        chatItems.forEach(item => {
            const name = item.querySelector('.contact-name')?.textContent.toLowerCase() || '';
            const phone = item.querySelector('.contact-phone')?.textContent.toLowerCase() || '';
            
            if (name.includes(searchTerm.toLowerCase()) || phone.includes(searchTerm.toLowerCase())) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Settings and admin functionality
    showSettings() {
        const modal = document.getElementById('settingsModal');
        if (!modal) return;
        
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        
        if (this.currentUser.role === 'admin') {
            const adminControls = document.getElementById('adminControls');
            if (adminControls) {
                adminControls.classList.remove('hidden');
            }
            
            const companyNameInput = document.getElementById('companyNameInput');
            if (companyNameInput) {
                companyNameInput.value = this.companySettings.name;
            }
            
            this.renderUserManagement();
            this.renderGroupManagement();
        }
    }

    saveSettings() {
        if (this.currentUser.role === 'admin') {
            const companyNameInput = document.getElementById('companyNameInput');
            if (companyNameInput) {
                this.companySettings.name = companyNameInput.value.trim() || this.companySettings.name;
            }
        }

        this.saveData();
        this.updateCompanyBranding();
        this.hideModal('settingsModal');
        this.showNotification('Settings saved ✅', 'Your settings have been updated', 'success');
    }

    renderUserManagement() {
        const userList = document.getElementById('userManagementList');
        if (!userList) return;
        
        userList.innerHTML = '';

        const addUserBtn = document.createElement('button');
        addUserBtn.className = 'btn btn--primary add-user-btn';
        addUserBtn.textContent = '+ Add New User';
        addUserBtn.addEventListener('click', () => {
            this.showAddUserModal();
        });
        userList.appendChild(addUserBtn);

        this.users.forEach(user => {
            if (user.id === this.currentUser.id) return;

            const userDiv = document.createElement('div');
            userDiv.className = 'user-item';
            userDiv.innerHTML = `
                <div class="user-item-info">
                    <span class="contact-avatar" style="font-size: 24px; width: 32px; height: 32px;">${user.avatar}</span>
                    <div>
                        <div class="contact-name">${user.name}</div>
                        <div class="contact-phone">${user.phone}</div>
                        <span class="contact-status ${user.status}">${user.status} - ${user.role}</span>
                    </div>
                </div>
                <div class="user-item-actions">
                    <button class="btn btn--outline btn--sm" onclick="chatApp.deleteUser(${user.id})">Delete</button>
                </div>
            `;
            
            userList.appendChild(userDiv);
        });
    }

    renderGroupManagement() {
        const groupList = document.getElementById('groupManagementList');
        if (!groupList) return;
        
        groupList.innerHTML = '';

        this.groups.forEach(group => {
            const groupDiv = document.createElement('div');
            groupDiv.className = 'group-item';
            groupDiv.innerHTML = `
                <div class="group-item-info">
                    <span class="contact-avatar" style="font-size: 24px; width: 32px; height: 32px;">${group.avatar}</span>
                    <div>
                        <div class="contact-name">${group.name}</div>
                        <div class="text-small text-muted">${group.members.length} members</div>
                    </div>
                </div>
                <div class="group-item-actions">
                    <button class="btn btn--outline btn--sm" onclick="chatApp.deleteGroup(${group.id})">Delete</button>
                </div>
            `;
            
            groupList.appendChild(groupDiv);
        });
    }

    showNewGroupModal() {
        const modal = document.getElementById('newGroupModal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.style.display = 'flex';
        }
        this.renderMemberSelection();
    }

    renderMemberSelection() {
        const memberList = document.getElementById('memberSelectionList');
        if (!memberList) return;
        
        memberList.innerHTML = '';

        this.users.forEach(user => {
            if (user.id === this.currentUser.id) return;

            const memberDiv = document.createElement('div');
            memberDiv.className = 'member-item';
            memberDiv.innerHTML = `
                <input type="checkbox" id="member-${user.id}" value="${user.id}">
                <span class="contact-avatar" style="font-size: 24px; width: 32px; height: 32px;">${user.avatar}</span>
                <div>
                    <div class="contact-name">${user.name}</div>
                    <div class="contact-phone">${user.phone}</div>
                </div>
            `;
            memberList.appendChild(memberDiv);
        });
    }

    createGroup() {
        const groupName = document.getElementById('groupNameInput').value.trim();
        const selectedMembers = Array.from(document.querySelectorAll('#memberSelectionList input:checked'))
            .map(cb => parseInt(cb.value));

        if (!groupName) {
            this.showError('Please enter a group name');
            return;
        }

        if (selectedMembers.length === 0) {
            this.showError('Please select at least one member');
            return;
        }

        const group = {
            id: Date.now(),
            name: groupName,
            members: [this.currentUser.id, ...selectedMembers],
            admin: this.currentUser.id,
            avatar: '👥',
            description: document.getElementById('groupDescriptionInput').value.trim()
        };

        this.groups.push(group);
        this.saveData();
        this.renderContactList();
        this.hideModal('newGroupModal');
        this.showNotification('Group created! 👥', `"${groupName}" has been created`, 'success');

        document.getElementById('groupNameInput').value = '';
        document.getElementById('groupDescriptionInput').value = '';
    }

    showAddUserModal() {
        const modal = document.getElementById('addUserModal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.style.display = 'flex';
        }
    }

    addUser() {
        const name = document.getElementById('newUserName').value.trim();
        const phone = document.getElementById('newUserPhone').value.trim();
        const role = document.getElementById('newUserRole').value;
        const avatar = document.getElementById('newUserAvatar').value.trim() || '👤';

        if (!name || !phone) {
            this.showError('Please fill in all required fields');
            return;
        }

        if (this.users.find(u => u.phone === phone)) {
            this.showError('Phone number already exists');
            return;
        }

        const newUser = {
            id: Date.now(),
            name,
            phone,
            role,
            status: 'offline',
            avatar,
            lastSeen: new Date().toISOString()
        };

        this.users.push(newUser);
        this.saveData();
        this.renderUserManagement();
        this.renderContactList();
        this.hideModal('addUserModal');
        this.showNotification('User added ✅', `${name} has been added`, 'success');

        ['newUserName', 'newUserPhone', 'newUserAvatar'].forEach(id => {
            document.getElementById(id).value = '';
        });
        document.getElementById('newUserRole').value = 'user';
    }

    deleteUser(userId) {
        const user = this.users.find(u => u.id === userId);
        if (!user || !confirm(`Delete ${user.name}?`)) return;

        this.users = this.users.filter(u => u.id !== userId);
        this.messages = this.messages.filter(m => m.senderId !== userId && m.receiverId !== userId);
        
        this.groups.forEach(group => {
            group.members = group.members.filter(id => id !== userId);
            if (group.admin === userId && group.members.length > 0) {
                group.admin = group.members[0];
            }
        });

        this.saveData();
        this.renderUserManagement();
        this.renderContactList();
        this.showNotification('User deleted', `${user.name} has been removed`, 'success');
    }

    deleteGroup(groupId) {
        const group = this.groups.find(g => g.id === groupId);
        if (!group || !confirm(`Delete group "${group.name}"?`)) return;

        this.groups = this.groups.filter(g => g.id !== groupId);
        this.messages = this.messages.filter(m => m.groupId !== groupId);

        this.saveData();
        this.renderGroupManagement();
        this.renderContactList();
        this.showNotification('Group deleted', `"${group.name}" has been removed`, 'success');
    }

    // Chat info functionality
    toggleChatInfo() {
        const panel = document.getElementById('chatInfoPanel');
        if (panel.classList.contains('hidden')) {
            this.showChatInfo();
        } else {
            this.hideChatInfo();
        }
    }

    showChatInfo() {
        if (!this.currentChat) return;

        const panel = document.getElementById('chatInfoPanel');
        panel.classList.remove('hidden');

        document.getElementById('infoPanelAvatar').textContent = this.currentChat.contact.avatar;
        document.getElementById('infoPanelName').textContent = this.currentChat.contact.name;
        
        if (this.currentChat.type === 'user') {
            document.getElementById('infoPanelPhone').textContent = this.currentChat.contact.phone;
            document.getElementById('groupMembersSection').classList.add('hidden');
        } else {
            document.getElementById('infoPanelPhone').textContent = `${this.currentChat.contact.members.length} members`;
            document.getElementById('groupMembersSection').classList.remove('hidden');
            this.renderGroupMembers();
        }
    }

    hideChatInfo() {
        const panel = document.getElementById('chatInfoPanel');
        if (panel) {
            panel.classList.add('hidden');
        }
    }

    renderGroupMembers() {
        const membersList = document.getElementById('groupMembersList');
        if (!membersList) return;
        
        membersList.innerHTML = '';

        this.currentChat.contact.members.forEach(memberId => {
            const member = this.users.find(u => u.id === memberId);
            if (member) {
                const memberDiv = document.createElement('div');
                memberDiv.className = 'group-member';
                memberDiv.innerHTML = `
                    <span class="group-member-avatar">${member.avatar}</span>
                    <span>${member.name}</span>
                    ${member.id === this.currentChat.contact.admin ? '<span class="admin-badge">Admin</span>' : ''}
                `;
                membersList.appendChild(memberDiv);
            }
        });
    }

    handleLogoUpload(file) {
        if (!file || !file.type.startsWith('image/')) {
            this.showError('Please select an image file');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                if (img.width < 170 || img.height < 66) {
                    this.showError('Logo must be at least 170x66 pixels');
                    return;
                }
                
                this.companySettings.logo = e.target.result;
                this.saveData();
                this.updateCompanyBranding();
                this.showNotification('Logo updated', 'Company logo updated successfully', 'success');
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    clearAllDataAndRestart() {
        console.log('🧹 Clearing all data and restarting...');
        localStorage.clear();
        sessionStorage.clear();
        location.reload();
    }

    startRealTimeUpdates() {
        setInterval(() => {
            if (this.currentUser && Math.random() < 0.02) {
                this.simulateIncomingMessage();
            }
        }, 20000);

        setInterval(() => {
            if (this.currentUser) {
                this.updateUserStatuses();
            }
        }, 60000);
    }

    simulateIncomingMessage() {
        if (!this.currentUser) return;

        const onlineUsers = this.users.filter(u => u.id !== this.currentUser.id && u.status === 'online');
        if (onlineUsers.length === 0) return;
        
        const randomUser = onlineUsers[Math.floor(Math.random() * onlineUsers.length)];
        const demoMessages = [
            "Hey! How's everything going? 😊",
            "Just finished the latest update 🚀",
            "Can you review when you have time?",
            "Great job on the presentation! 👏",
            "Let's catch up soon ☕",
            "System running smoothly 💪"
        ];

        const randomMessage = demoMessages[Math.floor(Math.random() * demoMessages.length)];
        
        const message = {
            id: Date.now() + Math.random(),
            senderId: randomUser.id,
            receiverId: this.currentUser.id,
            content: randomMessage,
            timestamp: new Date().toISOString(),
            type: 'text'
        };

        this.messages.push(message);
        this.saveData();

        if (this.currentChat && this.currentChat.contact.id === randomUser.id && this.currentChat.type === 'user') {
            this.renderMessages();
        }
        
        this.renderContactList();
        this.showNotification('New Message 💬', `${randomUser.name}: ${randomMessage}`, 'info');
    }

    updateUserStatuses() {
        const statuses = ['online', 'away', 'offline'];
        this.users.forEach(user => {
            if (user.id !== this.currentUser.id && Math.random() < 0.1) {
                user.status = statuses[Math.floor(Math.random() * statuses.length)];
                user.lastSeen = new Date().toISOString();
            }
        });
        this.saveData();
        this.renderContactList();
    }

    showNotification(title, message, type = 'info') {
        const container = document.getElementById('notificationContainer');
        if (!container) return;
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        notification.innerHTML = `
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
        `;

        container.appendChild(notification);

        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 4000);

        if (Notification.permission === 'granted' && type !== 'info') {
            new Notification(title, {
                body: message,
                icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><text y=".9em" font-size="90">💬</text></svg>'
            });
        } else if (Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }

    showError(message) {
        const errorDiv = document.getElementById('loginError');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.classList.remove('hidden');
            
            setTimeout(() => {
                errorDiv.classList.add('hidden');
            }, 5000);
        }
    }

    hideError() {
        const errorDiv = document.getElementById('loginError');
        if (errorDiv) {
            errorDiv.classList.add('hidden');
        }
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            modal.classList.add('hidden');
        }
    }
}

// Global functions
function emergencyReset() {
    console.log('🚨 Emergency reset triggered');
    localStorage.clear();
    sessionStorage.clear();
    location.reload();
}

function quickLogin(phoneNumber) {
    const phoneInput = document.getElementById('phoneNumber');
    if (phoneInput) {
        phoneInput.value = phoneNumber;
        
        // Trigger form submission properly
        if (window.chatApp) {
            window.chatApp.handleLogin();
        }
    }
}

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Always-Available Chat App...');
    
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }

    // Force hide all modals on startup
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
        modal.classList.add('hidden');
    });

    // Force hide disabled screen
    const disabledScreen = document.getElementById('appDisabledScreen');
    if (disabledScreen) {
        disabledScreen.style.display = 'none';
        disabledScreen.classList.add('hidden');
    }

    // Force show login screen
    const loginScreen = document.getElementById('loginScreen');
    const chatApp = document.getElementById('chatApp');
    
    if (loginScreen) {
        loginScreen.style.display = 'flex';
        loginScreen.classList.remove('hidden');
    }
    
    if (chatApp) {
        chatApp.style.display = 'none';
        chatApp.classList.add('hidden');
    }

    // Initialize the app
    try {
        window.chatApp = new AlwaysAvailableChatApp();
        console.log('✅ Chat app initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing app:', error);
        emergencyReset();
    }
});

// Global error handler
window.addEventListener('error', function(e) {
    console.warn('⚠️ Error detected:', e.error);
    
    const disabledScreen = document.getElementById('appDisabledScreen');
    if (disabledScreen) {
        disabledScreen.style.display = 'none';
        disabledScreen.classList.add('hidden');
    }
    
    const loginScreen = document.getElementById('loginScreen');
    if (loginScreen && loginScreen.classList.contains('hidden')) {
        loginScreen.style.display = 'flex';
        loginScreen.classList.remove('hidden');
    }
});
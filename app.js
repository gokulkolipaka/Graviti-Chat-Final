// WhatsApp-like Enterprise Chat Application - Always Enabled Version
class EnterpriseChatApp {
    constructor() {
        this.currentUser = null;
        this.currentChat = null;
        this.users = [];
        this.groups = [];
        this.messages = [];
        this.companySettings = {
            name: "TechCorp Enterprise",
            logo: null,
            description: "Professional WhatsApp-like Chat Platform"
        };
        
        this.init();
    }

    init() {
        // Immediately ensure login screen is visible
        this.showLoginScreen();
        
        this.loadData();
        this.setupEventListeners();
        this.updateCompanyBranding();
        this.startRealTimeUpdates();
        
        // Request notification permission
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
        
        // Show welcome notification
        setTimeout(() => {
            this.showNotification('Welcome! 🎉', 'Enterprise Chat Platform is ready to use', 'success');
        }, 1000);
        
        console.log('Enterprise Chat App initialized successfully');
    }

    showLoginScreen() {
        // Force show login screen and hide everything else
        const loginScreen = document.getElementById('loginScreen');
        const chatApp = document.getElementById('chatApp');
        const disabledScreen = document.getElementById('appDisabledScreen');
        
        if (loginScreen) {
            loginScreen.classList.remove('hidden');
            loginScreen.style.display = 'flex';
        }
        if (chatApp) {
            chatApp.classList.add('hidden');
            chatApp.style.display = 'none';
        }
        if (disabledScreen) {
            disabledScreen.classList.add('hidden');
            disabledScreen.style.display = 'none';
        }
    }

    loadData() {
        // Load default users with admin
        this.users = [
            {id: 1, name: "John Manager", phone: "+1234567890", role: "admin", status: "online", avatar: "👨‍💼", lastSeen: new Date().toISOString()},
            {id: 2, name: "Sarah Developer", phone: "+1234567891", role: "user", status: "online", avatar: "👩‍💻", lastSeen: new Date().toISOString()},
            {id: 3, name: "Mike Designer", phone: "+1234567892", role: "user", status: "away", avatar: "👨‍🎨", lastSeen: new Date().toISOString()},
            {id: 4, name: "Lisa Support", phone: "+1234567893", role: "user", status: "online", avatar: "👩‍💼", lastSeen: new Date().toISOString()},
            {id: 5, name: "Tom DevOps", phone: "+1234567894", role: "user", status: "offline", avatar: "👨‍🔧", lastSeen: new Date(Date.now() - 3600000).toISOString()}
        ];

        // Load from storage
        try {
            const savedUsers = localStorage.getItem('chatApp_users');
            if (savedUsers) {
                const parsedUsers = JSON.parse(savedUsers);
                // Ensure at least one admin exists
                const hasAdmin = parsedUsers.some(u => u.role === 'admin');
                if (hasAdmin) {
                    this.users = parsedUsers;
                }
            }
        } catch (e) {
            console.warn('Using default users');
        }

        // Default groups
        this.groups = [
            {id: 1, name: "Development Team", members: [1, 2, 3], admin: 1, avatar: "👥", description: "Main development team discussions"},
            {id: 2, name: "Support Team", members: [1, 4, 5], admin: 1, avatar: "🛠️", description: "Customer support coordination"}
        ];

        try {
            const savedGroups = localStorage.getItem('chatApp_groups');
            if (savedGroups) this.groups = JSON.parse(savedGroups);
        } catch (e) {
            console.warn('Using default groups');
        }

        // Default messages
        this.messages = [
            {id: 1, senderId: 2, receiverId: 1, content: "Hi John! The new features are ready for review 🚀", timestamp: new Date(Date.now() - 300000).toISOString(), type: "text"},
            {id: 2, senderId: 1, receiverId: 2, content: "Great work Sarah! Let me check it out", timestamp: new Date(Date.now() - 240000).toISOString(), type: "text"},
            {id: 3, senderId: 3, groupId: 1, content: "@John Manager the designs are ready for implementation", timestamp: new Date(Date.now() - 180000).toISOString(), type: "text"},
            {id: 4, senderId: 4, groupId: 2, content: "Customer satisfaction is up 25% this month! 📈", timestamp: new Date(Date.now() - 120000).toISOString(), type: "text"},
            {id: 5, senderId: 1, groupId: 1, content: "Excellent work team! Let's keep this momentum going 💪", timestamp: new Date(Date.now() - 60000).toISOString(), type: "text"}
        ];

        try {
            const savedMessages = localStorage.getItem('chatApp_messages');
            if (savedMessages) this.messages = JSON.parse(savedMessages);
        } catch (e) {
            console.warn('Using default messages');
        }

        // Load company settings
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
            localStorage.setItem('chatApp_settings', JSON.stringify(this.companySettings));
        } catch (e) {
            console.warn('Error saving data:', e);
        }
    }

    setupEventListeners() {
        // Login tabs
        document.getElementById('adminTab').addEventListener('click', () => this.switchLoginTab('admin'));
        document.getElementById('userTab').addEventListener('click', () => this.switchLoginTab('user'));

        // Login form
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Logout
        document.getElementById('logoutBtn').addEventListener('click', () => this.logout());

        // Settings
        document.getElementById('settingsBtn').addEventListener('click', () => this.showSettings());

        // Message handling
        const messageInput = document.getElementById('messageInput');
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

        document.getElementById('sendBtn').addEventListener('click', () => this.sendMessage());

        // Emoji picker
        document.getElementById('emojiBtn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleEmojiPicker();
        });

        // File upload
        document.getElementById('attachBtn').addEventListener('click', () => {
            document.getElementById('fileInput').click();
        });

        document.getElementById('fileInput').addEventListener('change', (e) => {
            this.handleFileUpload(e.target.files);
        });

        // Search
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.filterContacts(e.target.value);
        });

        // Group and user management
        document.getElementById('newGroupBtn').addEventListener('click', () => this.showNewGroupModal());

        // Chat info
        document.getElementById('chatInfoBtn').addEventListener('click', () => this.toggleChatInfo());

        // Modal handlers
        this.setupModalEventListeners();
        this.setupGlobalEventListeners();
    }

    setupModalEventListeners() {
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
                btn.addEventListener('click', () => {
                    if (modal) {
                        this.hideModal(modal);
                    } else if (action === 'hideChatInfo') {
                        this.hideChatInfo();
                    }
                });
            }
        });

        // Action buttons
        document.getElementById('saveSettings').addEventListener('click', () => this.saveSettings());
        document.getElementById('createGroupBtn').addEventListener('click', () => this.createGroup());
        document.getElementById('addUserBtn').addEventListener('click', () => this.addUser());
        
        // Admin controls
        const addNewUserBtn = document.getElementById('addNewUserBtn');
        if (addNewUserBtn) {
            addNewUserBtn.addEventListener('click', () => this.showAddUserModal());
        }
        
        const disableAppBtn = document.getElementById('disableAppBtn');
        if (disableAppBtn) {
            disableAppBtn.addEventListener('click', () => {
                // Demo only - show notification instead of actually disabling
                this.showNotification('Demo Mode', 'App disable feature disabled in demo for accessibility', 'info');
            });
        }
        
        const clearDataBtn = document.getElementById('clearDataBtn');
        if (clearDataBtn) {
            clearDataBtn.addEventListener('click', () => this.clearAllData());
        }

        // Company logo upload
        const logoInput = document.getElementById('companyLogoInput');
        if (logoInput) {
            logoInput.addEventListener('change', (e) => {
                this.handleLogoUpload(e.target.files[0]);
            });
        }
    }

    setupGlobalEventListeners() {
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

        // Escape key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    switchLoginTab(type) {
        const adminTab = document.getElementById('adminTab');
        const userTab = document.getElementById('userTab');
        const adminLogin = document.getElementById('adminLogin');
        const userLogin = document.getElementById('userLogin');

        if (type === 'admin') {
            adminTab.classList.add('active');
            userTab.classList.remove('active');
            adminLogin.classList.remove('hidden');
            userLogin.classList.add('hidden');
        } else {
            userTab.classList.add('active');
            adminTab.classList.remove('active');
            userLogin.classList.remove('hidden');
            adminLogin.classList.add('hidden');
        }
    }

    handleLogin() {
        const adminTab = document.getElementById('adminTab');
        
        if (adminTab.classList.contains('active')) {
            // Admin login
            const username = document.getElementById('adminUsername').value.trim();
            const password = document.getElementById('adminPassword').value.trim();
            
            if (username === 'admin' && password === 'superadmin123!') {
                // Create admin user if doesn't exist
                let adminUser = this.users.find(u => u.role === 'admin');
                if (!adminUser) {
                    adminUser = {
                        id: Date.now(),
                        name: "System Admin",
                        username: "admin",
                        role: "admin",
                        status: "online",
                        avatar: "🔐",
                        lastSeen: new Date().toISOString()
                    };
                    this.users.push(adminUser);
                }
                this.currentUser = adminUser;
                this.transitionToChatApp();
            } else {
                this.showError('Invalid admin credentials. Use username: admin, password: superadmin123!');
            }
        } else {
            // User login
            const phoneNumber = document.getElementById('phoneNumber').value.trim();
            
            if (!phoneNumber) {
                this.showError('Please enter a phone number');
                return;
            }
            
            const user = this.users.find(u => u.phone === phoneNumber);
            if (user) {
                this.currentUser = user;
                user.status = 'online';
                user.lastSeen = new Date().toISOString();
                this.transitionToChatApp();
            } else {
                this.showError('Phone number not found. Try one of the demo accounts.');
            }
        }
    }

    transitionToChatApp() {
        const loginScreen = document.getElementById('loginScreen');
        const chatApp = document.getElementById('chatApp');
        
        loginScreen.classList.add('hidden');
        loginScreen.style.display = 'none';
        
        chatApp.classList.remove('hidden');
        chatApp.style.display = 'flex';
        
        // Update user info in header
        const userInfo = document.getElementById('userInfo');
        userInfo.textContent = `${this.currentUser.name} (${this.currentUser.role})`;
        
        // Render contact list
        this.renderContactList();
        
        this.saveData();
        this.showNotification('Login successful! 🎉', `Welcome ${this.currentUser.name}!`, 'success');
    }

    logout() {
        if (this.currentUser) {
            this.currentUser.status = 'offline';
            this.currentUser.lastSeen = new Date().toISOString();
            this.saveData();
        }
        
        this.currentUser = null;
        this.currentChat = null;
        
        const loginScreen = document.getElementById('loginScreen');
        const chatApp = document.getElementById('chatApp');
        
        chatApp.classList.add('hidden');
        chatApp.style.display = 'none';
        
        loginScreen.classList.remove('hidden');
        loginScreen.style.display = 'flex';
        
        // Clear form fields
        document.getElementById('phoneNumber').value = '';
        document.getElementById('adminUsername').value = '';
        document.getElementById('adminPassword').value = '';
        
        this.hideError();
        this.closeAllModals();
        this.showNotification('Logged out', 'See you next time! 👋', 'info');
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

    renderContactList() {
        const chatList = document.getElementById('chatList');
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
                ${type === 'user' ? `<div class="contact-phone">${contact.phone || ''}</div>` : ''}
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
        // Simulate unread messages
        return Math.random() < 0.3 ? Math.floor(Math.random() * 3) + 1 : 0;
    }

    openChat(contact, type) {
        this.currentChat = { contact, type };
        
        // Update active chat item
        document.querySelectorAll('.chat-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const clickedItem = document.querySelector(`[data-contact-id="${contact.id}"][data-contact-type="${type}"]`);
        if (clickedItem) {
            clickedItem.classList.add('active');
        }

        // Show chat area
        document.getElementById('welcomeScreen').classList.add('hidden');
        document.getElementById('chatArea').classList.remove('hidden');

        // Update chat header
        document.getElementById('chatContactAvatar').textContent = contact.avatar;
        document.getElementById('chatContactName').textContent = contact.name;
        document.getElementById('chatContactStatus').textContent = type === 'user' ? contact.status : `${contact.members.length} members`;

        this.renderMessages();
    }

    renderMessages() {
        const messagesContainer = document.getElementById('messagesContainer');
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
        // Process mentions
        const mentionRegex = /@(\w+\s*\w*)/g;
        content = content.replace(mentionRegex, (match, name) => {
            const mentionedUser = this.users.find(u => u.name.toLowerCase().includes(name.toLowerCase()));
            if (mentionedUser && mentionedUser.id === this.currentUser.id) {
                // Show notification for mention
                setTimeout(() => {
                    this.showNotification('You were mentioned! 👋', content, 'info');
                }, 100);
            }
            return `<span class="mention">${match}</span>`;
        });
        
        // Convert line breaks
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
        const content = input.value.trim();
        
        if (!content || !this.currentChat) return;

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

        // Show notification
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
        picker.classList.toggle('hidden');
    }

    insertEmoji(emoji) {
        const input = document.getElementById('messageInput');
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
                type: 'file',
                fileName: file.name,
                fileSize: file.size,
                fileType: file.type
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
        modal.classList.remove('hidden');
        
        // Populate company settings
        document.getElementById('companyNameInput').value = this.companySettings.name;
        
        // Show admin controls if admin
        if (this.currentUser.role === 'admin') {
            document.getElementById('adminControls').classList.remove('hidden');
            this.renderUserManagement();
            this.renderGroupManagement();
        } else {
            document.getElementById('adminControls').classList.add('hidden');
        }
    }

    saveSettings() {
        const companyNameInput = document.getElementById('companyNameInput');
        if (companyNameInput.value.trim()) {
            this.companySettings.name = companyNameInput.value.trim();
        }

        this.saveData();
        this.updateCompanyBranding();
        this.hideModal('settingsModal');
        this.showNotification('Settings saved ✅', 'Your settings have been updated', 'success');
    }

    renderUserManagement() {
        const userList = document.getElementById('userManagementList');
        userList.innerHTML = '';

        this.users.forEach(user => {
            if (user.id === this.currentUser.id) return;

            const userDiv = document.createElement('div');
            userDiv.className = 'user-item';
            userDiv.innerHTML = `
                <div class="user-item-info">
                    <span class="contact-avatar" style="font-size: 24px; width: 32px; height: 32px;">${user.avatar}</span>
                    <div>
                        <div class="contact-name">${user.name}</div>
                        <div class="contact-phone">${user.phone || user.username || ''}</div>
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
        modal.classList.remove('hidden');
        this.renderMemberSelection();
    }

    renderMemberSelection() {
        const memberList = document.getElementById('memberSelectionList');
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
                    <div class="contact-phone">${user.phone || user.username || ''}</div>
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

        // Clear form
        document.getElementById('groupNameInput').value = '';
        document.getElementById('groupDescriptionInput').value = '';
    }

    showAddUserModal() {
        const modal = document.getElementById('addUserModal');
        modal.classList.remove('hidden');
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

        // Clear form
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
        
        // Remove from groups
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

    clearAllData() {
        if (confirm('This will clear all messages, users, and groups. Are you sure?')) {
            localStorage.clear();
            location.reload();
        }
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
            document.getElementById('infoPanelPhone').textContent = this.currentChat.contact.phone || this.currentChat.contact.username || '';
            document.getElementById('groupMembersSection').classList.add('hidden');
        } else {
            document.getElementById('infoPanelPhone').textContent = `${this.currentChat.contact.members.length} members`;
            document.getElementById('groupMembersSection').classList.remove('hidden');
            this.renderGroupMembers();
        }
    }

    hideChatInfo() {
        const panel = document.getElementById('chatInfoPanel');
        panel.classList.add('hidden');
    }

    renderGroupMembers() {
        const membersList = document.getElementById('groupMembersList');
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

    startRealTimeUpdates() {
        // Simulate incoming messages
        setInterval(() => {
            if (this.currentUser && Math.random() < 0.02) {
                this.simulateIncomingMessage();
            }
        }, 30000);

        // Update user statuses
        setInterval(() => {
            if (this.currentUser) {
                this.updateUserStatuses();
            }
        }, 60000);
    }

    simulateIncomingMessage() {
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

        // Browser notification
        if (Notification.permission === 'granted' && type !== 'info') {
            new Notification(title, {
                body: message,
                icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><text y=".9em" font-size="90">💬</text></svg>'
            });
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
            modal.classList.add('hidden');
        }
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
}

// Global functions for quick login
function quickLogin(phoneNumber) {
    document.getElementById('userTab').click();
    document.getElementById('phoneNumber').value = phoneNumber;
    document.getElementById('loginForm').dispatchEvent(new Event('submit'));
}

function quickAdminLogin() {
    document.getElementById('adminTab').click();
    document.getElementById('adminUsername').value = 'admin';
    document.getElementById('adminPassword').value = 'superadmin123!';
    document.getElementById('loginForm').dispatchEvent(new Event('submit'));
}

// Initialize application
let chatApp;

document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing Enterprise Chat App...');
    
    // Clear any potentially problematic localStorage entries first
    try {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
            if (key.includes('disable') || key.includes('maintenance')) {
                localStorage.removeItem(key);
            }
        });
    } catch (e) {
        // Ignore localStorage errors
    }
    
    chatApp = new EnterpriseChatApp();
    
    // Make globally accessible
    window.chatApp = chatApp;
});

// Global error handler
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
});
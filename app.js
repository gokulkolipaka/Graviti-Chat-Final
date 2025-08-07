// TechCorp Enterprise Chat Application - Complete Implementation (FIXED)
class EnterpriseChat {
    constructor() {
        this.currentUser = null;
        this.currentChat = null;
        this.users = [];
        this.groups = [];
        this.messages = [];
        this.companySettings = {
            name: "TechCorp Enterprise",
            logo: null,
            description: "Professional WhatsApp-like Chat Platform",
            qrCode: null,
            qrCodeGenerated: false
        };
        this.adminCredentials = {
            username: "admin",
            password: "SuperAdmin123!"
        };
        this.appState = "adminLogin"; // adminLogin, adminDashboard, userLogin, chatApp
        this.minimumUsers = 5;
        
        console.log('🚀 Initializing TechCorp Enterprise Chat...');
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeApp();
            });
        } else {
            this.initializeApp();
        }
    }

    initializeApp() {
        console.log('🔧 Initializing enterprise chat application...');
        
        this.hideAllScreens();
        this.loadData();
        this.setupEventListeners();
        this.updateCompanyBranding();
        this.showAdminLogin();
        
        console.log('✅ Enterprise Chat initialized successfully');
    }

    hideAllScreens() {
        const screens = ['adminLoginScreen', 'adminDashboard', 'userLoginScreen', 'chatApp'];
        screens.forEach(screenId => {
            const screen = document.getElementById(screenId);
            if (screen) {
                screen.classList.add('hidden');
                screen.style.display = 'none';
            }
        });

        const modals = ['addUsersModal', 'importContactsModal', 'qrCodeModal', 'settingsModal', 'newGroupModal'];
        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('hidden');
                modal.style.display = 'none';
            }
        });
    }

    loadData() {
        // Initialize with empty users array - admin must add users
        this.users = [];
        
        try {
            const savedUsers = localStorage.getItem('enterpriseChat_users');
            if (savedUsers) this.users = JSON.parse(savedUsers);
            
            const savedMessages = localStorage.getItem('enterpriseChat_messages');
            if (savedMessages) this.messages = JSON.parse(savedMessages);
            
            const savedGroups = localStorage.getItem('enterpriseChat_groups');
            if (savedGroups) this.groups = JSON.parse(savedGroups);
            
            const savedSettings = localStorage.getItem('enterpriseChat_settings');
            if (savedSettings) {
                const settings = JSON.parse(savedSettings);
                this.companySettings = { ...this.companySettings, ...settings };
            }
        } catch (e) {
            console.warn('Error loading saved data, using defaults');
        }
    }

    saveData() {
        try {
            localStorage.setItem('enterpriseChat_users', JSON.stringify(this.users));
            localStorage.setItem('enterpriseChat_messages', JSON.stringify(this.messages));
            localStorage.setItem('enterpriseChat_groups', JSON.stringify(this.groups));
            localStorage.setItem('enterpriseChat_settings', JSON.stringify(this.companySettings));
        } catch (e) {
            console.warn('Error saving data:', e);
        }
    }

    setupEventListeners() {
        console.log('🔧 Setting up event listeners...');

        // Admin Login Form - FIXED
        const adminLoginForm = document.getElementById('adminLoginForm');
        if (adminLoginForm) {
            console.log('✅ Admin login form found');
            adminLoginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('📋 Admin login form submitted');
                this.handleAdminLogin();
            });
        } else {
            console.error('❌ Admin login form not found');
        }

        // Admin Dashboard Actions
        const addUsersBtn = document.getElementById('addUsersBtn');
        if (addUsersBtn) {
            addUsersBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showAddUsersModal();
            });
        }

        const importContactsBtn = document.getElementById('importContactsBtn');
        if (importContactsBtn) {
            importContactsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showImportContactsModal();
            });
        }

        const generateQRBtn = document.getElementById('generateQRBtn');
        if (generateQRBtn) {
            generateQRBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.generateQRCode();
            });
        }

        const launchChatBtn = document.getElementById('launchChatBtn');
        if (launchChatBtn) {
            launchChatBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.launchChatApplication();
            });
        }

        // Admin Logout
        const adminLogoutBtn = document.getElementById('adminLogoutBtn');
        if (adminLogoutBtn) {
            adminLogoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.adminLogout();
            });
        }

        // User Login Form
        const userLoginForm = document.getElementById('userLoginForm');
        if (userLoginForm) {
            userLoginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleUserLogin();
            });
        }

        // QR Login Button
        const qrLoginBtn = document.getElementById('qrLoginBtn');
        if (qrLoginBtn) {
            qrLoginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleQRLogin();
            });
        }

        // Back to Admin Button
        const backToAdminBtn = document.getElementById('backToAdminBtn');
        if (backToAdminBtn) {
            backToAdminBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showAdminLogin();
            });
        }

        // Modal Event Listeners
        this.setupModalEventListeners();
        this.setupChatEventListeners();
        this.setupGlobalEventListeners();

        console.log('✅ All event listeners set up successfully');
    }

    setupModalEventListeners() {
        // Add Users Modal
        const closeAddUsers = document.getElementById('closeAddUsers');
        if (closeAddUsers) {
            closeAddUsers.addEventListener('click', () => this.hideModal('addUsersModal'));
        }

        const addUserBtn = document.getElementById('addUserBtn');
        if (addUserBtn) {
            addUserBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.addUser();
            });
        }

        // Import Contacts Modal
        const closeImportContacts = document.getElementById('closeImportContacts');
        if (closeImportContacts) {
            closeImportContacts.addEventListener('click', () => this.hideModal('importContactsModal'));
        }

        const syncPhoneBtn = document.getElementById('syncPhoneBtn');
        if (syncPhoneBtn) {
            syncPhoneBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.syncPhoneContacts();
            });
        }

        const manualEntryBtn = document.getElementById('manualEntryBtn');
        if (manualEntryBtn) {
            manualEntryBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showManualEntry();
            });
        }

        const addContactBtn = document.getElementById('addContactBtn');
        if (addContactBtn) {
            addContactBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.addContact();
            });
        }

        // QR Code Modal
        const closeQRCode = document.getElementById('closeQRCode');
        if (closeQRCode) {
            closeQRCode.addEventListener('click', () => this.hideModal('qrCodeModal'));
        }

        const shareQRBtn = document.getElementById('shareQRBtn');
        if (shareQRBtn) {
            shareQRBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.shareQRCode();
            });
        }
    }

    setupChatEventListeners() {
        // Settings Button
        const settingsBtn = document.getElementById('settingsBtn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showSettings();
            });
        }

        // Logout Button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        }

        // Message Input
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

        // Emoji Button
        const emojiBtn = document.getElementById('emojiBtn');
        if (emojiBtn) {
            emojiBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleEmojiPicker();
            });
        }

        // File Attachment
        const attachBtn = document.getElementById('attachBtn');
        if (attachBtn) {
            attachBtn.addEventListener('click', () => {
                const fileInput = document.getElementById('fileInput');
                if (fileInput) fileInput.click();
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

        // New Group Button
        const newGroupBtn = document.getElementById('newGroupBtn');
        if (newGroupBtn) {
            newGroupBtn.addEventListener('click', () => this.showNewGroupModal());
        }

        // Chat Info Button
        const chatInfoBtn = document.getElementById('chatInfoBtn');
        if (chatInfoBtn) {
            chatInfoBtn.addEventListener('click', () => this.toggleChatInfo());
        }

        // Settings Modal
        const closeSettings = document.getElementById('closeSettings');
        if (closeSettings) {
            closeSettings.addEventListener('click', () => this.hideModal('settingsModal'));
        }

        const saveSettings = document.getElementById('saveSettings');
        if (saveSettings) {
            saveSettings.addEventListener('click', () => this.saveSettingsData());
        }

        // New Group Modal
        const closeNewGroup = document.getElementById('closeNewGroup');
        if (closeNewGroup) {
            closeNewGroup.addEventListener('click', () => this.hideModal('newGroupModal'));
        }

        const createGroupBtn = document.getElementById('createGroupBtn');
        if (createGroupBtn) {
            createGroupBtn.addEventListener('click', () => this.createGroup());
        }

        // Chat Info Panel
        const closeChatInfo = document.getElementById('closeChatInfo');
        if (closeChatInfo) {
            closeChatInfo.addEventListener('click', () => this.hideChatInfo());
        }

        // Admin Controls
        const clearDataBtn = document.getElementById('clearDataBtn');
        if (clearDataBtn) {
            clearDataBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
                    this.clearAllData();
                }
            });
        }

        const downloadDataBtn = document.getElementById('downloadDataBtn');
        if (downloadDataBtn) {
            downloadDataBtn.addEventListener('click', () => this.downloadData());
        }

        const disableAppBtn = document.getElementById('disableAppBtn');
        if (disableAppBtn) {
            disableAppBtn.addEventListener('click', () => this.disableApp());
        }
    }

    setupGlobalEventListeners() {
        // Close modals on outside click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.hideModal(e.target.id);
            }
        });

        // Emoji picker items
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('emoji-item')) {
                this.insertEmoji(e.target.textContent);
            }
        });

        // Close emoji picker on outside click
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

    // ADMIN LOGIN FUNCTIONALITY - COMPLETELY FIXED
    showAdminLogin() {
        this.appState = "adminLogin";
        this.hideAllScreens();
        const loginScreen = document.getElementById('adminLoginScreen');
        if (loginScreen) {
            loginScreen.style.display = 'flex';
            loginScreen.classList.remove('hidden');
        }
        
        // Clear any previous error messages
        const errorDiv = document.getElementById('adminLoginError');
        if (errorDiv) {
            errorDiv.classList.add('hidden');
        }
        
        console.log('✅ Admin login screen shown');
    }

    handleAdminLogin() {
        console.log('🔐 Processing admin login...');
        
        const usernameInput = document.getElementById('adminUsername');
        const passwordInput = document.getElementById('adminPassword');
        
        if (!usernameInput || !passwordInput) {
            console.error('❌ Login input fields not found');
            this.showAdminLoginError('Login form error. Please refresh the page.');
            return;
        }
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        console.log(`📝 Login attempt - Username: "${username}", Password length: ${password.length}`);
        console.log(`🔑 Expected - Username: "${this.adminCredentials.username}", Password: "${this.adminCredentials.password}"`);

        if (!username || !password) {
            console.log('❌ Empty credentials');
            this.showAdminLoginError('Please enter both username and password.');
            return;
        }

        if (username === this.adminCredentials.username && password === this.adminCredentials.password) {
            console.log('✅ Admin credentials verified successfully');
            
            // Use setTimeout to ensure UI updates properly
            setTimeout(() => {
                this.showAdminDashboard();
                this.showNotification('Admin Login Successful! 🔐', 'Welcome to the admin dashboard', 'success');
            }, 100);
        } else {
            console.log('❌ Invalid credentials provided');
            this.showAdminLoginError('Invalid admin credentials. Please check your username and password.');
        }
    }

    showAdminLoginError(message) {
        const errorDiv = document.getElementById('adminLoginError');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.classList.remove('hidden');
            setTimeout(() => errorDiv.classList.add('hidden'), 5000);
        }
    }

    adminLogout() {
        this.showAdminLogin();
        this.showNotification('Admin Logout', 'Successfully logged out', 'info');
    }

    // ADMIN DASHBOARD FUNCTIONALITY - FIXED
    showAdminDashboard() {
        console.log('🏢 Showing admin dashboard...');
        
        this.appState = "adminDashboard";
        this.hideAllScreens();
        
        const dashboard = document.getElementById('adminDashboard');
        if (dashboard) {
            dashboard.style.display = 'flex';
            dashboard.classList.remove('hidden');
            console.log('✅ Admin dashboard displayed');
        } else {
            console.error('❌ Admin dashboard element not found');
        }
        
        this.updateDashboard();
    }

    updateDashboard() {
        // Update user count
        const userCount = document.getElementById('userCount');
        const totalUsers = document.getElementById('totalUsers');
        const launchBtn = document.getElementById('launchChatBtn');
        
        if (userCount) userCount.textContent = this.users.length;
        if (totalUsers) totalUsers.textContent = this.users.length;

        // Update QR status
        const qrStatus = document.getElementById('qrStatus');
        if (qrStatus) {
            qrStatus.textContent = this.companySettings.qrCodeGenerated ? 'Generated' : 'Not Generated';
        }

        // Enable/disable launch button
        if (launchBtn) {
            if (this.users.length >= this.minimumUsers) {
                launchBtn.disabled = false;
                launchBtn.textContent = 'Launch Chat Application';
            } else {
                launchBtn.disabled = true;
                launchBtn.textContent = `Add ${this.minimumUsers - this.users.length} more users to launch`;
            }
        }

        this.renderUsersList();
    }

    renderUsersList() {
        const container = document.getElementById('usersContainer');
        if (!container) return;

        container.innerHTML = '';

        if (this.users.length === 0) {
            container.innerHTML = '<p class="text-muted text-center">No users added yet. Click "Add Users" to get started.</p>';
            return;
        }

        this.users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'user-card';
            userCard.innerHTML = `
                <div class="user-card-info">
                    <div class="user-card-avatar">${user.avatar}</div>
                    <div class="user-card-details">
                        <h4>${user.name}</h4>
                        <p>${user.phone}</p>
                    </div>
                    <div class="user-card-role">${user.role}</div>
                </div>
                <div class="user-card-actions">
                    <button class="btn btn--outline btn--sm delete-user-btn" data-user-id="${user.id}">Remove</button>
                </div>
            `;

            const deleteBtn = userCard.querySelector('.delete-user-btn');
            deleteBtn.addEventListener('click', () => this.removeUser(user.id));

            container.appendChild(userCard);
        });
    }

    // USER MANAGEMENT FUNCTIONALITY
    showAddUsersModal() {
        const modal = document.getElementById('addUsersModal');
        if (modal) {
            modal.style.display = 'flex';
            modal.classList.remove('hidden');
        }
    }

    addUser() {
        const name = document.getElementById('newUserName')?.value.trim() || '';
        const phone = document.getElementById('newUserPhone')?.value.trim() || '';
        const role = document.getElementById('newUserRole')?.value || 'user';
        const avatar = document.getElementById('newUserAvatar')?.value.trim() || '👤';

        if (!name || !phone) {
            this.showNotification('Error', 'Please fill in all required fields', 'error');
            return;
        }

        if (this.users.find(u => u.phone === phone)) {
            this.showNotification('Error', 'Phone number already exists', 'error');
            return;
        }

        const newUser = {
            id: Date.now() + Math.random(),
            name,
            phone,
            role,
            status: 'offline',
            avatar,
            lastSeen: new Date().toISOString(),
            addedBy: 'admin'
        };

        this.users.push(newUser);
        this.saveData();
        this.updateDashboard();
        this.hideModal('addUsersModal');
        this.showNotification('User Added ✅', `${name} has been added successfully`, 'success');

        // Clear form
        ['newUserName', 'newUserPhone', 'newUserAvatar'].forEach(id => {
            const element = document.getElementById(id);
            if (element) element.value = '';
        });
        const roleSelect = document.getElementById('newUserRole');
        if (roleSelect) roleSelect.value = 'user';
    }

    removeUser(userId) {
        const user = this.users.find(u => u.id === userId);
        if (!user || !confirm(`Remove ${user.name} from the system?`)) return;

        this.users = this.users.filter(u => u.id !== userId);
        this.messages = this.messages.filter(m => m.senderId !== userId && m.receiverId !== userId);
        
        // Remove from groups
        this.groups.forEach(group => {
            group.members = group.members.filter(id => id !== userId);
            if (group.admin === userId && group.members.length > 0) {
                group.admin = group.members[0];
            }
        });
        
        // Remove empty groups
        this.groups = this.groups.filter(g => g.members.length > 0);

        this.saveData();
        this.updateDashboard();
        this.showNotification('User Removed', `${user.name} has been removed`, 'warning');
    }

    // CONTACT IMPORT FUNCTIONALITY
    showImportContactsModal() {
        const modal = document.getElementById('importContactsModal');
        if (modal) {
            modal.style.display = 'flex';
            modal.classList.remove('hidden');
        }
    }

    syncPhoneContacts() {
        // Simulate phone contacts import
        const simulatedContacts = [
            {name: 'John Smith', phone: '+1234567890', role: 'user', avatar: '👨‍💼'},
            {name: 'Sarah Johnson', phone: '+1234567891', role: 'user', avatar: '👩‍💼'},
            {name: 'Mike Wilson', phone: '+1234567892', role: 'user', avatar: '👨‍💻'},
            {name: 'Emily Davis', phone: '+1234567893', role: 'user', avatar: '👩‍🎨'},
            {name: 'David Brown', phone: '+1234567894', role: 'user', avatar: '👨‍🔧'},
            {name: 'Lisa Garcia', phone: '+1234567895', role: 'user', avatar: '👩‍🔬'},
            {name: 'Tom Anderson', phone: '+1234567896', role: 'user', avatar: '👨‍🏫'},
            {name: 'Anna Martinez', phone: '+1234567897', role: 'user', avatar: '👩‍⚕️'}
        ];

        let addedCount = 0;
        simulatedContacts.forEach(contact => {
            if (!this.users.find(u => u.phone === contact.phone)) {
                const newUser = {
                    id: Date.now() + Math.random() + addedCount,
                    ...contact,
                    status: 'offline',
                    lastSeen: new Date().toISOString(),
                    addedBy: 'phone-sync'
                };
                this.users.push(newUser);
                addedCount++;
            }
        });

        this.saveData();
        this.updateDashboard();
        this.hideModal('importContactsModal');
        this.showNotification('Contacts Imported! 📱', `${addedCount} contacts added from phone`, 'success');
    }

    showManualEntry() {
        const form = document.getElementById('manualEntryForm');
        if (form) {
            form.classList.remove('hidden');
        }
    }

    addContact() {
        const name = document.getElementById('contactName')?.value.trim() || '';
        const phone = document.getElementById('contactPhone')?.value.trim() || '';
        const role = document.getElementById('contactRole')?.value || 'user';

        if (!name || !phone) {
            this.showNotification('Error', 'Please fill in all fields', 'error');
            return;
        }

        if (this.users.find(u => u.phone === phone)) {
            this.showNotification('Error', 'Phone number already exists', 'error');
            return;
        }

        const newUser = {
            id: Date.now() + Math.random(),
            name,
            phone,
            role,
            status: 'offline',
            avatar: '👤',
            lastSeen: new Date().toISOString(),
            addedBy: 'manual'
        };

        this.users.push(newUser);
        this.saveData();
        this.updateDashboard();
        this.showNotification('Contact Added ✅', `${name} has been added`, 'success');

        // Clear form
        ['contactName', 'contactPhone'].forEach(id => {
            const element = document.getElementById(id);
            if (element) element.value = '';
        });
        const roleSelect = document.getElementById('contactRole');
        if (roleSelect) roleSelect.value = 'user';
    }

    // QR CODE FUNCTIONALITY
    generateQRCode() {
        this.companySettings.qrCode = `https://chat.techcorp.com/access?token=${Date.now()}`;
        this.companySettings.qrCodeGenerated = true;
        this.saveData();
        this.updateDashboard();
        
        const modal = document.getElementById('qrCodeModal');
        if (modal) {
            modal.style.display = 'flex';
            modal.classList.remove('hidden');
        }
        
        const qrURL = document.getElementById('qrURL');
        if (qrURL) {
            qrURL.textContent = this.companySettings.qrCode;
        }
        
        this.showNotification('QR Code Generated! 📱', 'QR code is ready for sharing', 'success');
    }

    shareQRCode() {
        if (navigator.share) {
            navigator.share({
                title: 'TechCorp Enterprise Chat',
                text: 'Join our enterprise chat application',
                url: this.companySettings.qrCode
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(this.companySettings.qrCode).then(() => {
                this.showNotification('QR Code Copied! 📋', 'URL copied to clipboard', 'success');
            });
        }
    }

    // CHAT APPLICATION LAUNCH
    launchChatApplication() {
        if (this.users.length < this.minimumUsers) {
            this.showNotification('Insufficient Users', `Please add at least ${this.minimumUsers} users before launching`, 'warning');
            return;
        }

        this.showUserLogin();
        this.showNotification('Chat Application Ready! 🚀', 'Users can now log in and start chatting', 'success');
    }

    showUserLogin() {
        this.appState = "userLogin";
        this.hideAllScreens();
        const loginScreen = document.getElementById('userLoginScreen');
        if (loginScreen) {
            loginScreen.style.display = 'flex';
            loginScreen.classList.remove('hidden');
        }
        this.renderDemoAccounts();
        console.log('✅ User login screen shown');
    }

    renderDemoAccounts() {
        const demoList = document.getElementById('demoAccountsList');
        if (!demoList) return;

        demoList.innerHTML = '';
        
        this.users.slice(0, 6).forEach(user => {
            const btn = document.createElement('button');
            btn.className = 'demo-account-btn';
            btn.textContent = `${user.avatar} ${user.name}`;
            btn.dataset.phone = user.phone;
            btn.addEventListener('click', () => this.quickUserLogin(user.phone));
            demoList.appendChild(btn);
        });
    }

    handleUserLogin() {
        const phone = document.getElementById('userPhone')?.value.trim() || '';
        
        if (!phone) {
            this.showUserLoginError('Please enter a phone number');
            return;
        }
        
        const user = this.users.find(u => u.phone === phone);
        if (user) {
            this.currentUser = user;
            user.status = 'online';
            user.lastSeen = new Date().toISOString();
            this.saveData();
            this.showChatApp();
            this.showNotification('Login Successful! 🎉', `Welcome ${user.name}!`, 'success');
        } else {
            this.showUserLoginError('Phone number not found. Please contact your administrator.');
        }
    }

    quickUserLogin(phone) {
        const phoneInput = document.getElementById('userPhone');
        if (phoneInput) {
            phoneInput.value = phone;
            setTimeout(() => this.handleUserLogin(), 100);
        }
    }

    handleQRLogin() {
        if (!this.companySettings.qrCodeGenerated) {
            this.showNotification('QR Code Not Available', 'Please contact your administrator', 'warning');
            return;
        }
        
        // Simulate QR code scan - in real app this would open camera
        this.showNotification('QR Code Access', 'QR code scanning simulated - logging in automatically', 'info');
        
        // Log in as first available user for demo
        if (this.users.length > 0) {
            setTimeout(() => this.quickUserLogin(this.users[0].phone), 1000);
        }
    }

    showUserLoginError(message) {
        const errorDiv = document.getElementById('userLoginError');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.classList.remove('hidden');
            setTimeout(() => errorDiv.classList.add('hidden'), 5000);
        }
    }

    // CHAT APPLICATION FUNCTIONALITY
    showChatApp() {
        this.appState = "chatApp";
        this.hideAllScreens();
        const chatApp = document.getElementById('chatApp');
        if (chatApp) {
            chatApp.style.display = 'flex';
            chatApp.classList.remove('hidden');
        }
        
        const userInfo = document.getElementById('userInfo');
        if (userInfo && this.currentUser) {
            userInfo.textContent = `${this.currentUser.name} (${this.currentUser.role})`;
        }
        
        this.renderContactList();
        this.startRealTimeUpdates();
        console.log('✅ Chat application shown');
    }

    renderContactList() {
        const chatList = document.getElementById('chatList');
        if (!chatList || !this.currentUser) return;
        
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

        div.addEventListener('click', () => this.openChat(contact, type));
        return div;
    }

    openChat(contact, type) {
        this.currentChat = { contact, type };
        
        // Update active state
        document.querySelectorAll('.chat-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const clickedItem = document.querySelector(`[data-contact-id="${contact.id}"][data-contact-type="${type}"]`);
        if (clickedItem) {
            clickedItem.classList.add('active');
        }

        // Show chat area
        const welcomeScreen = document.getElementById('welcomeScreen');
        const chatArea = document.getElementById('chatArea');
        
        if (welcomeScreen) welcomeScreen.classList.add('hidden');
        if (chatArea) chatArea.classList.remove('hidden');

        // Update chat header
        const chatContactAvatar = document.getElementById('chatContactAvatar');
        const chatContactName = document.getElementById('chatContactName');
        const chatContactStatus = document.getElementById('chatContactStatus');
        
        if (chatContactAvatar) chatContactAvatar.textContent = contact.avatar;
        if (chatContactName) chatContactName.textContent = contact.name;
        if (chatContactStatus) {
            chatContactStatus.textContent = type === 'user' ? contact.status : `${contact.members.length} members`;
        }

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
                ${message.senderId === this.currentUser.id || (this.currentUser.role === 'admin') ? `
                <div class="message-actions">
                    <button class="message-action-btn delete-message-btn" data-message-id="${message.id}">🗑️</button>
                </div>` : ''}
            </div>
        `;

        const deleteBtn = div.querySelector('.delete-message-btn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => this.deleteMessage(message.id));
        }

        return div;
    }

    processMessageContent(content) {
        // Process @mentions
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
    }

    deleteMessage(messageId) {
        if (!confirm('Delete this message?')) return;

        this.messages = this.messages.filter(m => m.id !== messageId);
        this.saveData();
        this.renderMessages();
        this.renderContactList();
        this.showNotification('Message deleted', 'Message removed successfully', 'success');
    }

    // Additional functionality methods (emoji, file upload, settings, etc.)
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
        
        const emojiPicker = document.getElementById('emojiPicker');
        if (emojiPicker) emojiPicker.classList.add('hidden');
    }

    handleFileUpload(files) {
        if (!files.length || !this.currentChat) return;

        Array.from(files).forEach(file => {
            if (file.size > 10 * 1024 * 1024) {
                this.showNotification('Error', 'File size must be less than 10MB', 'error');
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

    showSettings() {
        const modal = document.getElementById('settingsModal');
        if (!modal) return;
        
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        
        if (this.currentUser && this.currentUser.role === 'admin') {
            const adminControls = document.getElementById('adminControls');
            if (adminControls) {
                adminControls.classList.remove('hidden');
            }
            
            const companyNameInput = document.getElementById('companyNameInput');
            if (companyNameInput) {
                companyNameInput.value = this.companySettings.name;
            }
        }
    }

    saveSettingsData() {
        if (this.currentUser && this.currentUser.role === 'admin') {
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
        const groupNameInput = document.getElementById('groupNameInput');
        const groupName = groupNameInput ? groupNameInput.value.trim() : '';
        const selectedMembers = Array.from(document.querySelectorAll('#memberSelectionList input:checked'))
            .map(cb => parseInt(cb.value));

        if (!groupName) {
            this.showNotification('Error', 'Please enter a group name', 'error');
            return;
        }

        if (selectedMembers.length === 0) {
            this.showNotification('Error', 'Please select at least one member', 'error');
            return;
        }

        const group = {
            id: Date.now(),
            name: groupName,
            members: [this.currentUser.id, ...selectedMembers],
            admin: this.currentUser.id,
            avatar: '👥',
            description: document.getElementById('groupDescriptionInput')?.value.trim() || ''
        };

        this.groups.push(group);
        this.saveData();
        this.renderContactList();
        this.hideModal('newGroupModal');
        this.showNotification('Group created! 👥', `"${groupName}" has been created`, 'success');

        // Clear form
        if (groupNameInput) groupNameInput.value = '';
        const descInput = document.getElementById('groupDescriptionInput');
        if (descInput) descInput.value = '';
    }

    toggleChatInfo() {
        const panel = document.getElementById('chatInfoPanel');
        if (panel && panel.classList.contains('hidden')) {
            this.showChatInfo();
        } else {
            this.hideChatInfo();
        }
    }

    showChatInfo() {
        if (!this.currentChat) return;

        const panel = document.getElementById('chatInfoPanel');
        if (!panel) return;
        
        panel.classList.remove('hidden');

        const infoPanelAvatar = document.getElementById('infoPanelAvatar');
        const infoPanelName = document.getElementById('infoPanelName');
        const infoPanelPhone = document.getElementById('infoPanelPhone');
        
        if (infoPanelAvatar) infoPanelAvatar.textContent = this.currentChat.contact.avatar;
        if (infoPanelName) infoPanelName.textContent = this.currentChat.contact.name;
        
        if (this.currentChat.type === 'user') {
            if (infoPanelPhone) infoPanelPhone.textContent = this.currentChat.contact.phone;
            const groupSection = document.getElementById('groupMembersSection');
            if (groupSection) groupSection.classList.add('hidden');
        } else {
            if (infoPanelPhone) infoPanelPhone.textContent = `${this.currentChat.contact.members.length} members`;
            const groupSection = document.getElementById('groupMembersSection');
            if (groupSection) groupSection.classList.remove('hidden');
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
        if (!membersList || !this.currentChat) return;
        
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

    logout() {
        if (this.currentUser) {
            this.currentUser.status = 'offline';
            this.currentUser.lastSeen = new Date().toISOString();
            this.saveData();
        }
        
        this.currentUser = null;
        this.currentChat = null;
        this.showUserLogin();
        this.showNotification('Logged out', 'See you next time! 👋', 'info');
    }

    disableApp() {
        if (confirm('Disable the chat application temporarily? Users will not be able to access it.')) {
            this.showNotification('App Disabled', 'Chat application has been temporarily disabled', 'warning');
            // In a real app, this would disable access
        }
    }

    clearAllData() {
        this.users = [];
        this.messages = [];
        this.groups = [];
        this.companySettings.qrCodeGenerated = false;
        this.companySettings.qrCode = null;
        
        localStorage.clear();
        this.showNotification('Data cleared', 'All data has been cleared', 'success');
        this.updateDashboard();
    }

    downloadData() {
        const data = {
            users: this.users,
            messages: this.messages,
            groups: this.groups,
            settings: this.companySettings
        };
        
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `enterprise-chat-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification('Data downloaded', 'Chat data has been downloaded', 'success');
    }

    updateCompanyBranding() {
        const elements = ['companyName', 'dashboardCompanyName', 'headerCompanyName'];
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

    handleLogoUpload(file) {
        if (!file || !file.type.startsWith('image/')) {
            this.showNotification('Error', 'Please select an image file', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                if (img.width < 170 || img.height < 66) {
                    this.showNotification('Error', 'Logo must be at least 170x66 pixels', 'error');
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

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
            modal.style.display = 'none';
        }
    }

    closeAllModals() {
        const modalIds = ['addUsersModal', 'importContactsModal', 'qrCodeModal', 'settingsModal', 'newGroupModal'];
        modalIds.forEach(modalId => {
            this.hideModal(modalId);
        });
        this.hideChatInfo();
        
        const emojiPicker = document.getElementById('emojiPicker');
        if (emojiPicker) {
            emojiPicker.classList.add('hidden');
        }
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

        // Browser notification
        if (Notification.permission === 'granted' && type !== 'info') {
            new Notification(title, {
                body: message,
                icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><text y=".9em" font-size="90">💬</text></svg>'
            });
        } else if (Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }
}

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM loaded, initializing TechCorp Enterprise Chat...');
    
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }

    // Initialize the app
    window.enterpriseChat = new EnterpriseChat();
});
// Dawn Technologies Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeSidebar();
    initializeDateTime();
    initializeModals();
    initializeAnimations();
    initializeInteractivity();
    initializeResponsive();
    initializeEvents();
    initializeTeamSpotlights();
    initializeThemeToggle();
});

// Sidebar functionality
function initializeSidebar() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const footer = document.querySelector('.footer');
    
    let sidebarCollapsed = false;
    
    sidebarToggle.addEventListener('click', function() {
        sidebarCollapsed = !sidebarCollapsed;
        
        if (sidebarCollapsed) {
            sidebar.classList.add('collapsed');
            mainContent.classList.add('expanded');
            footer.classList.add('expanded');
        } else {
            sidebar.classList.remove('collapsed');
            mainContent.classList.remove('expanded');
            footer.classList.remove('expanded');
        }
        
        // Add animation class
        sidebar.classList.add('slide-in-left');
        setTimeout(() => {
            sidebar.classList.remove('slide-in-left');
        }, 300);
    });
    
    // Mobile sidebar toggle
    function handleMobileSidebar() {
        if (window.innerWidth <= 600) {
            sidebarToggle.addEventListener('click', function() {
                sidebar.classList.toggle('active');
            });
            
            // Close sidebar when clicking outside
            document.addEventListener('click', function(e) {
                if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                    sidebar.classList.remove('active');
                }
            });
        }
    }
    
    handleMobileSidebar();
    window.addEventListener('resize', handleMobileSidebar);
    
    // Menu item interactions
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            menuItems.forEach(i => i.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
            
            // Add pulse animation
            this.classList.add('pulse');
            setTimeout(() => {
                this.classList.remove('pulse');
            }, 1000);
        });
    });
}

// Date and time functionality
function initializeDateTime() {
    const currentDateElement = document.getElementById('currentDate');
    
    function updateDateTime() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        const formattedDate = now.toLocaleDateString('en-US', options);
        currentDateElement.textContent = formattedDate;
    }
    
    // Update immediately and then every minute
    updateDateTime();
    setInterval(updateDateTime, 60000);
    
    // Add greeting based on time
    const userName = document.getElementById('userName');
    const hour = new Date().getHours();
    let greeting = 'Welcome back';
    
    if (hour < 12) {
        greeting = 'Good morning';
    } else if (hour < 17) {
        greeting = 'Good afternoon';
    } else {
        greeting = 'Good evening';
    }
    
    userName.parentElement.innerHTML = `${greeting}, Maxwell!`;
}

// Modal functionality
function initializeModals() {
    const modal = document.getElementById('announcementModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.querySelector('.close-modal');
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    
    // Sample announcement data
    const announcements = {
        'Q4 All-Hands Meeting': {
            title: 'Q4 All-Hands Meeting',
            content: `Join us for our quarterly review and planning session on December 15th, 2024.
            
            📍 Location: Main Conference Room (Building A, 3rd Floor)
            🕐 Time: 2:00 PM - 4:00 PM
            
            Agenda:
            • Q4 Performance Review
            • 2025 Strategic Planning
            • Team Recognition Awards
            • Q&A Session
            
            Please bring your laptops and quarterly reports. Light refreshments will be provided.
            
            For remote attendees, the meeting link will be shared via email 30 minutes before the session.`
        },
        'New Security Protocols': {
            title: 'New Security Protocols',
            content: `Important security updates are now in effect as of December 12th, 2024.
            
            🔐 Key Changes:
            • Two-factor authentication is now mandatory for all accounts
            • Password requirements have been updated (minimum 12 characters)
            • VPN access required for all remote connections
            • New device registration process
            
            📋 Action Required:
            1. Update your password by December 20th
            2. Set up 2FA in your account settings
            3. Download the new VPN client from the IT portal
            4. Complete the security training module
            
            For assistance, contact IT Support at ext. 2345 or it-support@dawntechnologies.com`
        },
        'Holiday Schedule': {
            title: 'Holiday Schedule',
            content: `Office closure dates and holiday arrangements for the upcoming season.
            
            🎄 Holiday Closures:
            • December 24th - Christmas Eve (Half Day)
            • December 25th - Christmas Day (Closed)
            • December 26th - Boxing Day (Closed)
            • January 1st - New Year's Day (Closed)
            
            🏢 Office Operations:
            • Reduced staff from Dec 27-30
            • Normal operations resume January 2nd
            • Emergency contact: +234 (555) 123-HELP
            
            🎁 Holiday Party:
            Date: December 22nd, 6:00 PM
            Location: Grand Ballroom, Downtown Hotel
            RSVP required by December 18th
            
            Wishing everyone a safe and happy holiday season!`
        }
    };
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const announcementItem = this.closest('.announcement-item');
            const title = announcementItem.querySelector('h4').textContent;
            
            if (announcements[title]) {
                modalTitle.textContent = announcements[title].title;
                modalContent.innerHTML = announcements[title].content.replace(/\n/g, '<br>');
                modal.style.display = 'block';
                modal.classList.add('fade-in');
            }
        });
    });
    
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        modal.classList.remove('fade-in');
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            modal.classList.remove('fade-in');
        }
    });
    
    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            modal.classList.remove('fade-in');
        }
    });
}

// Animation and visual effects
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    const elementsToAnimate = document.querySelectorAll('section, .quick-link-card, .announcement-item, .task-item, .activity-item');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
    
    // Staggered animation for quick links
    const quickLinkCards = document.querySelectorAll('.quick-link-card');
    quickLinkCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 100);
    });
    
    // Typing effect for welcome message
    const welcomeText = document.querySelector('.welcome-content h1');
    if (welcomeText) {
        const originalText = welcomeText.innerHTML;
        welcomeText.innerHTML = '';
        let i = 0;
        
        function typeWriter() {
            if (i < originalText.length) {
                welcomeText.innerHTML += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        setTimeout(typeWriter, 500);
    }
}

// Interactive features
function initializeInteractivity() {
    // Quick link card interactions
    const quickLinkCards = document.querySelectorAll('.quick-link-card');
    quickLinkCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            showNotification(`Opening ${title}...`, 'info');
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Hover effect with icon rotation
        const icon = card.querySelector('.card-icon i');
        card.addEventListener('mouseenter', function() {
            icon.style.transform = 'rotate(10deg) scale(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            icon.style.transform = 'rotate(0deg) scale(1)';
        });
    });
    
    // Task checkbox interactions
    const taskCheckboxes = document.querySelectorAll('.task-checkbox input[type="checkbox"]');
    taskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const taskItem = this.closest('.task-item');
            const taskContent = taskItem.querySelector('.task-content');
            
            if (this.checked) {
                taskContent.classList.add('completed');
                taskItem.style.opacity = '0.7';
                showNotification('Task completed!', 'success');
            } else {
                taskContent.classList.remove('completed');
                taskItem.style.opacity = '1';
                showNotification('Task reopened', 'info');
            }
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        if (searchTerm.length > 2) {
            // Simulate search results
            console.log(`Searching for: ${searchTerm}`);
            // In a real application, this would trigger an API call
        }
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = this.value;
            if (searchTerm.trim()) {
                showNotification(`Searching for "${searchTerm}"...`, 'info');
                // Simulate search
                setTimeout(() => {
                    showNotification(`Found 5 results for "${searchTerm}"`, 'success');
                }, 1000);
            }
        }
    });
    
    // Navigation icon interactions
    const navIcons = document.querySelectorAll('.nav-icon');
    navIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const iconType = this.querySelector('i').classList[1]; // Get the icon class
            
            switch(iconType) {
                case 'fa-user-circle':
                    showNotification('Opening user profile...', 'info');
                    break;
                case 'fa-bell':
                    showNotification('You have 3 new notifications', 'info');
                    // Clear notification badge
                    const badge = this.querySelector('.notification-badge');
                    if (badge) {
                        badge.style.display = 'none';
                    }
                    break;
                case 'fa-cog':
                    showNotification('Opening settings...', 'info');
                    break;
            }
        });
    });
    
    // Activity feed interactions
    const activityItems = document.querySelectorAll('.activity-item');
    activityItems.forEach(item => {
        item.addEventListener('click', function() {
            const content = this.querySelector('.activity-content p').textContent;
            showNotification('Opening activity details...', 'info');
        });
      });
}

// Upcoming Events functionality
function initializeEvents() {
    const eventItems = document.querySelectorAll('.event-item');
    const eventButtons = document.querySelectorAll('.event-btn');
    
    // Event item interactions
    eventItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Don't trigger if clicking on buttons
            if (e.target.classList.contains('event-btn')) return;
            
            const eventTitle = this.querySelector('h4').textContent;
            showNotification(`Opening details for ${eventTitle}...`, 'info');
            
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Hover effect for event date
        const eventDate = item.querySelector('.event-date');
        item.addEventListener('mouseenter', function() {
            eventDate.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            eventDate.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Event button interactions
    eventButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const eventItem = this.closest('.event-item');
            const eventTitle = eventItem.querySelector('h4').textContent;
            const buttonText = this.textContent;
            
            // Add loading state
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
                
                if (buttonText.includes('Join') || buttonText.includes('RSVP') || buttonText.includes('Attend')) {
                    showNotification(`Successfully registered for ${eventTitle}!`, 'success');
                } else {
                    showNotification(`Opening details for ${eventTitle}...`, 'info');
                }
            }, 1000);
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Add countdown timer for upcoming events
    updateEventCountdowns();
    setInterval(updateEventCountdowns, 60000); // Update every minute
}

function updateEventCountdowns() {
    const eventItems = document.querySelectorAll('.event-item');
    
    eventItems.forEach(item => {
        const dayElement = item.querySelector('.event-day');
        const monthElement = item.querySelector('.event-month');
        
        if (dayElement && monthElement) {
            const day = parseInt(dayElement.textContent);
            const month = monthElement.textContent;
            
            // Create date object for the event
            const currentYear = new Date().getFullYear();
            const monthIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(month);
            
            if (monthIndex !== -1) {
                const eventDate = new Date(currentYear, monthIndex, day);
                const now = new Date();
                const timeDiff = eventDate.getTime() - now.getTime();
                const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                
                // Add urgency indicator
                if (daysDiff <= 3 && daysDiff > 0) {
                    item.classList.add('urgent-event');
                    if (!item.querySelector('.urgency-indicator')) {
                        const indicator = document.createElement('div');
                        indicator.className = 'urgency-indicator';
                        indicator.innerHTML = '<i class="fas fa-exclamation-circle"></i> Soon';
                        item.querySelector('.event-details').appendChild(indicator);
                    }
                }
            }
        }
    });
}

// Team Spotlights functionality
function initializeTeamSpotlights() {
    const spotlightItems = document.querySelectorAll('.spotlight-item');
    
    spotlightItems.forEach(item => {
        item.addEventListener('click', function() {
            const name = this.querySelector('h4').textContent;
            const role = this.querySelector('.spotlight-role').textContent;
            showNotification(`Opening profile for ${name} - ${role}`, 'info');
            
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Avatar hover effect
        const avatar = item.querySelector('.avatar-img');
        const badge = item.querySelector('.spotlight-badge');
        
        item.addEventListener('mouseenter', function() {
            avatar.style.transform = 'scale(1.1)';
            badge.style.transform = 'scale(1.2) rotate(10deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            avatar.style.transform = 'scale(1)';
            badge.style.transform = 'scale(1) rotate(0deg)';
        });
        
        // Stats animation on hover
        const stats = item.querySelectorAll('.stat-number');
        item.addEventListener('mouseenter', function() {
            stats.forEach((stat, index) => {
                setTimeout(() => {
                    stat.style.transform = 'scale(1.2)';
                    stat.style.color = 'var(--primary-color)';
                }, index * 100);
            });
        });
        
        item.addEventListener('mouseleave', function() {
            stats.forEach(stat => {
                stat.style.transform = 'scale(1)';
                stat.style.color = '';
            });
        });
    });
    
    // Add achievement badges animation
    animateAchievementBadges();
}

function animateAchievementBadges() {
    const badges = document.querySelectorAll('.spotlight-badge');
    
    badges.forEach((badge, index) => {
        // Staggered animation
        setTimeout(() => {
            badge.style.animation = 'pulse 2s infinite';
        }, index * 500);
        
        // Different colors for different badge types
        const icon = badge.querySelector('i');
        if (icon.classList.contains('fa-star')) {
            badge.style.background = 'linear-gradient(45deg, #ffd700, #ffed4e)';
        } else if (icon.classList.contains('fa-trophy')) {
            badge.style.background = 'linear-gradient(45deg, #ff6b35, #f7931e)';
        } else if (icon.classList.contains('fa-medal')) {
            badge.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
        }
    });
}

// Theme Toggle functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Add click animation
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Show notification
        showNotification(`Switched to ${newTheme} mode`, 'success');
    });
    
    // Keyboard shortcut for theme toggle (Ctrl/Cmd + Shift + T)
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
            e.preventDefault();
            themeToggle.click();
        }
    });
}

function setTheme(theme) {
    const body = document.body;
    const themeIcon = document.getElementById('themeIcon');
    
    if (theme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
        themeIcon.style.color = '#fbbf24';
    } else {
        body.setAttribute('data-theme', 'light');
        themeIcon.className = 'fas fa-moon';
        themeIcon.style.color = '';
    }
    
    // Add smooth transition effect
    body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    // Update meta theme-color for mobile browsers
    updateMetaThemeColor(theme);
}

function updateMetaThemeColor(theme) {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.name = 'theme-color';
        document.head.appendChild(metaThemeColor);
    }
    
    if (theme === 'dark') {
        metaThemeColor.content = '#0f172a';
    } else {
        metaThemeColor.content = '#ffffff';
    }
}

// Auto theme detection based on system preference
function initializeAutoTheme() {
    if (!localStorage.getItem('theme')) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const autoTheme = prefersDark ? 'dark' : 'light';
        setTheme(autoTheme);
        localStorage.setItem('theme', autoTheme);
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!localStorage.getItem('theme-manual')) {
            const newTheme = e.matches ? 'dark' : 'light';
            setTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        }
    });
}

// Responsive behavior
function initializeResponsive() {
    function handleResize() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');
        const footer = document.querySelector('.footer');
        
        if (window.innerWidth <= 600) {
            // Mobile behavior
            sidebar.classList.remove('collapsed');
            mainContent.classList.remove('expanded');
            footer.classList.remove('expanded');
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
    
    // Touch gestures for mobile
    if ('ontouchstart' in window) {
        let startX = 0;
        let startY = 0;
        
        document.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', function(e) {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Swipe right to open sidebar (mobile)
            if (Math.abs(diffX) > Math.abs(diffY) && diffX < -100 && window.innerWidth <= 600) {
                const sidebar = document.getElementById('sidebar');
                sidebar.classList.add('active');
            }
            
            // Swipe left to close sidebar (mobile)
            if (Math.abs(diffX) > Math.abs(diffY) && diffX > 100 && window.innerWidth <= 600) {
                const sidebar = document.getElementById('sidebar');
                sidebar.classList.remove('active');
            }
        });
    }
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '90px',
        right: '20px',
        background: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: '9999',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        fontWeight: '500',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease-in-out',
        maxWidth: '300px'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading states
function addLoadingState(element) {
    element.style.opacity = '0.6';
    element.style.pointerEvents = 'none';
    
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    element.appendChild(spinner);
}

function removeLoadingState(element) {
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
    
    const spinner = element.querySelector('.loading-spinner');
    if (spinner) {
        spinner.remove();
    }
}

// Initialize tooltips
function initializeTooltips() {
    const elementsWithTooltips = document.querySelectorAll('[data-tooltip]');
    
    elementsWithTooltips.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            
            Object.assign(tooltip.style, {
                position: 'absolute',
                background: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '4px',
                fontSize: '12px',
                whiteSpace: 'nowrap',
                zIndex: '10000',
                pointerEvents: 'none'
            });
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

// Initialize on load
window.addEventListener('load', function() {
    initializeTooltips();
    
    // Add fade-in animation to the whole page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});


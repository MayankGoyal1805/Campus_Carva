document.addEventListener('DOMContentLoaded', function() {
    // Post interaction functionality
    const likeButtons = document.querySelectorAll('.stat-item i.fa-thumbs-up');
    const commentButtons = document.querySelectorAll('.stat-item i.fa-comment');
    const shareButtons = document.querySelectorAll('.stat-item i.fa-share');
    
    // Like functionality
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const likeCount = this.nextElementSibling;
            const currentCount = parseInt(likeCount.textContent);
            
            if (this.classList.contains('liked')) {
                this.classList.remove('liked');
                likeCount.textContent = currentCount - 1;
            } else {
                this.classList.add('liked');
                likeCount.textContent = currentCount + 1;
                
                // Trigger like animation
                const likeAnim = document.createElement('div');
                likeAnim.className = 'like-animation';
                this.parentElement.appendChild(likeAnim);
                
                setTimeout(() => {
                    likeAnim.remove();
                }, 1000);
            }
        });
    });
    
    // Comment focus functionality
    commentButtons.forEach(button => {
        button.addEventListener('click', function() {
            const postElement = this.closest('.feed-post');
            const commentInput = postElement.querySelector('.add-comment input');
            
            if (commentInput) {
                commentInput.focus();
                commentInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
    
    // Share functionality
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const shareDialog = document.createElement('div');
            shareDialog.className = 'share-dialog';
            shareDialog.innerHTML = `
                <div class="share-content">
                    <div class="share-header">
                        <h4>Share Post</h4>
                        <button class="close-share"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="share-options">
                        <button><i class="fab fa-facebook"></i> Facebook</button>
                        <button><i class="fab fa-twitter"></i> Twitter</button>
                        <button><i class="fab fa-linkedin"></i> LinkedIn</button>
                        <button><i class="fab fa-whatsapp"></i> WhatsApp</button>
                        <button><i class="fas fa-envelope"></i> Email</button>
                        <button><i class="fas fa-link"></i> Copy Link</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(shareDialog);
            
            // Animation to show dialog
            setTimeout(() => {
                shareDialog.classList.add('active');
            }, 10);
            
            // Close share dialog
            shareDialog.querySelector('.close-share').addEventListener('click', function() {
                shareDialog.classList.remove('active');
                setTimeout(() => {
                    shareDialog.remove();
                }, 300);
            });
            
            // Close when clicking outside
            shareDialog.addEventListener('click', function(e) {
                if (e.target === shareDialog) {
                    shareDialog.querySelector('.close-share').click();
                }
            });
        });
    });
    
    // Comment interaction
    const commentInputs = document.querySelectorAll('.add-comment input');
    
    commentInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && this.value.trim() !== '') {
                const commentContent = this.value;
                const commentSection = this.closest('.post-comments');
                const newComment = document.createElement('div');
                newComment.className = 'comment';
                
                newComment.innerHTML = `
                    <img src="https://placehold.co/40x40?text=You" alt="Your Profile">
                    <div class="comment-content">
                        <h5>Ananya Singh</h5>
                        <p>${commentContent}</p>
                        <div class="comment-actions">
                            <span>Like</span>
                            <span>Reply</span>
                            <span>Just now</span>
                        </div>
                    </div>
                `;
                
                // Insert new comment before the add comment element
                commentSection.insertBefore(newComment, this.closest('.add-comment'));
                
                // Clear input
                this.value = '';
                
                // Update comment count
                const commentCountElement = this.closest('.feed-post').querySelector('.stat-item i.fa-comment + span');
                const currentCount = parseInt(commentCountElement.textContent);
                commentCountElement.textContent = currentCount + 1;
            }
        });
    });
    
    // Post creation functionality
    const postInput = document.querySelector('.post-input input');
    const postButton = document.querySelector('.post-button');
    
    if (postInput && postButton) {
        // Enable/disable post button based on input
        postInput.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                postButton.classList.add('active');
            } else {
                postButton.classList.remove('active');
            }
        });
        
        // Create new post
        postButton.addEventListener('click', function() {
            if (postInput.value.trim() !== '') {
                const postContent = postInput.value;
                const feedElement = document.querySelector('.feed');
                const newPost = document.createElement('div');
                newPost.className = 'feed-post';
                
                newPost.innerHTML = `
                    <div class="post-header">
                        <img src="https://placehold.co/50x50?text=You" alt="Your Profile">
                        <div>
                            <h4>Ananya Singh</h4>
                            <p>Delhi University • Just now</p>
                        </div>
                        <div class="post-actions">
                            <button><i class="fas fa-ellipsis-h"></i></button>
                        </div>
                    </div>
                    <div class="post-content">
                        <p>${postContent}</p>
                    </div>
                    <div class="post-stats">
                        <div class="stat-item">
                            <i class="fas fa-thumbs-up"></i>
                            <span>0</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-comment"></i>
                            <span>0</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-share"></i>
                            <span>0</span>
                        </div>
                    </div>
                    <div class="post-comments">
                        <div class="add-comment">
                            <img src="https://placehold.co/40x40?text=You" alt="Your Profile">
                            <input type="text" placeholder="Write a comment...">
                        </div>
                    </div>
                `;
                
                // Insert new post at the beginning of the feed
                feedElement.insertBefore(newPost, feedElement.firstChild);
                
                // Clear input
                postInput.value = '';
                postButton.classList.remove('active');
                
                // Add event listeners to new post elements
                const newLikeButton = newPost.querySelector('.stat-item i.fa-thumbs-up');
                const newCommentButton = newPost.querySelector('.stat-item i.fa-comment');
                const newShareButton = newPost.querySelector('.stat-item i.fa-share');
                const newCommentInput = newPost.querySelector('.add-comment input');
                
                addPostEventListeners(newLikeButton, newCommentButton, newShareButton, newCommentInput);
                
                // Display success toast
                showToast('Post created successfully!');
            }
        });
    }
    
    function addPostEventListeners(likeBtn, commentBtn, shareBtn, commentInput) {
        if (likeBtn) {
            likeBtn.addEventListener('click', function() {
                const likeCount = this.nextElementSibling;
                const currentCount = parseInt(likeCount.textContent);
                
                if (this.classList.contains('liked')) {
                    this.classList.remove('liked');
                    likeCount.textContent = currentCount - 1;
                } else {
                    this.classList.add('liked');
                    likeCount.textContent = currentCount + 1;
                }
            });
        }
        
        if (commentBtn) {
            commentBtn.addEventListener('click', function() {
                const commentInputElem = this.closest('.feed-post').querySelector('.add-comment input');
                if (commentInputElem) {
                    commentInputElem.focus();
                }
            });
        }
        
        if (shareBtn) {
            shareBtn.addEventListener('click', function() {
                showToast('Share functionality coming soon!');
            });
        }
        
        if (commentInput) {
            commentInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && this.value.trim() !== '') {
                    const commentContent = this.value;
                    const commentSection = this.closest('.post-comments');
                    const newComment = document.createElement('div');
                    newComment.className = 'comment';
                    
                    newComment.innerHTML = `
                        <img src="https://placehold.co/40x40?text=You" alt="Your Profile">
                        <div class="comment-content">
                            <h5>Ananya Singh</h5>
                            <p>${commentContent}</p>
                            <div class="comment-actions">
                                <span>Like</span>
                                <span>Reply</span>
                                <span>Just now</span>
                            </div>
                        </div>
                    `;
                    
                    commentSection.insertBefore(newComment, this.closest('.add-comment'));
                    this.value = '';
                    
                    const commentCountElement = this.closest('.feed-post').querySelector('.stat-item i.fa-comment + span');
                    const currentCount = parseInt(commentCountElement.textContent);
                    commentCountElement.textContent = currentCount + 1;
                }
            });
        }
    }

    // Join community functionality
    const joinButtons = document.querySelectorAll('.join-btn');
    
    joinButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent === 'Join') {
                this.textContent = 'Joined';
                this.classList.add('joined');
                showToast('Community joined successfully!');
            } else {
                this.textContent = 'Join';
                this.classList.remove('joined');
                showToast('Left community.');
            }
        });
    });

    // Event registration
    const eventButtons = document.querySelectorAll('.event-info');
    
    eventButtons.forEach(eventInfo => {
        eventInfo.addEventListener('click', function() {
            const eventTitle = this.querySelector('h4').textContent;
            showEventModal(eventTitle);
        });
    });

    function showEventModal(eventName) {
        const modal = document.createElement('div');
        modal.className = 'event-modal';
        modal.innerHTML = `
            <div class="event-modal-content">
                <div class="event-modal-header">
                    <h3>Register for ${eventName}</h3>
                    <button class="close-modal"><i class="fas fa-times"></i></button>
                </div>
                <div class="event-modal-body">
                    <form id="event-form">
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" value="Ananya Singh" readonly>
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" value="ananya.singh@example.com" readonly>
                        </div>
                        <div class="form-group">
                            <label>Institution</label>
                            <input type="text" value="Delhi University" readonly>
                        </div>
                        <div class="form-group">
                            <label>Additional Notes</label>
                            <textarea placeholder="Any specific requirements or questions?"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Register</button>
                    </form>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        modal.querySelector('.close-modal').addEventListener('click', function() {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
            }, 300);
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.querySelector('.close-modal').click();
            }
        });
        
        const eventForm = modal.querySelector('#event-form');
        eventForm.addEventListener('submit', function(e) {
            e.preventDefault();
            modal.querySelector('.close-modal').click();
            showToast(`Registered for ${eventName} successfully!`);
        });
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    // Add CSS for dynamic elements
    const dynamicStyles = document.createElement('style');
    dynamicStyles.innerHTML = `
        .liked {
            color: var(--primary-color) !important;
        }
        
        .like-animation {
            position: absolute;
            width: 30px;
            height: 30px;
            background-color: var(--primary-color);
            border-radius: 50%;
            animation: likeAnim 1s forwards;
            opacity: 0;
        }
        
        @keyframes likeAnim {
            0% {
                transform: scale(0);
                opacity: 0.8;
            }
            100% {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .share-dialog {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .share-dialog.active {
            opacity: 1;
        }
        
        .share-content {
            width: 90%;
            max-width: 400px;
            background-color: white;
            border-radius: var(--border-radius);
            overflow: hidden;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        }
        
        .share-dialog.active .share-content {
            transform: scale(1);
        }
        
        .share-header {
            padding: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .share-header h4 {
            margin: 0;
        }
        
        .close-share {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 1.2rem;
            color: var(--gray-color);
        }
        
        .share-options {
            padding: 1rem;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
        }
        
        .share-options button {
            padding: 0.8rem;
            border: 1px solid #ddd;
            border-radius: var(--border-radius);
            background-color: white;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
            transition: var(--transition);
        }
        
        .share-options button:hover {
            background-color: #f5f7fa;
            border-color: var(--primary-color);
        }
        
        .share-options button i {
            font-size: 1.2rem;
        }
        
        .post-button.active {
            background-color: var(--primary-color);
            color: white;
        }
        
        .toast {
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%) translateY(30px);
            padding: 0.8rem 1.5rem;
            background-color: var(--dark-color);
            color: white;
            border-radius: 30px;
            box-shadow: var(--shadow-dark);
            opacity: 0;
            transition: transform 0.3s ease, opacity 0.3s ease;
            z-index: 1100;
        }
        
        .toast.show {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        
        .joined {
            background-color: var(--primary-color) !important;
            color: white !important;
        }
        
        .event-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .event-modal.active {
            opacity: 1;
        }
        
        .event-modal-content {
            width: 90%;
            max-width: 500px;
            background-color: white;
            border-radius: var(--border-radius);
            overflow: hidden;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        }
        
        .event-modal.active .event-modal-content {
            transform: scale(1);
        }
        
        .event-modal-header {
            padding: 1rem 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .event-modal-header h3 {
            margin: 0;
        }
        
        .close-modal {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 1.2rem;
            color: var(--gray-color);
        }
        
        .event-modal-body {
            padding: 1.5rem;
        }
        
        .form-group {
            margin-bottom: 1rem;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
        }
        
        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 0.8rem;
            border: 1px solid #ddd;
            border-radius: var(--border-radius);
            font-family: inherit;
        }
        
        .form-group textarea {
            min-height: 100px;
            resize: vertical;
        }
    `;
    document.head.appendChild(dynamicStyles);

    // Make other elements in the sidebar clickable
    document.querySelectorAll('.sidebar-menu a, .trending-item, .post-tags span').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            showToast('Feature coming soon!');
        });
    });
});
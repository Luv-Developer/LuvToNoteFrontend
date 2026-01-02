import React from "react"
import { GoogleLogin } from '@react-oauth/google'
import {jwtDecode} from "jwt-decode"
import axios from "axios"

const Signin = () => {
            document.addEventListener('DOMContentLoaded', function() {
            // Toggle password visibility
            const togglePassword = document.getElementById('togglePassword');
            const passwordInput = document.getElementById('password');
            
            togglePassword.addEventListener('click', function() {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                
                // Toggle eye icon
                const icon = this.querySelector('i');
                if (type === 'password') {
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                } else {
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                }
            });
            
            // Remember me checkbox
            const rememberMe = document.getElementById('rememberMe');
            const checkbox = rememberMe.querySelector('.checkbox');
            
            rememberMe.addEventListener('click', function() {
                checkbox.classList.toggle('checked');
            });
            
            // Google Sign In button
            const googleSignIn = document.getElementById('googleSignIn');
           
            /*
            googleSignIn.addEventListener('click', function() {
                simulateGoogleSignIn();
            });
            */

            
            // Show notification
            function showNotification(message, type) {
                // Remove existing notification
                const existingNotification = document.querySelector('.notification');
                if (existingNotification) {
                    existingNotification.style.animation = 'slideOutRight 0.3s ease forwards';
                    setTimeout(() => existingNotification.remove(), 300);
                }
                
                // Create notification
                const notification = document.createElement('div');
                notification.className = `notification ${type}`;
                notification.innerHTML = `
                    <div class="notification-content">
                        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                        <span>${message}</span>
                    </div>
                    <button class="notification-close">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                
                document.body.appendChild(notification);
                
                // Close button functionality
                const closeButton = notification.querySelector('.notification-close');
                closeButton.addEventListener('click', function() {
                    notification.style.animation = 'slideOutRight 0.3s ease forwards';
                    setTimeout(() => notification.remove(), 300);
                });
                
                // Auto remove after 5 seconds
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.style.animation = 'slideOutRight 0.3s ease forwards';
                        setTimeout(() => notification.remove(), 300);
                    }
                }, 5000);
            }
            
            /*
            // Simulate sign in process
            function simulateSignIn() {
                const signinButton = signinForm.querySelector('.signin-button');
                const originalText = signinButton.innerHTML;
                
                // Show loading state
                signinButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
                signinButton.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    // Reset button
                    signinButton.innerHTML = originalText;
                    signinButton.disabled = false;
                    
                    // Show success message
                    showNotification('Successfully signed in! Welcome to LuvToNote.', 'success');
                    
                    // In a real app, you would redirect here
                    // setTimeout(() => window.location.href = '/dashboard', 2000);
                }, 2000);
            }
            
            // Simulate Google sign in
            function simulateGoogleSignIn() {
                const googleButton = document.getElementById('googleSignIn');
                const originalText = googleButton.innerHTML;
                
                // Show loading state
                googleButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting to Google...';
                googleButton.disabled = true;
                
                // Simulate Google OAuth process
                setTimeout(() => {
                    // Reset button
                    googleButton.innerHTML = originalText;
                    googleButton.disabled = false;
                    
                    // Show success message
                    showNotification('Google Sign In successful! Loading your notes...', 'success');
                    
                    // In a real app, you would handle Google OAuth callback here
                }, 2000);
            }
                */
            
            // Add hover animations to advantage cards
            const advantageCards = document.querySelectorAll('.advantage-card');
            
            advantageCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    const icon = this.querySelector('.advantage-icon i');
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                    icon.style.transition = 'transform 0.3s ease';
                });
                
                card.addEventListener('mouseleave', function() {
                    const icon = this.querySelector('.advantage-icon i');
                    icon.style.transform = 'scale(1) rotate(0deg)';
                });
            });
            
            // Add floating animation to sign in card
            const signinCard = document.querySelector('.signin-card');
            
            function addFloatingEffect() {
                signinCard.style.transition = 'transform 0.3s ease';
                
                let mouseX = 0;
                let mouseY = 0;
                let cardX = 0;
                let cardY = 0;
                
                document.addEventListener('mousemove', (e) => {
                    mouseX = e.clientX / window.innerWidth;
                    mouseY = e.clientY / window.innerHeight;
                    
                    cardX = (mouseX - 0.5) * 10; // Max 10px movement
                    cardY = (mouseY - 0.5) * 10;
                    
                    signinCard.style.transform = `perspective(1000px) rotateY(${cardX}deg) rotateX(${-cardY}deg)`;
                });
            }
            
            // Add floating effect on desktop only
            if (window.innerWidth > 768) {
                addFloatingEffect();
            }
            
            // Animate form inputs on focus
            const formInputs = document.querySelectorAll('.form-input');
            
            formInputs.forEach(input => {
                input.addEventListener('focus', function() {
                    this.parentElement.querySelector('.input-icon').style.color = 'var(--primary)';
                });
                
                input.addEventListener('blur', function() {
                    this.parentElement.querySelector('.input-icon').style.color = 'var(--gray)';
                });
            });
            
            // Add ripple effect to buttons
            const buttons = document.querySelectorAll('.signin-button, .google-button');
            
            buttons.forEach(button => {
                button.addEventListener('click', function(e) {
                    const x = e.clientX - e.target.getBoundingClientRect().left;
                    const y = e.clientY - e.target.getBoundingClientRect().top;
                    
                    const ripple = document.createElement('span');
                    ripple.style.cssText = `
                        position: absolute;
                        background: rgba(255, 255, 255, 0.3);
                        border-radius: 50%;
                        transform: scale(0);
                        animation: ripple 0.6s linear;
                        pointer-events: none;
                        width: 100px;
                        height: 100px;
                        left: ${x - 50}px;
                        top: ${y - 50}px;
                    `;
                    
                    this.appendChild(ripple);
                    
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                });
            });
            
            // Add ripple animation keyframes
            const style = document.createElement('style');
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        })
    const signin = async(email,name,picture) => {
        try{
            let trops = {email,name,picture}
            let res = await axios.post("https://luvtonote.onrender.com/signin",trops,
                {
                    withCredentials:true,
                    headers:{
                        "Content-Type":"application/json"
                    }
                }
            ) 
            let data = res.data
            console.log(data)
            if (res.status === 200 || res.status === 201) {
                window.location.href = "https://luvtonote.onrender.com/profile"
            }
        }
        catch(err){
            console.log(err)
        }
    }
    return(
        <>
<div class="background-animation">
        <div class="floating-shape shape-1"></div>
        <div class="floating-shape shape-2"></div>
        <div class="floating-shape shape-3"></div>
    </div>
    <div class="floating-notes">
        <div class="note">
            <div class="note-content">
                <div class="note-line"></div>
                <div class="note-line short"></div>
                <div class="note-line"></div>
                <div class="note-line short"></div>
                <div class="note-line"></div>
            </div>
        </div>
        <div class="note">
            <div class="note-content">
                <div class="note-line"></div>
                <div class="note-line short"></div>
                <div class="note-line"></div>
                <div class="note-line short"></div>
                <div class="note-line"></div>
            </div>
        </div>
        <div class="note">
            <div class="note-content">
                <div class="note-line"></div>
                <div class="note-line short"></div>
                <div class="note-line"></div>
                <div class="note-line short"></div>
                <div class="note-line"></div>
            </div>
        </div>
        <div class="note">
            <div class="note-content">
                <div class="note-line"></div>
                <div class="note-line short"></div>
                <div class="note-line"></div>
                <div class="note-line short"></div>
                <div class="note-line"></div>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="features-side">
            <div class="logo">
                <div class="logo-icon">
                    <i class="fas fa-sticky-note"></i>
                </div>
                <div class="logo-text">LuvTo<span>Note</span></div>
            </div>

            <h1 class="features-title">Capture Ideas, Organize Thoughts, Boost Productivity</h1>
            <p class="features-subtitle">The perfect digital notebook for professionals and students. Store, edit, and manage your notes with powerful features designed for your success.</p>

            <div class="advantages-grid">
                <div class="advantage-card">
                    <div class="advantage-icon">
                        <i class="fas fa-bolt"></i>
                    </div>
                    <h3>Lightning Fast</h3>
                    <p>Instant access to your notes from any device. No lag, no waiting - just seamless productivity.</p>
                </div>

                <div class="advantage-card">
                    <div class="advantage-icon">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <h3>Bank-Level Security</h3>
                    <p>Your notes are encrypted end-to-end. Your thoughts are private and secure with us.</p>
                </div>

                <div class="advantage-card">
                    <div class="advantage-icon">
                        <i class="fas fa-sync-alt"></i>
                    </div>
                    <h3>Real-time Sync</h3>
                    <p>Changes sync instantly across all your devices. Never lose a note again.</p>
                </div>

                <div class="advantage-card">
                    <div class="advantage-icon">
                        <i class="fas fa-magic"></i>
                    </div>
                    <h3>Smart Organization</h3>
                    <p>AI-powered tagging and search makes finding notes effortless and intuitive.</p>
                </div>
            </div>
        </div>

        <div class="signin-side">
            <div class="signin-card">
                <h1 class="signin-title">Welcome Back</h1>
                <p class="signin-subtitle">Sign in to access your digital notebook</p>

                    <div class="form-group">
                    <button type="button" class="google-button" id="googleSignIn">
                        <i class="fab fa-google google-icon"></i>
                        <GoogleLogin
  onSuccess={credentialResponse => {
    let credentialResponsedecoded = jwtDecode(credentialResponse.credential)
    signin(credentialResponsedecoded.email,credentialResponsedecoded.name,credentialResponsedecoded.picture)
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
                    </button>
                    </div>
            </div>
        </div>
    </div>
        </>
    )
}
export default Signin
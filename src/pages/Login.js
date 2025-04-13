import React, { useState, useEffect, useRef } from "react";
import { supabase } from '../supabaseClient';
import "./Login.css";

function Login({ isOpen, onClose }) {
  const loginRef = useRef(null);
  const [isLogin, setIsLogin] = useState(false);
  const [usePhone, setUsePhone] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // For OTP countdown timer
  useEffect(() => {
    let timer;
    if (remainingTime > 0) {
      timer = setTimeout(() => setRemainingTime(remainingTime - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [remainingTime]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (loginRef.current && !loginRef.current.contains(event.target) && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Password strength checker
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0);
      return;
    }
    
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    setPasswordStrength(strength);
  }, [password]);

  // Animation for form entry
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      const formElements = document.querySelectorAll('.form-group, .social-login, .auth-switch, .separator');
      formElements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add('animate-in');
        }, 100 + (index * 50));
      });
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isLogin, usePhone]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setIsLoading(true);
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
  
    try {
      if (usePhone) {
        // Phone Number & OTP Authentication
        if (!phone || !phoneRegex.test(phone)) {
          setFormError("Please enter a valid 10-digit phone number");
          return;
        }
        if (!otpSent) {
          setFormError("Please request an OTP first");
          return;
        }
        if (!otp || otp.length !== 6) {
          setFormError("Please enter the 6-digit OTP sent to your phone");
          return;
        }
  
        console.log("OTP Verified Successfully:", phone);
        showSuccessMessage(`Authentication successful!`);
        onClose();
        return;
      }
  
      // Email & Password Authentication
      if (!email || !emailRegex.test(email)) {
        setFormError("Please enter a valid email address");
        return;
      }
      if (!password || password.length < 8) {
        setFormError("Password must be at least 8 characters long");
        return;
      }
      if (!isLogin && !fullName) {
        setFormError("Please enter your full name");
        return;
      }
  
      let result;
      if (isLogin) {
        result = await supabase.auth.signInWithPassword({ email, password });
      } else {
        result = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
          },
        });
      }
  
      if (result.error) {
        setFormError(result.error.message);
      } else {
        showSuccessMessage(`${isLogin ? "Login" : "Sign up"} successful!`);
        onClose();
      }
    } catch (err) {
      setFormError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  

  // Show success message and close modal
  const showSuccessMessage = (message) => {
    const successElement = document.createElement("div");
    successElement.className = "success-message";
    successElement.innerHTML = `
      <div class="success-icon">✓</div>
      <div class="success-text">${message}</div>
    `;
    document.body.appendChild(successElement);
    
    setTimeout(() => {
      successElement.classList.add("show");
      setTimeout(() => {
        successElement.classList.remove("show");
        setTimeout(() => {
          document.body.removeChild(successElement);
          onClose();
        }, 300);
      }, 1500);
    }, 100);
  };

  // Simulate OTP send
  const sendOtp = () => {
    const phoneRegex = /^\d{10}$/;
    if (!phone || !phoneRegex.test(phone)) {
      setFormError("Please enter a valid 10-digit phone number");
      return;
    }
    setIsLoading(true);
    
    // Simulate network request
    setTimeout(() => {
      setOtpSent(true);
      setIsLoading(false);
      setRemainingTime(30); // 30-second countdown
      // Show toast notification
      showToast(`OTP sent to ${phone}`);
    }, 1500);
  };

  // Show toast notification
  const showToast = (message) => {
    const toast = document.createElement("div");
    toast.className = "toast-notification";
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add("show");
      setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
          document.body.removeChild(toast);
        }, 300);
      }, 3000);
    }, 100);
  };

  // Reset form when switching between login/signup
  useEffect(() => {
    setFormError("");
    setShowPassword(false);
  }, [isLogin, usePhone]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setFullName("");
      setPhone("");
      setOtp("");
      setOtpSent(false);
      setFormError("");
      setIsLoading(false);
      setShowPassword(false);
      setRemainingTime(0);
    }
  }, [isOpen]);
  
  // Handle password visibility toggle
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Social login options
  const socialLogin = (provider) => {
    setIsLoading(true);
    console.log(`Logging in with ${provider}`);
    
    setTimeout(() => {
      showSuccessMessage(`${provider} login successful!`);
      setIsLoading(false);
    }, 1500);
  };

  // Focus on first OTP input when OTP is sent
  useEffect(() => {
    if (otpSent) {
      const firstOtpInput = document.querySelector('.otp-input');
      if (firstOtpInput) {
        firstOtpInput.focus();
      }
    }
  }, [otpSent]);

  return (
    <div className={`login-overlay ${isOpen ? "open" : ""}`} onClick={onClose}>
      <div className="login-backdrop" onClick={(e) => e.stopPropagation()}>
        <div className="backdrop-content">
          <div className="brand-logo">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="30" cy="30" r="30" fill="url(#paint0_linear)" />
              <path d="M18 30L26.4 38.4L42 21.6" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="paint0_linear" x1="0" y1="0" x2="60" y2="60" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4F79A4"/>
                  <stop offset="1" stopColor="#3D5A80"/>
                </linearGradient>
              </defs>
            </svg>
            <h1>YourBrand</h1>
          </div>
          <div className="backdrop-text">
            <h2>Welcome to our platform</h2>
            <p>Sign in to access your account and enjoy our premium services.</p>
          </div>
        </div>
      </div>

      <div 
        ref={loginRef}
        className={`login-container ${isOpen ? "slide-in" : "slide-out"}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L15 15M1 15L15 1" stroke="#444" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="switch-links">
          <button 
            className={`link-btn ${isLogin ? "active" : ""}`} 
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button 
            className={`link-btn ${!isLogin ? "active" : ""}`} 
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <h2>{isLogin ? "Welcome Back" : "Create Account"}</h2>

        {formError && (
          <div className="error-message">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5V9M8 11V11.01M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z" stroke="#e53935" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            {formError}
          </div>
        )}

        {/* Social Login Options */}
        <div className="social-login">
          <button 
            className="social-btn google" 
            onClick={() => socialLogin('Google')}
            disabled={isLoading}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.6 10.2273C19.6 9.51819 19.5363 8.83637 19.4182 8.18182H10V12.0568H15.3818C15.15 13.3 14.4454 14.359 13.3863 15.0682V17.5773H16.6182C18.5091 15.8364 19.6 13.2728 19.6 10.2273Z" fill="#4285F4"/>
              <path d="M10 20C12.7 20 14.9636 19.1045 16.6182 17.5773L13.3864 15.0682C12.4909 15.6682 11.3455 16.0227 10 16.0227C7.39546 16.0227 5.19091 14.2636 4.40455 11.9H1.06364V14.4909C2.70909 17.7591 6.09091 20 10 20Z" fill="#34A853"/>
              <path d="M4.40455 11.9C4.20455 11.3 4.09091 10.659 4.09091 10C4.09091 9.34091 4.20455 8.7 4.40455 8.1V5.50909H1.06364C0.386364 6.85909 0 8.38636 0 10C0 11.6136 0.386364 13.1409 1.06364 14.4909L4.40455 11.9Z" fill="#FBBC05"/>
              <path d="M10 3.97727C11.4682 3.97727 12.7864 4.48182 13.8227 5.47273L16.6909 2.60454C14.9591 0.99091 12.7 0 10 0C6.09091 0 2.70909 2.24091 1.06364 5.50909L4.40455 8.1C5.19091 5.73636 7.39546 3.97727 10 3.97727Z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
          <button 
            className="social-btn facebook" 
            onClick={() => socialLogin('Facebook')}
            disabled={isLoading}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.8889 10C18.8889 5.09133 14.9087 1.11111 10 1.11111C5.09133 1.11111 1.11111 5.09133 1.11111 10C1.11111 14.4367 4.36163 18.114 8.63472 18.8107V12.7386H6.36719V10H8.63472V7.95139C8.63472 5.51753 9.93507 4.30556 12.1469 4.30556C13.2012 4.30556 14.2988 4.49653 14.2988 4.49653V6.70139H13.0986C11.9298 6.70139 11.558 7.37848 11.558 8.09028V10H14.2058L13.7814 12.7386H11.558V18.8107C15.8312 18.114 18.8889 14.4367 18.8889 10Z" fill="#1877F2"/>
            </svg>
            Continue with Facebook
          </button>
        </div>

        <div className="separator">
          <span>or continue with</span>
        </div>

        {/* Switch Between Email/Password and Phone/OTP */}
        <div className="auth-switch">
          <button 
            className={`auth-btn ${!usePhone ? "active" : ""}`} 
            onClick={() => setUsePhone(false)}
          >
            Email & Password
          </button>
          <button 
            className={`auth-btn ${usePhone ? "active" : ""}`} 
            onClick={() => setUsePhone(true)}
          >
            Phone & OTP
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {!usePhone ? (
            <>
              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <div className="input-wrapper">
                    <span className="input-icon">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 15.5V14C15 12.3431 13.6569 11 12 11H6C4.34315 11 3 12.3431 3 14V15.5M12 5.5C12 7.15685 10.6569 8.5 9 8.5C7.34315 8.5 6 7.15685 6 5.5C6 3.84315 7.34315 2.5 9 2.5C10.6569 2.5 12 3.84315 12 5.5Z" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <input 
                      id="fullName" 
                      type="text" 
                      value={fullName} 
                      onChange={(e) => setFullName(e.target.value)} 
                      placeholder="Enter your full name"
                      disabled={isLoading}
                      className="input-field"
                    />
                  </div>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.25 6L8.16795 9.5886C8.6718 9.8852 9.3282 9.8852 9.83205 9.5886L15.75 6M3.75 13.5H14.25C15.0784 13.5 15.75 12.8284 15.75 12V6C15.75 5.17157 15.0784 4.5 14.25 4.5H3.75C2.92157 4.5 2.25 5.17157 2.25 6V12C2.25 12.8284 2.92157 13.5 3.75 13.5Z" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Enter your email" 
                    disabled={isLoading}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.25 8.25V6C5.25 3.92893 6.92893 2.25 9 2.25C11.0711 2.25 12.75 3.92893 12.75 6V8.25M5.25 8.25C4.42157 8.25 3.75 8.92157 3.75 9.75V13.5C3.75 14.3284 4.42157 15 5.25 15H12.75C13.5784 15 14.25 14.3284 14.25 13.5V9.75C14.25 8.92157 13.5784 8.25 12.75 8.25M5.25 8.25H12.75" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Enter your password" 
                    disabled={isLoading}
                    className="input-field"
                  />
                  <button 
                    type="button" 
                    className="password-toggle" 
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.92574 2.92574L17.0743 17.0743M8.22574 8.43713C7.50652 9.15635 7.50652 10.3169 8.22574 11.0361C8.94496 11.7553 10.1055 11.7553 10.8247 11.0361C11.5439 10.3169 11.5439 9.15635 10.8247 8.43713C10.1055 7.71791 8.94496 7.71791 8.22574 8.43713Z" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10.5867 5.08366C14.0672 5.39062 17.0922 7.73324 18.3333 10.8337C17.9201 11.8013 17.3479 12.6743 16.6667 13.417M13.5 15.4837C12.4473 15.9324 11.3052 16.1587 10.1667 16.1337C6.16345 16.0644 3.05546 13.8548 1.66675 10.8337C2.32342 9.43366 3.30346 8.26366 4.45008 7.41699L13.5 15.4837Z" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 4.37C12.1217 4.37 14.1566 5.22365 15.6569 6.72395C17.1571 8.22425 18.0108 10.2592 18.0108 12.3809C18.0108 12.8009 17.9508 13.2092 17.8425 13.6059M14.4425 14.4375C13.4108 15.1225 12.1683 15.5225 10.835 15.53C6.83166 15.6 3.72416 13.39 2.33583 10.3692C2.96833 9.03252 3.9175 7.90752 5.0175 7.05669L14.4425 14.4375ZM8.23583 8.45335C7.515 9.17419 7.515 10.335 8.23583 11.0559C8.95666 11.7767 10.1175 11.7767 10.8383 11.0559C11.5592 10.335 11.5592 9.17419 10.8383 8.45335C10.1175 7.73252 8.95666 7.73252 8.23583 8.45335Z" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </div>
                
                {!isLogin && password && (
                  <div className="password-strength">
                    <div className="strength-bars">
                      <div className={`strength-bar ${passwordStrength >= 1 ? 'active' : ''}`}></div>
                      <div className={`strength-bar ${passwordStrength >= 2 ? 'active' : ''}`}></div>
                      <div className={`strength-bar ${passwordStrength >= 3 ? 'active' : ''}`}></div>
                      <div className={`strength-bar ${passwordStrength >= 4 ? 'active' : ''}`}></div>
                    </div>
                    <span className="strength-text">
                      {passwordStrength === 0 && "Very weak"}
                      {passwordStrength === 1 && "Weak"}
                      {passwordStrength === 2 && "Medium"}
                      {passwordStrength === 3 && "Strong"}
                      {passwordStrength === 4 && "Very strong"}
                    </span>
                  </div>
                )}
              </div>

              {isLogin && (
                <div className="forgot-password">
                  <a href="#reset-password">Forgot Password?</a>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.25 3.75C2.25 2.92157 2.92157 2.25 3.75 2.25H6.17893C6.58375 2.25 6.94007 2.51384 7.0523 2.90021L8.09063 6.01576C8.21932 6.44302 8.03651 6.90626 7.63625 7.11432L6.20486 7.83013C6.98516 9.58084 8.41916 11.0148 10.1699 11.7951L10.8857 10.3637C11.0937 9.96349 11.557 9.78068 11.9842 9.90937L15.0998 10.9477C15.4862 11.0599 15.75 11.4162 15.75 11.8211V14.25C15.75 15.0784 15.0784 15.75 14.25 15.75H13.5C7.29137 15.75 2.25 10.7086 2.25 4.5V3.75Z" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <input 
                    id="phone" 
                    type="tel" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} 
                    placeholder="Enter your phone number" 
                    disabled={isLoading || otpSent}
                    maxLength={10}
                    className="input-field"
                  />
                </div>
              </div>

              {otpSent && (
                <div className="form-group">
                  <div className="otp-label">
                    <label htmlFor="otp">One-Time Password (OTP)</label>
                    {remainingTime > 0 && (
                      <span className="timer">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 4V8L10.5 10.5M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8Z" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Resend in {remainingTime}s
                      </span>
                    )}
                  </div>
                  <div className="otp-input-group">
                    {[...Array(6)].map((_, i) => (
                      <input
                        key={i}
                        type="text"
                        maxLength="1"
                        className="otp-input"
                        value={otp[i] || ''}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^[0-9]$/.test(value) || value === '') {
                            const newOtp = otp.split('');
                            newOtp[i] = value;
                            setOtp(newOtp.join(''));
                            
                            // Auto-focus next input
                            if (value && i < 5) {
                              const inputs = document.querySelectorAll('.otp-input');
                              inputs[i + 1].focus();
                            }
                          }
                        }}
                        onKeyDown={(e) => {
                          // Handle backspace
                          if (e.key === 'Backspace' && !otp[i] && i > 0) {
                            const inputs = document.querySelectorAll('.otp-input');
                            inputs[i - 1].focus();
                          }
                        }}
                        disabled={isLoading}
                      />
                    ))}
                  </div>
                </div>
              )}

              {!otpSent ? (
                <button 
                  type="button" 
                  className="send-otp-btn" 
                  onClick={sendOtp} 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner"></span>
                      Sending...
                    </>
                  ) : "Send OTP"}
                </button>
              ) : (
                <div className="otp-buttons">
                  <button 
                    type="button" 
                    className="verify-otp-btn" 
                    onClick={handleSubmit} 
                    disabled={isLoading || otp.length !== 6}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner"></span>
                        Verifying...
                      </>
                    ) : "Verify OTP"}
                  </button>
                  
                  {remainingTime === 0 && (
                    <button 
                    type="button" 
                    className="resend-otp-btn" 
                    onClick={sendOtp} 
                    disabled={isLoading}
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            )}
          </>
        )}

        {!usePhone && (
          <button 
            type="submit" 
            className="submit-btn" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                {isLogin ? "Logging in..." : "Signing up..."}
              </>
            ) : (
              isLogin ? "Login" : "Sign Up"
            )}
          </button>
        )}
      </form>
    </div>
  </div>
);
}

export default Login;
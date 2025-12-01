'use client'

import { useState, FormEvent, ChangeEvent } from 'react';
import styles from './ContactForm.module.css';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void> | void;
  submitButtonText?: string;
  className?: string;
  showLabels?: boolean;
}

export default function ContactForm({
  onSubmit,
  submitButtonText = 'Send Message',
  className = '',
  showLabels = true,
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Default behavior - simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      // Reset form on success
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
      setSubmitStatus('success');

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`${styles.contactForm} ${className}`}>
      <div className={styles.formGroup}>
        {showLabels && (
          <label htmlFor="name" className={styles.formLabel}>
            Name
          </label>
        )}
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className={styles.formInput}
          placeholder="Your full name"
          required
          disabled={isSubmitting}
        />
      </div>

      <div className={styles.formGroup}>
        {showLabels && (
          <label htmlFor="email" className={styles.formLabel}>
            Email
          </label>
        )}
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={styles.formInput}
          placeholder="your.email@example.com"
          required
          disabled={isSubmitting}
        />
      </div>

      <div className={styles.formGroup}>
        {showLabels && (
          <label htmlFor="phone" className={styles.formLabel}>
            Phone
          </label>
        )}
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className={styles.formInput}
          placeholder="+91 1234567890"
          required
          disabled={isSubmitting}
        />
      </div>

      <div className={styles.formGroup}>
        {showLabels && (
          <label htmlFor="message" className={styles.formLabel}>
            Message
          </label>
        )}
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          className={styles.formTextarea}
          placeholder="Tell us about your requirements..."
          rows={5}
          required
          disabled={isSubmitting}
        />
      </div>

      {submitStatus === 'success' && (
        <div className={styles.successMessage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          Message sent successfully! We'll get back to you soon.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className={styles.errorMessage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          Failed to send message. Please try again later.
        </div>
      )}

      <button
        type="submit"
        // className={styles.submitButton}
        className='cta-button'
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className={styles.spinner}></span>
            Sending...
          </>
        ) : (
          submitButtonText
        )}
      </button>
    </form>
  );
}




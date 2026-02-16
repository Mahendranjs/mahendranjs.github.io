import { Component, OnInit, OnDestroy } from '@angular/core';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Portfolio';
  contactmessage: string = '';
  experienceYears: string = '';

  private readonly joinDate = new Date(2021, 7, 20); // August 20, 2021

  private typingInterval: any;
  private roles: string[] = [
    'Frontend Engineer',
    'React.js Developer',
    'TypeScript Specialist',
    'AI Integration Expert',
    'Full Stack Developer'
  ];
  private currentRoleIndex: number = 0;
  private currentCharIndex: number = 0;
  private isDeleting: boolean = false;
  private typingSpeed: number = 100;
  private deletingSpeed: number = 50;
  private pauseTime: number = 2000;

  constructor() { }

  ngOnInit() {
    this.experienceYears = this.calculateExperience();
    this.initScrollEffects();
    this.initTypingAnimation();
  }

  private calculateExperience(): string {
    const now = new Date();
    const diffMs = now.getTime() - this.joinDate.getTime();
    const diffYears = diffMs / (1000 * 60 * 60 * 24 * 365.25);
    const rounded = Math.floor(diffYears * 2) / 2; // round down to nearest 0.5
    const formatted = rounded % 1 === 0 ? `${rounded}` : `${rounded}`;
    return `${formatted}+`;
  }

  ngOnDestroy() {
    if (this.typingInterval) {
      clearTimeout(this.typingInterval);
    }
  }

  private initScrollEffects() {
    // Header blur effect on scroll
    const blurHeader = () => {
      const header = document.getElementById('header');
      if (window.scrollY >= 50) {
        header?.classList.add('blur__header');
      } else {
        header?.classList.remove('blur__header');
      }
    };
    window.addEventListener('scroll', blurHeader);

    // Scroll up button visibility
    const scrollUp = () => {
      const scrollUpBtn = document.getElementById('scroll-up');
      if (window.scrollY >= 350) {
        scrollUpBtn?.classList.add('show-scroll');
      } else {
        scrollUpBtn?.classList.remove('show-scroll');
      }
    };
    window.addEventListener('scroll', scrollUp);

    // Active navigation link highlighting
    const scrollActive = () => {
      const scrollY = window.pageYOffset;
      const sections = document.querySelectorAll('section[id]');

      sections.forEach((current: any) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute('id');
        const sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          sectionsClass?.classList.add('active-link');
        } else {
          sectionsClass?.classList.remove('active-link');
        }
      });
    };
    window.addEventListener('scroll', scrollActive);

    // Smooth scroll to home on load
    const load = () => {
      window.location.href = '#home';
    };
    window.addEventListener('load', load);
  }

  private initTypingAnimation() {
    const typeText = () => {
      const typingElement = document.getElementById('typing-text');
      if (!typingElement) {
        this.typingInterval = setTimeout(typeText, 100);
        return;
      }

      const currentRole = this.roles[this.currentRoleIndex];

      if (this.isDeleting) {
        // Deleting text
        this.currentCharIndex--;
        typingElement.textContent = currentRole.substring(0, this.currentCharIndex);

        if (this.currentCharIndex === 0) {
          this.isDeleting = false;
          this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
          this.typingInterval = setTimeout(typeText, 500);
        } else {
          this.typingInterval = setTimeout(typeText, this.deletingSpeed);
        }
      } else {
        // Typing text
        this.currentCharIndex++;
        typingElement.textContent = currentRole.substring(0, this.currentCharIndex);

        if (this.currentCharIndex === currentRole.length) {
          this.isDeleting = true;
          this.typingInterval = setTimeout(typeText, this.pauseTime);
        } else {
          this.typingInterval = setTimeout(typeText, this.typingSpeed);
        }
      }
    };

    // Start the typing animation after a short delay
    setTimeout(typeText, 500);
  }

  toggle() {
    const navMenu = document.getElementById('nav-menu');
    navMenu?.classList.add('show-menu');
  }

  close() {
    const navMenu = document.getElementById('nav-menu');
    navMenu?.classList.remove('show-menu');
  }

  sendEmail(e: Event) {
    e.preventDefault();
    const formValue = document.getElementById('contact-form') as HTMLFormElement;

    emailjs.sendForm('service_ckzc3qz', 'template_fx4ms4c', e.target as HTMLFormElement, '0VQNjnhMuySmq6RuR')
      .then(() => {
        this.contactmessage = 'Message Sent Successfully';
        setTimeout(() => {
          this.contactmessage = '';
        }, 5000);
        formValue?.reset();
      }, (error) => {
        this.contactmessage = 'Message not sent';
        console.log('FAILED...', error);
        setTimeout(() => {
          this.contactmessage = '';
        }, 5000);
      });
  }
}

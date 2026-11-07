"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useState } from "react";

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as "dark" | "light") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    const timer = setTimeout(() => {
      setTheme(savedTheme);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  return (
    <main className="resume">
      <header
        className="profile-header fade-in-item"
        style={{ "--item-index": 1 } as CSSProperties}
      >
        <div className="header-top">
          <Image
            src="/profile-pic.jpg"
            alt="Akshat Dwivedi"
            width={44}
            height={44}
            className="avatar-image"
            priority
            quality={100}
          />
          <div className="header-actions">
            <div className="status-badge">
              <span className="pulse-dot"></span>
              Building Sashvat
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="theme-toggle-btn"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>
          </div>
        </div>

        <h1 className="name-title">Akshat Dwivedi</h1>
        <p className="subtitle">
          Founder and CEO –{" "}
          <a
            href="https://sashvat.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-link"
          >
            Sashvat Bharat{" "}
            <svg
              viewBox="0 0 24 24"
              width="12"
              height="12"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>
        </p>

        <div className="social-links">
          <a
            href="https://github.com/Akshat-Dwivedi-52"
            target="_blank"
            rel="noopener noreferrer"
            className="social-button"
          >
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/akshat-dwivedi-740203377/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-button"
          >
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/akshat_dwivedi_ceo/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-button"
          >
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            Instagram
          </a>
        </div>
      </header>

      <section
        className="about-section fade-in-item"
        style={{ "--item-index": 2 } as CSSProperties}
      >
        <p>
          Systems Architect & Developer building modular, high-performance software. Focused on
          distributed systems and AI infrastructure.
        </p>
        <br />
        <p>Highly Obsessed with Self Taught Learning</p>
        <p>I use Arch BTW</p>
        <p>Loving Rust</p>
      </section>

      <hr className="fade-in-item" style={{ "--item-index": 3 } as CSSProperties} />

      <section
        className="resume-section fade-in-item"
        style={{ "--item-index": 4 } as CSSProperties}
      >
        <h2 className="section-title">Skills Arsenals</h2>
        <div className="skills-grid">
          <div className="skills-category">
            <span className="category-label">Frameworks & Languages</span>
            <div className="tags-container">
              <span className="tag mono">Javascript</span>
              <span className="tag mono">NodeJS</span>
              <span className="tag mono">CSS</span>
              <span className="tag mono">React</span>
              <span className="tag mono">NextJS</span>
              <span className="tag mono">TypeScript</span>
              <span className="tag mono">Python</span>
              <span className="tag mono">Rust</span>
            </div>
          </div>
          <div className="skills-category">
            <span className="category-label">AI Engineering</span>
            <div className="tags-container">
              <span className="tag mono">Advanced RAG</span>
              <span className="tag mono">Model Optimization</span>
              <span className="tag mono">Multi-Agent Orchestration</span>
            </div>
          </div>
          <div className="skills-category">
            <span className="category-label">Currently Learning</span>
            <div className="tags-container">
              <span className="tag mono">Backend Designing</span>
              <span className="tag mono">System Design</span>
              <span className="tag mono">System Programming</span>
              <span className="tag mono">Machine Learning</span>
            </div>
          </div>
        </div>
      </section>

      <hr className="fade-in-item" style={{ "--item-index": 5 } as CSSProperties} />

      <section
        className="resume-section fade-in-item"
        style={{ "--item-index": 6 } as CSSProperties}
      >
        <h2 className="section-title">Projects</h2>
        <div className="projects-list">
          <div className="project-item">
            <div className="project-header">
              <h3 className="project-name">
                <a
                  href="https://github.com/sashvat-bharat/jit-tool-protocol"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-link"
                >
                  JIT Tool Spawning Protocol{" "}
                  <svg
                    viewBox="0 0 24 24"
                    width="12"
                    height="12"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </a>
              </h3>
              <span className="badge badge-completed">Completed</span>
            </div>
            <p className="project-desc">
              A server-side routing architecture that lets AI agents scale to thousands of tools
              without context bloat, hallucinations, or spiraling API costs while saving up to{" "}
              <span className="highlight-text">~88.8%</span> tokens.
            </p>
            <div className="project-tech-tags">
              <span className="mini-tag">Next.js</span>
              <span className="mini-tag">Node.js</span>
              <span className="mini-tag">LLM Routing</span>
            </div>
          </div>

          <div className="project-item">
            <div className="project-header">
              <h3 className="project-name">
                <a
                  href="https://huggingface.co/Akshat-Dwivedi/micro-gpt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-link"
                >
                  Micro-GPT-50M{" "}
                  <svg
                    viewBox="0 0 24 24"
                    width="12"
                    height="12"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </a>
              </h3>
              <span className="badge badge-completed">Completed</span>
            </div>
            <p className="project-desc">
              Micro-GPT is a compact 50M parameter dense, decoder-only GPT model pre-trained on{" "}
              <span className="highlight-text">~1B</span> tokens with a token density of ~20.5
              tokens per parameter.
            </p>
            <div className="project-tech-tags">
              <span className="mini-tag">SLM</span>
              <span className="mini-tag">GPT</span>
              <span className="mini-tag">Dense</span>
            </div>
          </div>

          <div className="project-item">
            <div className="project-header">
              <h3 className="project-name">Self Evolving Memory for AI Agent</h3>
              <span className="badge badge-progress">In Progress</span>
            </div>
            <p className="project-desc">
              A memory system inspired by the human brain. Able to manage itself by removing
              unwanted facts and memories, keeping only valuable facts, and connecting/organizing
              them as the corpus grows.
            </p>
            <div className="project-tech-tags">
              <span className="mini-tag">Rust</span>
              <span className="mini-tag">Typescript</span>
              <span className="mini-tag">Vector DB</span>
              <span className="mini-tag">Cognitive Memory</span>
            </div>
          </div>

          <div className="project-item">
            <div className="project-header">
              <h3 className="project-name">Langchain Alternative [Not yet Disclosed]</h3>
              <span className="badge badge-progress">In Progress</span>
            </div>
            <p className="project-desc">
              A production grade agentic library written in Rust and Typescript built for high
              performance multi-agent tasks with the lowest memory footprint with highest throughput
            </p>
            <div className="project-tech-tags">
              <span className="mini-tag">Rust</span>
              <span className="mini-tag">Typescript</span>
              <span className="mini-tag">Multi-Agent</span>
              <span className="mini-tag">Vector DB</span>
              <span className="mini-tag">Cognitive Memory</span>
            </div>
          </div>

          <div className="project-item">
            <div className="project-header">
              <h3 className="project-name">Name Not Disclosed</h3>
              <span className="badge badge-progress">In Progress</span>
            </div>
            <p className="project-desc">
              Building an intelligent second brain platform. By pairing advanced reasoning models
              with our custom SOTA memory architecture, the platform continuously learns your
              patterns to deliver deeply personalized, contextual execution.
            </p>
            <div className="project-tech-tags">
              <span className="mini-tag">Rust</span>
              <span className="mini-tag">Typescript</span>
              <span className="mini-tag">Agentic AI</span>
              <span className="mini-tag">Cognitive Memory</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="resume-footer fade-in-item" style={{ "--item-index": 7 } as CSSProperties}>
        <p>Execute with intent, or don&apos;t execute at all.</p>
      </footer>
    </main>
  );
}

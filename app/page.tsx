"use client";

import { useState } from "react";
import { demoEvents, demoMessages } from "@/lib/demo-data";
import { createQuestPreview } from "@/lib/quest";
import type { QuestPreview, Theme } from "@/lib/types";

const themeOptions: { id: Theme; name: string; description: string; icon: string }[] = [
  { id: "fantasy", name: "Fantasy", description: "Dragons & deadlines", icon: "✦" },
  { id: "cyberpunk", name: "Cyberpunk", description: "Neon & noise", icon: "⌁" },
  { id: "office-horror", name: "Office horror", description: "Spreadsheets & shadows", icon: "◈" },
];

export default function Home() {
  const [selectedIds, setSelectedIds] = useState<string[]>(["pitch-deck", "demo-sync", "team-details"]);
  const [calendarIncluded, setCalendarIncluded] = useState(true);
  const [theme, setTheme] = useState<Theme>("fantasy");
  const [preview, setPreview] = useState<QuestPreview | null>(null);

  function toggleMessage(id: string) {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((selectedId) => selectedId !== id) : [...current, id],
    );
  }

  function forgeQuest() {
    if (selectedIds.length === 0) return;
    setPreview(createQuestPreview(selectedIds, theme, calendarIncluded));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">✉</span>
          <span>Mail<span className="brand-accent">Quest</span></span>
        </div>
        <div className="sidebar-section-label">YOUR ADVENTURE</div>
        <nav className="sidebar-nav" aria-label="Project milestones">
          <div className="nav-item active"><span className="nav-symbol">◇</span> Forge a quest <span className="nav-count">01</span></div>
          <div className="nav-item disabled"><span className="nav-symbol">⚔</span> Battle arena <span className="nav-count">02</span></div>
          <div className="nav-item disabled"><span className="nav-symbol">◷</span> Activity log <span className="nav-count">03</span></div>
        </nav>
        <div className="sidebar-bottom">
          <div className="demo-chip"><span className="status-dot" /> Demo mode</div>
          <p>Sample messages only. No accounts are connected.</p>
        </div>
      </aside>

      <main className="main-content">
        <div className="topbar">
          <div className="breadcrumb">THE ADVENTURE <span>/</span> {preview ? "QUEST PREVIEW" : "QUEST SETUP"}</div>
          <div className="step-badge">MILESTONE 01 <span>·</span> FOUNDATION</div>
        </div>

        {preview ? (
          <section className="preview-screen" aria-labelledby="preview-title">
            <button className="back-button" type="button" onClick={() => setPreview(null)}>← Back to setup</button>
            <div className={`boss-card theme-${preview.theme}`}>
              <div className="boss-glow" aria-hidden="true" />
              <div className="boss-card-content">
                <div className="eyebrow light">QUEST PREVIEW · DEMO DATA</div>
                <h1 id="preview-title">{preview.title}</h1>
                <p>{preview.bossDescription}</p>
                <div className="boss-emblem" aria-hidden="true">{preview.theme === "fantasy" ? "♜" : preview.theme === "cyberpunk" ? "⌘" : "◈"}</div>
                <div className="boss-health">
                  <div className="boss-health-label"><span>{preview.bossName}</span><strong>{preview.totalHp} HP</strong></div>
                  <div className="health-track"><span /></div>
                </div>
              </div>
            </div>

            <div className="preview-heading">
              <div><div className="eyebrow">THE BATTLE PLAN</div><h2>{preview.tasks.length} {preview.tasks.length === 1 ? "mission" : "missions"} to conquer</h2></div>
              <span className="small-note">Generated from your selected sample messages</span>
            </div>
            <div className="mission-list">
              {preview.tasks.map((task, index) => (
                <article className="mission-card" key={task.id}>
                  <span className="mission-index">{String(index + 1).padStart(2, "0")}</span>
                  <div className="mission-copy">
                    <h3>{task.title}</h3>
                    <p>From “{task.sourceSubject}” · Due {task.dueLabel}</p>
                  </div>
                  <span className="action-pill">{task.action}</span>
                  <span className="mission-hp">{task.difficulty * 10} HP</span>
                </article>
              ))}
            </div>
            <div className="next-step-note">
              <span className="note-icon">↗</span>
              <div><strong>Coming in the next milestone</strong><p>The agent will read a signed-in test inbox, create these missions from real messages, and attach evidence to each one. Browser actions and the playable battle follow.</p></div>
            </div>
          </section>
        ) : (
          <section className="setup-screen" aria-labelledby="page-title">
            <div className="hero-heading">
              <div className="eyebrow"><span className="eyebrow-line" /> THE FIRST CHAPTER</div>
              <h1 id="page-title">Every inbox has a <em>boss fight.</em></h1>
              <p>Choose the messages you want to tackle. We’ll turn the work into an adventure you can actually finish.</p>
            </div>

            <div className="setup-grid">
              <div className="left-column">
                <div className="section-heading"><div><span className="section-number">01</span><h2>Choose your quests</h2></div><span className="section-hint">PICK 1–4 MESSAGES</span></div>
                <div className="inbox-card">
                  <div className="inbox-toolbar"><span className="inbox-title">✉ &nbsp; Sample inbox</span><span className="inbox-count">{demoMessages.length} messages</span></div>
                  <div className="message-list">
                    {demoMessages.map((message) => {
                      const selected = selectedIds.includes(message.id);
                      return (
                        <button className={`message-row ${selected ? "selected" : ""}`} key={message.id} type="button" aria-pressed={selected} onClick={() => toggleMessage(message.id)}>
                          <span className={`checkbox ${selected ? "checked" : ""}`} aria-hidden="true">{selected ? "✓" : ""}</span>
                          <span className={`avatar ${message.color}`}>{message.initials}</span>
                          <span className="message-content"><span className="message-top"><strong>{message.sender}</strong><small>{message.receivedLabel}</small></span><span className="message-subject">{message.subject}</span><span className="message-preview">{message.preview}</span></span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <p className="helper-text">Only selected messages become missions. This milestone uses sample data.</p>

                <div className="section-heading calendar-heading"><div><span className="section-number">02</span><h2>Add your calendar</h2></div><span className="section-hint">OPTIONAL</span></div>
                <div className={`calendar-card ${calendarIncluded ? "enabled" : ""}`}>
                  <div className="calendar-header"><span className="calendar-icon">▦</span><div><strong>Calendar context</strong><p>Let the quest account for your schedule.</p></div><button className={`switch ${calendarIncluded ? "on" : ""}`} type="button" role="switch" aria-checked={calendarIncluded} aria-label="Include sample calendar" onClick={() => setCalendarIncluded(!calendarIncluded)}><span /></button></div>
                  {calendarIncluded && <div className="calendar-events">{demoEvents.map((event) => <div key={event.id}><span className="event-dot" /><span>{event.title}</span><small>{event.time}</small></div>)}</div>}
                </div>
              </div>

              <div className="right-column">
                <div className="section-heading"><div><span className="section-number">03</span><h2>Pick your world</h2></div></div>
                <div className="theme-list">
                  {themeOptions.map((option) => <button key={option.id} className={`theme-option ${theme === option.id ? "active" : ""}`} type="button" aria-pressed={theme === option.id} onClick={() => setTheme(option.id)}><span className={`theme-icon ${option.id}`}>{option.icon}</span><span><strong>{option.name}</strong><small>{option.description}</small></span><span className="theme-radio" /></button>)}
                </div>
                <div className="quest-summary">
                  <div className="summary-sparkle">✧</div>
                  <div className="eyebrow">READY WHEN YOU ARE</div>
                  <h2>Your next adventure awaits.</h2>
                  <p>{selectedIds.length === 0 ? "Choose at least one message to begin." : `${selectedIds.length} message${selectedIds.length === 1 ? "" : "s"} selected${calendarIncluded ? " · calendar included" : ""}.`}</p>
                  <button type="button" className="forge-button" disabled={selectedIds.length === 0} onClick={forgeQuest}>Forge my quest <span>→</span></button>
                  <small>You can review the missions before any work begins.</small>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}


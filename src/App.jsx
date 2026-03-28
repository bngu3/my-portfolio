import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Experience", "Projects", "Contact"];

const EXPERIENCE = [
  {
    company: "Company Name",
    role: "Software Engineer Intern",
    period: "Jun 2024 – Aug 2024",
    bullets: [
      "Built and shipped feature X that improved user retention by 20%",
      "Collaborated with cross-functional teams to deliver Y on time",
      "Optimized database queries reducing load time by 40%",
    ],
    tech: ["React", "Node.js", "PostgreSQL"],
  },
  {
    company: "Another Company",
    role: "Frontend Developer Intern",
    period: "Jan 2024 – May 2024",
    bullets: [
      "Designed and implemented responsive UI components used by 10K+ users",
      "Wrote unit and integration tests achieving 90% code coverage",
    ],
    tech: ["TypeScript", "Vue.js", "Figma"],
  },
];

const PROJECTS = [
  {
    name: "Project Alpha",
    description:
      "A full-stack web application that lets users do something cool and useful. Built with modern technologies and deployed on the cloud.",
    tech: ["React", "FastAPI", "MongoDB"],
    github: "#",
    live: "#",
  },
  {
    name: "Project Beta",
    description:
      "An ML-powered tool that analyzes data and surfaces insights automatically. Trained on a custom dataset with 95% accuracy.",
    tech: ["Python", "PyTorch", "Docker"],
    github: "#",
    live: null,
  },
  {
    name: "Project Gamma",
    description:
      "A CLI tool that automates repetitive dev tasks, saving engineers hours per week. Used by 50+ developers.",
    tech: ["Go", "Bash", "GitHub Actions"],
    github: "#",
    live: null,
  },
];

const SKILLS = {
  Languages: ["Java", "C++", "TypeScript", "HTML/CSS", "SQL"],
  Frameworks: ["React", "Node.js", "FastAPI", "Spring Boot", "Vue.js"],
  Tools: ["Git", "Docker", "AWS", "PostgreSQL", "MongoDB", "Figma"],
};

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionsRef = useRef({});

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.3 }
    );
    Object.values(sectionsRef.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@400;500&family=Outfit:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        html { scroll-behavior: smooth; }

        body { background: #fdfbee; }

        ::selection { background: #d4e8d0; }

        .fade-in {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .nav-link {
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.08em;
          color: #888;
          text-transform: lowercase;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px 0;
          transition: color 0.2s;
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1px;
          background: #2d2d2d;
          transition: width 0.2s;
        }
        .nav-link:hover { color: #2d2d2d; }
        .nav-link:hover::after { width: 100%; }
        .nav-link.active { color: #2d2d2d; }
        .nav-link.active::after { width: 100%; }

        .tag {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          padding: 3px 10px;
          border-radius: 2px;
          background: #f0edcc;
          color: #666;
          letter-spacing: 0.04em;
        }

        .exp-card {
          padding: 28px 0;
          border-bottom: 1px solid #e8e5d0;
          transition: background 0.2s;
        }
        .exp-card:last-child { border-bottom: none; }

        .project-card {
          border: 1px solid #e8e5d0;
          border-radius: 4px;
          padding: 28px;
          background: #fff;
          transition: box-shadow 0.2s, transform 0.2s;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .project-card:hover {
          box-shadow: 0 4px 20px rgba(0,0,0,0.07);
          transform: translateY(-2px);
        }

        .link-btn {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          color: #888;
          text-decoration: none;
          border-bottom: 1px solid #ddd;
          padding-bottom: 1px;
          transition: color 0.2s, border-color 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .link-btn:hover { color: #2d2d2d; border-color: #2d2d2d; }

        .social-link {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #888;
          text-decoration: none;
          font-size: 14px;
          font-family: 'DM Mono', monospace;
          transition: color 0.2s;
        }
        .social-link:hover { color: #2d2d2d; }

        .skill-group {
          margin-bottom: 24px;
        }

        .cta-btn {
          display: inline-block;
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.06em;
          padding: 12px 28px;
          border: 1px solid #2d2d2d;
          border-radius: 2px;
          color: #2d2d2d;
          background: transparent;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s, color 0.2s;
        }
        .cta-btn:hover { background: #2d2d2d; color: #fdfbee; }

        @media (max-width: 640px) {
          .mobile-menu { display: flex !important; }
          .desktop-nav { display: none !important; }
        }
      `}</style>

      {}
      <nav style={styles.nav}>

        <div className="desktop-nav" style={{ display: "flex", gap: 32 }}>
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              className={`nav-link${activeSection === l.toLowerCase() ? " active" : ""}`}
              onClick={() => scrollTo(l)}
            >
              {l.toLowerCase()}
            </button>
          ))}
        </div>
        <button
          className="mobile-menu"
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", flexDirection: "column", gap: 5 }}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {[0,1,2].map(i => <span key={i} style={{ width: 22, height: 1.5, background: "#2d2d2d", display: "block" }} />)}
        </button>
      </nav>

      {menuOpen && (
        <div style={{ position: "fixed", top: 60, right: 0, width: "100%", background: "#fdfbee", padding: "20px 24px", zIndex: 99, borderBottom: "1px solid #e8e5d0", display: "flex", flexDirection: "column", gap: 16 }}>
          {NAV_LINKS.map((l) => (
            <button key={l} className="nav-link" style={{ textAlign: "left", fontSize: 14 }} onClick={() => scrollTo(l)}>{l.toLowerCase()}</button>
          ))}
        </div>
      )}

      <main style={styles.main}>

        {}
        <section id="about" ref={el => sectionsRef.current.about = el} style={styles.section}>
          <div className={`fade-in${visible ? " visible" : ""}`} style={{ transitionDelay: "0.1s" }}>
            <p style={styles.mono}>hey yall, I'm</p>
            <h1 style={styles.heroName}>Brian<br />Nguyen</h1>
          </div>
          <div className={`fade-in${visible ? " visible" : ""}`} style={{ transitionDelay: "0.25s", maxWidth: 520 }}>
            <p style={styles.heroBio}>
              Currently studying Software Engineering @ SJSU! Looking for
              opportunities to make an impact :)
            </p>
            <div style={{ display: "flex", gap: 24, marginTop: 32, flexWrap: "wrap" }}>
              <a href="https://www.linkedin.com/in/brian-nguyen-65a7b4260/" target="_blank" rel="noreferrer" className="cta-btn">LinkedIn ↗</a>
              <a href="#" className="cta-btn">Resume ↗</a>
            </div>
          </div>

          <div className={`fade-in${visible ? " visible" : ""}`} style={{ transitionDelay: "0.4s", marginTop: 64 }}>
            <p style={styles.sectionLabel}>Skills</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 16 }}>
              {Object.entries(SKILLS).map(([group, items]) => (
                <div key={group} className="skill-group" style={{ display: "flex", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
                  <span style={{ ...styles.mono, minWidth: 90, paddingTop: 3, color: "#aaa" }}>{group}</span>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {items.map(s => <span key={s} className="tag">{s}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div style={styles.divider} />

        {}
        <section id="experience" ref={el => sectionsRef.current.experience = el} style={styles.section}>
          <SectionHeader label="02" title="Experience" />
          <div style={{ marginTop: 8 }}>
            {EXPERIENCE.map((exp, i) => (
              <FadeCard key={i} delay={i * 0.1}>
                <div className="exp-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                    <div>
                      <p style={styles.expRole}>{exp.role}</p>
                      <p style={styles.expCompany}>{exp.company}</p>
                    </div>
                    <span style={{ ...styles.mono, color: "#aaa", fontSize: 11 }}>{exp.period}</span>
                  </div>
                  <ul style={{ marginTop: 16, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                    {exp.bullets.map((b, j) => (
                      <li key={j} style={{ display: "flex", gap: 12, fontSize: 14, color: "#666", lineHeight: 1.6 }}>
                        <span style={{ color: "#c5c2ba", marginTop: 1 }}>—</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: "flex", gap: 6, marginTop: 16, flexWrap: "wrap" }}>
                    {exp.tech.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
              </FadeCard>
            ))}
          </div>
        </section>

        <div style={styles.divider} />

        {}
        <section id="projects" ref={el => sectionsRef.current.projects = el} style={styles.section}>
          <SectionHeader label="03" title="Projects" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginTop: 32 }}>
            {PROJECTS.map((p, i) => (
              <FadeCard key={i} delay={i * 0.1}>
                <div className="project-card">
                  <div>
                    <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#2d2d2d", marginBottom: 10 }}>{p.name}</p>
                    <p style={{ fontSize: 13, color: "#888", lineHeight: 1.7 }}>{p.description}</p>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {p.tech.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                  <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
                    <a href={p.github} className="link-btn">GitHub ↗</a>
                    {p.live && <a href={p.live} className="link-btn">Live ↗</a>}
                  </div>
                </div>
              </FadeCard>
            ))}
          </div>
        </section>

        <div style={styles.divider} />

        {}
        <section id="contact" ref={el => sectionsRef.current.contact = el} style={{ ...styles.section, paddingBottom: 80 }}>
          <SectionHeader label="04" title="Contact" />
          <div style={{ marginTop: 32 }}>
            <p style={{ fontSize: 15, color: "#666", maxWidth: 440, lineHeight: 1.7, marginBottom: 40 }}>
              Currently open to internships and full-time opportunities. Feel free to reach out — I'll get back to you.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <a href="mailto:n.briann3@gmail.com" className="social-link">
                <EmailIcon /> n.briann3@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/brian-nguyen-65a7b4260/" target="_blank" rel="noreferrer" className="social-link">
                <LinkedInIcon /> linkedin.com/in/brian-nguyen
              </a>
              <a href="https://github.com/" target="_blank" rel="noreferrer" className="social-link">
                <GithubIcon /> github.com/bnguyen
              </a>
            </div>
          </div>
        </section>

      </main>

      <footer style={styles.footer}>
        <span style={{ ...styles.mono, color: "#bbb", fontSize: 11 }}>© 2025 Brian Nguyen · built with care</span>
      </footer>
    </div>
  );
}

function SectionHeader({ label, title }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 8 }}>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#bbb", letterSpacing: "0.06em" }}>{label}</span>
      <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: "#2d2d2d", fontWeight: 400 }}>{title}</h2>
    </div>
  );
}

function FadeCard({ children, delay = 0 }) {
  const ref = useRef();
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`fade-in${vis ? " visible" : ""}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

function EmailIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>;
}
function LinkedInIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 10v7M7 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/></svg>;
}
function GithubIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>;
}

const styles = {
  root: {
    fontFamily: "'Outfit', sans-serif",
    background: "#fdfbee",
    minHeight: "100vh",
    color: "#2d2d2d",
  },
  nav: {
    position: "fixed",
    top: 0, left: 0, right: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 40px",
    height: 60,
    background: "rgba(247,246,243,0.92)",
    backdropFilter: "blur(8px)",
    borderBottom: "1px solid #e8e5d0",
    zIndex: 100,
  },
  navBrand: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 22,
    color: "#2d2d2d",
    letterSpacing: "-0.02em",
  },
  main: {
    maxWidth: 760,
    margin: "0 auto",
    padding: "0 24px",
    paddingTop: 60,
  },
  section: {
    paddingTop: 80,
    paddingBottom: 40,
  },
  divider: {
    height: 1,
    background: "#e8e5d0",
  },
  heroName: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: "clamp(56px, 10vw, 96px)",
    fontWeight: 400,
    lineHeight: 1.0,
    letterSpacing: "-0.03em",
    color: "#2d2d2d",
    margin: "8px 0 24px",
  },
  heroBio: {
    fontSize: 15,
    color: "#666",
    lineHeight: 1.75,
  },
  mono: {
    fontFamily: "'DM Mono', monospace",
    fontSize: 12,
    color: "#aaa",
    letterSpacing: "0.06em",
  },
  sectionLabel: {
    fontFamily: "'DM Mono', monospace",
    fontSize: 11,
    color: "#bbb",
    letterSpacing: "0.06em",
    marginBottom: 4,
  },
  expRole: {
    fontSize: 16,
    fontWeight: 500,
    color: "#2d2d2d",
    marginBottom: 2,
  },
  expCompany: {
    fontFamily: "'DM Mono', monospace",
    fontSize: 12,
    color: "#aaa",
  },
  footer: {
    textAlign: "center",
    padding: "24px",
    borderTop: "1px solid #e8e5d0",
  },
};
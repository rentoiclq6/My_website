import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const iconPaths = {
  arrowRight: "M5 12h14M13 5l7 7-7 7",
  cpu:
    "M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3M7 7h10v10H7zM10 10h4v4h-4z",
  gauge: "M4 14a8 8 0 1 1 16 0M12 14l4-4M8 18h8",
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  mapPin: "M12 21s7-5.2 7-11a7 7 0 0 0-14 0c0 5.8 7 11 7 11zM12 10.5h.01",
  phone:
    "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z",
  radar: "M12 12l7-7M20 12a8 8 0 1 1-8-8M16 12a4 4 0 1 1-4-4M12 12h.01",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-5",
  zap: "M13 2L4 14h7l-1 8 9-12h-7z",
};

function Icon({ name, size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={iconPaths[name]} />
    </svg>
  );
}

const profile = {
  name: "李辉",
  title: "VCU 应用层软件开发工程师",
  intent: "求职方向：域控制器（VCU）应用层软件工程师",
  phone: "198-5514-3268",
  email: "2386610104@qq.com",
  location: "中国 · 合肥",
  education: "合肥工业大学 · 车辆工程 · 本科（211）",
  summary:
    "3 年+ 新能源 VCU 应用层软件开发经验，参与 4 个量产项目，覆盖控制策略建模、ACC/AEB 纵向控制需求定义、跨域通讯互通、时序同步、故障对接与实车验收闭环。",
};

const stats = [
  { value: "3+", label: "年 VCU 量产开发" },
  { value: "4", label: "核心量产项目" },
  { value: "ACC/AEB", label: "纵向控制交付" },
  { value: "90%+", label: "估算算法精度" },
];

const navItems = [
  { label: "经历", href: "#profile" },
  { label: "项目", href: "#projects" },
  { label: "优势", href: "#advantages" },
  { label: "联系", href: "#contact" },
];

const projects = [
  {
    name: "ACC/AEB 纵向控制系统",
    meta: "纵向控制系统 · 跨域通讯互通 · 时序同步 · 故障对接",
    image: "/project-s800.svg",
    lead: "参与 ACC/AEB 纵向辅助驾驶功能需求对接，围绕跨域通讯互通、时序同步、故障对接及实车问题完成闭环。",
    points: ["ACC 减速请求与 AEB 制动协调验证", "跨域通讯互通、时序同步、故障对接", "提前完成 ACC/AEB 测试功能冻结"],
  },
  {
    name: "尊界 S800",
    meta: "量产项目 · 纯电 / 增程 / MPV 平台 · 2024.05 - 2025.08",
    image: "/project-mpv.svg",
    lead: "负责多平台 VCU 软件版本管理与大版本功能评审，主导高压系统分组功能问题闭环及 BMS 协同排查。",
    points: ["跨车型架构一致性验证", "高压上下电与充放电联调", "量产版本发布基线维护"],
  },
  {
    name: "悍途 PHEV",
    meta: "量产项目 · P2.5 + P4 架构 · 2023.05 - 2025.07",
    image: "/project-pickup.svg",
    lead: "负责换挡、能量管理、HMI 交互、IO 预处理等应用层软件模块，并独立完成自动化 MiL 测试脚本。",
    points: ["提前达成 OTS3 验收", "CAN/CANFD 报文校验脚本", "多次月度红榜与优秀工程师"],
  },
];

const cases = [
  {
    icon: "radar",
    title: "自下而上的问题溯源",
    tag: "P 档验收闭环",
    text:
      "P 档问题中，我沿 GSM 请求、VCU 判断、档位仲裁到实际档位输出逐层回溯，定位到 EPB 刷写同步匹配场景缺失。",
    result: "先保证版本验收，再把约束写入需求文档，完成根因与流程双闭环。",
  },
  {
    icon: "shield",
    title: "自上而下的风险评估",
    tag: "架构与接口评审",
    text:
      "高压回路与 ESP-VCU 接口评审中，我会先判断方案对预充、扭矩解析和 VCU 功能边界的系统性影响。",
    result: "不只看方案是否能实现，更关注歧义、延迟和后续交付风险。",
  },
  {
    icon: "cpu",
    title: "AI 工具下的标准化产出",
    tag: "认知边界与工具协同",
    text:
      "我会明确自身认知边界，把 Codex、Claude、Hermes、Cursor、Cherry Studio 等 AI 工具用于方案拆解、概率预测和结果校验。",
    result: "目标是在不确定条件下获得更稳定、可复用、可验证的标准化结果。",
  },
];

function App() {
  return (
    <>
      <SandField />
      <Hero />
      <main>
        <Profile />
        <Projects />
        <Advantages />
        <Contact />
      </main>
    </>
  );
}

function SandField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const particles = [];
    const mouse = { x: -9999, y: -9999, px: -9999, py: -9999, vx: 0, vy: 0 };
    let width = 0;
    let height = 0;
    let frame = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles.length = 0;

      const count = Math.floor(Math.min(420, Math.max(220, (width * height) / 6200)));
      for (let index = 0; index < count; index += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          baseX: Math.random() * width,
          baseY: Math.random() * height,
          size: Math.random() * 1.6 + 0.45,
          drift: Math.random() * 0.45 + 0.08,
          phase: Math.random() * Math.PI * 2,
          alpha: Math.random() * 0.34 + 0.12,
        });
      }
    };

    const onMouseMove = (event) => {
      mouse.vx = event.clientX - mouse.px;
      mouse.vy = event.clientY - mouse.py;
      mouse.px = mouse.x;
      mouse.py = mouse.y;
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const animate = () => {
      frame += 0.012;
      ctx.clearRect(0, 0, width, height);

      for (const particle of particles) {
        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;
        const influence = Math.max(0, 1 - distance / 210);
        const windX = influence * (mouse.vx * 0.18 + 18);
        const windY = influence * (mouse.vy * 0.08 - 3);

        particle.baseX += particle.drift;
        if (particle.baseX > width + 24) particle.baseX = -24;

        const waveX = Math.cos(frame + particle.phase) * 8;
        const waveY = Math.sin(frame * 1.4 + particle.phase) * 5;
        particle.x += (particle.baseX + waveX + windX - particle.x) * 0.045;
        particle.y += (particle.baseY + waveY + windY - particle.y) * 0.045;

        ctx.beginPath();
        ctx.fillStyle = `rgba(182, 255, 59, ${particle.alpha + influence * 0.32})`;
        ctx.arc(particle.x, particle.y, particle.size + influence * 1.2, 0, Math.PI * 2);
        ctx.fill();

        if (influence > 0.08) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(40, 240, 212, ${influence * 0.18})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(particle.x - windX * 1.8, particle.y - windY * 2);
          ctx.stroke();
        }
      }

      mouse.vx *= 0.88;
      mouse.vy *= 0.88;
      requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <canvas className="sand-field" ref={canvasRef} aria-hidden="true" />;
}

function Hero() {
  return (
    <section className="hero" id="top">
      <video className="hero-video" src="/hero-speed.mp4" autoPlay muted loop playsInline />
      <div className="hero-vignette" />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="返回首页">
          <span className="brand-mark">LH</span>
          <span>VCU SYSTEMS</span>
        </a>
        <nav className="nav-links" aria-label="主导航">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="contact-pill" href={`mailto:${profile.email}`}>
          <Icon name="mail" size={17} />
          联系我
        </a>
      </header>

      <div className="hero-content shell">
        <p className="eyebrow">VCU APPLICATION SOFTWARE · ADAS LONGITUDINAL CONTROL · MASS PRODUCTION</p>
        <h1>
          控制策略
          <span>工程闭环</span>
        </h1>
        <div className="hero-lower compact">
          <p>{profile.name}，{profile.title}。面向新能源整车，将控制策略、纵向控制、跨域集成与实车调试闭环至量产交付。</p>
          <div className="hero-actions">
            <a className="primary-action" href="#projects">
              查看项目
              <Icon name="arrowRight" size={18} />
            </a>
            <a className="secondary-action" href={`tel:${profile.phone}`}>
              <Icon name="phone" size={17} />
              {profile.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="telemetry shell" aria-label="关键数据">
        {stats.map((stat) => (
          <div key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Profile() {
  return (
    <section className="section profile-section" id="profile">
      <div className="shell profile-grid">
        <div className="portrait-panel" aria-label="人物视觉">
          <div className="portrait-orbit">
            <div className="portrait-core">
              <span>LH</span>
              <small>VCU ASW</small>
            </div>
          </div>
          <div className="signal-line signal-a" />
          <div className="signal-line signal-b" />
        </div>

        <div className="profile-copy">
          <p className="section-kicker">PROFILE / EXPERIENCE</p>
          <h2>从控制策略到量产发布，建立稳定的工程闭环。</h2>
          <p className="section-lead">{profile.summary}</p>
          <div className="profile-meta">
            <span>{profile.intent}</span>
            <span>{profile.education}</span>
            <span>江淮汽车技术中心 · 整车控制工程师</span>
          </div>
          <div className="contact-strip">
            <a href={`tel:${profile.phone}`}>
              <Icon name="phone" size={18} />
              {profile.phone}
            </a>
            <a href={`mailto:${profile.email}`}>
              <Icon name="mail" size={18} />
              {profile.email}
            </a>
            <span>
              <Icon name="mapPin" size={18} />
              {profile.location}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="section projects-section" id="projects">
      <div className="shell">
        <div className="section-heading">
          <p className="section-kicker">SELECTED PROJECTS</p>
          <h2>精选项目</h2>
        </div>
        <div className="project-stack">
          {projects.map((project, index) => (
            <article className="project-card" key={project.name}>
              <div className="project-image">
                <img src={project.image} alt={`${project.name} 项目视觉`} />
              </div>
              <div className="project-copy">
                <span className="project-index">0{index + 1}</span>
                <p className="project-meta">{project.meta}</p>
                <h3>{project.name}</h3>
                <p>{project.lead}</p>
                <ul>
                  {project.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Advantages() {
  return (
    <section className="section advantages-section" id="advantages">
      <div className="shell">
        <div className="section-heading horizontal">
          <div>
            <p className="section-kicker">ENGINEERING JUDGEMENT</p>
            <h2>个人优势</h2>
          </div>
          <p>不是只会做模块，而是能沿着信号流找到根因，也能在设计评审阶段提前识别系统风险。</p>
        </div>
        <div className="case-grid">
          {cases.map((item) => (
            <article className="case-card" key={item.title}>
              <div className="case-topline">
                <div className="icon-box">
                  <Icon name={item.icon} size={24} />
                </div>
                <span>{item.tag}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <strong>{item.result}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="shell contact-grid">
        <div>
          <p className="section-kicker">READY FOR NEXT PLATFORM</p>
          <h2>期待加入面向高性能新能源平台的 VCU 应用层软件团队。</h2>
        </div>
        <div className="contact-panel">
          <a href={`mailto:${profile.email}`}>
            <Icon name="mail" size={20} />
            {profile.email}
          </a>
          <a href={`tel:${profile.phone}`}>
            <Icon name="phone" size={20} />
            {profile.phone}
          </a>
          <p>
            <Icon name="zap" size={20} />
            可提供详细项目说明、技能清单与后续面试材料。
          </p>
        </div>
      </div>
    </section>
  );
}

createRoot(document.getElementById("root")).render(<App />);

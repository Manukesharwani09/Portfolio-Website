import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Lightbulb, Wrench, Zap, AlertTriangle, Shield, Database } from 'lucide-react';

const devlogs: Record<string, any> = {
  melento: {
    role: 'Software Engineer Intern',
    company: 'Melento (Formerly Signdesk)',
    period: 'Jan 2026 – Present',
    location: 'Bengaluru, India',
    overview: `Melento (formerly Signdesk) is a fintech/legaltech startup building document signing, MSME verification, and B2B payment automation infrastructure used by enterprises across India. As a Software Engineer Intern, I own end-to-end feature delivery on the payment module — from distributed session handling and async callback pipelines to third-party API integrations and financial accuracy fixes. Every problem here had real money or compliance implications.`,
    sections: [
      {
        icon: 'zap',
        title: 'Distributed Session Locking — Preventing Duplicate Payment Attempts',
        content: `**Problem:** Two users could open the same payment link simultaneously, both click "Proceed to Pay", and both get redirected to the gateway — creating duplicate transactions and finance reconciliation nightmares.

**What I built:** A session validation layer using Redis SET NX (atomic set-if-not-exists) that fires before the gateway redirect. If a session is already active for a payment link, the second user sees a "Payment in progress" block instead of proceeding.

- **Redis SETNX** with a TTL ensures the lock expires automatically if the user abandons the flow mid-way.
- No database writes needed for lock checks — pure Redis, sub-millisecond latency.
- Handles edge cases: session expiry, gateway timeout, user back-button navigation.

This eliminated a class of production bugs where our reconciliation team had to manually reverse duplicate charges.`,
      },
      {
        icon: 'wrench',
        title: 'Idempotent Callback Retry System — Cron-Based, No Duplicates',
        content: `**Problem:** Payment callbacks (both internal product callbacks and client webhooks) were failing silently due to network issues, and the retry cron job was blindly re-triggering all failed callbacks — sending duplicate events to clients.

**Root cause:** The cron job lacked idempotency. Each retry run fetched failed records and fired them without checking if a previous run already succeeded mid-flight.

**What I built:**
- **Idempotency key** on every callback record — a SHA hash of (payment_id + event_type + timestamp).
- Before each retry, the system checks if the callback already delivered a 2xx at any point in history.
- Strict separation: **client callbacks** (to org-configured webhook URLs) and **internal product callbacks** are tracked independently — a client failure never blocks the internal pipeline.
- Cron intervals are configurable per environment; staging runs every 5 min, production every 1 min.

Reduced duplicate callback incidents from multiple per day to zero since deployment.`,
      },
      {
        icon: 'alert',
        title: 'Organization-Level Dynamic Webhook Routing',
        content: `**Problem:** The centralized payment module had a single hardcoded callback destination. As Melento onboarded more enterprise clients, each needed their own webhook endpoint for payment events — there was no way to configure this per organization.

**What I designed & built:**
- Added a **webhook_url** field to Organization Settings schema (MongoDB).
- Modified the payment transaction flow: at the time of transaction initiation, the system reads the org's configured webhook URL and passes it to the payment module as part of the transaction context.
- Payment module now dynamically routes the webhook payload to the org-specific URL on completion.
- **Fallback behavior:** If no webhook URL is configured, the system silently skips — no errors thrown.

This enabled self-serve webhook configuration for enterprise clients without any hardcoded routing logic.`,
      },
      {
        icon: 'shield',
        title: 'ClearTax GSTIN Address Validation & Secure Invoice Links',
        content: `**Two independent problems fixed in the same sprint:**

**1. ClearTax GST Mismatch Bug:**
When generating B2B invoices via ClearTax, the system wasn't cross-validating the GSTIN address submitted by the initiator against the registered address in the GST database. Clients were submitting incorrect addresses that went undetected until government filing.
- Added a validation step that compares ClearTax API response address with initiator-submitted address before invoice generation proceeds.
- Error thrown with clear message: *"GSTIN address does not match the address provided by the initiator."*

**2. Insecure Invoice Download Links (SMS):**
Invoice links sent via SMS were publicly accessible URLs — anyone with the link could download any invoice.
- Replaced static links with **time-limited signed URLs** (AWS S3 presigned URLs, 15-min TTL).
- SMS now contains a secure signed link that expires — even if intercepted, it's useless after expiry.
- B2B invoices additionally require a session token for download.

Both fixes were compliance-critical — the GSTIN one would have caused GST filing rejections.`,
      },
      {
        icon: 'lightbulb',
        title: 'UDYAM (MSME) API Migration & Async Payment Callbacks Without Invoice Dependency',
        content: `**UDYAM Migration (Surepass → TimbleGlance):**
The previous MSME verification provider (Surepass) had uptime issues. Migrated to TimbleGlance API:
\`POST https://www.timbleglance.com/api/Verify_Udyam\` with \`registration_no\` payload.
- Wrote a **provider-agnostic adapter layer** — the rest of the codebase calls a single \`verifyUdyam()\` function; only the adapter knows which provider is active.
- Response schema differences handled inside the adapter with field mapping.
- Zero changes required in controllers or business logic.

**Payment Callback Decoupling:**
Previously, the payment completion callback waited for invoice generation to finish before firing. Invoice generation (ClearTax signing, PDF rendering) can take 3–10 seconds.
- Decoupled callback from invoice: callback fires immediately on payment success with payment details.
- Invoice is generated async; if invoice is ready it's included in callback payload, otherwise omitted.
- Clients receive payment confirmation instantly — invoice arrives in a follow-up event or can be fetched via a separate endpoint.

This reduced client-visible payment confirmation latency from ~10s to <500ms.`,
      },
      {
        icon: 'database',
        title: 'Multi-Page Invoice Calculation Fix & SMS/Email Notification Pipeline',
        content: `**Invoice Calculation Bug (Multi-page with GST):**
For payments with >3 line items and GST enabled, the invoice split across 2 pages. Page 1 showed line item charges; Page 2 showed GST + processing fees. But both pages displayed the *cumulative total* — meaning Page 1 showed the full amount including GST that wasn't on that page yet.
- Fixed subtotal calculation to be page-scoped: each page shows only its own subtotals.
- Final total remains on the last page as a cumulative.
- Required understanding the PDF generation pipeline and modifying the template rendering logic.

**SMS/Email Notification Pipeline:**
If a payment link was created with only a mobile number (no email), the system didn't send SMS on payment success — the signed invoice was silently dropped.
- Added fallback: if \`email_id\` is null but \`mobile\` is present, trigger SMS with a secure invoice link.
- SMS triggered for: payment link invitation, payment success, and invoice ready events.
- Email pipeline unchanged; SMS and email now operate independently.`,
      },
    ],
    tech: ['Node.js', 'Express.js', 'MongoDB', 'Redis', 'AWS S3', 'ClearTax API', 'TimbleGlance API', 'REST APIs', 'Cron Jobs', 'JWT', 'Presigned URLs', 'Webhooks'],
    learnings: [
      'Redis SETNX is the cleanest primitive for distributed mutual exclusion — simpler than any library.',
      'Idempotency keys must be designed before writing retry logic, not bolted on after.',
      'Decoupling async side-effects (invoice gen) from critical-path responses (payment confirmation) is always worth it.',
      'Provider-agnostic adapters make third-party migrations near-zero-risk.',
      'Security in fintech is not optional — presigned URLs, TTLs, and session validation are baseline, not bonuses.',
      'Financial systems demand page-level accuracy, not just total accuracy.',
    ],
  },
};


const iconMap: Record<string, React.ReactNode> = {
  zap: <Zap size={18} />,
  wrench: <Wrench size={18} />,
  alert: <AlertTriangle size={18} />,
  lightbulb: <Lightbulb size={18} />,
  shield: <Shield size={18} />,
  database: <Database size={18} />,
};

const renderContent = (text: string) => {
  return text.split('\n').map((line, i) => {
    if (line.startsWith('- **')) {
      const parts = line.replace('- ', '').split(/\*\*(.*?)\*\*/g);
      return (
        <li key={i} className="flex gap-2 text-gray-300 text-sm">
          <span className="text-terminal-green shrink-0 mt-0.5">›</span>
          <span>
            {parts.map((p, j) => j % 2 === 1 ? <strong key={j} className="text-white">{p}</strong> : p)}
          </span>
        </li>
      );
    }
    if (line.startsWith('- ')) {
      return (
        <li key={i} className="flex gap-2 text-gray-300 text-sm">
          <span className="text-terminal-green shrink-0 mt-0.5">›</span>
          <span>{line.replace('- ', '')}</span>
        </li>
      );
    }
    if (line.trim() === '') return <div key={i} className="h-2" />;
    // Render bold text inline
    const parts = line.split(/\*\*(.*?)\*\*/g);
    return (
      <p key={i} className="text-gray-300 text-sm leading-relaxed">
        {parts.map((p, j) => j % 2 === 1 ? <strong key={j} className="text-white">{p}</strong> : p)}
      </p>
    );
  });
};

const ExperienceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const log = id ? devlogs[id] : null;

  if (!log) {
    return (
      <div className="min-h-screen bg-terminal-black text-terminal-green font-mono flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl mb-4">404 – devlog not found</p>
          <Link to="/" className="text-sm border border-terminal-green/40 px-4 py-2 hover:bg-terminal-green/10">
            ← back to portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-terminal-black text-terminal-green font-mono">
      {/* CRT Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20" />

      <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-terminal-green/60 hover:text-terminal-green transition-colors mb-10 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          back to portfolio
        </Link>

        {/* Header */}
        <div className="border border-terminal-green/30 p-6 mb-10 bg-terminal-green/5">
          <div className="text-xs text-terminal-green/50 mb-2 font-mono">{'>'} cat devlog.md</div>
          <h1 className="text-3xl font-bold text-white mb-1">{log.role}</h1>
          <p className="text-terminal-green text-lg mb-4">{log.company}</p>
          <div className="flex flex-wrap gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1.5"><Calendar size={12} />{log.period}</span>
            <span className="flex items-center gap-1.5"><MapPin size={12} />{log.location}</span>
          </div>
        </div>

        {/* Overview */}
        <div className="mb-10">
          <p className="text-xs text-terminal-green/50 mb-3 font-mono">{'>'} overview</p>
          <p className="text-gray-300 leading-relaxed text-sm border-l-2 border-terminal-green/30 pl-4">{log.overview}</p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {log.sections.map((section: any, i: number) => (
            <div key={i} className="border border-terminal-green/20 p-6 hover:border-terminal-green/40 transition-colors">
              <h2 className="flex items-center gap-3 text-lg font-bold text-white mb-4">
                <span className="text-terminal-green">{iconMap[section.icon]}</span>
                {section.title}
              </h2>
              <ul className="space-y-2">
                {renderContent(section.content)}
              </ul>
            </div>
          ))}
        </div>

        {/* Learnings */}
        <div className="mt-10 border border-terminal-green/30 p-6 bg-terminal-green/5">
          <h2 className="text-lg font-bold text-white mb-4">{'>'} key_learnings</h2>
          <ul className="space-y-2">
            {log.learnings.map((l: string, i: number) => (
              <li key={i} className="flex gap-2 text-sm text-gray-300">
                <span className="text-terminal-green shrink-0">✓</span>
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech stack */}
        <div className="mt-8">
          <p className="text-xs text-terminal-green/50 mb-3 font-mono">{'>'} tech_used</p>
          <div className="flex flex-wrap gap-2">
            {log.tech.map((t: string) => (
              <span key={t} className="px-3 py-1 text-xs font-mono border border-terminal-green/30 text-terminal-green/70 hover:text-terminal-green hover:border-terminal-green/60 transition-colors">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-terminal-green/20 text-center">
          <Link to="/" className="text-sm text-terminal-green/50 hover:text-terminal-green transition-colors">
            ← back to portfolio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetail;

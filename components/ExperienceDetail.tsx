import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Lightbulb, Wrench, Zap, AlertTriangle, Shield, Database, ChevronDown } from 'lucide-react';

const devlogs: Record<string, any> = {
  tapinvest: {
    role: 'SDE-1 (Backend)',
    company: 'Tap Invest',
    period: 'Jun 2026 – Present',
    progression: 'Backend Developer Intern (Jun – Sep 2026) → SDE-1 (Oct 2026 – Present)',
    location: 'Bengaluru, India',
    overview: `Tap Invest is a fintech platform focused on alternative investment products. I joined as a Backend Developer Intern in June 2026 and moved to SDE-1 (Backend) in October 2026. I work across a multi-service backend architecture (Go + Java) and an internal React admin dashboard — shipping features that automate high-volume investment operations and partner management workflows.`,
    sections: [
      {
        icon: 'zap',
        title: 'Bulk RFQ Order Processing System',
        content: `**Problem:** RFQ orders for investment transactions were created individually, making large-scale operations slow and error-prone.

**What I built:** A bulk processing workflow that validates investment eligibility, deduplicates records, and batches database reads to minimise query overhead. Only eligible investments proceed to the external RFQ service.

- Pre-validation filters out already-processed and ineligible records before hitting the DB.
- In-memory lookup maps replace per-record queries — significant speedup on large batches.
- Partial success model: each record carries its own status, so one failure doesn't abort the batch.
- Detailed per-record success/failure reporting for easy retry and audit.`,
      },
      {
        icon: 'wrench',
        title: 'Bulk UES User Configuration Management',
        content: `**Problem:** Assigning engagement configurations to users was a one-by-one manual operation — unworkable at scale.

**What I built:** An end-to-end bulk configuration workflow spanning a React admin dashboard, API gateway, and Go backend service.

- Searchable config dropdown with dynamic options pulled from the backend.
- Input parser handles both newline-separated and comma-separated user ID lists.
- Backend filters users who already have an applicable config, don't exist, are duplicates, or are ineligible by business rule.
- Response categorises skipped users by failure reason — copyable lists per category for easy retries.
- Batched DB reads and bulk inserts keep load low even for thousands of users.`,
      },
      {
        icon: 'shield',
        title: 'Client Unlink Workflow with Investment Validation',
        content: `**Problem:** Partners had no way to deactivate client associations through the dashboard — and blindly unlinking a client with active investments could corrupt business records.

**What I built:** A soft-delete unlink workflow integrated across frontend, API gateway, and a Java/Spring Boot backend service.

- Backend checks for existing investment records before allowing unlink.
- Clients without investments unlink immediately; clients with investments trigger a confirmation step.
- Reused existing service, repository, and transaction patterns — no new architectural layers introduced.
- Changes coordinated across multiple repositories with no impact on existing functionality.`,
      },
      {
        icon: 'database',
        title: 'Form 121 — Depository-wise Payout Summary Endpoint',
        content: `**Problem:** No API existed to support Form 121 generation — users had no way to get a breakdown of their upcoming interest payouts grouped by depository (CDSL / NSDL / NO_DEP) for the current financial year.

**What I built:** End-to-end across two services — Go backend (Horizon) and Java BFF (Pulse).

- New \`GET /api/v1/investments/form-121/:userId\` in Horizon: joins \`investments\` + \`investment_transactions\`, filters for \`INVESTMENT_SUCCESS\` + \`PAYOUT\` transactions with \`ideal_payout_date\` in the current Indian financial year (April 1–March 31, calculated in IST).
- **Depository classification logic:** CDSL → \`ben_id\` present, \`dp_id\` null; NSDL → both present; NO_DEP → otherwise.
- Returns \`COUNT(DISTINCT isin)\` and \`SUM(ideal_interest_amount)\` per depository group in a single query.
- Pulse BFF proxies the endpoint at \`GET /v1/investment/form-121\` — userId resolved from JWT (\`X-Bs-Auth\` header), following existing auth patterns.
- Added DTOs, repository interface, service, controller, and route registration across both repos with no changes to existing investment flows.`,
      },
      {
        icon: 'wrench',
        title: 'Cashflow Calculator Redesign — ISIN-Direct Pricing Engine',
        content: `**Problem:** The cashflow calculator required an IPC (ISINPlatformConfig) deal lookup to price bonds — a seller/state/deal-specific layer that added unnecessary coupling for a general-purpose pricing tool.

**What I built:** Rewrote the calculator end-to-end across three services — Go backend (Horizon), API gateway (Sonar), and React admin dashboard (Radar) — to work directly with ISINs.

- New \`GET /api/v1/isin/all\` endpoint to fetch all ISINs; new \`POST /api/v1/cashflow/calculate-by-isin\` endpoint that accepts an ISIN with either yield or clean price (mutual exclusion enforced).
- Caller-supplied settlement date with full backend validation: working day, not a record date for that ISIN, within issue–maturity range.
- **IST timezone fix:** frontend ISO-8601 UTC timestamps were shifting dates back by one day — backend normalises to IST midnight before all date checks and response formatting.
- Rewrote the React dialog: replaced deal/IPC dropdown with a searchable ISIN dropdown, merged the separate yield→price and price→yield flows into a single unified calculator.
- Replaced debounced auto-calculate with an explicit **Calculate button** — prevents partial API calls while the user is still typing.
- Results panel: total consideration (hero metric), full pricing grid (clean/dirty price, accrued interest, stamp duty, NPV, expected returns), copyable per-field and full-summary.`,
      },
      {
        icon: 'database',
        title: 'Deridata Integration — Bond Data Pipeline to Public Bonds Directory (Phases 1–3)',
        content: `**Problem:** Bond covenant, security-detail and secondary-trade data lived in Deridata (a third-party market data provider), mostly as unstructured free text — with no path into our system for ops to review it, the mobile app to show it, or a public directory to list it.

**What I built:** Owned the integration end-to-end across three phases — from the raw ingestion pipeline, to structured covenant parsing for Deal Detail 3.0, to an NSE-driven sync powering a public Bonds Directory — across Snape, Sonar, Pulse and Radar.

**Phase 1 — Foundation pipeline**
- Deridata API client with **HMAC-SHA256 auth** covering all 5 upstream endpoints, 8 new entities with a repository per entity, and 6 REST endpoints under \`/api/v1/deridata/*\`.
- **Parallel fetch, single transaction:** 4 upstream calls via \`errgroup\`, persisted atomically; \`singleflight\` collapses duplicate concurrent fetches for the same ISIN, and calculator failures are non-fatal.
- **Trade history accumulates, never overwrites:** deduped by \`trade_date\` on every sync, building history beyond Deridata's rolling 15-day window.
- **Debugged a prod 500:** the API gateway was silently falling back to a hardcoded stage URL with a stale route prefix — fixed by requiring the upstream URL per environment.

**Phase 2 — Deal Detail 3.0 covenant parsing**
- **Covenant parser** turns free text into structured JSON across 7 covenant types, collapsing multi-threshold metrics into timelines and handling named, grouped and mixed promoter shareholding.
- Separate ops-edited tables as the source of truth, kept distinct from the raw synced tables used for audit; a one-call multipart endpoint saves covenant JSON plus photos with the backend uploading to S3 directly.
- Ops-dashboard editor with a "Fetch from Deridata" pre-fill, and a BFF merge into the mobile ISIN detail that fails silently to nulls instead of breaking the response.
- Regression-tested all 92 reference ISINs after every parser fix — latest full pass had zero parsing defects.

**Phase 3 — NSE universe sync & Bonds Directory**
- Scope: a public, SEO-facing directory of ~1,700 bonds and 412 issuers.
- **Rerouted an infra blocker:** NSE's API sits behind Akamai bot-management that silently drops Go's default HTTP client — moved the fetch into an existing internal service with a working NSE session, reusing its Redis-cached token and 401-retry logic.
- **Shipped the sync job:** diffs NSE's Corporate Bond universe against existing ISINs and pulls new/changed bonds from Deridata in sequential batches, capped while validating against Deridata's rate limits.
- Designing the directory surface: an allow-listed public search endpoint (no raw filter/sort passthrough), bond detail with cashflow face-value scaling, issuer-level aggregates recomputed at refresh, and a Redis cache-aside layer for live-on-platform status.`,
      },
      {
        icon: 'database',
        title: 'TheFixedIncome External Offers — Multi-Vendor Proxy Architecture',
        content: `**Problem:** BondScanner had no way to surface live bond/G-Sec offers from TheFixedIncome, an external partner API — no client existed anywhere in the stack, and the ops dashboard had no page to browse or filter this inventory.

**What I built:** A full live pass-through integration spanning three services (Snape, Sonar, Radar) with zero local storage — every request proxies straight through to the partner API.

- New Snape client with **Redis-cached bearer-token auth**: token minted via the partner's \`get-token\` endpoint, cached with a long TTL, and transparently regenerated — with a distributed lock to prevent duplicate token requests under concurrent load — whenever a call comes back \`401\`.
- Deliberately **untyped JSON passthrough** for the offer payload itself (only the request-side filter struct is typed) — new fields the partner adds surface automatically with a frontend-only change, no backend redeploy needed.
- Designed the query-param boundary so **Sonar stays fully vendor-agnostic** — it forwards raw query values with no knowledge of filter fields at all — while Snape owns the one typed adapter mapping our filters to the partner's exact param names. A second vendor integration later only touches Snape.
- Verified live API behavior with direct curl testing before committing to a design — e.g. confirmed the partner's \`order_by\` throws a 500 on any nested field name, so only flat top-level fields are exposed as sortable columns.
- Radar page: type-scoped table (G-Sec / Bond Secondary) with a sticky ISIN column, client-side pagination and page-size selection (dataset is small enough to fetch in full per filter change), server-driven sort/filter round-tripped through Sonar → Snape → partner API, and a detail view decoding ~20 numeric enum fields (coupon type, security type, listing status, etc.) against the partner's published value tables.`,
      },
      {
        icon: 'shield',
        title: 'Cross-Service Reconciliation — Failure Tracking & Drift Detection',
        content: `**Problem:** An investment's lifecycle spans several backend services. When a call between them failed or never completed, the services could silently fall out of sync, and nobody noticed until a user or the ops team raised it.

**What I built:** A reusable Go library and a record → promote → reconcile pipeline that finds investments whose cross-service steps failed and flags what is out of sync.

- **Step-level failure markers in Redis:** each top-level workflow step records a marker when it starts and clears it on success; a failure, or a process dying mid-step, leaves the marker behind on purpose.
- **One marker per step, per investment:** each step gets its own key, so one step succeeding can never clear another step's failure.
- **Promote job** moves markers older than a staleness threshold into a database table, so steps still in flight are never mistaken for failures.
- **Reconcile job** checks each flagged investment against the live state of every service involved and records the inconsistencies it finds — detect-and-record only, by design. Checks cover status lagging behind the payments service, paid investments with no RFQ order, RFQ stage mismatches, refunds that never started or succeeded after a failure, missing order/deal sheets and quote receipts, and inventory still blocked after a failed payment.
- **Each service keeps its own failure rows:** the payments service exposes read-candidates and apply-result endpoints, so the reconcile job in the investments service writes results back where each row lives instead of copying them; a whole diagnosis is saved in a single write.
- Only failures the reconcile job can actually detect keep a marker — notification, email and analytics failures alone don't; effects that used to swallow errors now return them.
- The document service now answers "not found" instead of a generic error when a sheet doesn't exist, so a missing document is flagged while a temporary outage is skipped rather than miscounted.
- **Closed a related prod gap:** a paid investment whose RFQ order failed to create had no trade date, so the hourly settlement recon never picked it up until settlement day. Added a sweep for paid-but-no-RFQ investments, and a guard that refuses to draft an RFQ with an already-passed trade date — reported for manual action instead of retried every hour.
- Reuses each service's existing Redis and database connections instead of opening new ones; published as a versioned Go module shared by the services.
- **End-to-end test harness** with fake external dependencies and a fault-injection proxy, covering 11 real failure scenarios (document service down, payments service down, refunds, vendor change, settlement failure, offline UPI refunds), each asserted to record exactly the expected issues.`,
      },
      {
        icon: 'shield',
        title: 'Refund Module — Maker-Checker Approval & Cross-Service State Sync',
        content: `**Problem:** Refunds could start from four different places (a Payments button, an RFQ Orders button, a status change in the investments service, and a nightly cron), none needed approval, and each one updated a different set of tables. Some paths moved the money but never told the investments service, which then rejected the final "refund succeeded" update and left notifications retrying forever. Others moved the investment but left orders live or never sent the money at all.

**What I built:** One rule across four services (Mercury, Sonar, Horizon, Radar): every refund is a request in the maker-checker approval inbox, nothing changes while it waits, and the checker's approval starts the refund and moves the payment, every related RFQ order and the investment in a single step.

- **Two-step API in the payments service:** a read-only \`check\` endpoint resolves any source (payment, order, investment, RFQ order or settlement) to the payment behind it, validates it and reports amount, method and trade stage without writing anything; a \`start\` endpoint, called only on approval, re-validates under the order lock and starts the refund.
- **UPI refunds go offline:** UPI money never sits with the gateway, so the gateway rejected every UPI refund and a nightly cron kept retrying them. UPI refunds now skip the gateway entirely, move to an offline in-progress state with the investment and RFQ orders updated, and ops close them with a Complete action once the money is returned.
- **Explicit outcomes per gateway:** net-banking refunds go to the gateway and come back as started, refused (nothing else moves) or retry-scheduled (the gateway was down, so the cron sends it later while orders and the investment have already moved).
- **Trade stage shown, not enforced:** the checker sees whether the bonds were not placed, placed or already sold, so approval is a human decision instead of a hardcoded same-day rule; already-blocked inventory is released automatically, placed or sold units are left alone.
- **Duplicate protection:** one open request per payment, and a second click gets a clear "awaiting approval" / "already in progress" response instead of silently doing nothing; full-amount-only refunds enforced at the gateway layer.
- Removed the two old refund endpoints that bypassed approval, kept one narrow path for refunds triggered directly from the investments service (still refused once a trade is committed), and added a new checker permission, a refund view in the approvals inbox, and a Complete action for offline UPI refunds in the admin dashboard.
- **End-to-end tested locally** against a fake payment gateway: 81 checks across net banking and UPI, placed and unplaced trades, gateway refusal, gateway downtime, bank-side failure, double payments and the direct-trigger path — all passing.`,
      },
      {
        icon: 'database',
        title: 'Daily Settlement Reconciliation — End-to-End Money Trail per Settlement Date',
        content: `**Problem:** For any settlement day, the money trail runs across two services and seven tables — investments, payment orders, payment legs, refunds, gateway settlements, RFQ orders and the daily statement. Nobody could see in one place whether a day had fully closed, or which order was stuck where.

**What I built:** A daily settlement recon across four services (Mercury, Horizon, Sonar, Radar), surfaced as a new Settlement Recon page in the ops dashboard with a single settlement-date filter.

- **Computed once, read many times:** a sync (manual button or cron) reconciles the day across both services and stores the result as a JSON snapshot on that day's statement row — opening the page never fans out to three systems, and the statement table is the only one written.
- **Invariants for a healthy day:** no investment left unplaced or un-advanced after its settlement date, net-banking payments equal gateway settlement totals, settled-out equals the statement, and settlement amount equals payment minus charges.
- **Named detectors** for each kind of gap — money stuck at the gateway, trade never placed, settled but not booked, stale refunds, offline-investment drift, status drift, and a surplus payment leg held with no settlement or refund (confirmed with a capped per-order lookup against the gateway).
- **Day states** — Upcoming, In progress, Closed, Open gap — with only a failing critical invariant shown as red; UPI money settles through exchange clearing, not the gateway, so it is reported informationally and never flagged as a gap.
- **Pivot-table UI:** one table with a column per stage (investment → order → payment legs → settlement → RFQ), collapsible nested buckets with counts and amounts, and each detector attached to the exact bucket that fires it — a healthy day is a table with no flags.
- Sync refuses to fabricate a statement row for a day that has none, so a missing day can never show up as a real zero balance.
- Verified the recon queries read-only against production data for a real day — the totals matched the expected arithmetic exactly.`,
      },
      {
        icon: 'wrench',
        title: 'Bonds Explorer — Server-Driven Drill-Down for Companies, ISINs, Inventory & Deals',
        content: `**Problem:** The ops dashboard's Companies view was one flat table that opened a narrow side sheet with a 12-column ISIN table (sideways scrolling, no search, client-side pagination), with inventory in yet another stacked dialog. Deals had the same side-panel design.

**What I built:** Rebuilt the bond screens as drill-down pages backed by new query endpoints, across Horizon, Sonar and Radar.

- **Pages, not panels:** Companies → company page (stat tiles, ISINs / Inventory / Details tabs), a new all-ISINs list → ISIN page (Inventory / Cashflow / Documents / Carousel / Deals tabs), and Deals → deal page (Overview with inline edits, Inventory, Investments). Old side-panel links redirect to the new pages.
- **Everything in the database:** three new query endpoints return rows with their rollups (ISIN counts, unit totals, document presence) as SQL columns, so search, filter, sort and pagination all run server-side, with a unique-key tiebreaker so pages never shuffle.
- **Closed a query-injection surface:** every query endpoint now checks search, filter and sort fields against an allow-list of real columns (unknown fields get a clear 400), and the shared query-builder library was upgraded to validate identifiers and drop a raw-subquery operator.
- **Removed an N+1:** the existing per-issuer ISIN listing now runs as one summary query instead of two extra queries per ISIN.
- **Reusable frontend building blocks:** URL-held table state (shareable, back-button friendly), a server-driven table component, detail-page shell and URL tabs; types mirror the server allow-lists so the compiler rejects a field the server would refuse.
- Sellable inventory lots sort first, with expired / sold-out lots muted and badged; deal edits now reject blank or invalid values that used to silently save as zero.`,
      },
    ],
    tech: ['Go', 'Gin', 'GORM', 'PostgreSQL', 'Redis', 'Java', 'Spring Boot', 'React', 'TypeScript', 'Next.js', 'AWS S3', 'REST APIs', 'Multi-service Architecture'],
    learnings: [
      'Batch DB reads + in-memory maps are the first move whenever N-record loops show up.',
      'Partial success models are essential for bulk ops — failing the whole batch on one bad record is never acceptable.',
      'Soft-deletes with pre-validation guards prevent silent data integrity bugs downstream.',
      'Coordinating changes across multiple services requires agreeing on contracts before writing any code.',
      'Timezone normalisation on the backend is non-negotiable when the frontend sends UTC timestamps for date-sensitive business logic.',
      'Free-text parsers need regression testing against real-world data at scale, not just handwritten fixtures — re-ran all 92 reference ISINs after every parser change.',
      'Fail-silent vs fail-loud on a downstream dependency is a deliberate architecture decision to confirm explicitly with the team, not an implicit default.',
      'Never rely on a hardcoded default URL across environments — explicit env var configuration prevents subtle stage/prod route-prefix mismatches.',
      'When a third-party network layer silently blocks a default HTTP client (anti-bot vendors like Akamai), check for an existing internal service with a working session first — reinventing evasion logic is the wrong fix.',
      'Scoping a feature into the right service boundary matters as much as the implementation itself — moved an adjacent capture feature out of the data-layer service once its actual ownership became clear.',
      '`singleflight` is the right tool to collapse duplicate concurrent fetches for the same key — cheaper than locking or queuing at the DB layer.',
      'Untyped JSON passthrough at a service boundary is a deliberate tradeoff, not laziness — it buys zero backend changes when an upstream partner adds a field, worth it only when downstream never needs to act on unknown fields.',
      'In a multi-service proxy, put vendor-specific mapping knowledge at the one layer closest to the actual vendor contract — every other layer should stay agnostic, so a second vendor integration only touches one place.',
      'Verify undocumented third-party API behavior (sort/pagination internals especially) with real curl tests before designing around it — official docs saying nothing about a behavior is not the same as that behavior not mattering.',
      'Record failures at the workflow-step level, not per call — it also catches crashes mid-flow and "call succeeded but saving its result failed".',
      'A detector that treats "couldn\'t check" as "no issue" silently hides real problems — a downstream service\'s "not found" vs "error" distinction is part of the contract.',
      'Fault-injection end-to-end tests surface integration bugs that unit tests never will.',
    ],
  },
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

const renderInline = (text: string) =>
  text.split(/(\*\*.*?\*\*|`[^`]+`)/g).map((p, j) => {
    if (p.startsWith('**') && p.endsWith('**')) return <strong key={j} className="text-white">{p.slice(2, -2)}</strong>;
    if (p.startsWith('`') && p.endsWith('`')) {
      return <code key={j} className="px-1 py-0.5 text-[0.8em] bg-terminal-green/10 text-terminal-green/90 rounded-sm">{p.slice(1, -1)}</code>;
    }
    return p;
  });

const renderContent = (text: string) => {
  return text.split('\n').map((line, i) => {
    if (line.startsWith('- ')) {
      return (
        <li key={i} className="flex gap-2 text-gray-300 text-sm leading-relaxed">
          <span className="text-terminal-green shrink-0 mt-0.5">›</span>
          <span>{renderInline(line.slice(2))}</span>
        </li>
      );
    }
    if (line.trim() === '') return <div key={i} className="h-2" />;
    // A line that is only **text** is a sub-heading (e.g. phases inside one section)
    if (/^\*\*[^*]+\*\*$/.test(line.trim()) && !line.trim().endsWith(':**')) {
      return (
        <h3 key={i} className="text-sm font-bold text-terminal-green mt-4 pt-3 border-t border-terminal-green/15">
          {line.trim().slice(2, -2)}
        </h3>
      );
    }
    return (
      <p key={i} className="text-gray-300 text-sm leading-relaxed">
        {renderInline(line)}
      </p>
    );
  });
};

const LEARNINGS_PREVIEW = 5;

// Splits a section into its first paragraph (the Problem) and everything after it
const splitContent = (content: string) => {
  const idx = content.indexOf('\n\n');
  return idx === -1 ? { summary: content, rest: '' } : { summary: content.slice(0, idx), rest: content.slice(idx + 2) };
};

const ExperienceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const log = id ? devlogs[id] : null;
  const [open, setOpen] = useState<Set<number>>(new Set());
  const [showAllLearnings, setShowAllLearnings] = useState(false);

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const jumpTo = (i: number) => {
    setOpen((prev) => new Set(prev).add(i));
    document.getElementById(`section-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
      <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-10" />

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
          {log.progression && <p className="text-xs text-terminal-green/60 -mt-2 mb-4">{log.progression}</p>}
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

        {/* Contents */}
        <div className="mb-10 border border-terminal-green/20 p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-terminal-green/50 font-mono">{'>'} ls ./devlog</p>
            <button
              onClick={() =>
                setOpen(open.size === log.sections.length ? new Set() : new Set(log.sections.map((_: any, i: number) => i)))
              }
              className="text-xs text-terminal-green/60 hover:text-terminal-green transition-colors"
            >
              {open.size === log.sections.length ? 'collapse all' : 'expand all'}
            </button>
          </div>
          <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
            {log.sections.map((section: any, i: number) => (
              <li key={i}>
                <button
                  onClick={() => jumpTo(i)}
                  className="flex gap-2 text-left text-sm text-gray-300 hover:text-terminal-green transition-colors"
                >
                  <span className="text-terminal-green/50 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                  <span>{section.title.split(' — ')[0]}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {log.sections.map((section: any, i: number) => {
            const { summary, rest } = splitContent(section.content);
            const isOpen = open.has(i);
            return (
              <div
                key={i}
                id={`section-${i}`}
                className={`scroll-mt-6 border p-6 transition-colors ${isOpen ? 'border-terminal-green/40' : 'border-terminal-green/20 hover:border-terminal-green/40'}`}
              >
                <button onClick={() => toggle(i)} className="w-full text-left" aria-expanded={isOpen}>
                  <h2 className="flex items-start gap-3 text-lg font-bold text-white">
                    <span className="text-terminal-green/50 text-sm font-mono mt-1 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-terminal-green mt-1 shrink-0">{iconMap[section.icon]}</span>
                    <span className="flex-1">{section.title}</span>
                    <ChevronDown
                      size={18}
                      className={`text-terminal-green/60 mt-1 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </h2>
                </button>
                <ul className="space-y-2 mt-4">{renderContent(summary)}</ul>
                {rest && isOpen && <ul className="space-y-2 mt-2">{renderContent('\n' + rest)}</ul>}
                {rest && !isOpen && (
                  <button onClick={() => toggle(i)} className="mt-3 text-xs text-terminal-green/60 hover:text-terminal-green transition-colors">
                    {'> read more'}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Learnings */}
        <div className="mt-10 border border-terminal-green/30 p-6 bg-terminal-green/5">
          <h2 className="text-lg font-bold text-white mb-4">{'>'} key_learnings</h2>
          <ul className="space-y-2">
            {(showAllLearnings ? log.learnings : log.learnings.slice(0, LEARNINGS_PREVIEW)).map((l: string, i: number) => (
              <li key={i} className="flex gap-2 text-sm text-gray-300">
                <span className="text-terminal-green shrink-0">✓</span>
                <span>{renderInline(l)}</span>
              </li>
            ))}
          </ul>
          {log.learnings.length > LEARNINGS_PREVIEW && (
            <button
              onClick={() => setShowAllLearnings((v) => !v)}
              className="mt-4 text-xs text-terminal-green/60 hover:text-terminal-green transition-colors"
            >
              {showAllLearnings ? '> show less' : `> show all ${log.learnings.length}`}
            </button>
          )}
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

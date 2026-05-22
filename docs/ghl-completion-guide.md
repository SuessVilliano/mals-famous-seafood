# Mal's Famous Seafood & Grill — GHL Build Status & Completion Guide
**Location ID:** y5UtZ6XKTKjdp9sEcGZO | **Last Updated:** May 22, 2026

---

## ✅ ALREADY LIVE (Built via API)

### Tags (15 created)
`new-lead` · `lead-responded` · `follow-up-complete` · `order-placed` · `order-complete` · `review-requested` · `review-submitted` · `catering-inquiry` · `catering-complete` · `vip-client` · `win-back` · `review-link-clicked` · `catering-follow-up-complete` · `birthday-promo-sent` · `missed-call`

### Custom Contact Fields (12 created)
| Field | Type |
|---|---|
| Event Type | Text |
| Event Date | Date |
| Guest Count | Numerical |
| Event Location | Text |
| Catering Budget | Monetary |
| Order Items | Large Text |
| Pickup Time | Text |
| Special Instructions | Large Text |
| Birthday Month | Text |
| Last Order Date | Date |
| Inquiry Type | Radio (5 options) |
| How Did You Hear | Radio (8 options) |

### Custom Values (15 created)
Business Name · Business Phone · Business Email · Business Address · Menu Link · Website URL · Google Review Link · Instagram URL · TikTok URL · Facebook URL · DoorDash Link · Uber Eats Link · Catering Booking Link · Order Confirmation SMS · Review Request SMS

> **Action Required:** Go to Settings → Custom Values and fill in the real URLs for Google Review, DoorDash, Uber Eats, and social handles once those are live.

### Calendars (3 created)
| Calendar | Duration | ID |
|---|---|---|
| Catering Discovery Call | 30 min | fK7Rvw51OyaBALBjXnfD |
| Event Planning Follow-Up | 15 min | a86KBiomx1CjFZ4byERf |
| Order Pickup Scheduling | 15 min | bU5FKF7EJZhMAa5KNkGC |

> **Action Required:** Go to Calendars → set availability hours for each (suggested: Mon–Sat 10am–7pm ET).

---

## 🔧 REMAINING — DO IN GHL UI

### STEP 1 — Create Pipelines

Go to **CRM → Pipelines → + Add Pipeline**

#### Pipeline 1: Lead Pipeline
| # | Stage Name |
|---|---|
| 1 | New Lead |
| 2 | Contacted |
| 3 | Follow-Up |
| 4 | Qualified |
| 5 | Converted |
| 6 | Lost |

#### Pipeline 2: Catering Pipeline
| # | Stage Name |
|---|---|
| 1 | Catering Inquiry |
| 2 | Discovery Call Booked |
| 3 | Proposal Sent |
| 4 | Negotiation |
| 5 | Booked & Deposit Paid |
| 6 | Event Completed |
| 7 | Closed / Lost |

### STEP 2 — Build Automation Workflows

Go to **Automation → Workflows → + New Workflow**

Build these 6 workflows:
1. New Lead Follow-Up (trigger: tag `new-lead`)
2. Order Confirmation + Review Request (trigger: tag `order-placed`)
3. Catering Inquiry Pipeline (trigger: tag `catering-inquiry`)
4. Review Request Campaign (trigger: tag `order-complete`)
5. Missed Call Text-Back (trigger: missed incoming call)
6. Win-Back Campaign (trigger: tag `win-back`)

See the full workflow details in `docs/ghl-setup-guide.md`.

### STEP 3 — Build Forms

Go to **Sites → Forms → + New Form**

1. Contact & General Inquiry Form
2. Catering Request Form
3. Online Order Form
4. SMS / Promo Opt-In

### STEP 4 — Social Planner Setup

- Connect: Instagram Business · Facebook Page · TikTok Business · Google Business Profile
- Set up content categories and recurring post queue
- See full social planner details in `docs/ghl-setup-guide.md`

---

## 📊 SMART LISTS TO CREATE

| Smart List Name | Filter |
|---|---|
| 🔥 Hot Leads | Tag = `new-lead` AND Date Added < 24h |
| 🦀 Recent Customers | Tag = `order-complete` AND Order Date < 7 days |
| ⭐ Review Pending | Tag = `order-complete` AND NOT `review-submitted` |
| 🎉 Catering Leads | Tag = `catering-inquiry` |
| 📎 VIP Clients | Tag = `vip-client` |
| 😴 Win-Back | No order in 60+ days |

---

## 🔗 QUICK REFERENCE — IDs & KEYS

### Calendars
| Calendar | ID |
|---|---|
| Catering Discovery Call (30 min) | `fK7Rvw51OyaBALBjXnfD` |
| Event Planning Follow-Up (15 min) | `a86KBiomx1CjFZ4byERf` |
| Order Pickup Scheduling (15 min) | `bU5FKF7EJZhMAa5KNkGC` |

### Custom Value Keys
| Value | Key |
|---|---|
| Menu Link | `{{custom_values.menu_link}}` |
| Google Review Link | `{{custom_values.google_review_link}}` |
| Catering Booking Link | `{{custom_values.catering_booking_link}}` |
| Business Phone | `{{custom_values.business_phone}}` |

---

*Mal's Famous Seafood & Grill — GHL Build v1.0 | Built by Liv8 Entertainment*
# Mal's Famous Seafood — GHL Subaccount Setup & Automation Guide

## Overview
This document covers the complete GoHighLevel (GHL) subaccount setup for Mal's Famous Seafood, including pipeline configuration, automation workflows, and integration steps.

---

## 1. SUBACCOUNT SETUP

### Subaccount Details
- **Business Name:** Mal's Famous Seafood
- **Industry:** Food & Beverage / Food Truck
- **Primary Color:** #D4A017 (Gold)
- **Secondary Color:** #0A0A0A (Black)
- **Timezone:** Set to client's local timezone

### Initial Configuration Checklist
- [ ] Create subaccount in GHL Agency dashboard
- [ ] Upload logo (Mal's Famous Seafood branding)
- [ ] Set business address and phone number
- [ ] Connect custom domain (e.g., malsfamousseafood.com)
- [ ] Configure SMS/email sending profile
- [ ] Connect Twilio or LC Phone for SMS
- [ ] Set up LC Email or connect Mailgun/SendGrid
- [ ] Connect Google Business Profile
- [ ] Link social media accounts (Instagram, Facebook, TikTok)
- [ ] Configure calendar for catering appointments

---

## 2. PIPELINES

### Pipeline 1: Lead Pipeline
**Stages:**
1. **New Lead** — Initial inquiry from website form, social, or ad
2. **Contacted** — First outreach sent (auto)
3. **Follow-Up** — Awaiting response after second touch
4. **Qualified** — Confirmed interest, ready to convert
5. **Converted** — Became customer / placed order
6. **Lost** — No response after all follow-up attempts

### Pipeline 2: Catering Pipeline
**Stages:**
1. **Catering Inquiry** — Event details submitted
2. **Discovery Call Booked** — Calendar appointment confirmed
3. **Proposal Sent** — Quote/details sent via email
4. **Negotiation** — Active back-and-forth
5. **Booked & Deposit Paid** — Confirmed event with payment
6. **Event Completed** — Post-event review request sent
7. **Closed / Lost** — Did not book

---

## 3. AUTOMATION WORKFLOWS

### AUTOMATION 1: New Lead Follow-Up
**Trigger:** Contact submits form on website (tag: `new-lead`)

| Step | Action | Timing | Message |
|------|--------|--------|---------|
| 1 | Send SMS | Immediately | *"Hey [First Name]! This is Mal from Mal's Famous Seafood 🦀 Thanks for reaching out! How can we help you today?"* |
| 2 | Send Email | Immediately | Welcome email with menu link |
| 3 | Internal Notification | Immediately | Notify team of new lead |
| 4 | Wait | 2 hours | — |
| 5 | SMS Follow-Up | 2 hours | *"Just checking in! What can we do for you? 🙌"* |
| 6 | Wait | 24 hours | — |
| 7 | Email Follow-Up | 24 hours | Short email with menu link |
| 8 | Final SMS | 3 days | Last check-in with menu link |
| 9 | Add Tag | End | `follow-up-complete` |

### AUTOMATION 2: Order Confirmation
**Trigger:** Tag `order-placed`

| Step | Action | Timing |
|------|--------|--------|
| 1 | SMS Confirmation | Immediately |
| 2 | Email Confirmation | Immediately |
| 3 | SMS Ready Alert | ~30 min |
| 4 | Review Request SMS | 1 hour after pickup |
| 5 | Add Tags | `order-complete`, `review-requested` |

### AUTOMATION 3: Catering Inquiry Pipeline
**Trigger:** Tag `catering-inquiry`

| Step | Action | Timing |
|------|--------|--------|
| 1 | Add to Catering Pipeline | Immediately |
| 2 | SMS to client | Immediately |
| 3 | Email to client | Immediately |
| 4 | Internal Alert to Mal | Immediately |
| 5 | Book Call SMS | 1 hour if no booking |
| 6 | Follow-up Email | 24 hours if no booking |
| 7 | Final SMS | 3 days if no booking |

---

## 4. FORMS TO BUILD IN GHL

1. **Contact / General Inquiry Form**
2. **Catering Request Form**
3. **Online Order Form**
4. **Newsletter / SMS Opt-In**

---

## 5. TAGS REFERENCE

| Tag | Description |
|-----|-------------|
| `new-lead` | Fresh inquiry |
| `order-placed` | Placed an order |
| `order-complete` | Order fulfilled |
| `review-requested` | Review request sent |
| `catering-inquiry` | Submitted catering request |
| `catering-complete` | Event finished |
| `vip-client` | Repeat / catering customer |
| `missed-call` | Missed incoming call |

---

*Document Version 1.0 | Mal's Famous Seafood | Built by Liv8 Entertainment*
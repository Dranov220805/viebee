# 03 — Coding Conventions & Standards 📐

## 1. Unified API Response Envelope

Every endpoint in the NestJS backend and every simulated response from the frontend mock storage adapter strictly conforms to the following contract:

### Success Payload:
```json
{
  "status": "success",
  "statusCode": 200,
  "message": "Xử lý thành công",
  "error": null,
  "systemName": "VIEBEE_HERITAGE_SERVICE",
  "data": { ... }
}
```

### Error Payload:
```json
{
  "status": "error",
  "statusCode": 400,
  "message": "Không tìm thấy workshop tương ứng.",
  "error": {
    "code": "WORKSHOP_NOT_FOUND",
    "details": null
  },
  "systemName": "VIEBEE_HERITAGE_SERVICE"
}
```

---

## 2. Browser Storage Keys

| Storage Key | Type | Content |
|---|---|---|
| `viebee_current_user` | `localStorage` | Active user account (Maya, Bà Ba, Chú Tư, Admin) |
| `viebee_workshops_data` | `localStorage` | Array of workshops, slots, and RAG knowledge sheets |
| `viebee_rsvps_data` | `localStorage` | Array of confirmed bookings, payout records, and QR tokens |
| `viebee_copilot_chats` | `localStorage` | Active two-way chat stream with bilateral translations |
| `viebee_auth_token` | `localStorage` | Simulated JWT Bearer session token |

---

## 3. Financial Calculation Standards

```typescript
// Enforced in both frontend currency.ts and backend booking.service.ts:
const platformFee = Math.round(totalPrice * 0.12); // 12% VieBee take rate
const hostPayout = totalPrice - platformFee;        // 88% Direct Host disbursement
```

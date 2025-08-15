# Razorpay Integration Setup Guide

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id_here
```

## Getting Razorpay Keys

1. Sign up for a Razorpay account at [razorpay.com](https://razorpay.com)
2. Go to Settings > API Keys
3. Generate a new key pair
4. Copy the Key ID and Key Secret to your `.env.local` file

## Course Pricing Configuration

The current course prices are configured in `src/components/GlobalRegistrationDialog.jsx`:

```javascript
const coursePrices = {
  "FREE Coaching Program": 0,
  "Foundation Batch for 12th Pass": 5000, // ₹5000
};
```

You can modify these prices as needed.

## How It Works

1. **User Registration**: When a user submits the form, it's saved with status "pending"
2. **LocalStorage**: The pending application is saved in localStorage for persistence
3. **Payment Flow**: 
   - For paid courses: Razorpay checkout opens automatically
   - For free courses: Application is approved immediately
4. **Payment Success**: Application status changes from "pending" to "approved"
5. **Database Update**: Payment records are stored in the `payments` table

## API Endpoints

- `POST /api/razorpay/create-order` - Creates Razorpay payment order
- `POST /api/razorpay/verify-payment` - Verifies payment and updates application status
- `GET /api/courses/prices` - Returns course pricing information

## Database Tables

The system automatically creates these tables:
- `applications` - Stores user applications with status
- `payments` - Stores payment records linked to applications

## Testing

1. Use Razorpay test mode for development
2. Test with test card numbers provided by Razorpay
3. Verify payment flow end-to-end

## Security Notes

- Never expose `RAZORPAY_KEY_SECRET` on the client side
- Always verify payment signatures on the server
- Use HTTPS in production
- Implement proper error handling and logging

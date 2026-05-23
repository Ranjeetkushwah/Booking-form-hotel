# Booking Form Application

A React-based booking form application with dynamic price calculation based on accommodation type, number of guests, duration, and various optional services.

## Features

- **Dynamic Price Calculation**: Automatically calculates estimated booking price based on multiple factors
- **Accommodation Selection**: Choose from 6 different accommodation types
- **Guest Management**: Specify number of adults and children
- **Date Selection**: Select start and end dates for the booking
- **Special Requests**: Add optional services like parking, kitchen, etc.
- **Insurance Option**: Optional insurance coverage
- **Transport Discount**: 10% discount on total estimate

## Price Calculation Logic

The estimated price is calculated using the following rules:

### 1. Base Price per Night
Each accommodation type has a base price per night:
- Home Vacation: €200
- B&B: €350
- Hotel 1*: €450
- Hotel 2*: €500
- Hotel 3*: €700
- Hotel 4*: €1000

The base price is multiplied by:
- 100% for each adult
- 20% for each child
- Number of nights

**Formula**: `Base Price × (Adults × 1.0 + Children × 0.2) × Nights`

### 2. Home Vacation Surcharge
If "Home Vacation" is selected, a 5% increase is applied to the base price per night.

**Formula**: `Base Price × 0.05 × Nights`

### 3. Special Request Surcharge
Each selected special request adds to the base price per night:
- Parking: €10 per night
- Animal Admitted: €15 per night
- Kitchen: €10 per night
- Baby Cot: €20 per night

### 4. Insurance
Insurance adds 2% per night per person (including children) to the estimated price.

**Formula**: `Base Price × 0.02 × Total People × Nights`

### 5. Transport Discount
If transport discount is selected, a 10% discount is applied to the total estimate.

**Formula**: `Total Estimate × 0.9`

## Installation

```bash
npm install
```

## Usage

```bash
npm run dev
```

## Project Structure

```
booking-form/
├── src/
│   ├── App.jsx          # Main component with form and calculation logic
│   ├── App.css          # Component styles
│   ├── index.css        # Global styles
│   └── assets/          # Image assets
├── public/              # Public assets
└── package.json         # Dependencies
```

## Form Fields

### Required for Price Calculation
- **Location**: Palermo, Catania, or Trapani
- **Adults**: Number of adult guests
- **Children**: Number of child guests
- **Start Date**: Check-in date
- **End Date**: Check-out date
- **Accommodation Type**: Home Vacation, B&B, or Hotel (1-4 stars)
- **Special Requests**: Parking, Animal Admitted, Kitchen, Baby Cot
- **Transport Discount**: Yes/No
- **Insurance**: Accept/Decline

### Additional Fields
- **Area**: City Center or Suburbs
- **Tourist Service**: Private Tour, Group Tour, City Tour, Desert Tour
- **Entry Fee**: Yes/No
- **Full Name**: Contact information
- **Email**: Contact information
- **Phone**: Contact information
- **Accept Rules**: Terms and conditions checkbox

## Example Calculation

**Scenario**: 2 adults, 1 child, 5 nights, Hotel 3*, with Parking and Insurance, no transport discount

1. Base Price: €700 × (2 × 1.0 + 1 × 0.2) × 5 = €7,700
2. Home Vacation Surcharge: €0 (not selected)
3. Special Request (Parking): €10 × 5 = €50
4. Insurance: €700 × 0.02 × 3 × 5 = €210
5. Total Before Discount: €7,700 + €50 + €210 = €7,960
6. Transport Discount: €0 (not selected)
7. **Final Estimate**: €7,960

## Technologies Used

- React 18
- Vite
- Tailwind CSS

## Future Enhancements

- Database integration for storing booking data
- Form validation
- Payment gateway integration
- Email notifications
- Multi-language support

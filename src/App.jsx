import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [form, setForm] = useState({
    location: '',
    adults: '',
    children: '',
    startDate: '',
    endDate: '',
    accommodation: '',
    area: '',
    parking: false,
    animalAdmitted: false,
    kitchen: false,
    babyCot: false,
    transportDiscount: '',
    touristService: '',
    entryFee: '',
    insurance: '',
    estimatePice: 1000,
    fullName: '',
    email: '',
    phone: '',
    acceptRules: false,
  })

  // apply form validation when confirm
  const validateForm = () => {
    if (!form.location) {
      alert('Please select a location');
      return false;
    }
    if (!form.adults) {
      alert('Please select number of adults');
      return false;
    }
    if (!form.children) {
      alert('Please select number of children');
      return false;
    }
    if (!form.startDate) {
      alert('Please select start date');
      return false;
    }
    if (!form.endDate) {
      alert('Please select end date');
      return false;
    }
    if (!form.accommodation) {
      alert('Please select accommodation');
      return false;
    }
    if (!form.area) {
      alert('Please select area');
      return false;
    }
    if (!form.transportDiscount) {
      alert('Please select transport discount');
      return false;
    }
    if (!form.touristService) {
      alert('Please select tourist service');
      return false;
    }
    if (!form.entryFee) {
      alert('Please select entry fee');
      return false;
    }
    if (!form.insurance) {
      alert('Please select insurance');
      return false;
    }
    if (!form.fullName) {
      alert('Please enter your full name');
      return false;
    }
    if (!form.email) {
      alert('Please enter your email');
      return false;
    }
    if (!form.phone) {
      alert('Please enter your phone number');
      return false;
    }
    if (!form.acceptRules) {
      alert('Please accept the rules');
      return false;
    }
    return true;
  }


  const calculateEstimatedPrice = (formData) => {
    const basePrices = {
      'home-vacation': 200,
      'B&B': 350,
      'Hotel 1*': 450,
      'Hotel 2*': 500,
      'Hotel 3*': 700,
      'Hotel 4*': 1000
    }

    const specialRequestPrices = {
      parking: 10,
      animalAdmitted: 15,
      kitchen: 10,
      babyCot: 20
    }

    const adults = parseInt(formData.adults) || 0
    const children = parseInt(formData.children) || 0
    const totalPeople = adults + children

    // Calculate number of nights
    let nights = 0
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate)
      const end = new Date(formData.endDate)
      const diffTime = Math.abs(end - start)
      nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    }

    // Get base price per night for selected accommodation
    const basePricePerNight = basePrices[formData.accommodation] || 0

    // Rule 1: Base Price per Night calculationn
    // Multipleid by 100% for each adult and 20% for each child
    const adultMultiplier = adults * 1.0
    const childMultiplier = children * 0.2
    const basePriceTotal = basePricePerNight * (adultMultiplier + childMultiplier) * nights

    // Rule 2: Home Vacation Surcharge (5% increase on base price per night)
    let homeVacationSurcharge = 0
    if (formData.accommodation === 'home-vacation') {
      homeVacationSurcharge = basePricePerNight * 0.05 * nights
    }

    // Rule 3: Special Request Surcharge
    let specialRequestSurcharge = 0
    if (formData.parking) specialRequestSurcharge += specialRequestPrices.parking * nights
    if (formData.animalAdmitted) specialRequestSurcharge += specialRequestPrices.animalAdmitted * nights
    if (formData.kitchen) specialRequestSurcharge += specialRequestPrices.kitchen * nights
    if (formData.babyCot) specialRequestSurcharge += specialRequestPrices.babyCot * nights

    // Rule 4: Insurance (2% per night per person)
    let insuranceCost = 0
    if (formData.insurance === 'Accept' && totalPeople > 0 && nights > 0) {
      insuranceCost = basePricePerNight * 0.02 * totalPeople * nights
    }

    // Calculate total before discount
    let totalEstimate = basePriceTotal + homeVacationSurcharge + specialRequestSurcharge + insuranceCost

    // Rule 5: Transport Discount (10% discount)
    if (formData.transportDiscount === 'yes') {
      totalEstimate = totalEstimate * 0.9
    }

    return Math.round(totalEstimate)
  }

  const handleConfirm = () => {
    try {
      if (!validateForm()) {
        return;
      }
      console.log(form)
      localStorage.setItem('bookingForm', JSON.stringify(form))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }

  // Recalculate estimated price when form fields change
  useEffect(() => {
    const estimatedPrice = calculateEstimatedPrice(form)
    setForm(prev => ({ ...prev, estimatePice: estimatedPrice }))
  }, [
    form.adults,
    form.children,
    form.startDate,
    form.endDate,
    form.accommodation,
    form.parking,
    form.animalAdmitted,
    form.kitchen,
    form.babyCot,
    form.transportDiscount,
    form.insurance
  ])

  return (
    <>
      <h4 className="booking-form-title m-4 p-2 text-center text-2xl font-bold text-gray-900">Booking Form</h4>

      <div
        className="flex flex-col items-start w-full max-w-6xl mx-auto gap-2 border-orange-500 border-bold border-2 p-4 rounded-2xl"
      >
        {/* Location */}
        <label className="font-semibold text-gray-700"> Where You want to come?
          <div className="flex gap-2">
            <input

              type="radio"
              value="palermo"
              checked={form.location === 'palermo'}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            /> Palermo
            <input
              type="radio"
              value="catania"
              checked={form.location === 'catania'}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            /> Catania
            <input
              type="radio"
              value="trapani"
              checked={form.location === 'trapani'}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            /> Trapani
          </div>
        </label>

        {/* People */}
        <label className="font-semibold text-gray-700"> How many people are you?
          <div className="flex gap-2 items-center">
            <input
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Adults"
              type="number"
              value={form.adults}
              onChange={(e) => setForm({ ...form, adults: e.target.value })}
            />
            <input
              className="w-full border border-gray-300 p-2 rounded-lg"
              placeholder="Children"
              type="number"
              value={form.children}
              onChange={(e) => setForm({ ...form, children: e.target.value })}
            />
          </div>
        </label>

        {/* Date */}
        <label className="font-semibold text-gray-700">
          When will you start your holiday?
          <div className="flex justify- gap-2 items-center w-full">
            <label htmlFor="start-date">From
              <input
                id="start-date"
                placeholder="from"
                className="w-full border border-gray-300 p-2 rounded-lg"
                type="date"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              />
            </label>
            <label htmlFor="end-date">To
              <input
                id="end-date"
                placeholder="to"
                className="w-full border border-gray-300 p-2 rounded-lg"
                type="date"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              />
            </label>
          </div>
        </label>

        {/* Accommodation */}
        <label className="font-semibold text-gray-700"> What kind of accommodation do you need?
          <div className="flex gap-2 flex-wrap">
            <input
              type="radio"
              value="home-vacation"
              checked={form.accommodation === 'home-vacation'}
              onChange={(e) => setForm({ ...form, accommodation: e.target.value })}
            /> Home Vacation
            <input
              type="radio"
              value="B&B"
              checked={form.accommodation === 'B&B'}
              onChange={(e) => setForm({ ...form, accommodation: e.target.value })}
            /> B&B
            <input
              type="radio"
              value="Hotel 1*"
              checked={form.accommodation === 'Hotel 1*'}
              onChange={(e) => setForm({ ...form, accommodation: e.target.value })}
            /> Hotel 1*
            <input
              type="radio"
              value="Hotel 2*"
              checked={form.accommodation === 'Hotel 2*'}
              onChange={(e) => setForm({ ...form, accommodation: e.target.value })}
            /> Hotel 2*
            <input
              type="radio"
              value="Hotel 3*"
              checked={form.accommodation === 'Hotel 3*'}
              onChange={(e) => setForm({ ...form, accommodation: e.target.value })}
            /> Hotel 3*
            <input
              type="radio"
              value="Hotel 4*"
              checked={form.accommodation === 'Hotel 4*'}
              onChange={(e) => setForm({ ...form, accommodation: e.target.value })}
            /> Hotel 4*
          </div>
        </label>

        {/* Area */}
        <label className="font-semibold text-gray-700"> In which area?
          <div className="flex gap-2">
            <input
              type="radio"
              value="city-center"
              checked={form.area === 'city-center'}
              onChange={(e) => setForm({ ...form, area: e.target.value })}
            /> City Center
            <input
              type="radio"
              value="suburbs"
              checked={form.area === 'suburbs'}
              onChange={(e) => setForm({ ...form, area: e.target.value })}
            /> Suburbs
          </div>
        </label>

        {/* Requirements */}
        <label className="font-semibold text-gray-700"> Any specific requirements?
          <div className="flex gap-2">
            <input
              type="checkbox"
              checked={form.parking}
              onChange={(e) => setForm({ ...form, parking: e.target.checked })}
            /> Parking
            <input
              type="checkbox"
              checked={form.animalAdmitted}
              onChange={(e) => setForm({ ...form, animalAdmitted: e.target.checked })}
            /> Animal Admitted
            <input
              type="checkbox"
              checked={form.kitchen}
              onChange={(e) => setForm({ ...form, kitchen: e.target.checked })}
            /> Kitchen
            <input
              type="checkbox"
              checked={form.babyCot}
              onChange={(e) => setForm({ ...form, babyCot: e.target.checked })}
            /> Baby Cot
          </div>
        </label>

        {/* Transport Discount */}
        <label className="font-semibold text-gray-700"> Do you want to take advantage of the transport discount?
          <div className="flex gap-2">
            <input
              type="radio"
              value="yes"
              checked={form.transportDiscount === 'yes'}
              onChange={(e) => setForm({ ...form, transportDiscount: e.target.value })}
            /> Yes
            <input
              type="radio"
              value="no"
              checked={form.transportDiscount === 'no'}
              onChange={(e) => setForm({ ...form, transportDiscount: e.target.value })}
            /> No
          </div>
        </label>

        {/* Tourist Service */}
        <label className="font-semibold text-gray-700"> Choose your free tourist service
          <div className="flex gap-2">
            <select
              className="px-3 w-full border border-gray-300 p-2 rounded-lg"
              id="tourist-service"
              value={form.touristService}
              onChange={(e) => setForm({ ...form, touristService: e.target.value })}
            >
              <option value="">--Open this select menu</option>
              <option value="private-tour">Private Tour</option>
              <option value="group-tour">Group Tour</option>
              <option value="city-tour">City Tour</option>
              <option value="desert-tour">Desert Tour</option>
            </select>
          </div>
        </label>

        {/* Entry fee */}
        <label className="font-semibold text-gray-700"> Choose your entry fee
          <div className="flex gap-2">
            <select
              className="w-full px-3 border border-gray-300 p-2 rounded-lg"
              id="entry-fee"
              value={form.entryFee}
              onChange={(e) => setForm({ ...form, entryFee: e.target.value })}
            >
              <option value="">--Open this select menu</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </label>

        {/* Insurance package*/}
        <label className="font-semibold text-gray-700"> We advice you to incurance your package <span className="text-blue-500 hover:underline">(see conditions)</span> with a total cost of (value)
          <div className="flex gap-2">
            <input
              type="radio"
              value="Accept"
              checked={form.insurance === 'Accept'}
              onChange={(e) => setForm({ ...form, insurance: e.target.value })}
            /> Yes
            <input
              type="radio"
              value="Decline"
              checked={form.insurance === 'Decline'}
              onChange={(e) => setForm({ ...form, insurance: e.target.value })}
            /> No
          </div>
        </label>

        {/* Estimated Price */}
        <div className="mt-4 text-center text-lg font-semibold bg-orange-500 w-full text-white px-4 py-2 rounded-lg" >
          {form.estimatePice && (
            <p>Estimated Price: {form.estimatePice || 1000} € </p>
          )}
        </div>

        {/* user details */}
        <input className="border w-full border-gray-300 p-2 px-3 rounded-lg" type="text" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="Full Name" />
        <input className="border w-full border-gray-300 p-2 px-3 rounded-lg" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" />
        <input className="border w-full border-gray-300 p-2 px-3 rounded-lg" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" />


        <div className="flex items-center gap-2 font-semibold text-gray-700">
          <input
            className=''
            type="checkbox"
            checked={form.acceptRules}
            onChange={(e) => setForm({ ...form, acceptRules: e.target.checked })}
          /> Accept our <span className="underline">rules</span> and <span className="underline">privacy</span>
        </div>

        {/* buttons */}
        <button onClick={handleConfirm} className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 w-full text-white px-4 py-2 rounded-lg cursor-pointer">Confirm Now</button>
      </div>
    </>
  )
}

export default App


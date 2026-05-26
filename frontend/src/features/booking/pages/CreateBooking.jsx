import { useForm } from "react-hook-form";
import { createBooking } from "../bookingService";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useVehicleStore from "../../vehicle/vehicleStore";
import Button from "../../../components/ui/Button";
import toast from "react-hot-toast";

const SERVICE_TYPES = [
  {
    category: "🔧 Maintenance",
    services: [
      { value: "Oil Change", desc: "Engine oil & filter replacement" },
      { value: "Full Service", desc: "Complete multi-point inspection & servicing" },
      { value: "Battery Replacement", desc: "Battery testing & replacement" },
      { value: "Tyre Rotation & Balancing", desc: "Rotate, balance & align tyres" },
      { value: "Coolant Flush", desc: "Cooling system flush & refill" },
    ],
  },
  {
    category: "❄️ Climate & Comfort",
    services: [
      { value: "AC Service", desc: "AC gas refill, cooling check & vent cleaning" },
      { value: "Heater Repair", desc: "Heater core, blower motor & thermostat fix" },
    ],
  },
  {
    category: "⚙️ Engine & Drivetrain",
    services: [
      { value: "Engine Repair", desc: "Engine diagnostics, rebuild & part replacement" },
      { value: "Transmission Service", desc: "Gearbox fluid change, clutch & shifting repair" },
      { value: "Timing Belt Replacement", desc: "Belt/chain inspection & replacement" },
    ],
  },
  {
    category: "🛞 Brakes & Suspension",
    services: [
      { value: "Brake Service", desc: "Brake pads, rotors, fluid & line inspection" },
      { value: "Suspension Repair", desc: "Shocks, struts, bushings & alignment" },
    ],
  },
  {
    category: "⚡ Electrical & Diagnostics",
    services: [
      { value: "Diagnostics", desc: "OBD-II scan, fault code analysis & troubleshooting" },
      { value: "Electrical Repair", desc: "Wiring, fuse, alternator & starter motor fixes" },
    ],
  },
  {
    category: "🎨 Body & Exterior",
    services: [
      { value: "Denting & Painting", desc: "Dent removal, scratch repair & full repaint" },
      { value: "Windshield Replacement", desc: "Cracked or chipped windshield replacement" },
    ],
  },
];

const TIME_SLOTS = [
  { value: "09:00 AM", label: "9:00 AM" },
  { value: "09:30 AM", label: "9:30 AM" },
  { value: "10:00 AM", label: "10:00 AM" },
  { value: "10:30 AM", label: "10:30 AM" },
  { value: "11:00 AM", label: "11:00 AM" },
  { value: "11:30 AM", label: "11:30 AM" },
  { value: "12:00 PM", label: "12:00 PM" },
  { value: "12:30 PM", label: "12:30 PM" },
  { value: "01:00 PM", label: "1:00 PM" },
  { value: "01:30 PM", label: "1:30 PM" },
  { value: "02:00 PM", label: "2:00 PM" },
  { value: "02:30 PM", label: "2:30 PM" },
  { value: "03:00 PM", label: "3:00 PM" },
  { value: "03:30 PM", label: "3:30 PM" },
  { value: "04:00 PM", label: "4:00 PM" },
  { value: "04:30 PM", label: "4:30 PM" },
  { value: "05:00 PM", label: "5:00 PM" },
  { value: "05:30 PM", label: "5:30 PM" },
  { value: "06:00 PM", label: "6:00 PM" },
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const CreateBooking = () => {
  const { register, handleSubmit, watch, setValue, formState: { isSubmitting } } = useForm();
  const navigate = useNavigate();
  const vehicles = useVehicleStore((state) => state.vehicles);
  const fetchVehicles = useVehicleStore((state) => state.fetchVehicles);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());

  const watchedService = watch("serviceType");

  useEffect(() => {
    fetchVehicles();
  }, []);

  useEffect(() => {
    if (watchedService) {
      const found = SERVICE_TYPES
        .flatMap((cat) => cat.services)
        .find((s) => s.value === watchedService);
      setSelectedService(found || null);
    } else {
      setSelectedService(null);
    }
  }, [watchedService]);

  // Calendar logic
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const calendarDays = useMemo(() => {
    const firstDay = new Date(calendarYear, calendarMonth, 1);
    const lastDay = new Date(calendarYear, calendarMonth + 1, 0);
    const startPad = firstDay.getDay();
    const days = [];

    // Previous month padding
    for (let i = 0; i < startPad; i++) {
      days.push(null);
    }
    // Current month days
    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push(new Date(calendarYear, calendarMonth, d));
    }
    return days;
  }, [calendarMonth, calendarYear]);

  const isDateDisabled = (date) => {
    if (!date) return true;
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    // Disable past dates and Sundays
    return d < today || d.getDay() === 0;
  };

  const isDateSelected = (date) => {
    if (!date || !selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const isToday = (date) => {
    if (!date) return false;
    return date.toDateString() === today.toDateString();
  };

  const handleDateSelect = (date) => {
    if (isDateDisabled(date)) return;
    setSelectedDate(date);
    // Store as ISO string for the form
    setValue("scheduledDate", date.toISOString());
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setValue("scheduledTime", time);
  };

  const prevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear(calendarYear - 1);
    } else {
      setCalendarMonth(calendarMonth - 1);
    }
  };

  const nextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear(calendarYear + 1);
    } else {
      setCalendarMonth(calendarMonth + 1);
    }
  };

  // Disable prev button if current month
  const isPrevDisabled = calendarYear === today.getFullYear() && calendarMonth <= today.getMonth();

  // Max 2 months ahead
  const maxDate = new Date(today);
  maxDate.setMonth(maxDate.getMonth() + 2);
  const isNextDisabled = calendarYear === maxDate.getFullYear() && calendarMonth >= maxDate.getMonth();

  const onSubmit = async (data) => {
    if (!data.scheduledDate || !data.scheduledTime) {
      toast.error("Please select a date and time slot");
      return;
    }
    const toastId = toast.loading("Creating booking...");
    try {
      await createBooking(data);
      toast.success("Booking created!", { id: toastId });
      navigate("/bookings");
    } catch {
      toast.error("Error creating booking", { id: toastId });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Book Service 🛠️</h2>
          <p className="text-gray-500 mt-1">Select your vehicle, choose a service, and pick a date & time.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* VEHICLE SELECT */}
          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-700">Select Vehicle</label>
            <select {...register("vehicleId")} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all">
              <option value="">Choose a vehicle</option>
              {vehicles.map((v) => (
                <option key={v._id} value={v._id}>
                  {v.brand} — {v.model} ({v.year})
                </option>
              ))}
            </select>
          </div>

          {/* SERVICE TYPE — GROUPED DROPDOWN */}
          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-700">Service Type</label>
            <select
              {...register("serviceType")}
              className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="">Choose a service</option>
              {SERVICE_TYPES.map((cat) => (
                <optgroup key={cat.category} label={cat.category}>
                  {cat.services.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.value}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>

            {selectedService && (
              <div className="mt-2.5 flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 transition-all" style={{ animation: "fadeSlideIn 0.25s ease-out" }}>
                <span className="text-blue-500 mt-0.5 text-lg">ℹ️</span>
                <div>
                  <p className="text-sm font-bold text-blue-800">{selectedService.value}</p>
                  <p className="text-xs text-blue-600 mt-0.5">{selectedService.desc}</p>
                </div>
              </div>
            )}
          </div>

          {/* 📅 SCHEDULE — DATE & TIME */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Schedule Date & Time</label>

            {/* CALENDAR */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 select-none">
              {/* MONTH NAV */}
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={prevMonth}
                  disabled={isPrevDisabled}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-white hover:text-gray-900 hover:shadow-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h4 className="text-sm font-bold text-gray-800">
                  {MONTHS[calendarMonth]} {calendarYear}
                </h4>
                <button
                  type="button"
                  onClick={nextMonth}
                  disabled={isNextDisabled}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-white hover:text-gray-900 hover:shadow-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* DAY HEADERS */}
              <div className="grid grid-cols-7 gap-1 mb-1">
                {DAYS.map((d) => (
                  <div key={d} className={`text-center text-xs font-bold py-1 ${d === "Sun" ? "text-red-400" : "text-gray-400"}`}>
                    {d}
                  </div>
                ))}
              </div>

              {/* DATE GRID */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((date, i) => {
                  if (!date) return <div key={`pad-${i}`} />;
                  const disabled = isDateDisabled(date);
                  const selected = isDateSelected(date);
                  const todayMark = isToday(date);

                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleDateSelect(date)}
                      disabled={disabled}
                      className={`
                        relative h-9 rounded-lg text-sm font-medium transition-all duration-150
                        ${disabled
                          ? "text-gray-300 cursor-not-allowed"
                          : selected
                            ? "bg-blue-600 text-white shadow-md shadow-blue-200 scale-105"
                            : todayMark
                              ? "bg-blue-50 text-blue-700 font-bold ring-1 ring-blue-200 hover:bg-blue-100"
                              : "text-gray-700 hover:bg-white hover:shadow-sm hover:text-gray-900"
                        }
                      `}
                    >
                      {date.getDate()}
                      {todayMark && !selected && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500"></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SELECTED DATE DISPLAY */}
            {selectedDate && (
              <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-4 py-2 rounded-xl" style={{ animation: "fadeSlideIn 0.25s ease-out" }}>
                <span>📅</span>
                {selectedDate.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
              </div>
            )}

            {/* TIME SLOTS */}
            {selectedDate && (
              <div className="mt-4" style={{ animation: "fadeSlideIn 0.3s ease-out" }}>
                <label className="block mb-2 text-sm font-medium text-gray-700">Pick a Time Slot</label>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot.value}
                      type="button"
                      onClick={() => handleTimeSelect(slot.value)}
                      className={`
                        px-2 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 border
                        ${selectedTime === slot.value
                          ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200 scale-[1.03]"
                          : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50"
                        }
                      `}
                    >
                      {slot.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* FINAL SUMMARY */}
            {selectedDate && selectedTime && (
              <div className="mt-3 flex items-center gap-3 bg-green-50 border border-green-100 rounded-xl px-4 py-3" style={{ animation: "fadeSlideIn 0.25s ease-out" }}>
                <span className="text-lg">✅</span>
                <div>
                  <p className="text-sm font-bold text-green-800">
                    {selectedDate.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })} at {selectedTime}
                  </p>
                  <p className="text-xs text-green-600">Your service is scheduled for this slot</p>
                </div>
              </div>
            )}

            {/* Hidden fields for react-hook-form */}
            <input type="hidden" {...register("scheduledDate")} />
            <input type="hidden" {...register("scheduledTime")} />
          </div>

          {/* ISSUE */}
          <div>
            <label className="block mb-1.5 text-sm font-medium text-gray-700">Describe the Issue <span className="text-gray-400 font-normal">(optional)</span></label>
            <textarea
              placeholder="Tell us more about your vehicle's issue..."
              {...register("issueDescription")}
              className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none h-32"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl shadow-md transition-all duration-300 disabled:opacity-70 flex justify-center items-center h-[52px]"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Booking...
                </span>
              ) : "Book Now"}
            </Button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default CreateBooking;
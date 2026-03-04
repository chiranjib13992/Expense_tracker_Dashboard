import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plane, MapPin, Plus, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function TripPlan() {
    const [trips, setTrips] = useState([
        {
            id: 1,
            name: "Koraput Trip",
            location: "Koraput, Odisha",
            date: "2026-04-15",
        },
        {
            id: 2,
            name: "Bengaluru Trip",
            location: "Bengaluru, Karnataka",
            date: "2026-06-10",
        },
        {
            id: 3,
            name: "Goa Vacation",
            location: "Goa, India",
            date: "2026-08-01",
        },
    ]);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 p-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Plane className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-indigo-900">
                        Trip Planner
                    </h1>
                </div>

                {/* Create Trip Button */}
                <button
                    type="button"
                    className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2"
                    onClick={() => navigate("/createTrip")}
                >
                    <Plus size={18} />
                    Create Trip
                </button>
            </div>

            {/* Horizontal Trip List */}
            <div className="overflow-x-auto pb-4">
                <div className="flex gap-6 min-w-max">

                    {trips.map((trip) => (
                        <motion.div
                            key={trip.id}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white shadow-xl rounded-2xl p-6 w-72 border border-slate-100 hover:shadow-2xl transition-all cursor-pointer"
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <MapPin className="w-5 h-5 text-indigo-600" />
                                <h2 className="font-bold text-lg text-slate-800">
                                    {trip.name}
                                </h2>
                            </div>

                            <p className="text-slate-600 text-sm mb-3">
                                {trip.location}
                            </p>

                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <Calendar className="w-4 h-4" />
                                {trip.date}
                            </div>
                        </motion.div>
                    ))}

                </div>
            </div>

            {/* Empty Section for Future Trip Details */}
            <div className="mt-12 bg-white rounded-3xl shadow-xl p-10 text-center border border-slate-100">
                <Plane className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-slate-800 mb-2">
                    Select a Trip
                </h2>
                <p className="text-slate-500">
                    Click on a trip above to manage budget, expenses, and itinerary.
                </p>
            </div>

        </div>
    );
}
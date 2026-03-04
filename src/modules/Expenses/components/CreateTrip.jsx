import React, { useState, useEffect } from "react";
import { Plus, Search, X, Users, Calendar } from "lucide-react";
import TripService from "../services/tripService";

function CreateTrip() {
    const [tripTitle, setTripTitle] = useState("");
    const [startDate, setStartDate] = useState("");
    const [tripNote, setTripNote] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [members, setMembers] = useState([]);
    const [foundUser, setFoundUser] = useState(null);

    const fetchUser = () => {

    }

    useEffect(() => {
        fetchUser();
    }, []);

    const handleSearch = async () => {
        const res = await TripService.findProfile(searchQuery)


        if (res) {
            setFoundUser(res.user);
        } else {
            setFoundUser(null);
            alert("User not found");
        }
    };

    const handleAddMember = () => {
        if (!members.some((m) => m.user_id === foundUser.user_id)) {
            setMembers([...members, foundUser]);
            setFoundUser(null);
            setSearchQuery("");
        } else if (members.some((m) => m.user_id == foundUser.user_id)) {
            alert("Already Added Trip Member")
        }
    };

    const removeMember = (id) => {
        setMembers(members.filter((m) => m.id !== id));
    };

    const handleSubmit = async () => {
        const data = {
            tripTitle,
            note: tripNote,
            startDate: startDate,
            memebrs: members.map(ele => ele.user_id)
        }
       await TripService.createTrip(data).then(()=>
        { 
        setTripTitle("")
        setMembers("")
        setStartDate("")
        setFoundUser("")
        setSearchQuery("")
        setTripNote("")
        alert("Trip Created")
    })
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex justify-center">
            <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-2xl">

                <h2 className="text-2xl font-bold text-indigo-700 mb-6">
                    Create New Trip
                </h2>

                {/* Trip Title */}
                <div className="mb-5">
                    <label className="block font-semibold mb-2">Trip Title</label>
                    <input
                        type="text"
                        value={tripTitle}
                        onChange={(e) => setTripTitle(e.target.value)}
                        placeholder="Enter Trip Title"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Start Date */}
                <div className="mb-5">
                    <label className="block font-semibold mb-2">Start Date</label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Search Member */}
                <div className="mb-5">
                    <label className="block font-semibold mb-2">Add Member</label>

                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search member by name"
                            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            type="button"
                            onClick={handleSearch}
                            className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2"
                        >
                            <Search size={18} />
                            Search
                        </button>
                    </div>
                </div>

                {/* Found User */}
                {foundUser && (
                    <div className="bg-blue-50 p-4 rounded-xl flex justify-between items-center mb-5">
                        <div className="flex items-center gap-2">
                            <Users size={18} />
                            <span>{foundUser.name}</span>
                        </div>

                        <button
                            type="button"
                            onClick={handleAddMember}
                            className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2"
                        >
                            <Plus size={16} />
                            Add
                        </button>
                    </div>
                )}

                {/* Added Members List */}
                {members.length > 0 && (
                    <div className="mb-6">
                        <h4 className="font-semibold mb-3">Trip Members</h4>
                        <div className="flex flex-wrap gap-3">
                            {members.map((member) => (
                                <div
                                    key={member.id}
                                    className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full flex items-center gap-2"
                                >
                                    {member.name}
                                    <X
                                        size={16}
                                        className="cursor-pointer"
                                        onClick={() => removeMember(member.id)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mb-5">
                    <label className="block font-semibold mb-2">Trip Note</label>
                    <input
                        type="text"
                        value={tripNote}
                        onChange={(e) => setTripNote(e.target.value)}
                        placeholder="Enter Trip Note"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="button"
                    className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2"
                    onClick={handleSubmit}
                >
                    Create Trip
                </button>
            </div>
        </div>
    );
}

export default CreateTrip;
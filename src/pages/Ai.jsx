import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Header from "../components/Header"
import Dash from "../components/Dash"

const ParticipateList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchParam = queryParams.get("search") || "";
  const genderParam = queryParams.get("gender") || "";

  const [participants, setParticipants] = useState([
    { id: 1, regNo: 100, adNo: 1000, class: "Class 1", name: "Participant 1", gender: "Girl", eventCode: 100, additionalEventCodes: [200, 300], captain: "captain3" },
    { id: 2, regNo: 200, adNo: 2000, class: "Class 2", name: "Participant 2", gender: "Boy", eventCode: 200, additionalEventCodes: [100, 400,300], captain: "captain2" },
    { id: 3, regNo: 300, adNo: 3000, class: "Class 3", name: "Participant 3", gender: "Girl", eventCode: 300, additionalEventCodes: [500, 600], captain: "captain4" },
    { id: 4, regNo: 400, adNo: 4000, class: "Class 4", name: "Participant 4", gender: "Boy", eventCode: 400, additionalEventCodes: [200, 600], captain: "captain1" },
    { id: 5, regNo: 500, adNo: 5000, class: "Class 5", name: "Participant 5", gender: "Girl", eventCode: 500, additionalEventCodes: [300, 700], captain: "captain6" },
    { id: 6, regNo: 600, adNo: 6000, class: "Class 6", name: "Participant 6", gender: "Boy", eventCode: 600, additionalEventCodes: [400, 800], captain: "captain7" },
    { id: 7, regNo: 700, adNo: 7000, class: "Class 7", name: "Participant 7", gender: "Girl", eventCode: 700, additionalEventCodes: [500, 900], captain: "captain9" },
    { id: 8, regNo: 800, adNo: 8000, class: "Class 8", name: "Participant 8", gender: "Boy", eventCode: 800, additionalEventCodes: [600, 1000], captain: "captain8" },
    { id: 9, regNo: 900, adNo: 9000, class: "Class 9", name: "Participant 9", gender: "Girl", eventCode: 900, additionalEventCodes: [700, 100], captain: "captain0" },
    { id: 10, regNo: 1000, adNo: 10000, class: "Class 10", name: "Participant 10", gender: "Boy", eventCode: 1000, additionalEventCodes: [800, 200], captain: "captain" },
  ]);
  
  const [hoveredEventCode, setHoveredEventCode] = useState(null);
  const [searchKey, setSearchKey] = useState(searchParam);
  const [genderFilter, setGenderFilter] = useState(genderParam);
  const [schedules, setSchedules] = useState({});
  const [showSchedules, setShowSchedules] = useState(false);

  // Mock event data with durations (in minutes)
  const eventData = {
    100: { name: "Event A", duration: 60 },
    200: { name: "Event B", duration: 45 },
    300: { name: "Event C", duration: 30 },
    400: { name: "Event D", duration: 90 },
    500: { name: "Event E", duration: 60 },
    600: { name: "Event F", duration: 45 },
    700: { name: "Event G", duration: 120 },
    800: { name: "Event H", duration: 60 },
    900: { name: "Event I", duration: 45 },
    1000: { name: "Event J", duration: 30 },
  };

  const generateSchedules = () => {
    // Create a copy of participants to work with
    const participantsCopy = [...participants];
    
    // Start time for first event (9:00 AM)
    const startHour = 9;
    const startTime = new Date();
    startTime.setHours(startHour, 0, 0, 0);
    
    // Initialize time slots for each event code
    const eventTimeSlots = {};
    Object.keys(eventData).forEach(code => {
      eventTimeSlots[code] = null;
    });
    
    // Schedule events with minimum conflicts
    const participantSchedules = {};
    
    // First, schedule primary event codes
    Object.keys(eventData).forEach(eventCode => {
      const eventParticipants = participantsCopy.filter(
        p => p.eventCode === parseInt(eventCode) || p.additionalEventCodes.includes(parseInt(eventCode))
      );
      
      if (eventParticipants.length > 0 && !eventTimeSlots[eventCode]) {
        // Find the next available time slot
        const newStartTime = new Date(startTime);
        
        // Check for conflicts with already scheduled events
        let hasConflict = true;
        while (hasConflict) {
          hasConflict = false;
          
          // Check if this time conflicts with any events that these participants are already scheduled for
          for (const participant of eventParticipants) {
            const participantEvents = [participant.eventCode, ...participant.additionalEventCodes];
            
            for (const pEventCode of participantEvents) {
              if (eventTimeSlots[pEventCode]) {
                const existingEventStart = new Date(eventTimeSlots[pEventCode].start);
                const existingEventEnd = new Date(eventTimeSlots[pEventCode].end);
                const potentialNewEnd = new Date(newStartTime);
                potentialNewEnd.setMinutes(potentialNewEnd.getMinutes() + eventData[eventCode].duration);
                
                // Check if there's overlap
                if (
                  (newStartTime >= existingEventStart && newStartTime < existingEventEnd) ||
                  (potentialNewEnd > existingEventStart && potentialNewEnd <= existingEventEnd) ||
                  (newStartTime <= existingEventStart && potentialNewEnd >= existingEventEnd)
                ) {
                  // Conflict found, move time forward by 30 minutes and check again
                  newStartTime.setMinutes(newStartTime.getMinutes() + 30);
                  hasConflict = true;
                  break;
                }
              }
            }
            
            if (hasConflict) break;
          }
        }
        
        // Calculate end time
        const endTime = new Date(newStartTime);
        endTime.setMinutes(endTime.getMinutes() + eventData[eventCode].duration);
        
        // Assign this time slot to the event
        eventTimeSlots[eventCode] = {
          start: newStartTime,
          end: endTime,
          duration: eventData[eventCode].duration
        };
        
        // Update participant schedules
        eventParticipants.forEach(participant => {
          if (!participantSchedules[participant.id]) {
            participantSchedules[participant.id] = [];
          }
          
          participantSchedules[participant.id].push({
            eventCode: parseInt(eventCode),
            eventName: eventData[eventCode].name,
            start: formatTime(newStartTime),
            end: formatTime(endTime)
          });
        });
      }
    });
    
    // Sort schedules by start time for each participant
    Object.keys(participantSchedules).forEach(participantId => {
      participantSchedules[participantId].sort((a, b) => {
        const timeA = parseTimeToMinutes(a.start);
        const timeB = parseTimeToMinutes(b.start);
        return timeA - timeB;
      });
    });
    
    setSchedules(participantSchedules);
    setShowSchedules(true);
  };
  
  // Helper function to format time as HH:MM AM/PM
  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12
    
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    
    return `${hours}:${minutesStr} ${ampm}`;
  };
  
  // Helper function to parse time string back to minutes for sorting
  const parseTimeToMinutes = (timeStr) => {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }
    
    return hours * 60 + minutes;
  };

  const filteredParticipants = participants.filter(participant => {
    const nameMatch = participant.name.toLowerCase().includes(searchKey.toLowerCase());
    const genderMatch = genderFilter === "" || participant.gender.toLowerCase() === genderFilter.toLowerCase();
    return nameMatch && genderMatch;
  });

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row h-full min-h-screen bg-gray-100 relative">
        <Dash />
       
        <div className="flex-1 p-2 md:p-1 w-full md:ml-0">
          <div className="bg-white shadow-md p-3 md:p-4 rounded-lg mb-6 mt-12 md:mt-0">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Participants List</h3>
              <div className="flex items-center mt-3 md:mt-0">
                <button 
                  onClick={generateSchedules}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
                >
                  <span className="mr-1">Generate Schedules</span>
                </button>
              </div>
            </div>
            
            {showSchedules && (
              <div className="mb-6 overflow-x-auto">
                <h4 className="text-lg font-medium mb-3">Generated Time Schedules</h4>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mb-3">
                  <p className="text-sm text-blue-800">
                    Schedules have been generated to avoid time conflicts based on each participant's events.
                  </p>
                </div>
                <table className="w-full border-collapse rounded-lg shadow-md min-w-[600px]">
                  <thead className="bg-gray-100">
                    <tr className="text-left border-b text-sm text-gray-800">
                      <th className="p-2 md:p-3">Participant</th>
                      <th className="p-2 md:p-3">Event Schedule</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredParticipants.map((participant) => (
                      <tr key={`schedule-${participant.id}`} className="border-b">
                        <td className="p-2 md:p-3 font-semibold">{participant.name}</td>
                        <td className="p-2 md:p-3">
                          {schedules[participant.id] ? (
                            <div className="flex flex-col gap-1">
                              {schedules[participant.id].map((event, idx) => (
                                <div key={idx} className="text-sm bg-gray-50 p-2 rounded">
                                  <span className="font-medium">{event.eventName} (Code: {event.eventCode})</span>
                                  <span className="text-gray-600 ml-2">
                                    {event.start} - {event.end}
                                  </span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-500 italic">No events scheduled</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            <div className="overflow-x-auto">
              <h4 className="text-lg font-medium mb-3">All Participants</h4>
              {filteredParticipants.length > 0 ? (
                <table className="w-full border-collapse rounded-lg shadow-md min-w-[600px]">
                  <thead className="bg-gray-100">
                    <tr className="text-left border-b text-sm text-gray-800">
                      <th className="p-2 md:p-3">Sl.no</th>
                      <th className="p-2 md:p-3">Participants Name</th>
                      <th className="p-2 md:p-3">Event Code</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredParticipants.map((participant, index) => (
                      <tr
                        key={participant.id}
                        className="text-gray-600 odd:bg-white even:bg-gray-50 hover:bg-gray-100"
                      >
                        <td className="text-black p-2 md:p-3">{index + 1}</td>
                        <td className="p-2 md:p-3 font-semibold">{participant.name}</td>
                        <td
                          className="p-2 md:p-3 relative"
                          onMouseEnter={() => setHoveredEventCode(participant.id)}
                          onMouseLeave={() => setHoveredEventCode(null)}
                        >
                          {participant.eventCode}
                          {hoveredEventCode === participant.id && participant.additionalEventCodes && (
                            <div className="absolute z-10 bg-blue-100 border border-blue-200 rounded-md shadow-lg p-2 ml-5 top-0">
                              <div className="text-xs font-medium text-blue-800 mb-1">Additional Events:</div>
                              {participant.additionalEventCodes.map((code, idx) => (
                                <div key={idx} className="text-xs text-gray-700">
                                  {code}
                                </div>
                              ))}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-4 text-gray-500">No participants found.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParticipateList
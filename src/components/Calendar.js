import React, { useEffect, useState, useContext } from "react";
import { gapi } from "gapi-script";
import { AuthContext } from "../context/AuthProvider";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const Calendar = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchEvents = async () => {
        const auth = gapi.auth2.getAuthInstance();
        const googleUser = auth.currentUser.get();
        const oauthToken = googleUser.getAuthResponse().access_token;

        gapi.client.setToken({ access_token: oauthToken });

        try {
          const response = await gapi.client.calendar.events.list({
            calendarId: "primary",
            showDeleted: false,
            singleEvents: true,
            orderBy: "startTime",
          });

          const fetchedEvents = response.result.items.map(event => ({
            id: event.id,
            title: event.summary,
            start: new Date(event.start.dateTime || event.start.date),
            end: new Date(event.end.dateTime || event.end.date)
          }));

          setEvents(fetchedEvents);
        } catch (error) {
          console.error("Error fetching events: ", error);
        }
      };

      fetchEvents();
    }
  }, [user]);

  return (
    <div>
      <h2>Calendar View</h2>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default Calendar;

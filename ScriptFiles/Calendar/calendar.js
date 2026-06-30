document.addEventListener('DOMContentLoaded', function () {

    const calendarEl = document.getElementById('calendar');

    const calendar = new FullCalendar.Calendar(calendarEl, {

        initialView: 'dayGridMonth',

        height: 'auto',

        googleCalendarApiKey: 'AIzaSyAY7UzWIswhA9QbaAaw-IxzwXNTEJwyJNY',

        events: {
            googleCalendarId: 'bemsagent@gmail.com'
        },
        eventClick: function(info) {

            info.jsEvent.preventDefault();

            if (info.event.url) {
                window.open(info.event.url, '_blank');
            }
        }

    });
    

    calendar.render();
});
if(document.getElementById('calendar')) {
    $(document).ready(function() {
        $('#calendar').fullCalendar({
            header: {
                left: '',
                center: 'prev title next',
                right: ''
            },
            events: forCalendar,
            eventRender: function (event, element) {
                element.find('.fc-time').html(moment(event.start).format('h:mm a') +
                    " - " + moment(event.end).format('h:mm a') + '</br>');
            },
            eventClick:  function(event, jsEvent, view) {
                $('.modal-title').html(event.title +
                    " " + moment(event.start).format('h:mm a') +
                    " - " + moment(event.end).format('h:mm a'));
                $('.modal-body .date-box .date').html(moment(event.start).format('DD'));
                $('.modal-body .date-box .month').html(moment(event.start).format('MMM'));
                $('.modal-body .date-box .day').html(moment(event.start).format('ddd'));
                $('.modal-body .info .venue').html(event.venue);
                $('.modal-body .info .address').html(event.address);
                $('.modal-body .info .description').html(event.description);
                $('.modal-body .info #daysLeft').html(moment(event.start).diff(moment(), 'days') + " days left");
                $('.modal-body .info #rsvp').html(event.rsvp + " going");
                $('#eventModal').modal();
            }
        })
    });
}

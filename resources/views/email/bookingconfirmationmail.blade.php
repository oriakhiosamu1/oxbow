<x-mail::message>
Booking Confirmation 

Dear, {{ $booking->name }}, thank you for booking with Oxbow Lake Hotel.
<p><strong>Booking Details:</strong></p>

<ul>
    <li>Branch: {{ $booking->branch }}</li>
    <li>Room Type: {{ $booking->type }}</li>
    <li>Check In Date: {{ $booking->check_in }}</li>
    <li>Check Out Date: {{ $booking->check_out }}</li>
    <li>Number Of Days: {{ $booking->number_of_days }}</li>
    <li>Amount Paid: {{ number_format($booking->amount_paid) }}</li>
    <li>Booking reference: {{ $booking->request }}</li>
</ul>

Please screenshot this email or download your receipt for future reference
<p>We look forward to hosting you!</p>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>

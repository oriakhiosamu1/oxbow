<x-mail::message>
Booking checked Out

Hi, {{ $booking->name }},

<p>Your stay at Oxbow Lake Hotel has ended. You have been successfully checked out on {{ $booking->check_out }}.</p>

<p>We hope you had a wonderful stay. Kindly leave a review by mail to our admin@oxbowlakehotel.com.ng</p>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>

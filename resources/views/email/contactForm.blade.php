<x-mail::message>
# Introduction

New Contact Form Message from: 
<strong>Name: {{ $data['name'] }}</strong>
<strong>Email: {{ $data['email'] }}</strong>
<p>{{ $data['message'] }}</p>

@component('mail::button', ['url' => 'https://www.oxbowlakehotel.com.ng/admin/signin'])
    Login to Dashboard
@endcomponent

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>

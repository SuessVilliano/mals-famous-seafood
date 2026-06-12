export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Field names match exactly what order/index.html catering form sends
  const { firstName, lastName, email, phone, eventDate, eventTime, guestCount, eventType, venue, menuInterests, budget, notes } = req.body;

  if (!firstName || !email || !eventDate || !venue || !guestCount) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const GHL_TOKEN = process.env.GHL_TOKEN || 'pit-769db85c-648a-4eb6-b0b3-362477e3db61';
  const LOCATION_ID = 'y5UtZ6XKTKjdp9sEcGZO';

  try {
    const contactRes = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_TOKEN}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        locationId: LOCATION_ID,
        firstName,
        lastName: lastName || '',
        email,
        phone: phone || '',
        tags: ['catering-inquiry', 'website-catering'],
        customFields: [
          { key: 'event_date',      field_value: eventDate },
          { key: 'event_time',      field_value: eventTime || '' },
          { key: 'event_location',  field_value: venue },
          { key: 'guest_count',     field_value: String(guestCount) },
          { key: 'event_type',      field_value: eventType || '' },
          { key: 'menu_interests',  field_value: menuInterests || '' },
          { key: 'budget',          field_value: budget || '' },
          { key: 'event_notes',     field_value: notes || '' }
        ],
        source: 'Website Catering Form'
      })
    });

    const contactData = await contactRes.json();

    if (!contactRes.ok) {
      console.error('GHL catering error:', contactData);
      return res.status(500).json({ error: 'Failed to submit inquiry' });
    }

    const contactId = contactData.contact?.id;
    if (contactId) {
      await fetch(`https://services.leadconnectorhq.com/conversations/messages/outbound`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GHL_TOKEN}`,
          'Version': '2021-07-28',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'Email',
          contactId,
          emailFrom: 'catering@malsfamousseafoodgrill.com',
          emailTo: '273maljones@gmail.com',
          subject: `Catering Inquiry — ${firstName} ${lastName || ''} — ${eventType || 'Event'}`,
          html: `
            <h2>New Catering Inquiry</h2>
            <p><strong>Contact:</strong> ${firstName} ${lastName || ''}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <hr>
            <p><strong>Event Date:</strong> ${eventDate}</p>
            <p><strong>Event Time:</strong> ${eventTime || 'Not specified'}</p>
            <p><strong>Venue/Location:</strong> ${venue}</p>
            <p><strong>Guest Count:</strong> ${guestCount}</p>
            <p><strong>Event Type:</strong> ${eventType || 'Not specified'}</p>
            <p><strong>Menu Interests:</strong> ${menuInterests || 'Not specified'}</p>
            <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
            <p><strong>Notes:</strong> ${notes || 'None'}</p>
            <hr>
            <p><a href="https://app.gohighlevel.com">View in GoHighLevel CRM</a></p>
          `
        })
      }).catch(e => console.warn('Catering email failed:', e.message));
    }

    return res.status(200).json({ success: true, message: 'Catering inquiry submitted' });

  } catch (err) {
    console.error('Catering submission error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}

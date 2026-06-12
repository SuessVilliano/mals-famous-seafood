export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Field names match exactly what order/index.html sends
  const { firstName, lastName, email, phone, pickupTime, orderItems, orderTotal, notes } = req.body;

  if (!firstName || !email || !orderItems || !pickupTime) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const GHL_TOKEN = process.env.GHL_TOKEN || 'pit-769db85c-648a-4eb6-b0b3-362477e3db61';
  const LOCATION_ID = 'y5UtZ6XKTKjdp9sEcGZO';

  try {
    // 1. Create or update contact in GHL
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
        tags: ['new-order', 'website-order'],
        customFields: [
          { key: 'order_items',  field_value: orderItems },
          { key: 'pickup_time',  field_value: pickupTime },
          { key: 'order_total',  field_value: orderTotal || '' },
          { key: 'order_notes',  field_value: notes || '' }
        ],
        source: 'Website Order Form'
      })
    });

    const contactData = await contactRes.json();

    if (!contactRes.ok) {
      console.error('GHL contact error:', contactData);
      return res.status(500).json({ error: 'Failed to submit order' });
    }

    // 2. Send internal notification email to Mal via GHL
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
          emailFrom: 'orders@malsfamousseafoodgrill.com',
          emailTo: '273maljones@gmail.com',
          subject: `New Order — ${firstName} ${lastName || ''}`,
          html: `
            <h2>New Order Received</h2>
            <p><strong>Customer:</strong> ${firstName} ${lastName || ''}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <hr>
            <p><strong>Order:</strong> ${orderItems}</p>
            <p><strong>Order Total:</strong> ${orderTotal || 'N/A'}</p>
            <p><strong>Pickup Time:</strong> ${pickupTime}</p>
            <p><strong>Notes:</strong> ${notes || 'None'}</p>
            <hr>
            <p>Log into GHL to confirm or reject this order:<br>
            <a href="https://app.gohighlevel.com">Open GoHighLevel CRM</a></p>
          `
        })
      }).catch(e => console.warn('Internal email failed (non-blocking):', e.message));
    }

    return res.status(200).json({ success: true, message: 'Order submitted successfully' });

  } catch (err) {
    console.error('Order submission error:', err);
    return res.status(500).json({ error: 'Server error, please try again' });
  }
}

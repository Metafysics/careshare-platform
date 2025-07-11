import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (toUserId, message) => {
  // Hier moet je in de echte app het e-mailadres ophalen van de userId
  // Voor demo: veronderstel een functie getUserEmail(userId)
  const toEmail = await getUserEmail(toUserId); // Implementeer dit zelf

  const msg = {
    to: toEmail,
    from: 'no-reply@careshare.com', // jouw verificatie e-mail
    subject: 'Careshare bericht',
    text: message,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error('SendGrid fout:', error);
  }
};

export default sendMail;

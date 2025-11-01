import { Resend } from 'resend';

const resend = new Resend('re_d2XEfGLa_6tv3uNwXsWocXkTAT8YuZF3q');

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'anisoft18@gmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
});


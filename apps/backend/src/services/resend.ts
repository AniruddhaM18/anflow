import { Resend } from 'resend';
import { RESEND_KEY } from '../config';

const resend = new Resend(RESEND_KEY);

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'anisoft18@gmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
});


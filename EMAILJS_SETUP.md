# Environment Setup for Portfolio

## EmailJS Configuration

This portfolio uses EmailJS for the contact form functionality. To set it up:

### 1. Create EmailJS Account
- Go to [EmailJS.com](https://www.emailjs.com/)
- Sign up for a free account
- Verify your email address

### 2. Setup Email Service
- In EmailJS dashboard, go to "Email Services"
- Add a new service (Gmail, Outlook, etc.)
- Follow the instructions to connect your email provider

### 3. Create Email Template
- Go to "Email Templates" in EmailJS dashboard
- Create a new template with ID: `template_hw2z33o` (or update the env variable)
- Use these template variables:
  ```
  Subject: Portfolio Contact: {{user_subject}}
  
  Content:
  Hi {{to_name}},
  
  You have a new message from your portfolio website:
  
  Name: {{user_name}}
  Email: {{user_email}}
  Subject: {{user_subject}}
  
  Message:
  {{user_message}}
  
  ---
  You can reply directly to: {{user_email}}
  ```

### 4. Get Your Credentials
- Service ID: Found in "Email Services" section
- Template ID: Found in "Email Templates" section  
- Public Key: Found in "Account" → "General" → "Public Key"

### 5. Setup Environment Variables
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your actual EmailJS credentials in `.env.local`:
   ```
   VITE_EMAILJS_SERVICE_ID=your_actual_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
   VITE_CONTACT_EMAIL=your_email@domain.com
   ```

### 6. Test the Contact Form
- Start the development server: `npm run dev`
- Navigate to the Contact page
- Fill out and submit the form
- Check your email for the message

## Security Notes

- ✅ **DO**: Keep your `.env.local` file private and never commit it to version control
- ✅ **DO**: Use the provided `.env.example` as a template for others
- ✅ **DO**: Use environment variables for all sensitive configuration
- ❌ **DON'T**: Commit actual API keys or credentials to your repository
- ❌ **DON'T**: Share your `.env.local` file publicly

## Deployment

For production deployment, make sure to set the environment variables in your hosting platform:

### Vercel
- Go to your project dashboard
- Navigate to "Settings" → "Environment Variables"
- Add each variable from your `.env.local` file

### Netlify
- Go to your site dashboard
- Navigate to "Site settings" → "Build & deploy" → "Environment variables"
- Add each variable from your `.env.local` file

### Other Platforms
- Consult your hosting provider's documentation for setting environment variables
- Make sure to prefix all variables with `VITE_` for Vite to expose them to the browser

## Troubleshooting

### Common Issues:
1. **"EmailJS configuration missing"** - Check that all environment variables are set correctly
2. **"The recipients address is empty"** - Verify your EmailJS template has the correct recipient configuration
3. **CORS errors** - Make sure your domain is allowed in EmailJS settings
4. **Form not sending** - Check browser console for detailed error messages

### Getting Help:
- Check EmailJS documentation: https://www.emailjs.com/docs/
- Verify your EmailJS dashboard settings
- Test your EmailJS template directly in the dashboard

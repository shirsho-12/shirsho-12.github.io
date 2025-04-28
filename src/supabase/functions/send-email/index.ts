import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();

    // Send email to site owner
    const emailToOwner = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "shirshajit@gmail.com",
      subject: `New Contact Form Message: ${formData.subject}`,
      html: `
        <h2>New message from ${formData.name}</h2>
        <p><strong>From:</strong> ${formData.email}</p>
        <p><strong>Subject:</strong> ${formData.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message}</p>
      `,
    });

    // Send confirmation email to sender
    const emailToSender = await resend.emails.send({
      from: "Shirshajit Sen Gupta <shirshajit@gmail.com",
      to: formData.email,
      subject: "Thank you for your message",
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>I have received your message and will get back to you as soon as possible.</p>
        <p>Best regards,<br>Shirshajit Sen Gupta</p>
      `,
    });

    console.log("Emails sent successfully:", { emailToOwner, emailToSender });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in send-email function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

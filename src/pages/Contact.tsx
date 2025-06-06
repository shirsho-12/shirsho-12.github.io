import { useState } from "react";
import Layout from "@/components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { GithubIcon, LinkedinIcon, MailIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useInteractionTracking } from "@/hooks/useInteractionTracking";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { logInteraction } = useInteractionTracking();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Store message in Supabase
      const { error: dbError } = await supabase
        .from("contact_messages")
        .insert([formData]);

      if (dbError) throw dbError;

      // Send email via edge function
      const response = await supabase.functions.invoke("send-email", {
        body: formData,
      });

      if (!response.error) {
        toast.success("Message sent successfully! I'll get back to you soon.");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialClick = (platform: string) => {
    logInteraction("social_click", platform);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Get in Touch</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Have a question or interested in working together? Feel free to
            reach out using the form below or connect with me on social media.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>
                  Fill out the form below to get in touch with me.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can I help you?"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message here..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Connect With Me</CardTitle>
                <CardDescription>Find me on these platforms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <GithubIcon className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium">GitHub</h3>
                    <a
                      href="https://github.com/shirsho-12"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                      onClick={() => handleSocialClick("github")}
                    >
                      github.com/shirsho-12
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      Check out my code and projects
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <LinkedinIcon className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium">LinkedIn</h3>
                    <a
                      href="https://linkedin.com/in/shirshajit"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                      onClick={() => handleSocialClick("linkedin")}
                    >
                      linkedin.com/in/shirshajit
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      Connect professionally
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MailIcon className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <a
                      href="mailto:shirshajit@gmail.com"
                      className="text-accent hover:underline"
                      onClick={() => handleSocialClick("email")}
                    >
                      shirshajit@gmail.com
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">
                      For direct inquiries
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Office Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  I'm generally available for virtual meetings Monday through
                  Friday. Feel free to suggest a time when reaching out!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;

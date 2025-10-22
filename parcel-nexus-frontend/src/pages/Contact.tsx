import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    MessageSquare,
    Headphones,
    HelpCircle,
    CheckCircle,
    User,
    Building
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
        inquiryType: 'general'
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Simulate successful submission
            toast.success('Thank you for your inquiry! We\'ll get back to you within 24 hours.');

            // Reset form
            setFormData({
                name: '',
                email: '',
                company: '',
                subject: '',
                message: '',
                inquiryType: 'general'
            });
        } catch (error) {
            toast.error('Failed to send your message. Please try again.');
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        {
            icon: <Phone className="h-6 w-6 text-primary" />,
            title: "Phone",
            details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
            description: "Call us for immediate assistance"
        },
        {
            icon: <Mail className="h-6 w-6 text-primary" />,
            title: "Email",
            details: ["support@parcelnexus.com", "info@parcelnexus.com"],
            description: "Send us an email anytime"
        },
        {
            icon: <MapPin className="h-6 w-6 text-primary" />,
            title: "Office",
            details: ["123 Delivery Street", "Logistics District, LD 12345"],
            description: "Visit our headquarters"
        },
        {
            icon: <Clock className="h-6 w-6 text-primary" />,
            title: "Hours",
            details: ["Mon-Fri: 8:00 AM - 8:00 PM", "Sat-Sun: 9:00 AM - 6:00 PM"],
            description: "We're here when you need us"
        }
    ];

    const inquiryTypes = [
        { value: 'general', label: 'General Inquiry' },
        { value: 'support', label: 'Customer Support' },
        { value: 'business', label: 'Business Partnership' },
        { value: 'complaint', label: 'Complaint' },
        { value: 'feedback', label: 'Feedback' },
        { value: 'other', label: 'Other' }
    ];

    const faqs = [
        {
            question: "How can I track my parcel?",
            answer: "You can track your parcel using the tracking number provided when you create a delivery request. Simply enter the tracking number on our tracking page."
        },
        {
            question: "What are your delivery times?",
            answer: "Standard delivery is 2-3 business days within the same city, 3-5 business days for inter-city delivery, and 5-7 business days for remote areas."
        },
        {
            question: "Do you offer insurance for packages?",
            answer: "Yes, we offer package insurance for valuable items. You can select insurance options when creating your delivery request."
        },
        {
            question: "Can I cancel my delivery request?",
            answer: "You can cancel your delivery request if the package hasn't been picked up yet. Once picked up, cancellation may incur additional charges."
        }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 sm:py-32">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <div className="space-y-4">
                            <Badge variant="secondary" className="w-fit mx-auto">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Get in Touch
                            </Badge>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                                We're Here to
                                <span className="text-primary"> Help</span>
                            </h1>
                            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                                Have questions about our services? Need support with your delivery?
                                We're here to assist you every step of the way.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form & Info Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold text-foreground">Send us a Message</h2>
                                <p className="text-muted-foreground">
                                    Fill out the form below and we'll get back to you as soon as possible.
                                </p>
                            </div>

                            <Card>
                                <CardContent className="p-6">
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label htmlFor="name" className="text-sm font-medium text-foreground">
                                                    Full Name *
                                                </label>
                                                <div className="relative">
                                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                    <Input
                                                        id="name"
                                                        name="name"
                                                        type="text"
                                                        required
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        className="pl-10"
                                                        placeholder="Enter your full name"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="email" className="text-sm font-medium text-foreground">
                                                    Email Address *
                                                </label>
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                    <Input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        required
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        className="pl-10"
                                                        placeholder="Enter your email"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="company" className="text-sm font-medium text-foreground">
                                                Company (Optional)
                                            </label>
                                            <div className="relative">
                                                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id="company"
                                                    name="company"
                                                    type="text"
                                                    value={formData.company}
                                                    onChange={handleInputChange}
                                                    className="pl-10"
                                                    placeholder="Enter your company name"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="inquiryType" className="text-sm font-medium text-foreground">
                                                Inquiry Type *
                                            </label>
                                            <select
                                                id="inquiryType"
                                                name="inquiryType"
                                                value={formData.inquiryType}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                                            >
                                                {inquiryTypes.map((type) => (
                                                    <option key={type.value} value={type.value}>
                                                        {type.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="subject" className="text-sm font-medium text-foreground">
                                                Subject *
                                            </label>
                                            <Input
                                                id="subject"
                                                name="subject"
                                                type="text"
                                                required
                                                value={formData.subject}
                                                onChange={handleInputChange}
                                                placeholder="What's this about?"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="message" className="text-sm font-medium text-foreground">
                                                Message *
                                            </label>
                                            <Textarea
                                                id="message"
                                                name="message"
                                                required
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                placeholder="Tell us more about your inquiry..."
                                                className="min-h-[120px]"
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full"
                                            size="lg"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                    Sending Message...
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="h-4 w-4 mr-2" />
                                                    Send Message
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold text-foreground">Contact Information</h2>
                                <p className="text-muted-foreground">
                                    Reach out to us through any of these channels. We're here to help!
                                </p>
                            </div>

                            <div className="space-y-6">
                                {contactInfo.map((info, index) => (
                                    <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                                    {info.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-semibold text-foreground mb-2">{info.title}</h3>
                                                    <div className="space-y-1">
                                                        {info.details.map((detail, idx) => (
                                                            <p key={idx} className="text-foreground font-medium">{detail}</p>
                                                        ))}
                                                    </div>
                                                    <p className="text-sm text-muted-foreground mt-2">{info.description}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Quick Actions */}
                            <Card className="bg-primary/5 border-primary/20">
                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-foreground">Need Immediate Help?</h3>
                                        <div className="space-y-3">
                                            <Button variant="outline" className="w-full justify-start">
                                                <Headphones className="h-4 w-4 mr-2" />
                                                Live Chat Support
                                            </Button>
                                            <Button variant="outline" className="w-full justify-start">
                                                <HelpCircle className="h-4 w-4 mr-2" />
                                                View Help Center
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Find quick answers to common questions about our services
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {faqs.map((faq, index) => (
                                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                                    <CardContent className="p-6">
                                        <div className="space-y-3">
                                            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                                                <CheckCircle className="h-5 w-5 text-primary" />
                                                {faq.question}
                                            </h3>
                                            <p className="text-muted-foreground">{faq.answer}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-primary to-accent">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground">
                                Still Have Questions?
                            </h2>
                            <p className="text-lg text-primary-foreground/90">
                                Our customer support team is available 24/7 to assist you with any inquiries
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                variant="secondary"
                                className="text-lg px-8 py-6"
                                onClick={() => window.location.href = 'tel:+15551234567'}
                            >
                                <Phone className="h-5 w-5 mr-2" />
                                Call Us Now
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                                onClick={() => window.location.href = 'mailto:support@parcelnexus.com'}
                            >
                                <Mail className="h-5 w-5 mr-2" />
                                Email Support
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;

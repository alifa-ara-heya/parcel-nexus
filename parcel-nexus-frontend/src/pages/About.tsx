import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Package,
    Truck,
    Shield,
    Users,
    Target,
    Heart,
    Award,
    Globe,
    Clock,
    CheckCircle,
    Star
} from 'lucide-react';

const About = () => {
    const values = [
        {
            icon: <Shield className="h-8 w-8 text-primary" />,
            title: "Security First",
            description: "We prioritize the safety and security of every package in our care, implementing advanced tracking and handling protocols."
        },
        {
            icon: <Clock className="h-8 w-8 text-primary" />,
            title: "Reliability",
            description: "Consistent, on-time delivery is our promise. We maintain the highest standards of service reliability across all operations."
        },
        {
            icon: <Heart className="h-8 w-8 text-primary" />,
            title: "Customer Care",
            description: "Every customer interaction matters. We provide personalized support and go the extra mile to exceed expectations."
        },
        {
            icon: <Award className="h-8 w-8 text-primary" />,
            title: "Excellence",
            description: "We continuously improve our services and technology to deliver the best possible parcel delivery experience."
        }
    ];

    const team = [
        {
            name: "Sarah Johnson",
            role: "CEO & Founder",
            bio: "With over 15 years in logistics, Sarah founded Parcel Nexus to revolutionize package delivery.",
            avatar: "SJ",
            expertise: "Logistics Strategy"
        },
        {
            name: "Michael Chen",
            role: "CTO",
            bio: "Technology innovator leading our digital transformation and real-time tracking systems.",
            avatar: "MC",
            expertise: "Technology Innovation"
        },
        {
            name: "Emily Rodriguez",
            role: "Head of Operations",
            bio: "Operations expert ensuring smooth delivery processes and exceptional customer service.",
            avatar: "ER",
            expertise: "Operations Management"
        },
        {
            name: "David Kim",
            role: "Head of Customer Success",
            bio: "Customer advocate focused on building lasting relationships and improving user experience.",
            avatar: "DK",
            expertise: "Customer Experience"
        }
    ];

    const milestones = [
        {
            year: "2020",
            title: "Company Founded",
            description: "Parcel Nexus was established with a vision to transform package delivery."
        },
        {
            year: "2021",
            title: "First 10,000 Deliveries",
            description: "Reached our first major milestone with 10,000 successful package deliveries."
        },
        {
            year: "2022",
            title: "Technology Platform Launch",
            description: "Launched our advanced real-time tracking and management platform."
        },
        {
            year: "2023",
            title: "National Expansion",
            description: "Expanded services to cover 50+ cities across the country."
        },
        {
            year: "2024",
            title: "100,000+ Deliveries",
            description: "Celebrated over 100,000 successful deliveries with 99.9% success rate."
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
                                <Package className="h-4 w-4 mr-2" />
                                About Parcel Nexus
                            </Badge>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                                Delivering Excellence,
                                <span className="text-primary"> One Package</span>
                                <br />
                                <span className="text-accent">At a Time</span>
                            </h1>
                            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                                We are a leading parcel delivery service committed to providing fast, secure,
                                and reliable package delivery solutions across the country. Our mission is to
                                connect people and businesses through exceptional delivery services.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Target className="h-8 w-8 text-primary" />
                                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Our Mission</h2>
                                </div>
                                <p className="text-lg text-muted-foreground">
                                    To revolutionize package delivery by providing fast, secure, and reliable services
                                    that connect people and businesses across the nation. We strive to make every
                                    delivery experience seamless and stress-free.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Globe className="h-8 w-8 text-primary" />
                                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Our Vision</h2>
                                </div>
                                <p className="text-lg text-muted-foreground">
                                    To become the most trusted and innovative parcel delivery service, setting new
                                    standards for speed, security, and customer satisfaction in the logistics industry.
                                </p>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
                            <Card className="relative bg-card/50 backdrop-blur-sm border-2 border-primary/20">
                                <CardContent className="p-8">
                                    <div className="space-y-6">
                                        <div className="text-center space-y-4">
                                            <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                                                <Package className="h-10 w-10 text-primary" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-foreground">Why Choose Us?</h3>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                                <span className="text-foreground">Real-time tracking technology</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                                <span className="text-foreground">99.9% delivery success rate</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                                <span className="text-foreground">24/7 customer support</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                                <span className="text-foreground">Secure handling protocols</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                                <span className="text-foreground">Nationwide coverage</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                            Our Core Values
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            These fundamental principles guide everything we do and shape our company culture
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <Card key={index} className="hover:shadow-lg transition-all duration-300 group text-center">
                                <CardContent className="p-6 space-y-4">
                                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        {value.icon}
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-semibold text-foreground">{value.title}</h3>
                                        <p className="text-muted-foreground text-sm">{value.description}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                            Meet Our Team
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            The passionate professionals behind Parcel Nexus's success
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <Card key={index} className="hover:shadow-lg transition-all duration-300 group">
                                <CardContent className="p-6 text-center space-y-4">
                                    <div className="mx-auto w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                                        <span className="text-xl font-semibold text-primary-foreground">{member.avatar}</span>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
                                        <p className="text-primary font-medium">{member.role}</p>
                                        <Badge variant="outline" className="text-xs">{member.expertise}</Badge>
                                        <p className="text-muted-foreground text-sm">{member.bio}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Company Timeline */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                            Our Journey
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Key milestones in our company's growth and development
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-8">
                            {milestones.map((milestone, index) => (
                                <div key={index} className="flex items-start gap-6">
                                    <div className="flex-shrink-0">
                                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                                            <span className="text-lg font-bold text-primary-foreground">{milestone.year}</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 pt-2">
                                        <h3 className="text-xl font-semibold text-foreground mb-2">{milestone.title}</h3>
                                        <p className="text-muted-foreground">{milestone.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                            Our Impact
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Numbers that reflect our commitment to excellence
                        </p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center space-y-4">
                            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                                <Package className="h-8 w-8 text-primary" />
                            </div>
                            <div className="space-y-2">
                                <p className="text-3xl sm:text-4xl font-bold text-primary">100,000+</p>
                                <p className="text-muted-foreground">Packages Delivered</p>
                            </div>
                        </div>
                        <div className="text-center space-y-4">
                            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                                <CheckCircle className="h-8 w-8 text-primary" />
                            </div>
                            <div className="space-y-2">
                                <p className="text-3xl sm:text-4xl font-bold text-primary">99.9%</p>
                                <p className="text-muted-foreground">Success Rate</p>
                            </div>
                        </div>
                        <div className="text-center space-y-4">
                            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                                <Users className="h-8 w-8 text-primary" />
                            </div>
                            <div className="space-y-2">
                                <p className="text-3xl sm:text-4xl font-bold text-primary">50,000+</p>
                                <p className="text-muted-foreground">Happy Customers</p>
                            </div>
                        </div>
                        <div className="text-center space-y-4">
                            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                                <Globe className="h-8 w-8 text-primary" />
                            </div>
                            <div className="space-y-2">
                                <p className="text-3xl sm:text-4xl font-bold text-primary">50+</p>
                                <p className="text-muted-foreground">Cities Covered</p>
                            </div>
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
                                Ready to Experience Excellence?
                            </h2>
                            <p className="text-lg text-primary-foreground/90">
                                Join thousands of satisfied customers who trust Parcel Nexus for their delivery needs
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/register"
                                className="inline-flex items-center justify-center px-8 py-6 text-lg font-medium rounded-md bg-background text-foreground hover:bg-background/90 transition-colors"
                            >
                                Get Started Today
                                <Star className="h-5 w-5 ml-2" />
                            </a>
                            <a
                                href="/contact"
                                className="inline-flex items-center justify-center px-8 py-6 text-lg font-medium rounded-md border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-colors"
                            >
                                Contact Us
                                <Truck className="h-5 w-5 ml-2" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;

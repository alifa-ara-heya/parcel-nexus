import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Package,
    Truck,
    Shield,
    Phone,
    MapPin,
    CheckCircle,
    Star,
    ArrowRight,
    Search,
    Zap
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { useState } from 'react';

const Home = () => {
    const navigate = useNavigate();
    const [trackingNumber, setTrackingNumber] = useState('');

    const handleTrackParcel = () => {
        if (trackingNumber.trim()) {
            navigate(`/track/${trackingNumber.trim()}`);
        } else {
            navigate('/track');
        }
    };

    const features = [
        {
            icon: <Package className="h-8 w-8 text-primary" />,
            title: "Real-time Tracking",
            description: "Monitor your parcels 24/7 with our advanced tracking system",
            color: "bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800"
        },
        {
            icon: <Truck className="h-8 w-8 text-primary" />,
            title: "Fast Delivery",
            description: "Lightning-fast delivery service across the country",
            color: "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800"
        },
        {
            icon: <Shield className="h-8 w-8 text-primary" />,
            title: "Secure Handling",
            description: "Your packages are safe with our secure handling process",
            color: "bg-purple-50 border-purple-200 dark:bg-purple-950/20 dark:border-purple-800"
        },
        {
            icon: <Phone className="h-8 w-8 text-primary" />,
            title: "24/7 Support",
            description: "Round-the-clock customer assistance whenever you need it",
            color: "bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-800"
        }
    ];

    const stats = [
        { number: "10,000+", label: "Deliveries Completed", icon: <Package className="h-6 w-6" /> },
        { number: "99.9%", label: "Success Rate", icon: <CheckCircle className="h-6 w-6" /> },
        { number: "24/7", label: "Customer Support", icon: <Phone className="h-6 w-6" /> },
        { number: "50+", label: "Cities Covered", icon: <MapPin className="h-6 w-6" /> }
    ];

    const steps = [
        {
            step: "01",
            title: "Create Parcel",
            description: "Enter your package details and recipient information",
            icon: <Package className="h-6 w-6" />
        },
        {
            step: "02",
            title: "Track Progress",
            description: "Monitor your parcel's journey in real-time",
            icon: <Truck className="h-6 w-6" />
        },
        {
            step: "03",
            title: "Delivered",
            description: "Receive your package safely and securely",
            icon: <CheckCircle className="h-6 w-6" />
        }
    ];

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Business Owner",
            content: "Amazing service! My packages always arrive on time and in perfect condition.",
            rating: 5,
            avatar: "SJ"
        },
        {
            name: "Mike Chen",
            role: "Student",
            content: "The tracking system is incredible. I can see exactly where my package is at all times.",
            rating: 5,
            avatar: "MC"
        },
        {
            name: "Emily Davis",
            role: "Freelancer",
            content: "Fast, reliable, and affordable. This is the best delivery service I've used!",
            rating: 5,
            avatar: "ED"
        }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 sm:py-32">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <Badge variant="secondary" className="w-fit">
                                    <Zap className="h-4 w-4 mr-2" />
                                    Fast & Reliable Delivery
                                </Badge>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                                    Your Parcels,
                                    <span className="text-primary"> Delivered</span>
                                    <br />
                                    <span className="text-accent">Perfectly</span>
                                </h1>
                                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
                                    Experience the future of parcel delivery with real-time tracking,
                                    secure handling, and lightning-fast service across the country.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    size="lg"
                                    className="text-lg px-8 py-6"
                                    onClick={() => navigate('/register')}
                                >
                                    Get Started
                                    <ArrowRight className="h-5 w-5 ml-2" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="text-lg px-8 py-6"
                                    onClick={() => navigate('/track')}
                                >
                                    <Search className="h-5 w-5 mr-2" />
                                    Track Parcel
                                </Button>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
                            <Card className="relative bg-card/50 backdrop-blur-sm border-2 border-primary/20">
                                <CardContent className="p-8">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3">
                                            <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                                            <span className="text-sm font-medium text-green-600">Live Tracking</span>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <Package className="h-6 w-6 text-primary" />
                                                <div>
                                                    <p className="font-semibold">Package #PKG-2024-001</p>
                                                    <p className="text-sm text-muted-foreground">In Transit</p>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span>New York</span>
                                                    <span>Los Angeles</span>
                                                </div>
                                                <div className="w-full bg-muted rounded-full h-2">
                                                    <div className="bg-primary h-2 rounded-full w-3/4 animate-pulse"></div>
                                                </div>
                                                <p className="text-xs text-muted-foreground">Estimated delivery: 2 days</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Track Section */}
            <section className="py-16 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                                Track Your Parcel
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Enter your tracking number to get real-time updates on your package
                            </p>
                        </div>

                        <Card className="p-6">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1">
                                    <Input
                                        placeholder="Enter tracking number..."
                                        value={trackingNumber}
                                        onChange={(e) => setTrackingNumber(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleTrackParcel()}
                                        className="text-lg h-12"
                                    />
                                </div>
                                <Button
                                    onClick={handleTrackParcel}
                                    size="lg"
                                    className="h-12 px-8"
                                >
                                    <Search className="h-5 w-5 mr-2" />
                                    Track Now
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                            Why Choose Parcel Nexus?
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            We provide the most reliable and efficient parcel delivery service
                            with cutting-edge technology and exceptional customer care.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <Card key={index} className={`${feature.color} hover:shadow-lg transition-all duration-300 group`}>
                                <CardContent className="p-6 text-center space-y-4">
                                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        {feature.icon}
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                                        <p className="text-muted-foreground">{feature.description}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-primary/5">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center space-y-4">
                                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                                    {stat.icon}
                                </div>
                                <div className="space-y-2">
                                    <p className="text-3xl sm:text-4xl font-bold text-primary">{stat.number}</p>
                                    <p className="text-muted-foreground">{stat.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                            How It Works
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Getting your parcels delivered is simple with our streamlined process
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="text-center space-y-6">
                                <div className="relative">
                                    <div className="mx-auto w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                                        <span className="text-2xl font-bold text-primary-foreground">{step.step}</span>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-muted -translate-x-1/2"></div>
                                    )}
                                </div>
                                <div className="space-y-4">
                                    <div className="mx-auto w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                                        {step.icon}
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                                        <p className="text-muted-foreground">{step.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                            What Our Customers Say
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Don't just take our word for it - hear from our satisfied customers
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                                <CardContent className="p-6 space-y-4">
                                    <div className="flex items-center gap-1">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                                            <span className="text-sm font-semibold text-primary-foreground">{testimonial.avatar}</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground">{testimonial.name}</p>
                                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-primary to-accent">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground">
                                Ready to Get Started?
                            </h2>
                            <p className="text-lg text-primary-foreground/90">
                                Join thousands of satisfied customers who trust Parcel Nexus for their delivery needs
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                size="lg"
                                variant="secondary"
                                className="text-lg px-8 py-6"
                                onClick={() => navigate('/register')}
                            >
                                Create Account
                                <ArrowRight className="h-5 w-5 ml-2" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                                onClick={() => navigate('/track')}
                            >
                                <Search className="h-5 w-5 mr-2" />
                                Track Parcel
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Home,
    ArrowLeft,
    Search,
    Package,
    Truck,
    MapPin,
    RefreshCw
} from 'lucide-react';
import { useNavigate } from 'react-router';

const NotFound = () => {
    const navigate = useNavigate();

    const quickActions = [
        {
            icon: <Home className="h-6 w-6" />,
            title: "Go Home",
            description: "Return to the homepage",
            action: () => navigate('/'),
            color: "bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800"
        },
        {
            icon: <Search className="h-6 w-6" />,
            title: "Track Parcel",
            description: "Find your package",
            action: () => navigate('/track'),
            color: "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800"
        },
        // {
        //     icon: <Package className="h-6 w-6" />,
        //     title: "My Parcels",
        //     description: "View your parcels",
        //     action: () => navigate('/parcels'),
        //     color: "bg-purple-50 border-purple-200 dark:bg-purple-950/20 dark:border-purple-800"
        // },
        // {
        //     icon: <Truck className="h-6 w-6" />,
        //     title: "Incoming Parcels",
        //     description: "Check incoming deliveries",
        //     action: () => navigate('/incoming-parcels'),
        //     color: "bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-800"
        // }
    ];

    const popularPages = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
        { name: "Track Parcel", path: "/track" },
        { name: "Login", path: "/login" },
        { name: "Register", path: "/register" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center space-y-8">
                    {/* 404 Animation */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl scale-150"></div>
                        <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 rounded-full w-64 h-64 mx-auto flex items-center justify-center border-4 border-primary/20">
                            <div className="text-center space-y-4">
                                <div className="text-8xl font-bold text-primary animate-pulse">404</div>
                                <div className="flex items-center justify-center gap-2">
                                    <Package className="h-8 w-8 text-primary animate-bounce" />
                                    <Truck className="h-8 w-8 text-accent animate-bounce" style={{ animationDelay: '0.1s' }} />
                                    <MapPin className="h-8 w-8 text-primary animate-bounce" style={{ animationDelay: '0.2s' }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Error Message */}
                    <div className="space-y-4">
                        <Badge variant="secondary" className="w-fit mx-auto">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Page Not Found
                        </Badge>
                        <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
                            Oops! Lost in Transit
                        </h1>
                        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                            The page you're looking for seems to have been delivered to the wrong address.
                            Don't worry, we'll help you find your way back!
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="text-lg px-8 py-6"
                            onClick={() => navigate('/')}
                        >
                            <Home className="h-5 w-5 mr-2" />
                            Go Home
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="text-lg px-8 py-6"
                            onClick={() => navigate(-1)}
                        >
                            <ArrowLeft className="h-5 w-5 mr-2" />
                            Go Back
                        </Button>
                    </div>

                    {/* Quick Actions */}
                    <div className="pt-8">
                        <h2 className="text-2xl font-semibold text-foreground mb-6">
                            Quick Actions
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {quickActions.map((action, index) => (
                                <Card
                                    key={index}
                                    className={`${action.color} hover:shadow-lg transition-all duration-300 cursor-pointer group`}
                                    onClick={action.action}
                                >
                                    <CardContent className="p-4 text-center space-y-3">
                                        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            {action.icon}
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="font-semibold text-foreground">{action.title}</h3>
                                            <p className="text-sm text-muted-foreground">{action.description}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Popular Pages */}
                    <div className="pt-8">
                        <h2 className="text-2xl font-semibold text-foreground mb-6">
                            Popular Pages
                        </h2>
                        <Card className="max-w-2xl mx-auto">
                            <CardContent className="p-6">
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {popularPages.map((page, index) => (
                                        <Button
                                            key={index}
                                            variant="ghost"
                                            className="justify-start h-auto p-3 hover:bg-primary/10"
                                            onClick={() => navigate(page.path)}
                                        >
                                            <span className="text-sm font-medium">{page.name}</span>
                                        </Button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Help Section */}
                    <div className="pt-8">
                        <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
                            <CardContent className="p-6 text-center space-y-4">
                                <h3 className="text-xl font-semibold text-foreground">
                                    Still Need Help?
                                </h3>
                                <p className="text-muted-foreground">
                                    If you can't find what you're looking for, our support team is here to help.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <Button
                                        variant="outline"
                                        onClick={() => navigate('/contact')}
                                    >
                                        Contact Support
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => window.location.reload()}
                                    >
                                        <RefreshCw className="h-4 w-4 mr-2" />
                                        Refresh Page
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;

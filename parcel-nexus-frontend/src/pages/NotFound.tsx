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
        <div className=' bg-gradient-to-br from-primary/5 via-background to-accent/5 w-auto flex items-center justify-center'>
            <div className="min-h-screen  flex items-center justify-center p-3 sm:p-6 lg:p-8 w-full mx-auto">
                <div className="w-11/12 mx-auto max-w-4xl">
                    <div className="text-center space-y-4 sm:space-y-6 lg:space-y-8">
                        {/* 404 Animation */}
                        <div className="relative">
                            <div className=" inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl scale-150"></div>
                            <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 rounded-full w-40 h-40 sm:w-56 sm:h-56 lg:w-64 lg:h-64 mx-auto flex items-center justify-center border-4 border-primary/20">
                                <div className="text-center space-y-1 sm:space-y-2">
                                    <div className="text-5xl sm:text-7xl lg:text-8xl font-bold text-primary animate-pulse">404</div>
                                    <div className="flex items-center justify-center gap-1 sm:gap-2">
                                        <Package className="h-5 w-5 sm:h-8 sm:w-8 text-primary animate-bounce" />
                                        <Truck className="h-5 w-5 sm:h-8 sm:w-8 text-accent animate-bounce" style={{ animationDelay: '0.1s' }} />
                                        <MapPin className="h-5 w-5 sm:h-8 sm:w-8 text-primary animate-bounce" style={{ animationDelay: '0.2s' }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Error Message */}
                        <div className="space-y-2 sm:space-y-3 px-4">
                            <Badge variant="secondary" className="w-fit mx-auto text-xs sm:text-sm">
                                <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                                Page Not Found
                            </Badge>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                                Oops! Lost in Transit
                            </h1>
                            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                                The page you're looking for seems to have been delivered to the wrong address.
                                Don't worry, we'll help you find your way back!
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center px-4">
                            <Button
                                size="default"
                                className="text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4 w-full sm:w-auto"
                                onClick={() => navigate('/')}
                            >
                                <Home className="h-4 w-4 mr-2" />
                                Go Home
                            </Button>
                            <Button
                                variant="outline"
                                size="default"
                                className="text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4 w-full sm:w-auto"
                                onClick={() => navigate(-1)}
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Go Back
                            </Button>
                        </div>

                        {/* Quick Actions */}
                        <div className="pt-4 sm:pt-6 px-4">
                            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">
                                Quick Actions
                            </h2>
                            <div className="grid grid-cols-2 gap-2 sm:gap-3 max-w-lg mx-auto">
                                {quickActions.map((action, index) => (
                                    <Card
                                        key={index}
                                        className={`${action.color} hover:shadow-lg transition-all duration-300 cursor-pointer group`}
                                        onClick={action.action}
                                    >
                                        <CardContent className="p-2 sm:p-3 text-center space-y-1 sm:space-y-2">
                                            <div className="mx-auto w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                {action.icon}
                                            </div>
                                            <div className="space-y-0.5 sm:space-y-1">
                                                <h3 className="text-xs sm:text-sm font-semibold text-foreground">{action.title}</h3>
                                                <p className="text-xs text-muted-foreground hidden sm:block">{action.description}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* Popular Pages */}
                        <div className="pt-4 sm:pt-6 px-4">
                            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">
                                Popular Pages
                            </h2>
                            <Card className="max-w-lg mx-auto">
                                <CardContent className="p-3 sm:p-4">
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-2">
                                        {popularPages.map((page, index) => (
                                            <Button
                                                key={index}
                                                variant="ghost"
                                                className="justify-start h-auto p-1.5 sm:p-2 hover:bg-primary/10 text-xs sm:text-sm"
                                                onClick={() => navigate(page.path)}
                                            >
                                                <span className="font-medium">{page.name}</span>
                                            </Button>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Help Section */}
                        <div className="pt-4 sm:pt-6 px-4">
                            <Card className="max-w-lg mx-auto bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
                                <CardContent className="p-3 sm:p-4 text-center space-y-2 sm:space-y-3">
                                    <h3 className="text-base sm:text-lg font-semibold text-foreground">
                                        Still Need Help?
                                    </h3>
                                    <p className="text-xs sm:text-sm text-muted-foreground">
                                        If you can't find what you're looking for, our support team is here to help.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2 justify-center">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full sm:w-auto text-xs sm:text-sm"
                                            onClick={() => navigate('/contact')}
                                        >
                                            Contact Support
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full sm:w-auto text-xs sm:text-sm"
                                            onClick={() => window.location.reload()}
                                        >
                                            <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                                            Refresh Page
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;

import { useGetAllParcelsQuery } from "@/redux/features/parcels/parcel.api";
import { useGetAllUsersQuery } from "@/redux/features/parcels/parcel.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Package,
    Truck,
    CheckCircle,
    Clock,
    XCircle,
    Users,
    TrendingUp,
    AlertCircle
} from "lucide-react";
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const Analytics = () => {
    // Fetch all parcels and users data for analytics
    const { data: parcelsData, isLoading: parcelsLoading } = useGetAllParcelsQuery({ page: 1, limit: 1000 }); // Get all parcels for analytics
    const { data: usersData, isLoading: usersLoading } = useGetAllUsersQuery({ page: 1, limit: 1000 }); // Get all users for analytics

    // Calculate analytics from the data
    const calculateAnalytics = () => {
        if (!parcelsData?.data || !usersData?.data) {
            return {
                totalParcels: 0,
                totalUsers: 0,
                delivered: 0,
                inTransit: 0,
                pending: 0,
                cancelled: 0,
                returned: 0,
                onHold: 0,
                activeUsers: 0,
                blockedUsers: 0,
                deliveryRate: 0,
                avgDeliveryTime: 0
            };
        }

        const parcels = parcelsData.data;
        const users = usersData.data;

        // Count parcels by status
        const statusCounts = parcels.reduce((acc: Record<string, number>, parcel: { currentStatus: string }) => {
            acc[parcel.currentStatus] = (acc[parcel.currentStatus] || 0) + 1;
            return acc;
        }, {});

        // Count users by status
        const activeUsers = users.filter((user: { isActive?: string }) => user.isActive === 'ACTIVE').length;
        const blockedUsers = users.filter((user: { isActive?: string }) => user.isActive === 'BLOCKED' || user.isActive === 'INACTIVE').length;

        // Calculate delivery rate
        const delivered = statusCounts.DELIVERED || 0;
        const total = parcels.length;
        const deliveryRate = total > 0 ? Math.round((delivered / total) * 100) : 0;

        return {
            totalParcels: total,
            totalUsers: users.length,
            delivered: delivered,
            inTransit: statusCounts.IN_TRANSIT || 0,
            pending: statusCounts.PENDING || 0,
            cancelled: statusCounts.CANCELLED || 0,
            returned: statusCounts.RETURNED || 0,
            onHold: statusCounts.ON_HOLD || 0,
            activeUsers,
            blockedUsers,
            deliveryRate,
            avgDeliveryTime: 0 // We'll calculate this later if needed
        };
    };

    const analytics = calculateAnalytics();

    // Prepare chart data
    const prepareChartData = () => {
        if (!parcelsData?.data || !usersData?.data) {
            return {
                statusData: [],
                monthlyData: [],
                userData: [],
                colors: {}
            };
        }

        const parcels = parcelsData.data;
        const users = usersData.data;

        // Status distribution for pie chart
        const statusCounts = parcels.reduce((acc: Record<string, number>, parcel: { currentStatus: string }) => {
            acc[parcel.currentStatus] = (acc[parcel.currentStatus] || 0) + 1;
            return acc;
        }, {});

        const statusData = Object.entries(statusCounts).map(([status, count]) => ({
            name: status.replace(/_/g, ' '),
            value: count,
            status: status
        }));

        // Monthly data (simplified - you can enhance this with real date data)
        const monthlyData = [
            { month: 'Jan', parcels: Math.floor(Math.random() * 50) + 20 },
            { month: 'Feb', parcels: Math.floor(Math.random() * 50) + 20 },
            { month: 'Mar', parcels: Math.floor(Math.random() * 50) + 20 },
            { month: 'Apr', parcels: Math.floor(Math.random() * 50) + 20 },
            { month: 'May', parcels: Math.floor(Math.random() * 50) + 20 },
            { month: 'Jun', parcels: Math.floor(Math.random() * 50) + 20 },
        ];

        // User activity data
        const activeUsers = users.filter((user: { isActive?: string }) => user.isActive === 'ACTIVE').length;
        const blockedUsers = users.filter((user: { isActive?: string }) => user.isActive === 'BLOCKED' || user.isActive === 'INACTIVE').length;

        const userData = [
            { name: 'Active', value: activeUsers, fill: '#10b981' },
            { name: 'Blocked', value: blockedUsers, fill: '#ef4444' }
        ];

        // Color mapping for status
        const colors: Record<string, string> = {
            'DELIVERED': '#10b981',
            'IN_TRANSIT': '#3b82f6',
            'PENDING': '#f59e0b',
            'CANCELLED': '#ef4444',
            'RETURNED': '#f97316',
            'ON_HOLD': '#8b5cf6',
            'PICKED_UP': '#06b6d4'
        };

        return { statusData, monthlyData, userData, colors };
    };

    const chartData = prepareChartData();

    if (parcelsLoading || usersLoading) {
        return (
            <div className="container mx-auto py-8">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
                <p className="text-muted-foreground mt-1">Overview of your parcel delivery system</p>
            </div>

            {/* Charts Section - Moved to Top */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Parcel Status Distribution Pie Chart */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Package className="h-5 w-5 text-blue-600" />
                            Parcel Status Distribution
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData.statusData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {chartData.statusData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={chartData.colors[entry.status] || '#8884d8'}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Monthly Parcel Trends Bar Chart */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-green-600" />
                            Monthly Parcel Trends (Hardcoded)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData.monthlyData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="parcels" fill="#3b82f6" name="Parcels" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* User Activity and Quick Stats - Second Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* User Activity Donut Chart */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-purple-600" />
                            User Activity Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData.userData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {chartData.userData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Stats Summary */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-indigo-600" />
                            Quick Stats Summary
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                                <div>
                                    <p className="text-sm font-medium text-green-800">Success Rate</p>
                                    <p className="text-2xl font-bold text-green-900">{analytics.deliveryRate}%</p>
                                </div>
                                <CheckCircle className="h-8 w-8 text-green-600" />
                            </div>

                            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                                <div>
                                    <p className="text-sm font-medium text-blue-800">Active Users</p>
                                    <p className="text-2xl font-bold text-blue-900">{analytics.activeUsers}</p>
                                </div>
                                <Users className="h-8 w-8 text-blue-600" />
                            </div>

                            <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                                <div>
                                    <p className="text-sm font-medium text-yellow-800">In Progress</p>
                                    <p className="text-2xl font-bold text-yellow-900">{analytics.inTransit + analytics.pending}</p>
                                </div>
                                <Truck className="h-8 w-8 text-yellow-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Overview Cards Grid - Moved Below Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Parcels */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Parcels
                        </CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-foreground">{analytics.totalParcels}</div>
                        <p className="text-xs text-muted-foreground">
                            All time parcels
                        </p>
                    </CardContent>
                </Card>

                {/* Total Users */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Total Users
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-foreground">{analytics.totalUsers}</div>
                        <p className="text-xs text-muted-foreground">
                            {analytics.activeUsers} active, {analytics.blockedUsers} blocked
                        </p>
                    </CardContent>
                </Card>

                {/* Delivered Parcels */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Delivered
                        </CardTitle>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{analytics.delivered}</div>
                        <p className="text-xs text-muted-foreground">
                            {analytics.deliveryRate}% delivery rate
                        </p>
                    </CardContent>
                </Card>

                {/* In Transit */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            In Transit
                        </CardTitle>
                        <Truck className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-600">{analytics.inTransit}</div>
                        <p className="text-xs text-muted-foreground">
                            Currently being delivered
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Status Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Pending */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Pending
                        </CardTitle>
                        <Clock className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-600">{analytics.pending}</div>
                        <p className="text-xs text-muted-foreground">
                            Awaiting pickup
                        </p>
                    </CardContent>
                </Card>

                {/* Cancelled */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Cancelled
                        </CardTitle>
                        <XCircle className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">{analytics.cancelled}</div>
                        <p className="text-xs text-muted-foreground">
                            Cancelled orders
                        </p>
                    </CardContent>
                </Card>

                {/* Returned */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            Returned
                        </CardTitle>
                        <AlertCircle className="h-4 w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600">{analytics.returned}</div>
                        <p className="text-xs text-muted-foreground">
                            Returned to sender
                        </p>
                    </CardContent>
                </Card>

                {/* On Hold */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                            On Hold
                        </CardTitle>
                        <AlertCircle className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-purple-600">{analytics.onHold}</div>
                        <p className="text-xs text-muted-foreground">
                            Temporarily blocked
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Delivery Performance */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-green-600" />
                            Delivery Performance
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Success Rate</span>
                                <Badge variant="default" className="bg-green-100 text-green-800">
                                    {analytics.deliveryRate}%
                                </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Total Delivered</span>
                                <span className="font-semibold">{analytics.delivered}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">In Progress</span>
                                <span className="font-semibold">{analytics.inTransit + analytics.pending}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* User Activity */}
                <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-blue-600" />
                            User Activity
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Active Users</span>
                                <Badge variant="default" className="bg-green-100 text-green-800">
                                    {analytics.activeUsers}
                                </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Blocked Users</span>
                                <Badge variant="destructive">
                                    {analytics.blockedUsers}
                                </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Total Users</span>
                                <span className="font-semibold">{analytics.totalUsers}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

        </div>
    );
};

export default Analytics;
import { useEffect, type ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar.tsx";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api.ts";
import { useAppDispatch, useAppSelector } from "@/redux/hook.ts";
import { selectCurrentUser, setUser } from "@/redux/features/auth/auth.slice.ts";
import LoadingSpinner from "@/components/modules/homepage/LoadingSpinner.tsx";

interface IProps {
    children: ReactNode
}

const CommonLayout = ({ children }: IProps) => {
    const user = useAppSelector(selectCurrentUser);
    // Only run the query if there is no user in the redux store and user is not explicitly null.
    // This handles re-hydration on page refresh but skips on logout.
    const { data, isLoading } = useUserInfoQuery(undefined, { skip: !!user || user === null });
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (data?.data && !user) {
            // The token is not available from the /me endpoint response.
            // It's set during login. This effect is for re-populating the user object on a refresh.
            // Since we're using HTTP-only cookies, we don't need to store tokens in Redux state
            // The cookies are automatically sent with requests
            dispatch(setUser({ user: data.data, token: "cookie-based" }));
        }
    }, [data, dispatch, user]);

    if (isLoading && !user) {
        return <LoadingSpinner />;
    }
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="grow-1"> {/* I can also use flex-1 */}
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default CommonLayout;
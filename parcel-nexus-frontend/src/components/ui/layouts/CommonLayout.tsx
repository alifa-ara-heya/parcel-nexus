import { useEffect, useState, type ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar.tsx";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api.ts";
import { useAppDispatch, useAppSelector } from "@/redux/hook.ts";
import { selectCurrentUser, setUser } from "@/redux/features/auth/auth.slice.ts";

interface IProps {
    children: ReactNode
}

const CommonLayout = ({ children }: IProps) => {
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const user = useAppSelector(selectCurrentUser);
    // Only run the query on initial load. After that, the user state in Redux is the source of truth.
    // If the user logs out, `user` becomes null, and `skip` becomes true, preventing a refetch.
    const { data, isLoading } = useUserInfoQuery(undefined, { skip: !isInitialLoad && !user });
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (data?.data) {
            dispatch(setUser({ user: data.data }));
        }
        // Once the initial fetch attempt is done (whether successful or not), we turn off the initial load flag.
        if (!isLoading) {
            setIsInitialLoad(false);
        }
    }, [data, dispatch, isLoading]);

    if (isLoading && isInitialLoad) {
        return <div>Loading...</div>; // Or a spinner component
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
import { selectCurrentUser } from "@/redux/features/auth/auth.slice";
import { useAppSelector } from "@/redux/hook";

const Parcels = () => {
    const user = useAppSelector(selectCurrentUser)
    console.log(user);

    return (
        <div>
            <h1>This is Parcels component</h1>
            {
                user && <h2>Welcome {user?.name}</h2>
            }
        </div>
    );
};

export default Parcels;
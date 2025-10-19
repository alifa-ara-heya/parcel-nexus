// src/components/modules/homepage/LoadingSpinner.tsx
import "./LoadingSpinner.css";

const LoadingSpinner = () => {
    return (
        <div className="h-screen">
            <div className="flex h-full w-full items-center justify-center">
                <div className="loader" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
    );
};

export default LoadingSpinner;

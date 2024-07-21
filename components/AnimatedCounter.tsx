'use client';
import CountUp from "react-countup";

const AnimatedCounter = ({ amount }: { amount: number }) => {
    return (
        <span className="w-full">
            <CountUp
                decimal=","
                decimals={2}
                duration={1.75}
                prefix="$"
                end={amount}
            />
        </span>
    );
}

export default AnimatedCounter;
import { sendPasswordResetEmail } from "@firebase/auth";
import { stringify } from "@firebase/util";
import { elementAcceptingRef } from "@mui/utils";
import { Attributes, FC, ReactPropTypes } from "react";

interface PrintDateProps {
    timestamp: Date;
    rest: Attributes;
}

interface formatTypes {
    mSeconds: Number;
    seconds: Number;
    mins: Number;
    hours: Number;
    days: Number;
    weeks: Number;
    months: Number;
    years: Number;
}

const PrintDate: FC<PrintDateProps> = ({ timestamp, ...rest }) => {
    let currentDate = new Date();
    const changeOfDate: number = currentDate.getTime() - timestamp.getTime();
    // the rest of the difference between the date
    const mins  = (changeOfDate - changeOfDate % (1000 * 60)) / (1000 * 60);
    const hours  = (changeOfDate - changeOfDate % (1000 * 3600))/ (1000 * 3600) ;
    const days  = (changeOfDate - changeOfDate % (1000 * 3600 * 24)) / (1000 * 3600 * 24) ;
    const weeks  = (changeOfDate - changeOfDate % (1000 * 3600 * 24 * 7)) / (1000 * 3600 * 24 * 7);
    const months  = (changeOfDate - changeOfDate % (1000 * 3600 * 24 * 30)) / (1000 * 3600 * 24 * 30);
    const years  = (changeOfDate - changeOfDate % (1000 * 3600 * 24 * 30 * 12)) / (1000 * 3600 * 24 * 30 * 12);

    let sort: Array<{ name: string, value: number }> = [
        {
            "name": "Years",
            "value": years
        },
        {
            "name": "Months",
            "value": months
        },
        {
            "name": "weeks",
            "value": weeks
        },
        {
            "name": "days",
            "value": days
        },
        {
            "name": "hours",
            "value": hours
        },
        {
            "name": "minutes",
            "value": mins
        }
    ]


    interface resultTypes {
        name? : string;
        value?: number;
    }

    let result:resultTypes | string = {};
    let stop = false;
    if(mins <= 0){
        result = "just now"
    }else{
        sort.forEach((element, ind) => {
            if (element.value > 0 && !stop) {
                result = element;
                stop = true;
                return;
            } else if (stop) {
                return;
            }
        });
    }

    if(!result){
        result = "Just now";
    }

    return <div className="" {...rest}>
        {/* @ts-ignore */}
        <span className="whitespace-nowrap flex justify-center items-center" title={typeof result != "string" ? (result?.value + " " + result?.name + " ago") : result}> {typeof result == "string" ? result : (result?.value +" "+ result?.name[0])}</span>
    </div>;
};

export default PrintDate;

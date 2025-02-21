import { SECONDS_PER_DAY } from "@/src/config/constants";

export enum SpendLimitTimeframe {
    UNKNOWN = 0,
    DAY = SECONDS_PER_DAY,
    WEEK = SECONDS_PER_DAY * 7,
    MONTH = SECONDS_PER_DAY * 30,
    YEAR = SECONDS_PER_DAY * 365
}
export enum SpendLimitTimeframeDisplay {
    UNKNOWN = 'Unknown',
    DAY = 'Day',
    WEEK = 'Week',
    MONTH = 'Month',
    YEAR = 'Year'
}

export const timeframeToDisplay = (timeframe: number): SpendLimitTimeframeDisplay => {
    const enumKey = SpendLimitTimeframe[timeframe];
    return enumKey ? 
        SpendLimitTimeframeDisplay[enumKey as keyof typeof SpendLimitTimeframeDisplay] :
        SpendLimitTimeframeDisplay.UNKNOWN;
};

export const displayToTimeframe = (display: SpendLimitTimeframeDisplay): SpendLimitTimeframe => {
    const key = Object.keys(SpendLimitTimeframeDisplay)
        .find(key => SpendLimitTimeframeDisplay[key as keyof typeof SpendLimitTimeframeDisplay] === display);
    return key ? SpendLimitTimeframe[key as keyof typeof SpendLimitTimeframe] : SpendLimitTimeframe.UNKNOWN;
}

import client from "../../graphql/client";
import { AnalyticsQuery } from "../../graphql";

export const noOfRequestsPerYearRequest = async (year) => {
    const data = await client.query({
        query: AnalyticsQuery.NUMBER_OF_REQUESTS_PER_YEAR,
        variables: { year },
    });

    return data.data.data;
};

export const typeOfRequests = async () => {
    const data = await client.query({
        query: AnalyticsQuery.TYPE_OF_REQUESTS,
    });

    return data.data.data;
};

export const zipcodeVsNoOfRequests = async () => {
    const data = await client.query({
        query: AnalyticsQuery.ZIPCODE_VS_NUMBER_OF_REQUESTS,
    });

    return data.data.data;
};

export const cityVsTypeOfRequests = async () => {
    const data = await client.query({
        query: AnalyticsQuery.CITY_VS_TYPE_OF_SERVICE_REQUESTS,
    });

    return data.data.data;
};

export const topRatedServices = async () => {
    const data = await client.query({
        query: AnalyticsQuery.TOP_RATED_SERVICES,
    });

    return data.data.data;
};

export const recommendedServices = async (city) => {
    const data = await client.query({
        query: AnalyticsQuery.RECOMMENDED_SERVICES,
        variables: { city },
    });

    return data.data.data;
};

export const mostInfluentialBusinesses = async () => {
    const data = await client.query({
        query: AnalyticsQuery.MOST_INFLUENTIAL_BUSINESSES,
    });

    return data.data.data;
};

export const mostInfluentialPeople = async () => {
    const data = await client.query({
        query: AnalyticsQuery.MOST_INFLUENTIAL_PEOPLE,
    });

    return data.data.data;
};

export const mostInfluentialCommunity = async () => {
    const data = await client.query({
        query: AnalyticsQuery.MOST_INFLUENTIAL_COMMUNITY,
    });

    return data.data.data;
};

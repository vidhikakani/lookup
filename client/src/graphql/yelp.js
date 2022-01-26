import { gql } from "@apollo/client";

const BUSINESS_FRAGMENT = gql`
    fragment businessFragment on Business {
        id
        name
        rating
        photos
        phone
        display_phone
        is_closed
        hours {
            is_open_now
            open {
                end
                start
                day
            }
        }
        categories {
            title
            alias
        }
        coordinates {
            latitude
            longitude
        }
        location {
            address1
            city
            state
            country
            zip_code
        }
        review_count
        messaging {
            url
            use_case_text
        }
    }
`;

const EVENT_FRAGMENT = gql`
    fragment eventFragment on Event {
        attending_count
        category
        cost
        cost_max
        description
        event_site_url
        id
        image_url
        interested_count
        is_canceled
        is_free
        is_official
        latitude
        longitude
        name
        tickets_url
        time_end
        time_start
        location {
            address1
            address2
            address3
            city
            zip_code
            country
            state
            display_address
            cross_streets
        }
        business_id
    }
`;

const REVIEW_FRAGMENT = gql`
    fragment reviewFragment on Review {
        _id
        business_id
        text
        time_created
        rating
        user {
            id
            image_url
            name
        }
    }
`;

const GET_SERVICES = gql`
    query services {
        services: getServices {
            alias
            title
        }
    }
`;

const GET_BUSINESS_DEALS = gql`
    ${BUSINESS_FRAGMENT}
    query businessDeals {
        deals: getBusinessDeals {
            ...businessFragment
        }
    }
`;

const GET_ALL_BUSINESSES = gql`
    ${BUSINESS_FRAGMENT}
    query businesses {
        businesses: getAllBusiness {
            ...businessFragment
        }
    }
`;

const GET_ALL = gql`
    query getAll {
        categories {
            category {
                title
                alias
                parent_categories {
                    title
                }
            }
        }
        trending: search(
            term: "Home Services"
            location: "san fransicso"
            attributes: ["hot_and_new"]
        ) {
            business {
                id
                name
                price
                photos
                categories {
                    title
                    parent_categories {
                        title
                    }
                }
            }
        }
        deals: search(
            term: "Home Services"
            location: "san fransicso"
            attributes: ["deals"]
        ) {
            business {
                id
                name
                price
                photos
                categories {
                    title
                    parent_categories {
                        title
                    }
                }
            }
        }
    }
`;

const GET_YELP_REVIEWS = gql`
    ${REVIEW_FRAGMENT}
    query getYelpReviews($business_id: ID!) {
        reviews: getYelpReviews(business_id: $business_id) {
            ...reviewFragment
        }
    }
`;

const ADD_REVIEW = gql`
    ${REVIEW_FRAGMENT}
    mutation addLookupReview($review: ReviewInput!) {
        reviews: addLookupReview(review: $review) {
            ...reviewFragment
        }
    }
`;

const GET_ALL_REVIEWS = gql`
    ${REVIEW_FRAGMENT}
    query getAllReviews($business_id: ID!) {
        reviews: getAllReviews(business_id: $business_id) {
            ...reviewFragment
        }
    }
`;

const FILTER_BUSINESSES_BY_CITY = gql`
    ${BUSINESS_FRAGMENT}
    query filterBusinessByCity($city: String!) {
        businesses: filterBusinessesByCity(city: $city) {
            ...businessFragment
        }
    }
`;

const FILTER_BUSINESSES_BY_ZIPCODE = gql`
    ${BUSINESS_FRAGMENT}
    query filterBusinessByZipcode($zipcode: String!) {
        businesses: filterBusinessesByZipcode(zipcode: $zipcode) {
            ...businessFragment
        }
    }
`;

const SEARCH_SERVICE = gql`
    ${BUSINESS_FRAGMENT}
    query search_service(
        $term: String!
        $location: String!
        $categories: String
        $limit: Int
    ) {
        search(
            term: $term
            location: $location
            categories: $categories
            limit: $limit
        ) {
            business {
                ...businessFragment
            }
        }
    }
`;

const GET_EVENTS_BY_USER_ID = gql`
    ${EVENT_FRAGMENT}
    query getEventsByUserId($userId: ID!) {
        events: getEventsByUserId(userId: $userId) {
            ...eventFragment
        }
    }
`;

const DELETE_REVIEW = gql`
    ${REVIEW_FRAGMENT}
    mutation deleteLookupReview($id: ID!, $business_id: ID!) {
        reviews: deleteLookupReview(id: $id, business_id: $business_id) {
            ...reviewFragment
        }
    }
`;

export default {
    GET_ALL,
    SEARCH_SERVICE,
    GET_SERVICES,
    GET_BUSINESS_DEALS,
    GET_ALL_BUSINESSES,
    GET_YELP_REVIEWS,
    GET_ALL_REVIEWS,
    ADD_REVIEW,
    FILTER_BUSINESSES_BY_CITY,
    FILTER_BUSINESSES_BY_ZIPCODE,
    GET_EVENTS_BY_USER_ID,
    DELETE_REVIEW,
};

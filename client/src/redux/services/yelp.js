import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import config from "../../common/config";

const httpLink = new HttpLink({
    // uri: "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/graphql",
    uri: "https://api.yelp.com/v3/graphql",
    credentials: "include",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        );

    if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext((_, { headers }) => {
    const token = config.YELP_API_KEY;
    // const token =
    //     "6EmS4TSTG9DH-7NPwTAqvs0hafEIVeJi0_8f2KngMjwpGIF4nYSurfJOsofff1CQABmyh1TCBHzEfOJ7vsvmoAK9kq7k9gTO9Dem1V6Y1OAkhFEYh1KLjf9avT50YXYx";
    return {
        headers: {
            ...headers,
            authorization: `Bearer ${token}`,
            "accept-language": "en_US",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            Accept: "application/json",
            "Access-Control-Allow-Credentials": "true",
            "Content-Type": "application/json",
            "x-requested-with": "xmlhttprequest",
        },
    };
});

const yelpClient = new ApolloClient({
    link: authLink.concat(from([errorLink, httpLink])),
    cache: new InMemoryCache(),
});

export default yelpClient;

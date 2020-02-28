const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLSchema, GraphQLInt } = graphql;

const fetch = require("node-fetch");

const ResultsType = new GraphQLObjectType({
  name: "Result",
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: result => result.id
    },
    sectionId: {
      type: GraphQLString,
      resolve: result => result.sectionId
    },
    sectionName: {
      type: GraphQLString,
      resolve: result => result.sectionName
    },
    webPublicationDate: {
      type: GraphQLString,
      resolve: result => result.webPublicationDate
    },
    webTitle: {
      type: GraphQLString,
      resolve: result => result.webTitle
    },
    webUrl: {
      type: GraphQLString,
      resolve: result => result.webUrl
    },
    apiUrl: {
      type: GraphQLString,
      resolve: result => result.apiUrl
    }
  })
});

const ResponseType = new GraphQLObjectType({
  name: "Response",
  fields: () => ({
    status: {
      type: GraphQLString,
      resolve: response => response.status
    },

    userTier: {
      type: GraphQLString,
      resolve: response => response.userTier
    },

    total: {
      type: GraphQLInt,
      resolve: response => response.total
    },

    startIndex: {
      type: GraphQLInt,
      resolve: response => response.startIndex
    },

    pageSize: {
      type: GraphQLInt,
      resolve: response => response.pageSize
    },

    currentPage: {
      type: GraphQLInt,
      resolve: response => response.currentPage
    },

    pages: {
      type: GraphQLInt,
      resolve: response => response.pages
    },

    orderBy: {
      type: GraphQLString,
      resolve: response => response.orderBy
    },
    results: {
      type: new GraphQLList(ResultsType),
      resolve: response => response.results
    }
  })
});

const QueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root query of all",
  fields: () => ({
    response: {
      type: ResponseType,
      description: "api",
      resolve: (root, args) => {
        let response = fetch("https://content.guardianapis.com/search?api-key=840c843c-9629-4097-a8ec-5159da88dad3")
          .then(response => response.json())
          .then(json => json.response);
        return response;
      }
    }
  })
});

const schema = new GraphQLSchema({
  query: QueryType
});

module.exports = schema;

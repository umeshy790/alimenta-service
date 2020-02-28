const { buildSchema } = require("graphql");
const schema = buildSchema(`
    type Fields {
        thumbnail : String
        bodyText : String
    }

    type Results {
        id : String!
        sectionId : String
        sectionName : String
        webPublicationDate : String
        webTitle : String
        webUrl : String
        apiUrl : String
        fields : Fields
    }

    type Response {
        status : String
        userTier : String
        total : Int
        startIndex : Int
        pageSize : Int
        currentPage : Int
        pages : Int
        orderBy : String
        results : [Results]
    }

    type Content {
        fields : Fields
    }

    type FullContent {
       content : Content
    }

    type Query {
        response(page : Int!, search : String) : Response!
        getContent(id : String) : FullContent
    }`);

module.exports = schema;

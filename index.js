const express = require("express");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
const fetch = require("node-fetch");

const [key] = process.argv.slice(2);
const schema = require("./schema/schema");

const BASE_URL = "https://content.guardianapis.com";

const root = {
  response: body => {
    const { page, search } = body;
    let path = `${BASE_URL}/search?show-fields=thumbnail&page=${page}&api-key=${key}`;
    if (search) {
      path = `${path}&q=${search}`;
    }

    return fetch(path)
      .then(res => res.json())
      .then(json => json.response)
      .catch(err => err);
  },

  getContent: body => {
    const { id } = body;
    return fetch(`${BASE_URL}/${id}?show-fields=bodyText&api-key=${key}`)
      .then(res => res.json())
      .then(json => json.response)
      .catch(err => err);
  }
};

const app = express();
app.use(cors());
app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(4000);

console.log("Running a GraphQL API server at http://localhost:4000/graphql");

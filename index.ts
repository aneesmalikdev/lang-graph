// "@langchain/openai" "@langchain/langgraph" "@langchain/core"
// in .env OPENAI_API_KEY=

import { createGraph } from "./graph";

// INBOX AGENT FOR A SAAS PRODUCT

const graph = createGraph();

const res = await graph.invoke({
  message: {
    sender: "mark@meta.com",
    message: "Vizzn, I need 50 tons of 16 mil on job site abc by Wednesday.",
  },
});

console.log(res);

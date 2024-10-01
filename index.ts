// "@langchain/openai" "@langchain/langgraph" "@langchain/core"
// in .env OPENAI_API_KEY=

import { createGraph } from "./graph";

// INBOX AGENT FOR A SAAS PRODUCT

const graph = createGraph();

const res = await graph.invoke({
  message: {
    sender: "mark@meta.com",
    message: "how do i connect with notion?",
  },
});

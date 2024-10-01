// "@langchain/langgraph" "@langchain/core"

import { Annotation, StateGraph } from "@langchain/langgraph";

const state = Annotation.Root({
  message: Annotation<string>(),
  pastMessages: Annotation<string[]>({
    default: () => [],
    reducer: (currValue, updateValue) => currValue.concat(updateValue),
  }),
});

const workflow = new StateGraph(state)
  .addNode("node-1", (state) => {
    return {
      message: "Hello from node 1",
      pastMessages: [],
    };
  })
  .addNode("node-2", (state) => {
    return {
      message: "Hello from node 2",
      pastMessages: [state.message],
    };
  })
  .addNode("node-3", (state) => {
    return {
      message: "Hello from node 3",
      pastMessages: [state.message],
    };
  })
  .addEdge("__start__", "node-1")
  .addConditionalEdges("node-1", (state) => {
    if (state.pastMessages.length !== 1) {
      return "node-2";
    }
    return "node-3";
  })
  .addEdge("node-3", "node-2")
  .addEdge("node-2", "__end__");

const graph = workflow.compile();

Bun.write("mygraph.png", await graph.getGraph().drawMermaidPng());

const res = await graph.invoke({});

console.log(res);

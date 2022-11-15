import { FastifyPluginAsync } from "fastify";
import { IssuesService } from "../services/issues-service";
const issuesService: IssuesService = IssuesService.getInstance();
const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {
    return { root: true };
  });
  fastify.get("/issues", async function (request, reply) {
    return { issues: await issuesService.getIssues() };
  });
  fastify.get("/issues/:id", async function (request, reply) {
    const { id } = request.params as { id: number };
    console.log(id);
    return { issue: await issuesService.getIssue(id) };
  });

  fastify.post("/issues", async function (request, reply) {
    const { title, description } = request.body as {
      title: string;
      description: string;
    };
    return { issue: await issuesService.createIssue(title, description) };
  });
};

export default root;

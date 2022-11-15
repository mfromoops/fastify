import { PrismaClient } from "@prisma/client";

export class IssuesService {
  private static instance: IssuesService;
  public static getInstance(): IssuesService {
    if (!IssuesService.instance) {
      IssuesService.instance = new IssuesService();
    }
    return IssuesService.instance;
  }
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getIssues() {
    return await this.prisma.issue.findMany();
  }

  async getIssue(id: number) {
    return await this.prisma.issue.findUnique({
      where: {
        id,
      },
    });
  }

  async createIssue(title: string, description: string) {
    return await this.prisma.issue.create({
      data: {
        title,
        description,
        status: "OPEN",
      },
    });
  }

  async updateIssue(id: number, title: string, description: string) {
    return await this.prisma.issue.update({
      where: {
        id,
      },
      data: {
        title,
        description,
      },
    });
  }

  async deleteIssue(id: number) {
    return await this.prisma.issue.delete({
      where: {
        id,
      },
    });
  }

  async closeIssue(id: number) {
    return await this.prisma.issue.update({
      where: {
        id,
      },
      data: {
        status: "CLOSED",
      },
    });
  }

  async reopenIssue(id: number) {
    return await this.prisma.issue.update({
      where: {
        id,
      },
      data: {
        status: "OPEN",
      },
    });
  }

  async getComments(id: number) {
    return await this.prisma.comment.findMany({
      where: {
        issueId: id,
      },
    });
  }

  async createComment(id: number, text: string) {
    return await this.prisma.comment.create({
      data: {
        text,
        issueId: id,
      },
    });
  }

  async deleteComment(id: number) {
    return await this.prisma.comment.delete({
      where: {
        id,
      },
    });
  }
}

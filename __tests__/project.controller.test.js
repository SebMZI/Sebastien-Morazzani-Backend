import projectModel from "../models/project.model";
import {
  fetchProjects,
  fetchProjectById,
  createProject,
} from "../controllers/project.controller";

jest.mock("../models/project.model");

describe("fetchProjects", () => {
  // Initialize variables
  let req;
  let res;
  let next;

  //    Mock the Project model
  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should throw an error if no projects are found", async () => {
    projectModel.find.mockResolvedValue([]);
    await fetchProjects(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "No projects found" });
  });

  it("should return projects if any", async () => {
    const fakeProjects = [
      {
        id: "41224d776a326fb40f000001",
        name: "Test Project",
        description: "This is a test project",
      },
      {
        id: "41224d776a326fb40f000002",
        name: "Test Project",
        description: "This is a test project",
      },
    ];

    projectModel.find.mockResolvedValue(fakeProjects);

    await fetchProjects(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Projects fetched successfully",
      data: fakeProjects,
    });
  });
});

describe("Fetch a project by its id", () => {
  let res;
  let next;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("throws an error if no projectId is provided", async () => {
    const req = { params: {} };

    await fetchProjectById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Project ID is required" });
  });

  it("throws an error if the provided ID is invalid", async () => {
    const req = { params: { id: "10" } };

    await fetchProjectById(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Project ID is invalid" });
  });

  it("throws an error if project is not found", async () => {
    const req = { params: { id: "41224d776a326fb40f000001" } };

    projectModel.findById.mockResolvedValue(null);

    await fetchProjectById(req, res, next);

    expect(projectModel.findById).toHaveBeenCalledWith(
      "41224d776a326fb40f000001"
    );
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Project not found" });
  });

  it("fetches the project successfully if exists", async () => {
    const req = { params: { id: "41224d776a326fb40f000001" } };
    const fakeProject = {
      _id: "41224d776a326fb40f000001",
      name: "Test Project",
    };

    projectModel.findById.mockResolvedValue(fakeProject);

    await fetchProjectById(req, res, next);

    expect(projectModel.findById).toHaveBeenCalledWith(
      "41224d776a326fb40f000001"
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Project fetched successfully",
      data: fakeProject,
    });
  });
});

describe("create a project", () => {
  // Initialize variables
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("throws an error if a required body field is missing", async () => {
    // Missing client name
    req.body = {
      projectName: "Test Project",
      description: "This is a test project",
      year: 2023,
      categories: ["category1"],
      linkToProject: "http://example.com",
      images: ["image1.jpg"],
      stack: ["Node.js", "Express"],
    };
    await createProject(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "All fields are required" });
  });

  it("throws an error if the request file is missing", async () => {
    req.body = {
      projectName: "Test Project",
      description: "This is a test project",
      year: 2023,
      categories: ["category1"],
      linkToProject: "http://example.com",
      images: ["image1.jpg"],
      stack: ["Node.js", "Express"],
      clientName: "Test Client",
    };

    req.files = [];

    await createProject(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "At least one image is required",
    });
  });
});

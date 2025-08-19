const Project = require("../models/project.model");
const { fetchProjects } = require("../controllers/project.controller");

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
    Project.find.mockResolvedValue([]);
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

    Project.find.mockResolvedValue(fakeProjects);

    await fetchProjects(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Projects fetched successfully",
      data: fakeProjects,
    });
  });
});

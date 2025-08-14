const Project = require("../models/project.model");
const { fetchProjectById } = require("../controllers/project.controller");

jest.mock("../models/project.model");

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

    Project.findById.mockResolvedValue(null);

    await fetchProjectById(req, res, next);

    expect(Project.findById).toHaveBeenCalledWith("41224d776a326fb40f000001");
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Project not found" });
  });

  it("fetches the project successfully if exists", async () => {
    const req = { params: { id: "41224d776a326fb40f000001" } };
    const fakeProject = {
      _id: "41224d776a326fb40f000001",
      name: "Test Project",
    };

    Project.findById.mockResolvedValue(fakeProject);

    await fetchProjectById(req, res, next);

    expect(Project.findById).toHaveBeenCalledWith("41224d776a326fb40f000001");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Project fetched successfully",
      data: fakeProject,
    });
  });
});

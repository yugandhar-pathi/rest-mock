const path = require("path");
const { execSync, spawn } = require("child_process");

const createTestCafe = require("testcafe");

const srcPath = path.join(__dirname, "./tests/acceptance/**/*.js");

let runner = null;
let testcafe = null;

// 1. Build app
execSync("npm run build", { stdio: "inherit" });

// 2. Run mock server - in seperate thread
const mockServer = spawn("npm", ["run", "startMockServer"], {
  cwd: process.env.PWD,
  stdio: "inherit",
  env: process.env
});

// 3. Run Test cafe
createTestCafe("localhost", 1337, 1338)
  .then(tc => {
    testcafe = tc;
    runner = tc.createRunner();
  })
  .then(() => {
    return runner
      .src(srcPath)
      .run()
      .then(() => {
        mockServer.kill();
        testcafe.close();
      })
      .catch(error => {
        console.log("catch error case", error);
        mockServer.kill();
        testcafe.close();
      });
  });

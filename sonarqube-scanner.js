const scanner = require("sonarqube-scanner");
scanner(
  {
    serverUrl: "http://localhost:9000",
    options: {
      "sonar.exclusions": "**/*.test.jsx,**/build/**",
      "sonar.tests": "./src",
      "sonar.test.inclusions": "**/*.test.jsx,**/*.test.js",
      "sonar.typescript.lcov.reportPaths": "coverage/lcov.info"
    },
  },
  () => process.exit()
);

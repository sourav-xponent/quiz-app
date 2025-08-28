// seed.js
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting comprehensive seed...");

  // Create Users
  const hashedPassword = await bcrypt.hash("password123", 10);
  const adminPassword = await bcrypt.hash("admin123", 10);

  // Create Admin Users
  const admin = await prisma.user.create({
    data: {
      id: "550e8400-e29b-41d4-a716-446655440001",
      name: "Admin User",
      email: "admin@test.com",
      password: adminPassword,
      role: "ADMIN",
      emailVerified: new Date(),
    },
  });

  const hrAdmin = await prisma.user.create({
    data: {
      id: "admin-hr-001",
      name: "HR Admin",
      email: "hr@test.com",
      password: hashedPassword,
      role: "ADMIN",
      emailVerified: new Date(),
    },
  });

  const techAdmin = await prisma.user.create({
    data: {
      id: "admin-tech-001",
      name: "Tech Lead Admin",
      email: "techlead@test.com",
      password: hashedPassword,
      role: "ADMIN",
      emailVerified: new Date(),
    },
  });

  // Create Candidates
  const candidates = [];

  // Original candidates
  const candidate1 = await prisma.user.create({
    data: {
      id: "550e8400-e29b-41d4-a716-446655440002",
      name: "John Doe",
      email: "john@test.com",
      password: hashedPassword,
      role: "CANDIDATE",
      emailVerified: new Date(),
    },
  });
  candidates.push(candidate1);

  const candidate2 = await prisma.user.create({
    data: {
      id: "550e8400-e29b-41d4-a716-446655440003",
      name: "Jane Smith",
      email: "jane@test.com",
      password: hashedPassword,
      role: "CANDIDATE",
      emailVerified: new Date(),
    },
  });
  candidates.push(candidate2);

  const candidate3 = await prisma.user.create({
    data: {
      id: "550e8400-e29b-41d4-a716-446655440004",
      name: "Mike Johnson",
      email: "mike@test.com",
      password: hashedPassword,
      role: "CANDIDATE",
      emailVerified: new Date(),
    },
  });
  candidates.push(candidate3);

  // Additional candidates for testing
  for (let i = 5; i <= 20; i++) {
    const candidate = await prisma.user.create({
      data: {
        id: `candidate-${i.toString().padStart(3, "0")}`,
        name: `Candidate ${i}`,
        email: `candidate${i}@test.com`,
        password: hashedPassword,
        role: "CANDIDATE",
        emailVerified: new Date(),
      },
    });
    candidates.push(candidate);
  }

  // Create Verification Tokens
  await prisma.verificationToken.create({
    data: {
      email: "newuser@test.com",
      token: "verify_token_123456",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  });

  for (let i = 1; i <= 5; i++) {
    await prisma.verificationToken.create({
      data: {
        email: `newcandidate${i}@test.com`,
        token: `verify_token_${Date.now()}_${i}`,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });
  }

  // Create Password Reset Tokens
  await prisma.passwordResetToken.create({
    data: {
      email: "john@test.com",
      token: "reset_token_789012",
      expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
    },
  });

  // Create Tests
  const jsTest = await prisma.test.create({
    data: {
      id: "550e8400-e29b-41d4-a716-446655440010",
      name: "JavaScript Developer Assessment",
      position: "Frontend Developer",
      date: new Date("2024-12-01T10:00:00Z"),
      durationMin: 90,
    },
  });

  const pythonTest = await prisma.test.create({
    data: {
      id: "550e8400-e29b-41d4-a716-446655440011",
      name: "Python Backend Developer Test",
      position: "Backend Developer",
      date: new Date("2024-12-05T14:00:00Z"),
      durationMin: 120,
    },
  });

  const designTest = await prisma.test.create({
    data: {
      id: "550e8400-e29b-41d4-a716-446655440012",
      name: "UX/UI Designer Assessment",
      position: "UX/UI Designer",
      date: new Date("2024-12-10T09:00:00Z"),
      durationMin: 60,
    },
  });

  const reactTest = await prisma.test.create({
    data: {
      id: "test-mgmt-001",
      name: "React Developer Assessment",
      position: "React Developer",
      date: new Date("2024-12-15T09:00:00Z"),
      durationMin: 75,
    },
  });

  const nodeTest = await prisma.test.create({
    data: {
      id: "test-mgmt-002",
      name: "Node.js Backend Test",
      position: "Backend Engineer",
      date: new Date("2024-12-20T14:00:00Z"),
      durationMin: 90,
    },
  });

  const fullStackTest = await prisma.test.create({
    data: {
      id: "test-mgmt-003",
      name: "Full Stack Developer Test",
      position: "Full Stack Developer",
      date: new Date("2024-12-25T10:00:00Z"),
      durationMin: 150,
    },
  });

  const devOpsTest = await prisma.test.create({
    data: {
      id: "test-mgmt-004",
      name: "DevOps Engineer Assessment",
      position: "DevOps Engineer",
      date: new Date("2024-12-28T11:00:00Z"),
      durationMin: 120,
    },
  });

  const dataTest = await prisma.test.create({
    data: {
      id: "test-mgmt-005",
      name: "Data Analyst Test",
      position: "Data Analyst",
      date: new Date("2025-01-05T09:00:00Z"),
      durationMin: 100,
    },
  });

  // Create Groups for JavaScript Test
  const jsBasicsGroup = await prisma.group.create({
    data: {
      id: "550e8400-e29b-41d4-a716-446655440020",
      name: "JavaScript Fundamentals",
      testId: jsTest.id,
    },
  });

  const jsAdvancedGroup = await prisma.group.create({
    data: {
      id: "550e8400-e29b-41d4-a716-446655440021",
      name: "Advanced JavaScript",
      testId: jsTest.id,
    },
  });

  const jsCodingGroup = await prisma.group.create({
    data: {
      id: "550e8400-e29b-41d4-a716-446655440022",
      name: "Coding Problems",
      testId: jsTest.id,
    },
  });

  // Create Groups for Python Test
  const pythonBasicsGroup = await prisma.group.create({
    data: {
      id: "550e8400-e29b-41d4-a716-446655440023",
      name: "Python Fundamentals",
      testId: pythonTest.id,
    },
  });

  const pythonFrameworksGroup = await prisma.group.create({
    data: {
      id: "550e8400-e29b-41d4-a716-446655440024",
      name: "Web Frameworks",
      testId: pythonTest.id,
    },
  });

  // Create Groups for Design Test
  const designPrinciplesGroup = await prisma.group.create({
    data: {
      id: "550e8400-e29b-41d4-a716-446655440025",
      name: "Design Principles",
      testId: designTest.id,
    },
  });

  // Create Groups for React Test
  const reactBasicsGroup = await prisma.group.create({
    data: {
      id: "group-react-001",
      name: "React Basics",
      testId: reactTest.id,
    },
  });

  const reactHooksGroup = await prisma.group.create({
    data: {
      id: "group-react-002",
      name: "React Hooks",
      testId: reactTest.id,
    },
  });

  const reactStateGroup = await prisma.group.create({
    data: {
      id: "group-react-003",
      name: "State Management",
      testId: reactTest.id,
    },
  });

  // Create Groups for Node.js Test
  const nodeCoreGroup = await prisma.group.create({
    data: {
      id: "group-node-001",
      name: "Node.js Core",
      testId: nodeTest.id,
    },
  });

  const nodeExpressGroup = await prisma.group.create({
    data: {
      id: "group-node-002",
      name: "Express.js",
      testId: nodeTest.id,
    },
  });

  // Create Groups for Full Stack Test
  const fullStackFrontGroup = await prisma.group.create({
    data: {
      id: "group-fullstack-001",
      name: "Frontend Technologies",
      testId: fullStackTest.id,
    },
  });

  const fullStackBackGroup = await prisma.group.create({
    data: {
      id: "group-fullstack-002",
      name: "Backend Technologies",
      testId: fullStackTest.id,
    },
  });

  const fullStackSystemGroup = await prisma.group.create({
    data: {
      id: "group-fullstack-003",
      name: "System Design",
      testId: fullStackTest.id,
    },
  });

  // Create Groups for DevOps Test
  const devOpsCIGroup = await prisma.group.create({
    data: {
      id: "group-devops-001",
      name: "CI/CD & Automation",
      testId: devOpsTest.id,
    },
  });

  // Create Groups for Data Test
  const dataSQLGroup = await prisma.group.create({
    data: {
      id: "group-data-001",
      name: "SQL & Database",
      testId: dataTest.id,
    },
  });

  const dataPythonGroup = await prisma.group.create({
    data: {
      id: "group-data-002",
      name: "Python for Data Analysis",
      testId: dataTest.id,
    },
  });

  // Create Questions for JavaScript Test
  const jsQuestion1 = await prisma.question.create({
    data: {
      id: "550e8400-e29b-41d4-a716-446655440030",
      text: "What is the output of: console.log(typeof null)?",
      type: "MCQ",
      score: 5,
      correct: 2,
      groupId: jsBasicsGroup.id,
      choices: {
        create: [
          { text: "null", index: 0 },
          { text: "undefined", index: 1 },
          { text: "object", index: 2 },
          { text: "string", index: 3 },
        ],
      },
    },
  });

  const jsQuestion2 = await prisma.question.create({
    data: {
      id: "550e8400-e29b-41d4-a716-446655440031",
      text: "Which method is used to add an element to the end of an array?",
      type: "MCQ",
      score: 3,
      correct: 1,
      groupId: jsBasicsGroup.id,
      choices: {
        create: [
          { text: "append()", index: 0 },
          { text: "push()", index: 1 },
          { text: "add()", index: 2 },
          { text: "insert()", index: 3 },
        ],
      },
    },
  });

  const jsQuestion3 = await prisma.question.create({
    data: {
      id: "550e8400-e29b-41d4-a716-446655440032",
      text: "Explain the concept of closures in JavaScript with an example.",
      type: "TEXT",
      score: 10,
      groupId: jsAdvancedGroup.id,
    },
  });

  const jsQuestion4 = await prisma.question.create({
    data: {
      id: "550e8400-e29b-41d4-a716-446655440033",
      text: "Write a function that returns the factorial of a number using recursion.",
      type: "TEXT",
      score: 15,
      groupId: jsCodingGroup.id,
    },
  });

  // Create Questions for Python Test
  const pythonQuestion1 = await prisma.question.create({
    data: {
      id: "550e8400-e29b-41d4-a716-446655440034",
      text: "What is the difference between list and tuple in Python?",
      type: "MCQ",
      score: 4,
      correct: 0,
      groupId: pythonBasicsGroup.id,
      choices: {
        create: [
          { text: "Lists are mutable, tuples are immutable", index: 0 },
          { text: "Lists are immutable, tuples are mutable", index: 1 },
          { text: "Both are mutable", index: 2 },
          { text: "Both are immutable", index: 3 },
        ],
      },
    },
  });

  const pythonQuestion2 = await prisma.question.create({
    data: {
      id: "550e8400-e29b-41d4-a716-446655440035",
      text: "Explain Django ORM and write a simple model example.",
      type: "TEXT",
      score: 12,
      groupId: pythonFrameworksGroup.id,
    },
  });

  // Create Questions for Design Test
  const designQuestion1 = await prisma.question.create({
    data: {
      id: "550e8400-e29b-41d4-a716-446655440036",
      text: "What are the key principles of good UI design?",
      type: "TEXT",
      score: 8,
      groupId: designPrinciplesGroup.id,
    },
  });

  // Create Questions for React Test
  const reactQ1 = await prisma.question.create({
    data: {
      id: "q-react-001",
      text: "What is the purpose of useEffect hook?",
      type: "MCQ",
      score: 5,
      correct: 1,
      groupId: reactHooksGroup.id,
      choices: {
        create: [
          { text: "To manage component state", index: 0 },
          { text: "To perform side effects", index: 1 },
          { text: "To create context", index: 2 },
          { text: "To memoize values", index: 3 },
        ],
      },
    },
  });

  const reactQ2 = await prisma.question.create({
    data: {
      id: "q-react-002",
      text: "Explain the difference between controlled and uncontrolled components.",
      type: "TEXT",
      score: 10,
      groupId: reactBasicsGroup.id,
    },
  });

  const reactQ3 = await prisma.question.create({
    data: {
      id: "q-react-003",
      text: "Which hook is used for performance optimization?",
      type: "MCQ",
      score: 4,
      correct: 2,
      groupId: reactHooksGroup.id,
      choices: {
        create: [
          { text: "useState", index: 0 },
          { text: "useEffect", index: 1 },
          { text: "useMemo", index: 2 },
          { text: "useContext", index: 3 },
        ],
      },
    },
  });

  // Create Questions for Node.js Test
  const nodeQ1 = await prisma.question.create({
    data: {
      id: "q-node-001",
      text: "What is the event loop in Node.js?",
      type: "TEXT",
      score: 12,
      groupId: nodeCoreGroup.id,
    },
  });

  const nodeQ2 = await prisma.question.create({
    data: {
      id: "q-node-002",
      text: "Which module is used for file system operations?",
      type: "MCQ",
      score: 3,
      correct: 1,
      groupId: nodeCoreGroup.id,
      choices: {
        create: [
          { text: "http", index: 0 },
          { text: "fs", index: 1 },
          { text: "path", index: 2 },
          { text: "url", index: 3 },
        ],
      },
    },
  });

  // Create Questions for Full Stack Test
  const fullstackQ1 = await prisma.question.create({
    data: {
      id: "q-fullstack-001",
      text: "Design a URL shortener system. Include database schema and API endpoints.",
      type: "TEXT",
      score: 20,
      groupId: fullStackSystemGroup.id,
    },
  });

  const fullstackQ2 = await prisma.question.create({
    data: {
      id: "q-text-001",
      text: "Explain the concept of microservices architecture.",
      type: "TEXT",
      score: 15,
      groupId: fullStackBackGroup.id,
    },
  });

  const fullstackQ3 = await prisma.question.create({
    data: {
      id: "q-text-002",
      text: "What are the SOLID principles in software development?",
      type: "TEXT",
      score: 12,
      groupId: fullStackBackGroup.id,
    },
  });

  // Create Questions for DevOps Test
  const devopsQ1 = await prisma.question.create({
    data: {
      id: "q-devops-001",
      text: "What is the difference between Docker and Kubernetes?",
      type: "TEXT",
      score: 10,
      groupId: devOpsCIGroup.id,
    },
  });

  const devopsQ2 = await prisma.question.create({
    data: {
      id: "q-devops-002",
      text: "Which CI/CD tool is developed by GitLab?",
      type: "MCQ",
      score: 3,
      correct: 2,
      groupId: devOpsCIGroup.id,
      choices: {
        create: [
          { text: "Jenkins", index: 0 },
          { text: "CircleCI", index: 1 },
          { text: "GitLab CI", index: 2 },
          { text: "Travis CI", index: 3 },
        ],
      },
    },
  });

  // Create Questions for Data Analyst Test
  const dataQ1 = await prisma.question.create({
    data: {
      id: "q-data-001",
      text: "Write a SQL query to find the second highest salary from an Employee table.",
      type: "TEXT",
      score: 15,
      groupId: dataSQLGroup.id,
    },
  });

  const dataQ2 = await prisma.question.create({
    data: {
      id: "q-data-002",
      text: "Which Python library is primarily used for data manipulation?",
      type: "MCQ",
      score: 4,
      correct: 1,
      groupId: dataPythonGroup.id,
      choices: {
        create: [
          { text: "NumPy", index: 0 },
          { text: "Pandas", index: 1 },
          { text: "Matplotlib", index: 2 },
          { text: "Scikit-learn", index: 3 },
        ],
      },
    },
  });

  // Create Test Questions (linking questions to tests with order)
  await prisma.testQuestion.createMany({
    data: [
      // JavaScript Test
      { testId: jsTest.id, questionId: jsQuestion1.id, order: 1 },
      { testId: jsTest.id, questionId: jsQuestion2.id, order: 2 },
      { testId: jsTest.id, questionId: jsQuestion3.id, order: 3 },
      { testId: jsTest.id, questionId: jsQuestion4.id, order: 4 },
      // Python Test
      { testId: pythonTest.id, questionId: pythonQuestion1.id, order: 1 },
      { testId: pythonTest.id, questionId: pythonQuestion2.id, order: 2 },
      // Design Test
      { testId: designTest.id, questionId: designQuestion1.id, order: 1 },
      // React Test
      { testId: reactTest.id, questionId: reactQ1.id, order: 1 },
      { testId: reactTest.id, questionId: reactQ2.id, order: 2 },
      { testId: reactTest.id, questionId: reactQ3.id, order: 3 },
      // Node.js Test
      { testId: nodeTest.id, questionId: nodeQ1.id, order: 1 },
      { testId: nodeTest.id, questionId: nodeQ2.id, order: 2 },
      // Full Stack Test
      { testId: fullStackTest.id, questionId: fullstackQ1.id, order: 1 },
      { testId: fullStackTest.id, questionId: fullstackQ2.id, order: 2 },
      { testId: fullStackTest.id, questionId: fullstackQ3.id, order: 3 },
      // DevOps Test
      { testId: devOpsTest.id, questionId: devopsQ1.id, order: 1 },
      { testId: devOpsTest.id, questionId: devopsQ2.id, order: 2 },
      // Data Analyst Test
      { testId: dataTest.id, questionId: dataQ1.id, order: 1 },
      { testId: dataTest.id, questionId: dataQ2.id, order: 2 },
    ],
  });

  // Create Assigned Tests
  await prisma.assignedTest.createMany({
    data: [
      // Original assignments
      {
        userId: candidate1.id,
        testId: jsTest.id,
        assignedAt: new Date(),
        loginToken: "login_token_john_js",
        credentialsSent: true,
      },
      {
        userId: candidate2.id,
        testId: pythonTest.id,
        assignedAt: new Date(),
        loginToken: "login_token_jane_python",
        credentialsSent: true,
      },
      {
        userId: candidate3.id,
        testId: designTest.id,
        assignedAt: new Date(),
        loginToken: "login_token_mike_design",
        credentialsSent: false,
      },
      {
        userId: candidate1.id,
        testId: pythonTest.id,
        assignedAt: new Date(),
        loginToken: "login_token_john_python",
        credentialsSent: true,
      },
      // New assignments for React test
      {
        userId: candidates[3].id,
        testId: reactTest.id,
        assignedAt: new Date(),
        loginToken: `token-react-${candidates[3].id}`,
        credentialsSent: true,
      },
      {
        userId: candidates[4].id,
        testId: reactTest.id,
        assignedAt: new Date(),
        loginToken: `token-react-${candidates[4].id}`,
        credentialsSent: true,
      },
      {
        userId: candidates[5].id,
        testId: reactTest.id,
        assignedAt: new Date(),
        loginToken: `token-react-${candidates[5].id}`,
        credentialsSent: true,
      },
      // Assignments for Node.js test
      {
        userId: candidates[6].id,
        testId: nodeTest.id,
        assignedAt: new Date(),
        loginToken: `token-node-${candidates[6].id}`,
        credentialsSent: false,
      },
      {
        userId: candidates[7].id,
        testId: nodeTest.id,
        assignedAt: new Date(),
        loginToken: `token-node-${candidates[7].id}`,
        credentialsSent: false,
      },
      // Full Stack test assignments
      {
        userId: candidates[8].id,
        testId: fullStackTest.id,
        assignedAt: new Date(),
        loginToken: `token-fullstack-${candidates[8].id}`,
        credentialsSent: true,
      },
      {
        userId: candidates[9].id,
        testId: fullStackTest.id,
        assignedAt: new Date(),
        loginToken: `token-fullstack-${candidates[9].id}`,
        credentialsSent: true,
      },
      // DevOps test assignments
      {
        userId: candidates[10].id,
        testId: devOpsTest.id,
        assignedAt: new Date(),
        loginToken: `token-devops-${candidates[10].id}`,
        credentialsSent: true,
      },
      // Data Analyst test assignments
      {
        userId: candidates[11].id,
        testId: dataTest.id,
        assignedAt: new Date(),
        loginToken: `token-data-${candidates[11].id}`,
        credentialsSent: true,
      },
      {
        userId: candidates[12].id,
        testId: dataTest.id,
        assignedAt: new Date(),
        loginToken: `token-data-${candidates[12].id}`,
        credentialsSent: true,
      },
    ],
  });

  // Create User Test Sessions
  // Original completed session
  const johnJsSession = await prisma.userTestSession.create({
    data: {
      id: "550e8400-e29b-41d4-a716-446655440040",
      userId: candidate1.id,
      testId: jsTest.id,
      startedAt: new Date("2024-12-01T10:05:00Z"),
      endedAt: new Date("2024-12-01T11:25:00Z"),
      submitted: true,
      totalScore: 28,
    },
  });

  // Original in-progress session
  const janeInProgressSession = await prisma.userTestSession.create({
    data: {
      id: "550e8400-e29b-41d4-a716-446655440041",
      userId: candidate2.id,
      testId: pythonTest.id,
      startedAt: new Date("2024-12-05T14:10:00Z"),
      submitted: false,
      totalScore: 0,
    },
  });

  // Completed React test session
  const completedReactSession = await prisma.userTestSession.create({
    data: {
      id: "session-completed-001",
      userId: candidates[3].id,
      testId: reactTest.id,
      startedAt: new Date("2024-12-15T09:05:00Z"),
      endedAt: new Date("2024-12-15T10:15:00Z"),
      submitted: true,
      totalScore: 19,
    },
  });

  // In-progress React session
  const inProgressReactSession = await prisma.userTestSession.create({
    data: {
      id: "session-progress-001",
      userId: candidates[4].id,
      testId: reactTest.id,
      startedAt: new Date("2024-12-15T09:30:00Z"),
      submitted: false,
      totalScore: 0,
    },
  });

  // Session about to expire
  const expiringSession = await prisma.userTestSession.create({
    data: {
      id: "session-expiring-001",
      userId: candidates[5].id,
      testId: reactTest.id,
      startedAt: new Date(Date.now() - 70 * 60 * 1000), // 70 minutes ago
      submitted: false,
      totalScore: 0,
    },
  });

  // Sessions for grading
  const gradingSession1 = await prisma.userTestSession.create({
    data: {
      id: "session-grading-001",
      userId: candidates[6].id,
      testId: nodeTest.id,
      startedAt: new Date("2024-12-20T14:00:00Z"),
      endedAt: new Date("2024-12-20T15:20:00Z"),
      submitted: true,
      totalScore: 3, // Only MCQ scored
    },
  });

  const gradingSession2 = await prisma.userTestSession.create({
    data: {
      id: "session-grading-002",
      userId: candidates[8].id,
      testId: fullStackTest.id,
      startedAt: new Date("2024-12-25T10:00:00Z"),
      endedAt: new Date("2024-12-25T12:00:00Z"),
      submitted: true,
      totalScore: 0, // No auto-scoring
    },
  });

  // Create User Answers
  // Answers for John's completed JavaScript session
  await prisma.userAnswer.createMany({
    data: [
      {
        testSessionId: johnJsSession.id,
        questionId: jsQuestion1.id,
        response: "2", // Correct answer (object)
        autoScore: 5,
      },
      {
        testSessionId: johnJsSession.id,
        questionId: jsQuestion2.id,
        response: "1", // Correct answer (push())
        autoScore: 3,
      },
      {
        testSessionId: johnJsSession.id,
        questionId: jsQuestion3.id,
        response:
          "A closure is a function that has access to variables in its outer scope even after the outer function has returned. Example: function outer() { let x = 10; return function inner() { console.log(x); }; }",
        givenScore: 8, // Manual score
      },
      {
        testSessionId: johnJsSession.id,
        questionId: jsQuestion4.id,
        response:
          "function factorial(n) { if (n <= 1) return 1; return n * factorial(n - 1); }",
        givenScore: 12, // Manual score
      },
    ],
  });

  // Answers for Jane's in  // Answers for Jane's in-progress Python session
  await prisma.userAnswer.create({
    data: {
      testSessionId: janeInProgressSession.id,
      questionId: pythonQuestion1.id,
      response: "0", // Correct answer
      autoScore: 4,
    },
  });

  // Answers for completed React session
  await prisma.userAnswer.createMany({
    data: [
      {
        testSessionId: completedReactSession.id,
        questionId: reactQ1.id,
        response: "1", // Correct
        autoScore: 5,
      },
      {
        testSessionId: completedReactSession.id,
        questionId: reactQ2.id,
        response:
          "Controlled components are form elements whose values are controlled by React state...",
        givenScore: 8,
      },
      {
        testSessionId: completedReactSession.id,
        questionId: reactQ3.id,
        response: "2", // Correct
        autoScore: 4,
      },
    ],
  });

  // Partial answers for in-progress React session
  await prisma.userAnswer.create({
    data: {
      testSessionId: inProgressReactSession.id,
      questionId: reactQ1.id,
      response: "0", // Wrong answer
      autoScore: 0,
    },
  });

  // Answers needing grading for Node.js session
  await prisma.userAnswer.createMany({
    data: [
      {
        testSessionId: gradingSession1.id,
        questionId: nodeQ1.id,
        response:
          "The event loop is a mechanism that allows Node.js to perform non-blocking I/O operations...",
        givenScore: null, // Pending grading
      },
      {
        testSessionId: gradingSession1.id,
        questionId: nodeQ2.id,
        response: "1", // Correct
        autoScore: 3,
      },
    ],
  });

  // Answers for Full Stack session needing grading
  await prisma.userAnswer.createMany({
    data: [
      {
        id: "batch-answer-001",
        testSessionId: gradingSession2.id,
        questionId: fullstackQ1.id,
        response:
          "Database Schema:\n- urls table: id, short_code, long_url, created_at\n- analytics table: id, url_id, accessed_at, ip_address\n\nAPI Endpoints:\n- POST /shorten\n- GET /:code\n- GET /analytics/:code",
        givenScore: null,
      },
      {
        id: "batch-answer-002",
        testSessionId: gradingSession2.id,
        questionId: fullstackQ2.id,
        response:
          "Microservices architecture is an approach to building applications as a collection of small, autonomous services...",
        givenScore: null,
      },
      {
        id: "batch-answer-003",
        testSessionId: gradingSession2.id,
        questionId: fullstackQ3.id,
        response:
          "SOLID principles are: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion...",
        givenScore: null,
      },
    ],
  });

  // Create test history for candidates (Module 9)
  await prisma.userTestSession.createMany({
    data: [
      {
        id: "history-001",
        userId: candidate1.id,
        testId: reactTest.id,
        startedAt: new Date("2024-11-15T10:00:00Z"),
        endedAt: new Date("2024-11-15T11:10:00Z"),
        submitted: true,
        totalScore: 17,
      },
      {
        id: "history-002",
        userId: candidate1.id,
        testId: fullStackTest.id,
        startedAt: new Date("2024-11-20T14:00:00Z"),
        endedAt: new Date("2024-11-20T16:20:00Z"),
        submitted: true,
        totalScore: 18,
      },
      {
        id: "history-003",
        userId: candidate2.id,
        testId: reactTest.id,
        startedAt: new Date("2024-11-25T09:00:00Z"),
        endedAt: new Date("2024-11-25T10:05:00Z"),
        submitted: true,
        totalScore: 19,
      },
    ],
  });

  // Create analytics data - multiple completed sessions
  for (let i = 0; i < 10; i++) {
    const analyticsSession = await prisma.userTestSession.create({
      data: {
        id: `analytics-session-${i}`,
        userId: candidates[i].id,
        testId: reactTest.id,
        startedAt: new Date(Date.now() - (20 - i) * 24 * 60 * 60 * 1000),
        endedAt: new Date(
          Date.now() - (20 - i) * 24 * 60 * 60 * 1000 + 70 * 60 * 1000
        ),
        submitted: true,
        totalScore: Math.floor(Math.random() * 15) + 5,
      },
    });

    // Add answers for analytics sessions
    await prisma.userAnswer.createMany({
      data: [
        {
          testSessionId: analyticsSession.id,
          questionId: reactQ1.id,
          response: Math.random() > 0.7 ? "1" : "0",
          autoScore: Math.random() > 0.7 ? 5 : 0,
        },
        {
          testSessionId: analyticsSession.id,
          questionId: reactQ3.id,
          response: Math.random() > 0.6 ? "2" : "1",
          autoScore: Math.random() > 0.6 ? 4 : 0,
        },
      ],
    });
  }

  // Create abandoned sessions
  for (let i = 0; i < 3; i++) {
    await prisma.userTestSession.create({
      data: {
        id: `abandoned-session-${i}`,
        userId: candidates[15 + i].id,
        testId: dataTest.id,
        startedAt: new Date(Date.now() - (10 + i) * 24 * 60 * 60 * 1000),
        submitted: false,
        totalScore: 0,
      },
    });
  }

  // Create OAuth accounts
  await prisma.account.create({
    data: {
      userId: candidate1.id,
      type: "oauth",
      provider: "google",
      providerAccountId: "google_123456789",
      access_token: "ya29.example_access_token",
      refresh_token: "example_refresh_token",
      expires_at: Math.floor(Date.now() / 1000) + 3600,
      token_type: "Bearer",
      scope: "openid email profile",
    },
  });

  for (let i = 0; i < 5; i++) {
    await prisma.account.create({
      data: {
        userId: candidates[i].id,
        type: "oauth",
        provider: i % 2 === 0 ? "google" : "github",
        providerAccountId: `provider_${Date.now()}_${i}`,
        access_token: `access_token_${i}`,
        refresh_token: `refresh_token_${i}`,
        expires_at: Math.floor(Date.now() / 1000) + 3600,
        token_type: "Bearer",
        scope: "openid email profile",
      },
    });
  }

  // Create password reset tokens for some candidates
  for (let i = 0; i < 3; i++) {
    await prisma.passwordResetToken.create({
      data: {
        email: candidates[i].email,
        token: `reset_token_${Date.now()}_${i}`,
        expires: new Date(Date.now() + 60 * 60 * 1000),
      },
    });
  }

  console.log("Comprehensive seed completed successfully!");

  // Log summary
  console.log(`
  Created:
  - 23 Users (3 admins, 20 candidates)
  - 8 Tests (JavaScript, Python, Design, React, Node.js, Full Stack, DevOps, Data Analyst)
  - 18 Groups across all tests
  - 19 Questions (11 MCQ, 8 TEXT)
  - 40+ Choices for MCQ questions
  - 25+ Test Assignments
  - 20+ Test Sessions (various states)
  - 50+ User Answers
  - 6 OAuth Accounts
  - 6 Verification Tokens
  - 4 Password Reset Tokens
  
  Module-specific data:
  - Test Management: 8 tests with different configurations
  - Question Groups: 18 groups organized by test and topic
  - Question Bank: Mix of MCQ and TEXT questions
  - Test Builder: All questions linked to tests with proper ordering
  - Assignment: Individual and bulk assignments
  - Test Taking: Sessions in various states (completed, in-progress, expired, abandoned)
  - Grading: Multiple TEXT answers pending grading
  - Analytics: 10+ completed sessions with varying scores
  - Candidate Portal: Test history for multiple candidates
  `);
}

main()
  .catch((e) => {
    console.error("Error in seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

const express = require("express");
const router = express.Router();
const questionControler = require("../controllers/questionController");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

router.post(
  "/create-question",
  isAuthenticated,
  questionControler.createQuestion
);
router.get("/get-all-questions", questionControler.getAllQuestions);
router.get("/get-question/:id", questionControler.getaQuestion);
router.put(
  "/confirm-question/:id",
  isAuthenticated,
  isAdmin,
  questionControler.confirmQuestionAdmin
);
router.put(
  "/edit-question/:id",
  isAuthenticated,
  questionControler.editQuestionUser
);
router.delete(
  "/delete-question-user/:id",
  isAuthenticated,
  questionControler.deleteQuestionUser
);
router.delete(
  "/delete-question-admin/:id",
  isAuthenticated,
  isAdmin,
  questionControler.deleteQuestionAdmin
);

router.post(
  "/create-comment/:id",
  isAuthenticated,
  questionControler.createComment
);
router.get(
  "/get-comment/:questionId/comment/:commentId",
  isAuthenticated,
  questionControler.getComment
);
router.put(
  "/edit-comment/:questionId/comment/:commentId",
  isAuthenticated,
  questionControler.editComment
);
router.delete(
  "/delete-comment/:questionId/comment/:commentId",
  isAuthenticated,
  questionControler.deleteComment
);
router.put("/updateView/:id", questionControler.updateView);

router.put(
  "/report-comment/:questionId/comment/:commentId",
  isAuthenticated,
  questionControler.reportComment
);
module.exports = router;

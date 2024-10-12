const Homeworks = require("../models/Homeworks.Model");
const StudentsModel = require("../models/Students.Model");
const { AutoCorrect } = require("../utils/AutoCorrect");

const GetHomeworks = async (req, res) => {
  try {
    const { id, grade_id } = req.params.student;
    const homeworks = await Homeworks.getHomeworks(id, grade_id);
    res.json(homeworks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "حدث خطأ ما في الحصول على الواجبات" });
  }
};

const GetAllHomeworks = async (req, res) => {
  try {
    const { id, grade_id } = req.params.student;
    const { limit } = req.params;

    const homeworks = await Homeworks.getAllHomeworks(id, grade_id, limit);
    res.json(homeworks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "حدث خطأ ما في الحصول على الواجبات" });
  }
};

const GetHomeworkQuestions = async (req, res) => {
  try {
    const grade_id = req.params.student.grade_id;
    const student_id = req.params.student.id;
    const { id } = req.params;
    const homework = await new Homeworks({
      id,
      grade_id,
      student_id,
    }).getHomeworkQuestions();

    if (homework instanceof Error) {
      return res.status(500).json({ error: "الواجب تم حله بالفعل" });
    }

    const questions = [];
    for (const question of homework) {
      const q = questions.find((q) => q.id === question.id);
      if (q) {
        if (question.the_choice !== null) {
          q.choices.push(question.the_choice);
          q.inputs = question.number_of_inputs;
        }
      } else {
        questions.push({
          ...question,
          choices: [question.the_choice],
          inputs: question.number_of_inputs,
        });
      }
    }

    res.json(questions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "حدث خطأ ما في الحصول على الاسئلة" });
  }
};

const SubmitHomework = async (req, res) => {
  try {
    const grade_id = req.params.student.grade_id;
    const student_id = req.params.student.id;
    const { id } = req.params;

    const answers = req.body;

    const homework = await new Homeworks({
      id,
      grade_id,
      student_id,
    }).getHomeworkQuestionsForAnswer();

    const questions = [];
    for (const question of homework) {
      const q = questions.find((q) => q.id === question.id);
      if (q) {
        if (q.the_answer !== null) q.the_answer.push(question.the_answer);
      } else {
        if (question.the_answer !== null) {
          questions.push({
            ...question,
            type: "input",
            the_answer: [question.the_answer],
          });
        } else {
          if (question.is_right_choice === 1)
            questions.push({
              ...question,
              type: "choice",
              the_choice: question.the_choice,
            });
        }
      }
    }

    const { result, newAnswers } = AutoCorrect(answers, questions);

    newAnswers.forEach(async (answer) => {
      if (answer.type === "choice") {
        await new Homeworks({
          studentId: student_id,
          questionId: answer.questionId,
          text_answer: null,
          choice_answer: answer.answer.the_answer,
          isRight: answer.answer.isRight,
          id: id,
        }).addAnswers();
      }
      if (answer.type === "input") {
        answer.answer.forEach(async (an) => {
          await new Homeworks({
            studentId: student_id,
            questionId: answer.questionId,
            text_answer: an.the_answer,
            choice_answer: null,
            isRight: an.isRight,
            id: id,
          }).addAnswers();
        });
      }
    });

    await new Homeworks({
      id: id,
      studentId: student_id,
      result: result,
    }).addResult();

    res.json({
      message: "تم تسليم الواجبات بنجاح",
    });
  } catch (error) {
    console.log(error);
  }
};

const Results = async (req, res) => {
  try {
    const { id } = req.params.student;
    const results = await new StudentsModel({ id, type: "homework" }).Results();
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

module.exports = {
  GetHomeworks,
  GetAllHomeworks,
  GetHomeworkQuestions,
  SubmitHomework,
  Results,
};

const { object, string } = require("yup");

// Enums
const EXAMS = [
  "ssc",
  "jsc",
  "ssc_voc",
  "hsc",
  "hsc_voc",
  "hsc_hbm",
  "hsc_dic",
];

const YEARS = Array.from({ length: 16 }, (_, i) => String(2010 + i)); 
// 2010 - 2025

const BOARDS = [
  "barisal",
  "chittagong",
  "comilla",
  "dhaka",
  "dinajpur",
  "jessore",
  "mymensingh",
  "rajshahi",
  "sylhet",
  "madrasah",
  "tec",
  "dibs",
];

const ArgumentValidation = object({
  exam: string()
    .oneOf(EXAMS, `Exam must be one of: ${EXAMS.join(", ")}`)
    .required("Exam is required"),

  year: string()
    .oneOf(YEARS, `Year must be between ${YEARS[0]} and ${YEARS[YEARS.length - 1]}`)
    .required("Year is required"),

  board: string()
    .oneOf(BOARDS, `Board must be one of: ${BOARDS.join(", ")}`)
    .required("Board is required"),

  roll: string()
    .required("Roll is required"),

  registration: string()
    .required("Registration is required"),
});

module.exports = ArgumentValidation;

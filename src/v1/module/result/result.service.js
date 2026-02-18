const cheerio = require("cheerio");
const { chromium } = require("@playwright/test");

const studentResultService = async (payload) => {
  // automatically go and retrive student marksheet as html element
  const htmlResult = await AutomateLogin(payload);

  // retrive student info
  const student_info = await getStudentInfo(htmlResult);

  // retrive student marksheet
  const student_marksheet = await getMarksheet(htmlResult);

  return {
    student: student_info,
    marksheet: student_marksheet,
  };
};

const getMarksheet = async (html) => {
  const $ = await cheerio.load(html); // load html

  const result_table = await $("table.black12").eq(1); // navigate to student marksheet
  const rows = $(result_table).find("tr"); // make a array where the array element is table row

  const markSheet = [];

  rows.each((_i, ele) => {
    const cols = $(ele).find("td"); // make a array of all table data

    if ($(cols[0]).text().trim() === "Code") {
      return; // remove table header
    }

    markSheet.push({
      code: $(cols[0]).text().trim(),
      subject: $(cols[1]).text().trim(),
      grade: $(cols[2]).text().trim(),
    }); // formet student marksheet
  });

  return markSheet; // return a formeted object
};

// @dev getStudentInfo() take a row html as text
const getStudentInfo = async (html) => {
  const $ = await cheerio.load(html); // load html element in cheerio

  const student_informission = $("table.black12").eq(0); // offical website have two table where used same class, so first table contain student info so .eq(0) is means student table

  const student_rows = student_informission.find("tr"); // show all table row as a array

  // @dev `rowData` contains an array of strings (`string[]`) that are readable but not directly usable
  const rowData = [];

  student_rows.each((_i, el) => {
    const student_data = $(el).find("td"); // show all table data as a array

    student_data.each((_i, el) => {
      rowData.push($(el).text().trim()); // trim student data like name, roll, board
    });
  });

  // @dev `organizedData` is an array of structured objects, making it usable and portable across platforms
  const organized_data = [];

  for (let index = 0; index < rowData.length; index += 2) {
    const object = {
      [String(rowData[index]).split(" ").join("_").split("'").join("")]:
        rowData[index + 1],
    };
    // that object is made by logic, if in future they have any update on offical website, that logic may break.

    organized_data.push(object); // push object in array
  }

  return organized_data; // return a formeted object as array
};

// This function visits the official board exam website,
// fills in the required information (exam, year, board, roll, registration),
// solves the captcha,
// navigates to the marksheet page,
// and returns the HTML content of that page.
const AutomateLogin = async (arg) => {
  const BOARD_WEBSITE = "http://www.educationboardresults.gov.bd/";

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(BOARD_WEBSITE); // visit education page

    await page.selectOption("#exam", arg?.exam);
    await page.selectOption("#year", arg?.year);
    await page.selectOption("#board", arg?.board);
    await page.fill("#roll", arg?.roll);
    await page.fill("#reg", arg?.registration);
    // Fill in the website form inputs such as exam, year, board, roll, and registration number.

    const text = await page.locator("text=/\\d+\\s*\\+\\s*\\d+/").innerText(); // find math from website

    const numbers = text.split("+").map((n) => parseInt(n.trim()));
    const sum = numbers.reduce((a, b) => a + b, 0); // calculate the math for solving captcha

    await page.fill("#value_s", sum.toString()); // write correct math answer

    await page.click("text=Submit"); // this will click submit button

    await page.waitForSelector(".black16bold", { state: "visible" }); // wait untill load the marksheet page

    const resultText = await page.content(); // return content as html

    await browser.close();

    return resultText;
  } catch (err) {
    console.error(err);

    await browser.close();
    throw new Error(err);
  }
};

module.exports = {
  studentResultService,
};

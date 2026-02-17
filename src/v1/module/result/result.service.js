const cheerio = require("cheerio");
const {chromium} = require("@playwright/test");

const studentResultService = async (payload) => {
  const htmlResult = await AutomateLogin(payload);

  const student_info = await getStudentInfo(htmlResult);
  const student_marksheet = await getMarksheet(htmlResult);

  return {
    student: student_info,
    marksheet: student_marksheet,
  };
};

const getMarksheet = async (html) => {
  const $ = await cheerio.load(html);

  const result_table = await $("table.black12").eq(1);
  const rows = $(result_table).find("tr");

  const markSheet = [];

  rows.each((_i, ele) => {
    const cols = $(ele).find("td");

    if ($(cols[0]).text().trim() === "Code") {
      return;
    }

    markSheet.push({
      code: $(cols[0]).text().trim(),
      subject: $(cols[1]).text().trim(),
      grade: $(cols[2]).text().trim(),
    });
  });

  return markSheet;
};

// @dev getStudentInfo() take a row html as text
const getStudentInfo = async (html) => {
  const $ = await cheerio.load(html);

  const student_informission = $("table.black12").eq(0);
  const student_rows = student_informission.find("tr");

  // @dev `rowData` contains an array of strings (`string[]`) that are readable but not directly usable
  const rowData = [];

  student_rows.each((i, el) => {
    const student_data = $(el).find("td");

    student_data.each((i, el) => {
      rowData.push($(el).text().trim());
    });
  });

  // @dev `organizedData` is an array of structured objects, making it usable and portable across platforms
  const organized_data = [];

  for (let index = 0; index < rowData.length; index += 2) {
    const object = {
      [String(rowData[index]).split(" ").join("_").split("'").join("")]:
        rowData[index + 1],
    };

    organized_data.push(object);
  }

  return organized_data;
};


const AutomateLogin = async (arg) => {
  const BOARD_WEBSITE = "http://www.educationboardresults.gov.bd/";

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(BOARD_WEBSITE);

    await page.selectOption("#exam", arg?.exam);
    await page.selectOption("#year", arg?.year);
    await page.selectOption("#board", arg?.board);
    await page.fill("#roll", arg?.roll);
    await page.fill("#reg", arg?.registration);

    const text = await page.locator("text=/\\d+\\s*\\+\\s*\\d+/").innerText();

    const numbers = text.split("+").map((n) => parseInt(n.trim()));
    const sum = numbers.reduce((a, b) => a + b, 0);

    await page.fill("#value_s", sum.toString());
    await page.click("text=Submit");
    await page.waitForSelector(".black16bold", { state: "visible" });

    const resultText = await page.content();

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

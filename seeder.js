const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const config = require('config');
const db = config.get('mongoURI');

console.log(config.get('mongoURI'));

const Student = require('./models/Student');
const Lesson = require('./models/Lesson');

// Connect to DB
mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Read JSON files
const students = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/students.json`, 'utf-8')
);

const lessons = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/lessons.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await Student.create(students);
    await Lesson.create(lessons);
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Student.deleteMany();
    await Lesson.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}

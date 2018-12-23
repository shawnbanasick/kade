import grabProjectStatements from "../../../Input/logic/excelLogic/grabProjectStatements";

const parameter1 = [{
    "Statement Num.": "1",
    "Statements": "We accept improvements in status and power of lower class"
}, {
    "Statement Num.": "2",
    "Statements": "All men expected to try to improve selves"
}, {
    "Statement Num.": "3",
    "Statements": "Success in life by a previously deprived person is resented"
}, {
    "Statement Num.": "4",
    "Statements": "Men can expect fair treatment according to merit"
}, {
    "Statement Num.": "5",
    "Statements": "Lower-class not revolutionary"
}, {
    "Statement Num.": "6",
    "Statements": "Political goals relatively moderate, even conservative"
}, {
    "Statement Num.": "7",
    "Statements": "Those born to high place in society should retain it"
}, {
    "Statement Num.": "8",
    "Statements": "Person with wealth deserves place in high society"
}, {
    "Statement Num.": "9",
    "Statements": "We try to eliminate privileged classes"
}, {
    "Statement Num.": "10",
    "Statements": "We accept aristocratic-type titles and other honors"
}, {
    "Statement Num.": "11",
    "Statements": "The government has its secrets, this is generally accepted"
}, {
    "Statement Num.": "12",
    "Statements": "Emphasis on publicity in political matters: no secrets"
}, {
    "Statement Num.": "13",
    "Statements": "Encouraged to think of ourselves as competing for success"
}, {
    "Statement Num.": "14",
    "Statements": "Social status equated with manner of speech"
}, {
    "Statement Num.": "15",
    "Statements": "We take law into our own hands, mob action and vigilantes"
}, {
    "Statement Num.": "16",
    "Statements": "Close ties to Mother Country, as Britain still is for many"
}, {
    "Statement Num.": "17",
    "Statements": "We prefer companionship and helping hand"
}, {
    "Statement Num.": "18",
    "Statements": "Some disdain for acquiring wealth for its own sake"
}, {
    "Statement Num.": "19",
    "Statements": "High value placed on protecting and promoting underdog"
}, {
    "Statement Num.": "20",
    "Statements": "We like the idea of a welfare state"
}, {
    "Statement Num.": "21",
    "Statements": "We value the race for success"
}, {
    "Statement Num.": "22",
    "Statements": "Corrupt means of achieving success are accepted"
}, {
    "Statement Num.": "23",
    "Statements": "One law for the rich, another for the poor"
}, {
    "Statement Num.": "24",
    "Statements": "Lack of respect for the police, and law enforcement"
}, {
    "Statement Num.": "25",
    "Statements": "Trust in police has sunk deeply into our national character"
}, {
    "Statement Num.": "26",
    "Statements": "Worth of a man is judged by what he is, not by education"
}, {
    "Statement Num.": "27",
    "Statements": "Deep respect for the rich, the educated"
}, {
    "Statement Num.": "28",
    "Statements": "We are tolerant of popular opinion, don't like extremes"
}, {
    "Statement Num.": "29",
    "Statements": "Poor on earth will enjoy higher status in after-life"
}, {
    "Statement Num.": "30",
    "Statements": "Respect for civil liberties and minority rights"
}, {
    "Statement Num.": "31",
    "Statements": "Virtue tends to be its own reward"
}, {
    "Statement Num.": "32",
    "Statements": "Position of depressed classes must be raised"
}, {
    "Statement Num.": "33",
    "Statements": "Emphasis is on getting ahead"
}, {
    "Statement Num.": "34"
}, {
    "Statement Num.": "35"
}, {
    "Statement Num.": "36"
}, {
    "Statement Num.": "37"
}, {
    "Statement Num.": "38"
}, {
    "Statement Num.": "39"
}, {
    "Statement Num.": "40"
}, {
    "Statement Num.": "41"
}, {
    "Statement Num.": "42"
}, {
    "Statement Num.": "43"
}, {
    "Statement Num.": "44"
}, {
    "Statement Num.": "45"
}, {
    "Statement Num.": "46"
}, {
    "Statement Num.": "47"
}, {
    "Statement Num.": "48"
}, {
    "Statement Num.": "49"
}, {
    "Statement Num.": "50"
}, {
    "Statement Num.": "51"
}, {
    "Statement Num.": "52"
}, {
    "Statement Num.": "53"
}, {
    "Statement Num.": "54"
}, {
    "Statement Num.": "55"
}, {
    "Statement Num.": "56"
}, {
    "Statement Num.": "57"
}, {
    "Statement Num.": "58"
}, {
    "Statement Num.": "59"
}, {
    "Statement Num.": "60"
}, {
    "Statement Num.": "61"
}, {
    "Statement Num.": "62"
}, {
    "Statement Num.": "63"
}, {
    "Statement Num.": "64"
}, {
    "Statement Num.": "65"
}, {
    "Statement Num.": "66"
}, {
    "Statement Num.": "67"
}, {
    "Statement Num.": "68"
}, {
    "Statement Num.": "69"
}, {
    "Statement Num.": "70"
}, {
    "Statement Num.": "71"
}, {
    "Statement Num.": "72"
}, {
    "Statement Num.": "73"
}, {
    "Statement Num.": "74"
}, {
    "Statement Num.": "75"
}, {
    "Statement Num.": "76"
}, {
    "Statement Num.": "77"
}, {
    "Statement Num.": "78"
}, {
    "Statement Num.": "79"
}, {
    "Statement Num.": "80"
}];

const testValue1 = ["We accept improvements in status and power of lower class", "All men expected to try to improve selves", "Success in life by a previously deprived person is resented", "Men can expect fair treatment according to merit", "Lower-class not revolutionary", "Political goals relatively moderate, even conservative", "Those born to high place in society should retain it", "Person with wealth deserves place in high society", "We try to eliminate privileged classes", "We accept aristocratic-type titles and other honors", "The government has its secrets, this is generally accepted", "Emphasis on publicity in political matters: no secrets", "Encouraged to think of ourselves as competing for success", "Social status equated with manner of speech", "We take law into our own hands, mob action and vigilantes", "Close ties to Mother Country, as Britain still is for many", "We prefer companionship and helping hand", "Some disdain for acquiring wealth for its own sake", "High value placed on protecting and promoting underdog", "We like the idea of a welfare state", "We value the race for success", "Corrupt means of achieving success are accepted", "One law for the rich, another for the poor", "Lack of respect for the police, and law enforcement", "Trust in police has sunk deeply into our national character", "Worth of a man is judged by what he is, not by education", "Deep respect for the rich, the educated", "We are tolerant of popular opinion, don't like extremes", "Poor on earth will enjoy higher status in after-life", "Respect for civil liberties and minority rights", "Virtue tends to be its own reward", "Position of depressed classes must be raised", "Emphasis is on getting ahead"];

test("grab project statements", () => {
    let value1 = grabProjectStatements(parameter1);
    expect(value1).toEqual(testValue1);
});


